"use client";
import { useMemo, useState } from "react";
import Speak from "../Speak";
import { verbs, common } from "@/lib/data";
type Card = { gulf: string; fusha: string; en: string };
export default function Cards() {
  const deck = useMemo<Card[]>(() => [
    ...verbs.map(v => ({ gulf: v.ar.split(" / ")[0], fusha: v.past[3].fusha, en: v.en })),
    ...common.map(c => ({ gulf: c.ar.split(" / ")[0], fusha: c.fp[3], en: c.en })),
  ], []);
  const [i, setI] = useState(0); const [flip, setFlip] = useState(false);
  const c = deck[i];
  const go = (d: number) => { setFlip(false); setI((i + d + deck.length) % deck.length); };
  return (<><h1>Flashcards</h1><p className="tr">{i + 1} / {deck.length} — tap card to flip</p>
    <div className="fc" onClick={() => setFlip(!flip)}>{!flip
      ? <><div className="ar">{c.gulf}</div><Speak text={c.gulf} /><div className="tr">Gulf</div></>
      : <><div>{c.en}</div><div className="ar f">{c.fusha}</div><Speak text={c.fusha} /><div className="tr">Fusha (he, past)</div></>}</div>
    <div className="tabs"><button onClick={() => go(-1)}>← Prev</button><button onClick={() => go(1)}>Next →</button></div></>);
}
