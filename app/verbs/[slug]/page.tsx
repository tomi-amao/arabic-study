import { notFound } from "next/navigation";
import { verbs } from "@/lib/data";
import VerbView from "./VerbView";
export function generateStaticParams() { return verbs.map(v => ({ slug: v.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const v = verbs.find(x => x.slug === slug); if (!v) notFound();
  return <VerbView verb={v} />;
}
