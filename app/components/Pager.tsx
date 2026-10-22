import Link from "next/link";
import { path } from "@/lib/data";
import Ar from "./Ar";

/** Previous / next page in study order, plus a practise prompt. */
export default function Pager({ href, practiseUnit, count }: { href: string; practiseUnit: string; count: number }) {
  const i = path.findIndex((p) => p.href === href);
  const prev = path[i - 1];
  const next = path[i + 1];
  return (
    <>
      <div className="practise">
        <p>
          <strong>Ready to practise?</strong> <span className="muted">{count} cards from this page.</span>
        </p>
        <div className="row">
          <Link className="btn primary" href={`/practice?from=${encodeURIComponent(href)}`}>
            Flashcards
          </Link>
          <Link className="btn" href={`/quiz?unit=${practiseUnit}`}>
            Quiz this topic
          </Link>
        </div>
      </div>
      <nav className="pager" aria-label="Lesson navigation">
        {prev && (
          <Link href={prev.href}>
            <span className="dir">← Previous</span>
            {prev.title} <Ar className="small">{prev.ar.split(" / ")[0]}</Ar>
          </Link>
        )}
        {next && (
          <Link href={next.href} className="next">
            <span className="dir">Next →</span>
            {next.title} <Ar className="small">{next.ar.split(" / ")[0]}</Ar>
          </Link>
        )}
      </nav>
    </>
  );
}
