import { deck, path, units } from "@/lib/data";
import HomeView, { type UnitCard } from "./components/HomeView";

export default function Home() {
  const data: UnitCard[] = units.map((u) => ({
    id: u.id,
    title: u.title,
    ar: u.ar,
    blurb: u.blurb,
    tone: u.tone,
    stops: path.filter((p) => p.unit.id === u.id).map(({ kind, title, ar, href }) => ({ kind, title, ar, href })),
    cards: deck.filter((c) => c.unit === u.id).map((c) => c.id),
  }));
  const titles = Object.fromEntries(path.map((p) => [p.href, p.title]));
  return <HomeView units={data} titles={titles} total={deck.length} />;
}
