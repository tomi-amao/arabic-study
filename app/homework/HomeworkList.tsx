"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadAnswers } from "./store";
import Ar from "../components/Ar";

type Item = { id: string; title: string; ar: string; set: string; fields: string[] };

export default function HomeworkList({ items }: { items: Item[] }) {
  const [done, setDone] = useState<Record<string, number>>({});
  useEffect(() => {
    setDone(Object.fromEntries(items.map((h) => {
      const a = loadAnswers(h.id).answers;
      return [h.id, h.fields.filter((f) => a[f]?.trim()).length];
    })));
  }, [items]);
  return (
    <>
      <h1>Homework</h1>
      <p className="muted" style={{ marginTop: 0 }}>
        Do your homework here. Answers save automatically in this browser. When you're done, print it or save it as a PDF for your teacher.
      </p>
      <div className="units">
        {items.map((h) => {
          const n = done[h.id] ?? 0;
          return (
            <Link key={h.id} href={`/homework/${h.id}`} className="unit tone-green hw-card">
              <div className="small muted">{h.set}</div>
              <h2 style={{ margin: "2px 0", fontSize: "1.05rem" }}>{h.title}</h2>
              <Ar>{h.ar}</Ar>
              <div className="bar" aria-hidden="true"><span style={{ width: `${(n / h.fields.length) * 100}%` }} /></div>
              <div className="small muted">
                {n === 0 ? "Not started" : n === h.fields.length ? "All answered" : `${n} of ${h.fields.length} answered`}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
