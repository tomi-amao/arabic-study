"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Card } from "@/lib/types";
import { setKnown, useProgress } from "@/lib/progress";
import Ar from "../components/Ar";
import Speak from "../components/Speak";
import { UnitPicker, type UnitOpt, readQuery, shuffle } from "../components/UnitPicker";

type Dir = "ar" | "en";

export default function Flashcards({ deck, units, pages }: { deck: Card[]; units: UnitOpt[]; pages: Record<string, string> }) {
  const progress = useProgress();
  const known = useMemo(() => new Set(progress?.known ?? []), [progress]);
  const [picked, setPicked] = useState<string[]>([]);
  const [from, setFrom] = useState<string | null>(null);
  const [dir, setDir] = useState<Dir>("ar");
  const [onlyNew, setOnlyNew] = useState(false);
  const [order, setOrder] = useState<string[] | null>(null);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [missed, setMissed] = useState<string[]>([]);

  useEffect(() => {
    const q = readQuery();
    if (q.from && pages[q.from]) setFrom(q.from);
    else if (q.unit) setPicked([q.unit]);
  }, [pages]);

  const pool = useMemo(
    () =>
      deck.filter((c) =>
        from ? c.href === from : picked.length === 0 || picked.includes(c.unit),
      ),
    [deck, picked, from],
  );

  const start = useCallback(
    (ids?: string[]) => {
      const base = ids ?? pool.filter((c) => !onlyNew || !known.has(c.id)).map((c) => c.id);
      setOrder(shuffle(base));
      setI(0);
      setFlipped(false);
      setMissed([]);
    },
    [pool, onlyNew, known],
  );

  // Reshuffle whenever the selection changes (but not on every "known" update).
  useEffect(() => {
    if (progress) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, onlyNew, progress === null]);

  const byId = useMemo(() => new Map(deck.map((c) => [c.id, c])), [deck]);
  const card = order && i < order.length ? byId.get(order[i]) : undefined;
  const tone = units.find((u) => u.id === card?.unit)?.tone;

  const answer = useCallback(
    (got: boolean) => {
      if (!card) return;
      setKnown(card.id, got);
      if (!got) setMissed((m) => [...m, card.id]);
      setFlipped(false);
      setI((n) => n + 1);
    },
    [card],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card || (e.target as HTMLElement)?.closest("input,textarea,select")) return;
      if (e.key === " " || e.key === "Enter") {
        if ((e.target as HTMLElement)?.closest("button,a")) return;
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && (e.key === "1" || e.key === "ArrowLeft")) answer(false);
      else if (flipped && (e.key === "2" || e.key === "ArrowRight")) answer(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, flipped, answer]);

  const poolKnown = pool.filter((c) => known.has(c.id)).length;
  const done = order !== null && i >= order.length;

  return (
    <>
      <h1>Flashcards</h1>
      <p className="muted" style={{ marginTop: 0 }}>
        Say the answer out loud, flip, then be honest: cards you get right are marked learned.
      </p>
      <div className="panel filters">
        {from ? (
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span>
              <span className="label">Practising</span> <strong>{pages[from]}</strong>
            </span>
            <button type="button" className="chip" onClick={() => setFrom(null)}>
              All topics instead
            </button>
          </div>
        ) : (
          <UnitPicker units={units} picked={picked} setPicked={setPicked} />
        )}
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="seg" role="group" aria-label="Card front">
            <button type="button" aria-pressed={dir === "ar"} onClick={() => setDir("ar")}>
              Arabic → English
            </button>
            <button type="button" aria-pressed={dir === "en"} onClick={() => setDir("en")}>
              English → Arabic
            </button>
          </div>
          <label className="row small" style={{ gap: 6 }}>
            <input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} />
            Skip learned cards
          </label>
        </div>
        <div className="bar" aria-hidden="true" style={{ margin: 0 }}>
          <span style={{ width: `${pool.length ? (poolKnown / pool.length) * 100 : 0}%` }} />
        </div>
        <div className="small muted">
          {poolKnown} of {pool.length} cards learned in this selection
        </div>
      </div>

      <div className="stage">
        {order === null ? null : done || !card ? (
          <div className="panel empty" style={{ width: "100%", maxWidth: 520 }}>
            {order.length === 0 ? (
              <p>Nothing left to practise here. Untick “Skip learned cards” or choose another topic.</p>
            ) : (
              <>
                <p className="score">
                  {order.length - missed.length}/{order.length}
                </p>
                <p>{missed.length ? `${missed.length} to go over again.` : "Clean sweep. Nice work."}</p>
                <div className="row" style={{ justifyContent: "center" }}>
                  {missed.length > 0 && (
                    <button type="button" className="btn primary" onClick={() => start(missed)}>
                      Practise the {missed.length} I missed
                    </button>
                  )}
                  <button type="button" className="btn" onClick={() => start()}>
                    Start again
                  </button>
                  <Link className="btn" href="/quiz">
                    Take a quiz
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={tone ? `tone-${tone}` : ""} style={{ display: "contents" }}>
            <div className="meta">
              <span>
                Card {i + 1} of {order.length}
              </span>
              <button type="button" className="toggle" onClick={() => start(order.slice(i))}>
                Shuffle
              </button>
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-label={flipped ? "Card showing answer. Press to flip back." : "Card showing question. Press to reveal the answer."}
              className={`card3d${flipped ? " flipped" : ""}`}
              onClick={() => setFlipped((f) => !f)}
            >
              <div className="inner">
                <div className="face front" aria-hidden={flipped}>
                  <span className="src">{card.source}</span>
                  {dir === "ar" ? <ArSide c={card} /> : <span className="en-big">{card.en}</span>}
                  <span className="hint">Tap or press space to flip</span>
                </div>
                <div className="face back" aria-hidden={!flipped}>
                  {dir === "ar" ? (
                    <>
                      <span className="en-big">{card.en}</span>
                      {card.fusha && (
                        <span className="small">
                          <span className="tag">Fusha</span> <Ar className="f">{card.fusha}</Ar>
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <ArSide c={card} />
                      {card.fusha && (
                        <span className="small">
                          <span className="tag">Fusha</span> <Ar className="f">{card.fusha}</Ar>
                        </span>
                      )}
                    </>
                  )}
                  <Link className="hint" href={card.href} onClick={(e) => e.stopPropagation()}>
                    Open the lesson
                  </Link>
                </div>
              </div>
            </div>
            {flipped ? (
              <div className="answers">
                <button type="button" className="btn bad" onClick={() => answer(false)}>
                  Again <span className="kbd">1</span>
                </button>
                <button type="button" className="btn good" onClick={() => answer(true)}>
                  Got it <span className="kbd">2</span>
                </button>
              </div>
            ) : (
              <div className="answers">
                <button type="button" className="btn primary" style={{ gridColumn: "1 / -1" }} onClick={() => setFlipped(true)}>
                  Show answer <span className="kbd">Space</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function ArSide({ c }: { c: Card }) {
  return (
    <>
      <span>
        <Ar className="big">{c.ar}</Ar>
        <Speak text={c.ar} />
      </span>
      {c.tr && <span className="tr">{c.tr}</span>}
    </>
  );
}
