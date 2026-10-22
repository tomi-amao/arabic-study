import Link from "next/link";
import { notFound } from "next/navigation";
import { deck, getLesson, lessons, unitOfLesson } from "@/lib/data";
import Ar from "../../components/Ar";
import MarkVisited from "../../components/MarkVisited";
import Pager from "../../components/Pager";
import Rich from "../../components/Rich";
import { SectionView, sectionId } from "../../components/Sections";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const l = getLesson((await params).slug);
  return { title: l?.title };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const unit = unitOfLesson(slug);
  const href = `/learn/${slug}`;
  const toc = lesson.sections.filter((s) => s.kind !== "note");
  return (
    <article className={`tone-${unit.tone}`}>
      <MarkVisited href={href} />
      <div className="lesson-head">
        <div className="crumbs">
          <Link href="/">Learn</Link> <span aria-hidden="true">/</span> <span>{unit.title}</span>
        </div>
        <h1>{lesson.title}</h1>
        <Ar className="title">{lesson.ar}</Ar>
        <p>{lesson.summary}</p>
        {toc.length > 2 && (
          <ul className="toc" aria-label="On this page">
            {toc.map((s, i) => {
              const t = s.kind === "tips" ? s.title ?? "Quick tips" : s.title;
              return (
                <li key={i}>
                  <a href={`#${s.kind === "tips" ? "tips" : sectionId(t)}`}>
                    <Rich text={t} />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {lesson.sections.map((s, i) => (
        <SectionView key={i} s={s} />
      ))}
      <Pager href={href} practiseUnit={unit.id} count={deck.filter((c) => c.href === href).length} />
    </article>
  );
}
