"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CONJ_ROWS, TENSE_EN, fieldIds, type Homework } from "@/lib/content/homework";
import Ar from "../../components/Ar";
import { loadAnswers, saveAnswers } from "../store";

type Status = "idle" | "saved" | "unsaved";

export default function Worksheet({ hw }: { hw: Homework }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const ids = useMemo(() => fieldIds(hw), [hw]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const s = loadAnswers(hw.id);
    setAnswers(s.answers);
    setName(s.name);
    setReady(true);
  }, [hw.id]);

  // Debounced autosave.
  useEffect(() => {
    if (!ready) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(saveAnswers(hw.id, { answers, name }) ? "saved" : "unsaved"), 400);
    return () => clearTimeout(timer.current);
  }, [answers, name, ready, hw.id]);

  const set = (id: string, v: string) => setAnswers((a) => ({ ...a, [id]: v }));
  const filled = ids.filter((id) => answers[id]?.trim()).length;
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const asText = () => {
    const out: string[] = [hw.ar, hw.title, ...(name ? [`Name: ${name}`] : []), today, ""];
    out.push(hw.conj.ar);
    hw.conj.verbs.forEach((v, i) => {
      out.push(`${i + 1}) ${v.ar} (${v.en})`);
      CONJ_ROWS.forEach((r) =>
        out.push(`${r.ar}: ` + r.persons.map((p, j) => `${p} (${answers[`c${i}-${r.key}-${j}`]?.trim() || "…"})`).join(" / ")),
      );
    });
    out.push("", hw.translate.ar);
    hw.translate.items.forEach((t, i) => out.push(`${i + 1}) ${t.text}`, `   ${answers[t.id]?.trim() || "…"}`));
    out.push("", hw.build.ar);
    hw.build.items.forEach((b, i) => out.push(`${i + 1}) ${b.verb} | ${b.pronoun} | ${b.tense}`, `   ${answers[b.id]?.trim() || "…"}`));
    return out.join("\n");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const clear = () => {
    if (confirm("Clear all your answers on this homework? This can't be undone.")) setAnswers({});
  };

  return (
    <article className="tone-green worksheet">
      <div className="crumbs no-print">
        <Link href="/homework">Homework</Link> <span aria-hidden="true">/</span> <span>{hw.set}</span>
      </div>

      <header className="lesson-head hw-head">
        <Ar className="title hw-title-ar">{hw.ar}</Ar>
        <h1>{hw.title}</h1>
        <div className="hw-meta">
          <label className="no-print">
            <span className="small muted">Your name (shown on the printout)</span>
            <input className="hw-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="name" />
          </label>
          <div className="print-only">
            <strong>Name:</strong> {name || "________________________"} &nbsp;·&nbsp; <strong>Date:</strong> {today}
          </div>
        </div>
        <div className="hw-toolbar no-print">
          <div className="hw-progress">
            <div className="bar" aria-hidden="true" style={{ margin: 0 }}>
              <span style={{ width: `${(filled / ids.length) * 100}%` }} />
            </div>
            <span className="small muted" aria-live="polite">
              {filled} of {ids.length} answered
              {status === "saved" && " · saved in this browser"}
              {status === "unsaved" && " · can't save in this browser, print before leaving"}
            </span>
          </div>
          <div className="row">
            <button type="button" className="btn primary" onClick={() => window.print()}>
              Print / save as PDF
            </button>
            <button type="button" className="btn" onClick={copy}>
              {copied ? "Copied" : "Copy as text"}
            </button>
            <button type="button" className="btn" onClick={clear} disabled={filled === 0}>
              Clear
            </button>
          </div>
        </div>
      </header>

      <aside className="callout hw-example" aria-label="Worked example">
        <h3>
          Example: <Ar>{hw.example.verb}</Ar>
        </h3>
        <div dir="rtl" lang="ar" className="ar">
          {hw.example.lines.map((l) => (
            <div key={l.tense}>
              <strong>{l.tense}:</strong> {l.text}
            </div>
          ))}
        </div>
      </aside>

      <section className="section hw-section" id="conjugate">
        <h2>{hw.conj.title}</h2>
        <p className="intro">
          <Ar>{hw.conj.ar}</Ar>
        </p>
        <ol className="hw-verbs">
          {hw.conj.verbs.map((v, i) => (
            <li key={i} className="hw-verb">
              <div className="hw-verb-head">
                <span className="hw-num">{i + 1}</span>
                <Ar className="hw-verb-ar">{v.ar}</Ar>
                <span className="muted">{v.en}</span>
                {v.slug && (
                  <Link href={`/verbs/${v.slug}`} target="_blank" className="small no-print hw-lookup">
                    Look it up ↗
                  </Link>
                )}
              </div>
              <div className="hw-grid" dir="rtl" lang="ar">
                {CONJ_ROWS.map((r) => (
                  <div className="hw-row" key={r.key}>
                    <div className="hw-tense">
                      <span className="ar">{r.ar}</span>
                      <span className="tr" dir="ltr">{r.label}</span>
                    </div>
                    <div className="hw-cells">
                      {r.persons.map((p, j) => {
                        const id = `c${i}-${r.key}-${j}`;
                        return (
                          <label className="hw-cell" key={id}>
                            <span className="hw-person ar">{p}</span>
                            <Field id={id} value={answers[id]} onChange={set} label={`${v.en}, ${r.label.toLowerCase()}, ${p}`} />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section hw-section" id="translate">
        <h2>{hw.translate.title}</h2>
        <p className="intro">
          <Ar>{hw.translate.ar}</Ar>
        </p>
        <ol className="hw-list">
          {hw.translate.items.map((t) => (
            <li key={t.id}>
              <label htmlFor={t.id} className="hw-q">
                {t.text}
                {t.note && <span className="tag hw-note">{t.note}</span>}
              </label>
              <Field id={t.id} value={answers[t.id]} onChange={set} long />
            </li>
          ))}
        </ol>
      </section>

      <section className="section hw-section" id="build">
        <h2>{hw.build.title}</h2>
        <p className="intro">
          <Ar>{hw.build.ar}</Ar>
        </p>
        <ol className="hw-list">
          {hw.build.items.map((b) => (
            <li key={b.id}>
              <label htmlFor={b.id} className="hw-q hw-given" dir="rtl" lang="ar">
                <span><span className="muted">الفعل:</span> <span className="ar">{b.verb}</span></span>
                <span><span className="muted">الضمير:</span> <span className="ar">{b.pronoun}</span></span>
                <span><span className="muted">الزمن:</span> <span className="ar">{b.tense}</span></span>
                <span className="tr no-print" dir="ltr">({TENSE_EN[b.tense]})</span>
              </label>
              <Field id={b.id} value={answers[b.id]} onChange={set} long />
            </li>
          ))}
        </ol>
      </section>

      <div className="practise no-print">
        <p>
          <strong>Finished?</strong> <span className="muted">Print it or save it as a PDF to send to your teacher.</span>
        </p>
        <button type="button" className="btn primary" onClick={() => window.print()}>
          Print / save as PDF
        </button>
      </div>
    </article>
  );
}

/** An answer box on screen; plain text (or a blank line) on paper. */
function Field({ id, value = "", onChange, long, label }: { id: string; value?: string; onChange: (id: string, v: string) => void; long?: boolean; label?: string }) {
  return (
    <>
      {long ? (
        <textarea
          id={id}
          className="hw-input hw-long no-print"
          dir="rtl"
          lang="ar"
          rows={2}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="اكتب هنا…"
        />
      ) : (
        <input
          id={id}
          className="hw-input no-print"
          dir="rtl"
          lang="ar"
          value={value}
          aria-label={label}
          onChange={(e) => onChange(id, e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      )}
      <span className={`print-only hw-answer${long ? " long" : ""}${value.trim() ? "" : " blank"}`} dir="auto">
        {value.trim() || " "}
      </span>
    </>
  );
}
