import { homework, fieldIds } from "@/lib/content/homework";
import HomeworkList from "./HomeworkList";

export const metadata = { title: "Homework" };

export default function Page() {
  return <HomeworkList items={homework.map((h) => ({ id: h.id, title: h.title, ar: h.ar, set: h.set, fields: fieldIds(h) }))} />;
}
