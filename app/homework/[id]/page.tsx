import { notFound } from "next/navigation";
import { homework } from "@/lib/content/homework";
import Worksheet from "./Worksheet";

export function generateStaticParams() {
  return homework.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const h = homework.find((x) => x.id === id);
  return { title: h ? `Homework: ${h.title}` : undefined };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const h = homework.find((x) => x.id === id);
  if (!h) notFound();
  return <Worksheet hw={h} />;
}
