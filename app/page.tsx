import Link from "next/link";
import { verbs, common } from "@/lib/data";
export default function Home() {
  return (<>
    <h1>Arabic Study</h1>
    <p style={{ color: "var(--muted)" }}>Gulf / Saudi forms, each with the Fusha (MSA) equivalent.</p>
    <h2>Verbs</h2>
    <div className="grid">{verbs.map(v => (<Link key={v.slug} className="card" href={`/verbs/${v.slug}`}>
      <div className="ar">{v.ar}</div><div>{v.en}</div><div className="tr">{v.kind}</div></Link>))}</div>
    <h2>Common verbs</h2>
    <p style={{ color: "var(--muted)" }}>{common.map(c => c.ar).join(" · ")} — see Flashcards.</p>
  </>);
}
