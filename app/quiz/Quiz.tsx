"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Card } from "@/lib/types";
import Ar from "../components/Ar";
import Speak from "../components/Speak";
import { UnitPicker, type UnitOpt, readQuery, shuffle } from "../components/UnitPicker";

type Dir = "ar" | "en";
type Q = { card: Card; options: Card[] };
const LENGTHS = [10, 20];

function build(pool: Card[], all: Card[], n: number, dir: Dir): Q[] {
  const key = (c: Card) => (dir === "ar" ? c.en : c.ar);
  return shuffle(pool)
    .slice(0, n)
    .map((card) => {
      // Prefer distractors from the same topic so the choice is a real test.
      const near = shuffle(all.filter((c) => c.unit === card.unit));
      const far = shuffle(all);
      const seen = new Set([key(card)]);
      const wrong: Card[] = [];
      for (const c of [...near, ...far]) {
        if (wrong.length === 3) break;
        if (seen.has(key(c))) continue;
        seen.add(key(c));
        wrong.push(c);
      }
      return { card, options: shuffle([card, ...wrong]) };
    });
}

export default function Quiz({ deck, units }: { deck: Card[]; units: UnitOpt[] }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [dir, setDir] = useState<Dir>("ar");
  const [len, setLen] = useState(10);
  const [qs, setQs] = useState<Q[] | null>(null);
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [wrong, setWrong] = useState<Q[]>([]);

  useEffect(() => {
    const q = readQuery();
    if (q.unit) setPicked([q.unit]);
  }, []);

  const pool = useMemo(() => deck.filter((c) => picked.length === 0 || picked.includes(c.unit)), [deck, picked]);
  const start = useCallback(() => {
    setQs(build(pool, deck, len, dir));
    setI(0);
    setChoice(null);
    setWrong([]);
  }, [pool, deck, len, dir]);

  const q = qs?.[i];
  const pick = (c: Card) => {
    if (!q || choice) return;
    setChoice(c.id);
    if (c.id !== q.card.id) setWrong((w) => [...w, q]);
  };
  const next = useCallback(() => {
    setChoice(null);
    setI((n) => n + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!q) return;
      const n = Number(e.key);
      if (!choice && n >= 1 && n <= q.options.length) pick(q.options[n - 1]);
      else if (choice && e.key === "Enter" && !(e.target as HTMLElement)?.closest("button,a")) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const tone = units.find((u) => u.id === q?.card.unit)?.tone;

  if (!qs)
    return (
      <>
        <h1>Quiz</h1>
        <p className="muted" style={{ marginTop: 0 }}>
          Multiple choice from your lessons. Wrong options come from the same topic, so read carefully.
        </p>
        <div className="panel filters">
          <UnitPicker units={units} picked={picked} setPicked={setPicked} />
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="seg" role="group" aria-label="Question type">
              <button type="button" aria-pressed={dir === "ar"} onClick={() => setDir("ar")}>
                Arabic → English
              </button>
              <button type="button" aria-pressed={dir === "en"} onClick={() => setDir("en")}>
                English → Arabic
              </button>
            </div>
            <div className="seg" role="group" aria-label="Number of questions">
              {LENGTHS.map((n) => (
                <button key={n} type="button" aria-pressed={len === n} onClick={() => setLen(n)}>
                  {n} questions
                </button>
              ))}
            </div>
          </div>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="small muted">{pool.length} cards in this selection</span>
            <button type="button" className="btn primary" onClick={start} disabled={pool.length < 4}>
              Start quiz
            </button>
          </div>
        </div>
      </>
    );

  if (!q) {
    const score = qs.length - wrong.length;
    return (
      <>
        <h1>Quiz results</h1>
        <div className="panel" style={{ textAlign: "center" }}>
          <p className="score">
            {score}/{qs.length}
          </p>
          <p>{score === qs.length ? "Perfect score." : score >= qs.length * 0.7 ? "Good work. Review the ones below." : "Worth another pass through these lessons."}</p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn primary" onClick={start}>
              New quiz
            </button>
            <button type="button" className="btn" onClick={() => setQs(null)}>
              Change topics
            </button>
          </div>
        </div>
        {wrong.length > 0 && (
          <>
            <h2>To review</h2>
            <ul className="phrases">
              {wrong.map(({ card }) => (
                <li key={card.id}>
                  <span className="en">
                    {card.en}{" "}
                    <Link className="small" href={card.href}>
                      Lesson
                    </Link>
                  </span>
                  <span className="arside">
                    <Ar>{card.ar}</Ar>
                    <Speak text={card.ar} />
                    {card.tr && <span className="tr" style={{ display: "block" }}>{card.tr}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }

  return (
    <div className={tone ? `tone-${tone}` : ""}>
      <h1 className="sr-only">Quiz</h1>
      <div className="stage">
        <div className="meta">
          <span>
            Question {i + 1} of {qs.length}
          </span>
          <button type="button" className="toggle" onClick={() => setQs(null)}>
            End quiz
          </button>
        </div>
        <div className="bar" aria-hidden="true" style={{ width: "100%", maxWidth: 560, margin: 0 }}>
          <span style={{ width: `${(i / qs.length) * 100}%` }} />
        </div>
        <div className="q">
          <div className="prompt">
            <div className="small muted">{dir === "ar" ? "What does this mean?" : "How do you say this?"}</div>
            {dir === "ar" ? (
              <>
                <Ar className="big">{q.card.ar}</Ar>
                <Speak text={q.card.ar} />
                {q.card.tr && <div className="tr">{q.card.tr}</div>}
              </>
            ) : (
              <div className="en-big" style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: 8 }}>{q.card.en}</div>
            )}
          </div>
          <div className="options" role="group" aria-label="Answers">
            {q.options.map((o, n) => {
              const state = choice ? (o.id === q.card.id ? " right" : o.id === choice ? " wrong" : "") : "";
              return (
                <button key={o.id} type="button" className={`option${state}`} disabled={!!choice} onClick={() => pick(o)}>
                  {dir === "ar" ? <span>{o.en}</span> : <Ar>{o.ar}</Ar>}
                  <span className="kbd" aria-hidden="true">{n + 1}</span>
                </button>
              );
            })}
          </div>
          <div aria-live="polite" style={{ marginTop: 14, minHeight: 48 }}>
            {choice && (
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span>
                  {choice === q.card.id ? <strong style={{ color: "var(--good)" }}>Correct.</strong> : <strong style={{ color: "var(--bad)" }}>Not quite.</strong>}{" "}
                  <span className="small muted">From {q.card.source}</span>
                </span>
                <button type="button" className="btn primary" onClick={next} autoFocus>
                  {i + 1 === qs.length ? "See results" : "Next"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
