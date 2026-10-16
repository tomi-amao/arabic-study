import verbData from "./content/verbs.json";
import { lessons } from "./content/lessons";
import type { Card, Lesson, Unit, Verb } from "./types";

export type { Card, Lesson, Unit, Verb } from "./types";
export type { Row } from "./types";

export const pronouns = verbData.pronouns as { ar: string; en: string }[];
export const verbs = verbData.verbs as Verb[];
export { lessons };

export const units: Unit[] = [
  {
    id: "pronouns", title: "Pronouns & possession", ar: "الضمائر", tone: "maroon",
    blurb: "I, you, he… and how to say my, your, his.",
    lessons: ["pronouns", "possessive-suffixes", "gendered-nouns"],
  },
  {
    id: "prepositions", title: "Prepositions", ar: "حروف الجر", tone: "teal",
    blurb: "In, on, with, for, about, and “I have”.",
    lessons: ["prepositions", "prepositions-with-pronouns"],
  },
  {
    id: "questions", title: "Asking questions", ar: "الأسئلة", tone: "purple",
    blurb: "Who, what, where, when, why, how.",
    lessons: ["question-words"],
  },
  {
    id: "time", title: "Time", ar: "الوقت", tone: "blue",
    blurb: "Days, weeks, the dual, parts of the day.",
    lessons: ["time-words", "days-and-times"],
  },
  {
    id: "verbs", title: "Verbs", ar: "الأفعال", tone: "green",
    blurb: "Past, present, future, command, verb by verb.",
    lessons: ["how-verbs-work"],
    verbs: verbs.map((v) => v.slug),
  },
  {
    id: "vocab", title: "Everyday words", ar: "مفردات", tone: "amber",
    blurb: "Meals, food, and spoken vs written forms.",
    lessons: ["meals"],
  },
];

export const getLesson = (slug: string) => lessons.find((l) => l.slug === slug);
export const getVerb = (slug: string) => verbs.find((v) => v.slug === slug);
export const unitOfLesson = (slug: string) => units.find((u) => u.lessons.includes(slug))!;
export const verbUnit = units.find((u) => u.id === "verbs")!;

/** One entry per page, in study order. Drives prev/next and progress. */
export type Stop = { kind: "lesson" | "verb"; slug: string; title: string; ar: string; href: string; unit: Unit };
export const path: Stop[] = units.flatMap((u) => [
  ...u.lessons.map((s): Stop => {
    const l = getLesson(s)!;
    return { kind: "lesson", slug: s, title: l.title, ar: l.ar, href: `/learn/${s}`, unit: u };
  }),
  ...(u.verbs ?? []).map((s): Stop => {
    const v = getVerb(s)!;
    return { kind: "verb", slug: s, title: v.en, ar: v.ar, href: `/verbs/${s}`, unit: u };
  }),
]);

function lessonCards(l: Lesson): Card[] {
  const unit = unitOfLesson(l.slug).id;
  const href = `/learn/${l.slug}`;
  const phrases = [
    ...(l.cards ?? []),
    ...l.sections.flatMap((s) => (s.kind === "phrases" ? s.items : [])),
  ];
  return phrases.map((p) => ({ ...p, id: `${l.slug}|${p.ar}`, unit, source: l.title, href }));
}

function verbCards(v: Verb): Card[] {
  const href = `/verbs/${v.slug}`;
  const base = { unit: "verbs", source: `${v.en} (${v.ar})`, href };
  const cards: Card[] = [
    { ...base, id: `${v.slug}|head`, ar: v.ar, en: v.en, fusha: v.past[3].fusha },
    { ...base, id: `${v.slug}|past-1`, ar: v.past[0].gulf, tr: v.past[0].tr || undefined, en: `I ${pastEn(v)} (past)`, fusha: v.past[0].fusha },
    { ...base, id: `${v.slug}|pres-1`, ar: v.pres[0].gulf, tr: v.pres[0].tr || undefined, en: `I ${v.en.replace(/^to /, "")} (present)`, fusha: v.pres[0].fusha },
    { ...base, id: `${v.slug}|cmd-m`, ar: v.cmd[0].gulf, tr: v.cmd[0].tr || undefined, en: `${cap(v.en.replace(/^to /, ""))}! (to a man)`, fusha: v.cmd[0].fusha },
    ...v.examples.map((e, i) => ({ ...base, id: `${v.slug}|ex-${i}`, ar: e.gulf, tr: e.tr, en: e.en, fusha: e.fusha })),
  ];
  return cards;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const PAST: Record<string, string> = {
  go: "went", see: "saw", make: "made / did", read: "read", buy: "bought", write: "wrote",
  drink: "drank", eat: "ate", take: "took", say: "said", sleep: "slept", come: "came",
};
const pastEn = (v: Verb) => PAST[v.slug] ?? v.en;

/** Every practice card, de-duplicated by Arabic text within a source. */
export const deck: Card[] = (() => {
  const seen = new Set<string>();
  return [...lessons.flatMap(lessonCards), ...verbs.flatMap(verbCards)].filter((c) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });
})();
