"use client";
import { useState } from "react";
import Ar from "../../components/Ar";
import Rich from "../../components/Rich";
import Speak from "../../components/Speak";
import type { Row, Verb } from "@/lib/types";

type Mode = "both" | "gulf" | "fusha";
const MODES: [Mode, string][] = [["both", "Gulf + Fusha"], ["gulf", "Gulf only"], ["fusha", "Fusha only"]];
const CMD = ["to a man", "to a woman", "to several people"];

type Pron = { ar: string; en: string }[];

function Table({ id, title, rows, cmd, mode, pronouns }: { id: string; title: string; rows: Row[]; cmd?: boolean; mode: Mode; pronouns: Pron }) {
  return (
    <section className="section" id={id}>
      <h2>
        <Rich text={title} />
      </h2>
      <div className="tablewrap verb-tables">
        <table>
          <thead>
            <tr>
              <th scope="col">{cmd ? "Said" : "Who"}</th>
              {mode !== "fusha" && <th scope="col">Gulf / Saudi</th>}
              {mode !== "gulf" && <th scope="col">Fusha</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="pron">
                  {cmd ? (
                    <span className="small">{CMD[i]}</span>
                  ) : (
                    <>
                      <Ar>{pronouns[i].ar}</Ar>
                      <span className="tr">{pronouns[i].en}</span>
                    </>
                  )}
                </td>
                {mode !== "fusha" && (
                  <td className="g">
                    <Ar>{r.gulf}</Ar>
                    <Speak text={r.gulf} />
                    {r.tr && <span className="tr" style={{ display: "block" }}>{r.tr}</span>}
                  </td>
                )}
                {mode !== "gulf" && (
                  <td>
                    <Ar className="f">{r.fusha}</Ar>
                    <Speak text={r.fusha} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function VerbView({ verb, pronouns }: { verb: Verb; pronouns: Pron }) {
  const [mode, setMode] = useState<Mode>("both");
  const fut: Row[] = verb.pres.map((r) => ({
    gulf: "راح " + r.gulf,
    tr: r.tr ? "raḥ " + r.tr : "",
    fusha: "سَ" + r.fusha,
  }));
  const parts: [string, string][] = [["past", "Past"], ["present", "Present"], ["future", "Future"], ["command", "Command"]];
  return (
    <>
      <div className="lesson-head">
        <h1>
          {verb.en[0].toUpperCase() + verb.en.slice(1)} <Ar className="title">{verb.ar}</Ar>
        </h1>
        <p>
          {verb.kind === "Common" ? "Everyday verb" : `${verb.kind} verb`}. Gulf / Saudi forms with the Fusha (MSA) equivalent.
        </p>
        <div className="toolbar">
          <div className="seg" role="group" aria-label="Which forms to show">
            {MODES.map(([m, label]) => (
              <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
                {label}
              </button>
            ))}
          </div>
          <ul className="toc" aria-label="On this page" style={{ margin: 0 }}>
            {parts.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
            {verb.examples.length > 0 && (
              <li>
                <a href="#examples">Examples</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Table id="past" title="Past" rows={verb.past} mode={mode} pronouns={pronouns} />
      <Table id="present" title="Present" rows={verb.pres} mode={mode} pronouns={pronouns} />
      <Table id="future" title="Future (Gulf راح + present · Fusha سَـ + present)" rows={fut} mode={mode} pronouns={pronouns} />
      <Table id="command" title="Command" rows={verb.cmd} cmd mode={mode} pronouns={pronouns} />
      {verb.notes.length > 0 && (
        <section className="section" id="notes">
          <h2>Notes from your lessons</h2>
          <ul className="tips">
            {verb.notes.map((n, i) => (
              <li key={i}>
                <Rich text={n} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {verb.examples.length > 0 && (
        <section className="section" id="examples">
          <h2>In sentences</h2>
          <ul className="phrases">
            {verb.examples.map((e, i) => (
              <li key={i}>
                <span className="en">{e.en}</span>
                <span className="arside">
                  {mode !== "fusha" && (
                    <>
                      <Ar>{e.gulf}</Ar>
                      <Speak text={e.gulf} />
                      {e.tr && <span className="tr" style={{ display: "block" }}>{e.tr}</span>}
                    </>
                  )}
                  {e.fusha && mode !== "gulf" && (
                    <span className="fusha" style={{ display: "block" }}>
                      <span className="tag">Fusha</span>
                      <Ar>{e.fusha}</Ar>
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
