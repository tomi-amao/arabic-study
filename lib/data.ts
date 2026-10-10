import data from "./verbs.json";
export type Row = { gulf: string; tr: string; fusha: string };
export type Verb = { slug: string; ar: string; en: string; kind: string; past: Row[]; pres: Row[]; cmd: Row[] };
export const pronouns = data.pronouns as { ar: string; en: string }[];
export const verbs = data.verbs as Verb[];
export const common = data.common as any[];
