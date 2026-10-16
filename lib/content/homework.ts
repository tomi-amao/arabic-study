// Homework sheets from your teacher. Answers are typed on the site and saved
// in the browser; the page prints cleanly so it can be handed in.

export type ConjVerb = { ar: string; en: string; slug?: string };
export type Prompt = { id: string; text: string; note?: string };
export type Build = { id: string; verb: string; pronoun: string; tense: string };

export type Homework = {
  id: string;
  title: string;
  ar: string;
  set: string;
  example: { verb: string; lines: { tense: string; text: string }[] };
  conj: { title: string; ar: string; verbs: ConjVerb[] };
  translate: { title: string; ar: string; items: Prompt[] };
  build: { title: string; ar: string; items: Build[] };
};

/** The persons the conjugation exercise asks for, per tense. */
export const CONJ_ROWS = [
  { key: "past", label: "Past", ar: "الماضي", persons: ["أنا", "هو", "هي"] },
  { key: "pres", label: "Present", ar: "المضارع", persons: ["أنا", "هو", "هي"] },
  { key: "fut", label: "Future", ar: "المستقبل", persons: ["أنا", "هو", "هي"] },
  { key: "cmd", label: "Command", ar: "الأمر", persons: ["أنتَ", "أنتِ"] },
] as const;

export const homework: Homework[] = [
  {
    id: "saudi-verbs-1",
    title: "Verb conjugation & use in Saudi dialect",
    ar: "تصريف الأفعال واستخدامها في اللهجة السعودية",
    set: "Verbs homework",
    example: {
      verb: "شاف",
      lines: [
        { tense: "الماضي", text: "أنا شِفْت / هو شاف / هي شافت" },
        { tense: "المضارع", text: "أنا أَشوف / هو يِشوف / هي تِشوف" },
        { tense: "المستقبل", text: "أنا راح أَشوف / هو راح يِشوف / هي راح تِشوف" },
        { tense: "الأمر", text: "أنتَ شوف / أنتِ شوفي" },
      ],
    },
    conj: {
      title: "1. Complete the conjugations in Saudi dialect",
      ar: "أولاً: أكمل تصريف الأفعال التالية في الفراغات حسب اللهجة السعودية",
      verbs: [
        { ar: "راح", en: "to go", slug: "go" },
        { ar: "سَوَّى", en: "to do / make", slug: "make" },
        { ar: "اِشْتَرَى", en: "to buy", slug: "buy" },
        { ar: "قَرَأ", en: "to read", slug: "read" },
        { ar: "كَتَب", en: "to write", slug: "write" },
        { ar: "تِفَرَّج", en: "to watch" },
        { ar: "لِعِب", en: "to play" },
        { ar: "مِشَى", en: "to walk / leave" },
        { ar: "دَقّ", en: "to call" },
        { ar: "سِمِع", en: "to hear / listen" },
      ],
    },
    translate: {
      title: "2. Translate into Saudi dialect",
      ar: "ثانياً: ترجم الجمل التالية إلى اللهجة السعودية",
      items: [
        { id: "t1", text: "If he calls me later, I will tell him that I already left." },
        { id: "t2", text: "She didn't read the message because she was watching a video with her friends." },
        { id: "t3", text: "Yesterday, I bought some stuff and then I went to see the new house." },
        { id: "t4", text: "Why are you always playing games instead of doing your homework?", note: "To a male" },
        { id: "t5", text: "Write your name here quickly, then sit over there and listen to me.", note: "To a female" },
        { id: "t6", text: "He said he will go to the market, but he is still sitting at home doing nothing." },
        { id: "t7", text: "I saw the car you bought, but I didn't hear how much it cost." },
        { id: "t8", text: "She walks to work every single day, but today she will take a taxi." },
        { id: "t9", text: "We were talking about the project when he suddenly called us." },
        { id: "t10", text: "Please make me a cup of tea, and don't read what I wrote on the paper.", note: "To a female" },
      ],
    },
    build: {
      title: "3. Build a full sentence of your own",
      ar: "ثالثاً: كوّن جملة كاملة ومتقدمة من إنشائك باستخدام المعطيات التالية",
      items: [
        { id: "b1", verb: "مِشَى", pronoun: "أنا", tense: "الماضي" },
        { id: "b2", verb: "دَقّ", pronoun: "هو", tense: "المضارع" },
        { id: "b3", verb: "سِمِع", pronoun: "هي", tense: "المستقبل" },
        { id: "b4", verb: "تِفَرَّج", pronoun: "أنتِ", tense: "الأمر" },
        { id: "b5", verb: "سَوَّى", pronoun: "هو", tense: "الماضي" },
        { id: "b6", verb: "اِشْتَرَى", pronoun: "أنا", tense: "المستقبل" },
        { id: "b7", verb: "قَرَأ", pronoun: "هي", tense: "المضارع" },
        { id: "b8", verb: "كَتَب", pronoun: "أنتَ", tense: "الأمر" },
        { id: "b9", verb: "لِعِب", pronoun: "هو", tense: "الماضي" },
        { id: "b10", verb: "راح", pronoun: "هي", tense: "المستقبل" },
      ],
    },
  },
];

export const TENSE_EN: Record<string, string> = { "الماضي": "past", "المضارع": "present", "المستقبل": "future", "الأمر": "command" };

/** Every answer field id in a sheet, for progress counting. */
export function fieldIds(h: Homework): string[] {
  return [
    ...h.conj.verbs.flatMap((_, v) => CONJ_ROWS.flatMap((r) => r.persons.map((_, p) => `c${v}-${r.key}-${p}`))),
    ...h.translate.items.map((t) => t.id),
    ...h.build.items.map((b) => b.id),
  ];
}
