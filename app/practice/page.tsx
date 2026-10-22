import { deck, path, units } from "@/lib/data";
import Flashcards from "./Flashcards";

export const metadata = { title: "Flashcards" };

export default function Page() {
  return (
    <Flashcards
      deck={deck}
      units={units.map(({ id, title, tone }) => ({ id, title, tone }))}
      pages={Object.fromEntries(path.map((p) => [p.href, p.title]))}
    />
  );
}
