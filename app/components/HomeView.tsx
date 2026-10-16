"use client";
import Link from "next/link";
import { useProgress } from "@/lib/progress";
import Ar from "./Ar";

type Stop = { kind: "lesson" | "verb"; title: string; ar: string; href: string };
export type UnitCard = { id: string; title: string; ar: string; blurb: string; tone: string; stops: Stop[]; cards: string[] };

const CORE_VERBS = 5; // go, see, make, read, buy have their own sheets; the rest fold away

export default function HomeView({ units, titles, total }: { units: UnitCard[]; titles: Record<string, string>; total: number }) {
  const p = useProgress();
  const visited = new Set(p?.visited ?? []);
  const known = new Set(p?.known ?? []);
  const first = units[0].stops[0];
  const resume = p?.last && titles[p.last] ? { href: p.last, title: titles[p.last] } : null;

  return (
    <>
      <section className="hero">
        <h1>Your Arabic lessons</h1>
        <p>Every lesson sheet, organised by topic. Gulf / Saudi first, with Fusha alongside. Read a lesson, then lock it in with flashcards and a quick quiz.</p>
      </section>

      <div className="resume">
        <div>
          <div className="label">{resume ? "Pick up where you left off" : "Start here"}</div>
          <strong>{resume ? resume.title : first.title}</strong>
          {p && p.known.length > 0 && (
            <div className="small muted">
              {known.size} of {total} cards learned
            </div>
          )}
        </div>
        <div className="row">
          <Link className="btn primary" href={resume?.href ?? first.href}>
            {resume ? "Continue" : "Start"}
          </Link>
          <Link className="btn" href="/practice">
            Flashcards
          </Link>
          <Link className="btn" href="/quiz">
            Quiz
          </Link>
          <Link className="btn" href="/homework">
            Homework
          </Link>
        </div>
      </div>

      <div className="units">
        {units.map((u, n) => {
          const learned = u.cards.filter((c) => known.has(c)).length;
          const lessonsStops = u.stops.filter((s) => s.kind === "lesson");
          const verbStops = u.stops.filter((s) => s.kind === "verb");
          return (
            <section key={u.id} className={`unit tone-${u.tone}`} aria-labelledby={`u-${u.id}`}>
              <div className="unit-head">
                <h2 id={`u-${u.id}`}>
                  <span className="muted small">{n + 1}.</span> {u.title}
                </h2>
                <Ar>{u.ar}</Ar>
              </div>
              <p>{u.blurb}</p>
              <div className="bar" role="progressbar" aria-label={`${u.title} cards learned`} aria-valuemin={0} aria-valuemax={u.cards.length} aria-valuenow={learned}>
                <span style={{ width: `${u.cards.length ? (learned / u.cards.length) * 100 : 0}%` }} />
              </div>
              <ol>
                {lessonsStops.map((s) => (
                  <StopLink key={s.href} s={s} done={visited.has(s.href)} />
                ))}
                {verbStops.slice(0, CORE_VERBS).map((s) => (
                  <StopLink key={s.href} s={s} done={visited.has(s.href)} />
                ))}
              </ol>
              {verbStops.length > CORE_VERBS && (
                <details>
                  <summary className="more">More everyday verbs ({verbStops.length - CORE_VERBS})</summary>
                  <ol>
                    {verbStops.slice(CORE_VERBS).map((s) => (
                      <StopLink key={s.href} s={s} done={visited.has(s.href)} />
                    ))}
                  </ol>
                </details>
              )}
              <div className="row" style={{ justifyContent: "space-between", marginTop: 6 }}>
                <span className="small muted">
                  {learned}/{u.cards.length} cards learned
                </span>
                <Link className="small" href={`/practice?unit=${u.id}`}>
                  Practise →
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function StopLink({ s, done }: { s: Stop; done: boolean }) {
  return (
    <li>
      <Link href={s.href}>
        <span className={`check${done ? " done" : ""}`} aria-hidden="true">
          {done ? "✓" : ""}
        </span>
        <span>
          {s.title}
          {done && <span className="sr-only"> (visited)</span>}
        </span>
        <Ar className="sub">{s.ar.split(/ · | \/ /)[0]}</Ar>
      </Link>
    </li>
  );
}
