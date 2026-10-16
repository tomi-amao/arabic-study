// Content model. All lesson text lives in lib/content/*; the UI only renders it.

/** A word or phrase worth practising. Becomes a flashcard / quiz item. */
export type Phrase = { ar: string; tr?: string; en: string; fusha?: string };

/** "artr" cells hold "Arabic|transliteration" and render stacked. */
export type ColKind = "ar" | "tr" | "text" | "artr";
export type Col = { label: string; kind: ColKind };

export type Section =
  | { kind: "table"; title: string; intro?: string; cols: Col[]; rows: string[][]; highlight?: number[] }
  | { kind: "phrases"; title: string; intro?: string; items: Phrase[] }
  | { kind: "note"; title: string; text: string; tone?: "info" | "fix" }
  | { kind: "tips"; title?: string; items: string[] }
  | { kind: "days"; title: string; intro?: string; items: Phrase[] };

export type Lesson = {
  slug: string;
  title: string;
  ar: string;
  summary: string;
  sections: Section[];
  /** Extra cards beyond those auto-collected from "phrases" sections. */
  cards?: Phrase[];
};

/** Gulf form, transliteration and the Fusha (MSA) equivalent. */
export type Row = { gulf: string; tr: string; fusha: string };
export type Example = { gulf: string; tr?: string; fusha?: string; en: string };

export type Verb = {
  slug: string;
  ar: string;
  en: string;
  kind: string;
  past: Row[];
  pres: Row[];
  cmd: Row[];
  examples: Example[];
  notes: string[];
  /** Core verbs have their own revision sheet; the rest come from "Common verbs". */
  core: boolean;
};

export type Unit = {
  id: string;
  title: string;
  ar: string;
  blurb: string;
  /** Colour token name from globals.css (e.g. "maroon"). */
  tone: string;
  lessons: string[];
  verbs?: string[];
};

export type Card = Phrase & { id: string; unit: string; source: string; href: string };
