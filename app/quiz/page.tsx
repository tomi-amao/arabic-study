import { deck, units } from "@/lib/data";
import Quiz from "./Quiz";

export const metadata = { title: "Quiz" };

export default function Page() {
  return <Quiz deck={deck} units={units.map(({ id, title, tone }) => ({ id, title, tone }))} />;
}
