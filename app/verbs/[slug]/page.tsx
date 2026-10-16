import Link from "next/link";
import { notFound } from "next/navigation";
import { deck, getVerb, pronouns, verbs } from "@/lib/data";
import MarkVisited from "../../components/MarkVisited";
import Pager from "../../components/Pager";
import VerbView from "./VerbView";

export function generateStaticParams() {
  return verbs.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const v = getVerb((await params).slug);
  return { title: v ? `${v.en} (${v.ar})` : undefined };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVerb(slug);
  if (!v) notFound();
  const href = `/verbs/${slug}`;
  return (
    <article className="tone-green">
      <MarkVisited href={href} />
      <div className="crumbs">
        <Link href="/">Learn</Link> <span aria-hidden="true">/</span> <span>Verbs</span>
      </div>
      <VerbView verb={v} pronouns={pronouns} />
      <Pager href={href} practiseUnit="verbs" count={deck.filter((c) => c.href === href).length} />
    </article>
  );
}
