"use client";
import { useState } from "react";
import Speak from "../../Speak";
import { pronouns, type Verb, type Row } from "@/lib/data";
type Mode = "both" | "gulf" | "fusha";
function Table({ title, rows, labels, mode }: { title: string; rows: Row[]; labels?: string[]; mode: Mode }) {
  return (<><h2>{title}</h2><table><thead><tr><th></th>
    {mode !== "fusha" && <th>Gulf / Saudi</th>}{mode !== "gulf" && <th>Fusha</th>}</tr></thead><tbody>
    {rows.map((r, i) => (<tr key={i}>
      <td>{labels ? labels[i] : <><span className="ar">{pronouns[i].ar}</span><div className="tr">{pronouns[i].en}</div></>}</td>
      {mode !== "fusha" && <td className="g"><span className="ar big">{r.gulf}</span><Speak text={r.gulf} /><div className="tr">{r.tr}</div></td>}
      {mode !== "gulf" && <td><span className="ar big f">{r.fusha}</span><Speak text={r.fusha} /></td>}
    </tr>))}</tbody></table></>);
}
export default function VerbView({ verb }: { verb: Verb }) {
  const [mode, setMode] = useState<Mode>("both");
  const fut: Row[] = verb.pres.map(r => ({ gulf: "راح " + r.gulf, tr: "raḥ " + r.tr, fusha: "سَ" + r.fusha }));
  return (<>
    <h1><span className="ar">{verb.ar}</span> — {verb.en}</h1><div className="tr">{verb.kind} verb</div>
    <div className="tabs">{(["both", "gulf", "fusha"] as Mode[]).map(m => (
      <button key={m} className={mode === m ? "on" : ""} onClick={() => setMode(m)}>{m === "both" ? "Gulf + Fusha" : m === "gulf" ? "Gulf only" : "Fusha only"}</button>))}</div>
    <Table title="Past" rows={verb.past} mode={mode} />
    <Table title="Present" rows={verb.pres} mode={mode} />
    <Table title="Future (راح / سَـ)" rows={fut} mode={mode} />
    <Table title="Command" rows={verb.cmd} labels={["m.", "f.", "pl."]} mode={mode} />
  </>);
}
