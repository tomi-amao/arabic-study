import type { Col, Lesson } from "../types";

// Lesson content, organised by topic. Sourced from the lesson revision sheets.
// Cells in "artr" columns are written "Arabic|transliteration".

const ar = (label: string): Col => ({ label, kind: "ar" });
const tr = (label = "Say it"): Col => ({ label, kind: "tr" });
const tx = (label: string): Col => ({ label, kind: "text" });
const at = (label: string): Col => ({ label, kind: "artr" });

export const lessons: Lesson[] = [
  // ───────────────────────── Pronouns & possession ─────────────────────────
  {
    slug: "pronouns",
    title: "Personal pronouns",
    ar: "الضَّمائِر",
    summary: "I, you, he, she… in spoken Gulf Arabic and Fusha, with the suffix each one turns into.",
    sections: [
      {
        kind: "table",
        title: "The independent pronouns",
        intro:
          "These are the stand-alone words for “I, you, he…”, used as the subject of a sentence. Each one has a matching suffix (last column) that you attach to nouns to mean “my, your, his…”. Learning them as pairs makes both easier to remember.",
        cols: [tx("Meaning"), ar("Gulf (spoken)"), ar("Fusha"), tr("Fusha sound"), ar("Suffix")],
        rows: [
          ["I", "أنا", "أَنَا", "ana", "ـي"],
          ["you (m.)", "إنت", "أَنْتَ", "anta", "ـَك"],
          ["you (f.)", "إنتي", "أَنْتِ", "anti", "ـِك"],
          ["he", "هو", "هُوَ", "huwa", "ـهُ"],
          ["she", "هي", "هِيَ", "hiya", "ـهَا"],
          ["we", "إحنا", "نَحْنُ", "naḥnu", "ـنَا"],
          ["you (pl.)", "إنتوا", "أَنْتُم", "antum", "ـكُم"],
          ["they", "هم", "هُم", "hum", "ـهُم"],
        ],
      },
      {
        kind: "note",
        title: "Subject pronouns vs possessive suffixes",
        text:
          "Your notes grouped “I / you / we / my / their” together. They are two different sets: **I, you, we** are subject pronouns (used with verbs: “I go”), while **my, your, our** are possessive suffixes attached to nouns (“my house”). They look related but do different jobs.",
      },
    ],
    cards: [
      { ar: "أنا", tr: "ana", en: "I" },
      { ar: "إنت", tr: "inta", en: "you (m.)" },
      { ar: "إنتي", tr: "inti", en: "you (f.)" },
      { ar: "هو", tr: "huwa", en: "he" },
      { ar: "هي", tr: "hiya", en: "she" },
      { ar: "إحنا", tr: "iḥna", en: "we" },
      { ar: "إنتوا", tr: "intu", en: "you (pl.)" },
      { ar: "هم", tr: "hum", en: "they" },
    ],
  },
  {
    slug: "possessive-suffixes",
    title: "Possessive suffixes",
    ar: "الضَّمائِر المُتَّصِلَة",
    summary: "“My house, your school, her book”: possession is a short ending stuck onto the noun.",
    sections: [
      {
        kind: "table",
        title: "On بَيْت (house)",
        intro:
          "In Arabic there is no separate word for “my” or “your”. Instead a short suffix is attached to the end of the noun. These are called attached pronouns (الضمائر المتصلة).",
        cols: [ar("Suffix"), ar("Word"), tr(), tx("Meaning")],
        rows: [
          ["ـي", "بَيْتي", "baytī", "my house"],
          ["ـَك", "بَيْتَك", "baytak", "your (m.) house"],
          ["ـِك", "بَيْتِك", "baytik", "your (f.) house"],
          ["ـهُ", "بَيْتُه", "baytuh", "his house"],
          ["ـهَا", "بَيْتُهَا", "baytuhā", "her house"],
          ["ـنَا", "بَيْتُنَا", "baytunā", "our house"],
          ["ـكُم", "بَيْتُكُم", "baytukum", "your (pl.) house"],
          ["ـهُم", "بَيْتُهُم", "baytuhum", "their house"],
        ],
      },
      {
        kind: "note",
        tone: "fix",
        title: "Watch out: “your” (m.) vs “your” (f.)",
        text:
          "Your notes had بيتك = أك for “your (m.)” and بيتك = إك for “your (f.)”. The letter is always ك. The only difference is the short vowel on the ك: a fatha for a man (بَيْتَك, -ak) and a kasra for a woman (بَيْتِك, -ik).",
      },
      {
        kind: "table",
        title: "On مَدْرَسَة (school)",
        intro:
          "مدرسة ends in ة (tāʾ marbūṭa). When a suffix is added, the ة is pronounced as a regular ت, so it becomes madrasat- + suffix, not madrasa- + suffix.",
        cols: [ar("Suffix"), ar("Word"), tr(), tx("Meaning")],
        rows: [
          ["ـي", "مَدْرَسَتي", "madrasatī", "my school"],
          ["ـَك", "مَدْرَسَتَك", "madrasatak", "your (m.) school"],
          ["ـِك", "مَدْرَسَتِك", "madrasatik", "your (f.) school"],
          ["ـهُ", "مَدْرَسَتُه", "madrasatuh", "his school"],
          ["ـهَا", "مَدْرَسَتُهَا", "madrasatuhā", "her school"],
          ["ـنَا", "مَدْرَسَتُنَا", "madrasatunā", "our school"],
          ["ـكُم", "مَدْرَسَتُكُم", "madrasatukum", "your (pl.) school"],
          ["ـهُم", "مَدْرَسَتُهُم", "madrasatuhum", "their school"],
        ],
      },
      {
        kind: "phrases",
        title: "Same suffixes, more nouns",
        intro: "The suffixes work on any noun.",
        items: [
          { ar: "كِتاب", tr: "kitāb", en: "book" },
          { ar: "كِتابي", tr: "kitābī", en: "my book" },
          { ar: "كِتابَك", tr: "kitābak", en: "your (m.) book" },
          { ar: "كِتابها", tr: "kitābhā", en: "her book" },
          { ar: "سَيّارَة", tr: "sayyāra", en: "car" },
          { ar: "سَيّارَتي", tr: "sayyāratī", en: "my car" },
          { ar: "سَيّارَتِك", tr: "sayyāratik", en: "your (f.) car" },
          { ar: "سَيّارَتْهُم", tr: "sayyārathum", en: "their car" },
          { ar: "اِسْم", tr: "ism", en: "name" },
          { ar: "اِسْمي", tr: "ismī", en: "my name" },
          { ar: "اِسْمَك / اِسْمِك", tr: "ismak / ismik", en: "your name (m. / f.)" },
          { ar: "اِسْمُه / اِسْمُها", tr: "ismuh / ismuhā", en: "his / her name" },
        ],
      },
      {
        kind: "phrases",
        title: "In sentences",
        items: [
          { ar: "اِسْمي أَحْمَد", tr: "ismī Aḥmad", en: "My name is Ahmad." },
          { ar: "ما اِسْمُك؟", tr: "mā ismuk(a/i)?", en: "What is your name?" },
        ],
      },
      {
        kind: "tips",
        items: [
          "ـي (-ī) for “my” attaches straight onto the noun with no extra vowel.",
          "For the other suffixes the noun usually takes a short u vowel before the suffix, unless it already ends in a vowel: بيتُه، بيتُكم.",
          "A noun ending in ة turns it into ت before any suffix: مدرسة → مدرستي.",
          "Masculine “your” (ـَك) uses a fatha, feminine “your” (ـِك) uses a kasra. Same letter ك, different vowel.",
          "The same suffixes attach to verbs too, but there they mean the object (“he saw me”). That is a later topic.",
        ],
      },
    ],
  },
  {
    slug: "gendered-nouns",
    title: "Suffixes on male & female nouns",
    ar: "مُذَكَّر وَمُؤَنَّث",
    summary: "My friend (m.) vs my friend (f.): two genders at once, the noun's and the owner's.",
    sections: [
      {
        kind: "table",
        title: "صَديق (male friend) and صَديقَة (female friend)",
        intro:
          "“House” has no natural gender to worry about, but “friend” does: Arabic has one word for a male friend and another for a female friend. The suffixes are the same; the feminine noun just turns its ة into ت first.",
        cols: [ar("Suffix"), at("Male friend"), at("Female friend"), tx("Meaning")],
        rows: [
          ["ـي", "صَديقي|ṣadīqī", "صَديقَتي|ṣadīqatī", "my friend"],
          ["ـَك", "صَديقَك|ṣadīqak", "صَديقَتَك|ṣadīqatak", "your (m.) friend"],
          ["ـِك", "صَديقِك|ṣadīqik", "صَديقَتِك|ṣadīqatik", "your (f.) friend"],
          ["ـهُ", "صَديقُه|ṣadīquh", "صَديقَتُه|ṣadīqatuh", "his friend"],
          ["ـهَا", "صَديقُها|ṣadīquhā", "صَديقَتُها|ṣadīqatuhā", "her friend"],
          ["ـنَا", "صَديقُنا|ṣadīqunā", "صَديقَتُنا|ṣadīqatunā", "our friend"],
          ["ـهُم", "صَديقُهُم|ṣadīquhum", "صَديقَتُهُم|ṣadīqatuhum", "their friend"],
        ],
      },
      {
        kind: "note",
        title: "Two genders, two jobs",
        text:
          "The shape of the noun (صديق vs صديقة) tells you the gender of **the friend**. The suffix (ـه vs ـها) tells you the gender of **the owner**. They are completely independent, which is why the four combinations below are worth learning on their own.",
      },
      {
        kind: "table",
        title: "The four combinations",
        cols: [tx(""), at("Owned by him"), at("Owned by her")],
        rows: [
          ["friend is male (صديق)", "صَديقُه|ṣadīquh", "صَديقُها|ṣadīquhā"],
          ["friend is female (صديقة)", "صَديقَتُه|ṣadīqatuh", "صَديقَتُها|ṣadīqatuhā"],
          ["student is male (طالِب)", "طالِبُه|ṭālibuh", "طالِبُها|ṭālibuhā"],
          ["student is female (طالِبَة)", "طالِبَتُه|ṭālibatuh", "طالِبَتُها|ṭālibatuhā"],
        ],
      },
      {
        kind: "phrases",
        title: "Practise the combinations",
        items: [
          { ar: "صَديقُه", tr: "ṣadīquh", en: "his (male) friend" },
          { ar: "صَديقُها", tr: "ṣadīquhā", en: "her (male) friend" },
          { ar: "صَديقَتُه", tr: "ṣadīqatuh", en: "his female friend" },
          { ar: "صَديقَتُها", tr: "ṣadīqatuhā", en: "her female friend" },
          { ar: "طالِبُه", tr: "ṭālibuh", en: "his (male) student" },
          { ar: "طالِبَتُها", tr: "ṭālibatuhā", en: "her female student" },
        ],
      },
      {
        kind: "table",
        title: "أُمّ (mother)",
        cols: [ar("Suffix"), ar("Word"), tr(), tx("Meaning")],
        rows: [
          ["ـي", "أُمّي", "ummī", "my mother"],
          ["ـهُ", "أُمُّه", "ummuh", "his mother"],
          ["ـهَا", "أُمُّها", "ummuhā", "her mother"],
        ],
      },
      {
        kind: "note",
        title: "Why أُمّي has a double م",
        text:
          "أُمّ (umm) already has a doubled م built into the word, so “my mother” is أُمّي (ummī). The doubling is part of the noun, not the suffix.",
      },
      {
        kind: "tips",
        items: [
          "For any “his / her X”, ask two separate questions: what gender is X? (صديق vs صديقة) and whose is it? (ـه vs ـها).",
          "Every feminine noun ending in ة behaves like مدرسة: the ة becomes ت as soon as a suffix is attached.",
          "The same 2×2 logic works for any human noun with a male/female pair: طالب / طالبة (student), معلّم / معلّمة (teacher), جار / جارة (neighbour).",
        ],
      },
    ],
  },

  // ───────────────────────── Prepositions ─────────────────────────
  {
    slug: "prepositions",
    title: "Prepositions",
    ar: "حُروف الجَرّ",
    summary: "In, on, from, to, with, under, behind… and where they go in a sentence.",
    sections: [
      {
        kind: "table",
        title: "The core prepositions",
        intro:
          "Prepositions are short words placed before a noun to show place, direction or possession. At your level the main thing to know is that a pronoun after a preposition takes the attached suffixes (see the next lesson).",
        cols: [ar("Arabic"), tr(), tx("Meaning"), ar("Example"), tx("")],
        rows: [
          ["فِي", "fī", "in, at", "البَيْتُ فِي لَنْدَن", "the house is in London"],
          ["عَلَى", "ʿalā", "on, upon", "الكِتابُ عَلَى الطّاوِلَة", "the book is on the table"],
          ["مِنْ", "min", "from", "أَنا مِنْ لَنْدَن", "I am from London"],
          ["إِلَى", "ilā", "to, towards", "أَذْهَبُ إِلَى المَدْرَسَة", "I go to school"],
          ["مَعَ", "maʿa", "with", "أَنا مَعَ أَخِي", "I am with my brother"],
          ["عِنْدَ", "ʿinda", "at, by (also “to have”)", "أَنا عِنْدَ البَيْت", "I am at the house"],
          ["لِـ", "li-", "for, belonging to", "هَذَا الكِتابُ لِأَحْمَد", "this book is for / belongs to Ahmad"],
          ["بِـ", "bi-", "with, by, using", "أَكْتُبُ بِالقَلَم", "I write with the pen"],
        ],
      },
      {
        kind: "note",
        title: "لِـ and بِـ are prefixes",
        text:
          "Unlike the others, these two attach directly to the front of the next word with no space: لِأحمد (li-Aḥmad), بِالقلم (bi-l-qalam). It is the mirror image of how possessive suffixes attach to the end of a noun.",
      },
      {
        kind: "table",
        title: "Location words",
        cols: [ar("Arabic"), tr(), tx("Meaning"), ar("Example"), tx("")],
        rows: [
          ["تَحْتَ", "taḥta", "under", "القِطَّةُ تَحْتَ الطّاوِلَة", "the cat is under the table"],
          ["فَوْقَ", "fawqa", "above, on top of", "الطّائِرَةُ فَوْقَ المَدِينَة", "the plane is above the city"],
          ["أَمامَ", "amāma", "in front of", "هُوَ أَمامَ البَيْت", "he is in front of the house"],
          ["وَراءَ / خَلْفَ", "warāʾa / khalfa", "behind", "الحَدِيقَةُ خَلْفَ المَدْرَسَة", "the garden is behind the school"],
          ["بَيْنَ", "bayna", "between", "البَنْكُ بَيْنَ البَيْتِ وَالمَدْرَسَة", "the bank is between the house and the school"],
          ["بِجانِبِ / قُرْبَ", "bijānibi / qurba", "next to, near", "المَحَلُّ قُرْبَ البَيْت", "the shop is near the house"],
        ],
      },
      {
        kind: "phrases",
        title: "Practice sentences",
        items: [
          { ar: "الكِتابُ فِي الحَقِيبَة", en: "The book is in the bag." },
          { ar: "القَلَمُ عَلَى الكُرْسِي", en: "The pen is on the chair." },
          { ar: "هِيَ تَذْهَبُ مَعِي", en: "She is going with me." },
          { ar: "جِئْتُ مِنَ المَدْرَسَة", en: "I came from school." },
          { ar: "هَذَا لَكَ", en: "This is for you (m.)." },
          { ar: "هَلْ عِنْدَكِ قَلَم؟", en: "Do you (f.) have a pen?" },
        ],
      },
      {
        kind: "note",
        title: "Check this list with your teacher",
        text:
          "This sheet was built without your exact lesson notes, so it covers the most common prepositions. Example sentences here are in Fusha. If your teacher covered a different set, or uses Gulf forms, follow the class.",
      },
      {
        kind: "tips",
        items: [
          "A noun after a preposition goes into the genitive (majrūr) case. At your level this mostly just means “it comes right after the preposition”; case endings are a later topic.",
          "لـ and بـ attach with no space; all the others (في، على، من، إلى، مع، عند) are separate words.",
        ],
      },
    ],
    cards: [
      { ar: "فِي", tr: "fī", en: "in, at" },
      { ar: "عَلَى", tr: "ʿalā", en: "on, upon" },
      { ar: "مِنْ", tr: "min", en: "from" },
      { ar: "إِلَى", tr: "ilā", en: "to, towards" },
      { ar: "مَعَ", tr: "maʿa", en: "with" },
      { ar: "عِنْدَ", tr: "ʿinda", en: "at, by (also “to have”)" },
      { ar: "لِـ", tr: "li-", en: "for, belonging to" },
      { ar: "بِـ", tr: "bi-", en: "with, by, using" },
      { ar: "تَحْتَ", tr: "taḥta", en: "under" },
      { ar: "فَوْقَ", tr: "fawqa", en: "above, on top of" },
      { ar: "أَمامَ", tr: "amāma", en: "in front of" },
      { ar: "خَلْفَ", tr: "khalfa", en: "behind" },
      { ar: "بَيْنَ", tr: "bayna", en: "between" },
      { ar: "قُرْبَ", tr: "qurba", en: "near" },
    ],
  },
  {
    slug: "prepositions-with-pronouns",
    title: "With me, for you, about her",
    ar: "مَعِي · عِنْدِي · لِي · عَنِّي",
    summary: "Prepositions + the possessive suffixes, including عِنْدِي, Arabic's way of saying “I have”.",
    sections: [
      {
        kind: "table",
        title: "مَعَ · عِنْدَ · لِـ · عَن + suffix",
        intro:
          "Just like بيت becomes بيتي (“my house”), prepositions take the same suffixes to mean “with me, at me, for me, about me”. These combinations come up constantly in everyday speech.",
        cols: [tx("Person"), at("مَعَ with"), at("عِنْدَ at / have"), at("لِـ for"), at("عَن about")],
        rows: [
          ["me", "مَعِي|maʿī", "عِنْدِي|ʿindī", "لِي|lī", "عَنِّي|ʿannī"],
          ["you (m.)", "مَعَك|maʿaka", "عِنْدَك|ʿindaka", "لَك|laka", "عَنْك|ʿanka"],
          ["you (f.)", "مَعِك|maʿaki", "عِنْدَكِ|ʿindaki", "لَكِ|laki", "عَنْكِ|ʿanki"],
          ["him", "مَعَهُ|maʿahu", "عِنْدَهُ|ʿindahu", "لَهُ|lahu", "عَنْهُ|ʿanhu"],
          ["her", "مَعَهَا|maʿahā", "عِنْدَهَا|ʿindahā", "لَهَا|lahā", "عَنْهَا|ʿanhā"],
          ["us", "مَعَنَا|maʿanā", "عِنْدَنَا|ʿindanā", "لَنَا|lanā", "عَنَّا|ʿannā"],
          ["you (pl.)", "مَعَكُم|maʿakum", "عِنْدَكُم|ʿindakum", "لَكُم|lakum", "عَنْكُم|ʿankum"],
          ["them", "مَعَهُم|maʿahum", "عِنْدَهُم|ʿindahum", "لَهُم|lahum", "عَنْهُم|ʿanhum"],
        ],
      },
      {
        kind: "note",
        tone: "fix",
        title: "Watch out: لَك vs لِك",
        text:
          "You wrote لَك for “for you (m.)”, which is correct, but لِك for “for you (f.)”. The لـ keeps its fatha once a suffix is attached; it is the ك that changes vowel: لَكَ (m.) vs لَكِ (f.). Same rule as بيتَك / بيتِك.",
      },
      {
        kind: "note",
        tone: "fix",
        title: "Watch out: عِنْدَكِ",
        text:
          "You wrote عندكِ with the kasra on the د. It should be عِنْدَكِ: the د keeps its fatha (from ʿinda) and the kasra goes on the ك. Exactly the same fix as لَكِ.",
      },
      {
        kind: "note",
        tone: "fix",
        title: "Watch out: no shadda on “about you”",
        text:
          "You added a shadda to “about you” (عنّك). Doubling only happens with ـي (عَنِّي, “about me”) and ـنا (عَنَّا, “about us”), because عن already ends in ن and those two suffixes start with it. So “about you” is simply عَنْك / عَنْكِ.",
      },
      {
        kind: "note",
        title: "A few irregulars",
        text:
          "On its own لـ has a kasra (لِـ), but with a suffix it switches to a fatha: لَك، لَه، لَها. “For me” is simply لي. And في + “me” becomes فِيّ (fiyya) rather than the expected فيي. High-frequency words like these are usually memorised as set phrases.",
      },
      {
        kind: "phrases",
        title: "عِنْدَ: how Arabic says “to have”",
        intro: "Arabic has no verb “to have”. Instead عند + suffix is used, literally “at me (is)…”.",
        items: [
          { ar: "عِنْدِي سَيّارَة", tr: "ʿindī sayyāra", en: "I have a car. (lit. “at-me a car”)" },
          { ar: "عِنْدَك وَقْت؟", tr: "ʿindak waqt?", en: "Do you (m.) have time?" },
          { ar: "لَيْسَ عِنْدِي فُلوس", tr: "laysa ʿindī fulūs", en: "I don't have money. (لَيْسَ = not)" },
        ],
      },
      {
        kind: "phrases",
        title: "Putting it together",
        items: [
          { ar: "مِين عِنْدَك؟", tr: "mīn ʿindak?", en: "Who do you have (with you)?" },
          { ar: "وِين هُوَ؟", tr: "wēn huwa?", en: "Where is he?" },
          { ar: "هَذَا لَك", tr: "hādha lak", en: "This is for you." },
          { ar: "لِيش عَنِّي؟", tr: "lēsh ʿannī?", en: "Why (are you asking) about me?" },
          { ar: "كَم عِنْدَك؟", tr: "kam ʿindak?", en: "How many do you have?" },
          { ar: "أَيّ واحِد لَهَا؟", tr: "ayy wāḥid lahā?", en: "Which one is for her?" },
        ],
      },
      {
        kind: "tips",
        items: [
          "The vowel that changes between “you (m.)” and “you (f.)” always sits on the final letter of the suffix (usually ك), never earlier in the word.",
          "A shadda after عن and من only appears with ـي (me) and ـنا (us).",
          "عندي / عندك / عنده… is one of the most-used patterns in daily speech. Learn it as its own mini set.",
        ],
      },
    ],
    cards: [
      { ar: "مَعِي", tr: "maʿī", en: "with me" },
      { ar: "مَعَك", tr: "maʿak", en: "with you (m.)" },
      { ar: "مَعَهُ", tr: "maʿahu", en: "with him" },
      { ar: "عِنْدِي", tr: "ʿindī", en: "I have" },
      { ar: "عِنْدَك", tr: "ʿindak", en: "you (m.) have" },
      { ar: "عِنْدَكِ", tr: "ʿindaki", en: "you (f.) have" },
      { ar: "عِنْدَهُ", tr: "ʿindahu", en: "he has" },
      { ar: "عِنْدَهَا", tr: "ʿindahā", en: "she has" },
      { ar: "عِنْدَنَا", tr: "ʿindanā", en: "we have" },
      { ar: "عِنْدَهُم", tr: "ʿindahum", en: "they have" },
      { ar: "لِي", tr: "lī", en: "for me" },
      { ar: "لَكِ", tr: "laki", en: "for you (f.)" },
      { ar: "لَهَا", tr: "lahā", en: "for her" },
      { ar: "لَهُم", tr: "lahum", en: "for them" },
      { ar: "عَنِّي", tr: "ʿannī", en: "about me" },
      { ar: "عَنْك", tr: "ʿank", en: "about you (m.)" },
      { ar: "عَنَّا", tr: "ʿannā", en: "about us" },
      { ar: "عَنْهُم", tr: "ʿanhum", en: "about them" },
    ],
  },

  // ───────────────────────── Questions ─────────────────────────
  {
    slug: "question-words",
    title: "Question words",
    ar: "أَدَوات الاِسْتِفْهام",
    summary: "Who, what, where, when, why, how, how much, which: the spoken forms, with Fusha for reference.",
    sections: [
      {
        kind: "table",
        title: "Question words",
        intro:
          "Your lessons teach the spoken (colloquial) forms, which are what you will hear in conversation. The formal Fusha forms are kept for reference only, since you will meet them in writing.",
        cols: [tx("Meaning"), at("Spoken"), at("Fusha"), ar("Example"), tx("")],
        rows: [
          ["who", "مِين|mīn", "مَن|man", "مِين هَذَا؟", "Who is this?"],
          ["what", "وش / ايش|wesh / ēsh", "ماذا / ما|mādhā / mā", "ايش اِسْمَك؟", "What's your name?"],
          ["where", "وِين|wēn", "أَيْنَ|ayna", "وِين البَيْت؟", "Where's the house?"],
          ["when", "مَتى|matā", "—", "مَتى تَرْجَع؟", "When are you coming back?"],
          ["why", "لِيش|lēsh", "لِماذا|limādhā", "لِيش؟", "Why?"],
          ["how", "كِيف|kīf", "—", "كِيف الحال؟", "How are you?"],
          ["how much / many", "كَم|kam", "—", "كَم السّاعَة؟", "What time is it? (lit. “how much is the clock”)"],
          ["which", "أَيّ|ayy", "—", "أَيّ كِتاب تُرِيد؟", "Which book do you want?"],
        ],
      },
      {
        kind: "note",
        title: "Why so many words for “what”?",
        text:
          "وش (wesh) is the typical Gulf / Saudi word. ايش (ēsh) is widely understood across many dialects. ـش is a shortened form glued onto the next word: شِسْمَك؟ (shismak?) squeezes ايش + اسمك into “what's your name?”. Ask your teacher which one they prefer.",
      },
      {
        kind: "tips",
        items: [
          "A dash in the Fusha column means the word is the same in both.",
          "كم does double duty: “how much / how many”, and asking the time (كم الساعة؟).",
          "Combine with time words: إمتى الاجتماع؟ (When is the meeting?) or من الساعة كم؟ (From what time?).",
        ],
      },
    ],
    cards: [
      { ar: "مِين", tr: "mīn", en: "who", fusha: "مَن" },
      { ar: "وش", tr: "wesh", en: "what (Gulf)", fusha: "ماذا" },
      { ar: "ايش", tr: "ēsh", en: "what", fusha: "ماذا" },
      { ar: "وِين", tr: "wēn", en: "where", fusha: "أَيْنَ" },
      { ar: "مَتى", tr: "matā", en: "when" },
      { ar: "لِيش", tr: "lēsh", en: "why", fusha: "لِماذا" },
      { ar: "كِيف", tr: "kīf", en: "how" },
      { ar: "كَم", tr: "kam", en: "how much / how many" },
      { ar: "أَيّ", tr: "ayy", en: "which" },
      { ar: "مِين هَذَا؟", tr: "mīn hādha?", en: "Who is this?" },
      { ar: "ايش اِسْمَك؟", tr: "ēsh ismak?", en: "What's your name?" },
      { ar: "وِين البَيْت؟", tr: "wēn el-bayt?", en: "Where's the house?" },
      { ar: "مَتى تَرْجَع؟", tr: "matā tarjaʿ?", en: "When are you coming back?" },
      { ar: "كِيف الحال؟", tr: "kīf el-ḥāl?", en: "How are you?" },
      { ar: "كَم السّاعَة؟", tr: "kam es-sāʿa?", en: "What time is it?" },
      { ar: "أَيّ كِتاب تُرِيد؟", tr: "ayy kitāb turīd?", en: "Which book do you want?" },
    ],
  },

  // ───────────────────────── Time ─────────────────────────
  {
    slug: "time-words",
    title: "Time words & the dual",
    ar: "مُفْرَد · مُثَنّى · جَمْع",
    summary: "Day, week, month, year in singular, “two of” and plural, plus yesterday, today, tomorrow.",
    sections: [
      {
        kind: "table",
        title: "Singular, dual and plural",
        intro:
          "Arabic marks exactly two of something differently from three or more. The dual is formed by adding ـين to the singular (or ـتين if the noun ends in ة). The plural (3 and above) is usually an unpredictable “broken plural” that you learn per word.",
        cols: [at("Singular"), at("Two (dual)"), at("Plural (3–10)"), tx("Meaning")],
        rows: [
          ["يَوْم|yōm", "يَوْمَين|yōmēn", "أَيّام|ayyām", "day"],
          ["أُسْبوع|usbūʿ", "أُسْبوعَين|usbūʿēn", "أَسابيع|asābīʿ", "week"],
          ["شَهْر|shahr", "شَهْرَين|shahrēn", "شُهور|shuhūr", "month"],
          ["سَنَة|sana", "سَنَتَين|sanatēn", "سَنَوات / سِنِين|sanawāt / sinīn", "year"],
          ["ساعَة|sāʿa", "ساعَتَين|sāʿatēn", "ساعات|sāʿāt", "hour"],
          ["دَقِيقَة|daqīqa", "دَقِيقَتَين|daqīqatēn", "دَقايِق|daqāyiq", "minute"],
        ],
      },
      {
        kind: "note",
        title: "Two forms for “years”",
        text:
          "Both سَنَوات and سِنِين mean “years”. سنوات sounds more standard, while سنين is very common in speech (صار سنين, “it's been years”). دقايق is the everyday spoken plural of “minutes”; in formal writing you may see دقائق.",
      },
      {
        kind: "table",
        title: "Talking about when",
        cols: [ar("Arabic"), tr(), tx("Meaning")],
        rows: [
          ["أَمْس", "ams", "yesterday"],
          ["اليَوْم", "el-yōm", "today"],
          ["بُكْرَة", "bukra", "tomorrow"],
          ["قَبْل", "qabl", "before"],
          ["بَعْد", "baʿd", "after"],
          ["إللي فات", "illi fāt", "last (lit. “the one that passed”)"],
          ["الجاي", "el-jāy", "next (lit. “the one coming”)"],
        ],
      },
      {
        kind: "note",
        title: "إللي فات and الجاي go after the noun",
        text:
          "They come after the time word, the reverse of English: الأسبوع إللي فات (“the week that passed”) = last week, and الأسبوع الجاي (“the week that's coming”) = next week.",
      },
      {
        kind: "tips",
        items: [
          "The dual (ـين / ـتين) is completely regular: once you know the singular, you know the dual.",
          "Plurals like أيام، أسابيع، شهور have to be memorised, the way English has “mouse → mice”.",
        ],
      },
    ],
    cards: [
      { ar: "يَوْم", tr: "yōm", en: "day" },
      { ar: "يَوْمَين", tr: "yōmēn", en: "two days" },
      { ar: "أَيّام", tr: "ayyām", en: "days" },
      { ar: "أُسْبوع", tr: "usbūʿ", en: "week" },
      { ar: "أُسْبوعَين", tr: "usbūʿēn", en: "two weeks" },
      { ar: "أَسابيع", tr: "asābīʿ", en: "weeks" },
      { ar: "شَهْر", tr: "shahr", en: "month" },
      { ar: "شَهْرَين", tr: "shahrēn", en: "two months" },
      { ar: "شُهور", tr: "shuhūr", en: "months" },
      { ar: "سَنَة", tr: "sana", en: "year" },
      { ar: "سَنَتَين", tr: "sanatēn", en: "two years" },
      { ar: "سِنِين", tr: "sinīn", en: "years" },
      { ar: "ساعَة", tr: "sāʿa", en: "hour" },
      { ar: "ساعَتَين", tr: "sāʿatēn", en: "two hours" },
      { ar: "دَقِيقَة", tr: "daqīqa", en: "minute" },
      { ar: "دَقايِق", tr: "daqāyiq", en: "minutes" },
      { ar: "أَمْس", tr: "ams", en: "yesterday" },
      { ar: "اليَوْم", tr: "el-yōm", en: "today" },
      { ar: "بُكْرَة", tr: "bukra", en: "tomorrow" },
      { ar: "قَبْل", tr: "qabl", en: "before" },
      { ar: "بَعْد", tr: "baʿd", en: "after" },
      { ar: "الأُسْبوع إللي فات", tr: "el-usbūʿ illi fāt", en: "last week" },
      { ar: "الأُسْبوع الجاي", tr: "el-usbūʿ el-jāy", en: "next week" },
    ],
  },
  {
    slug: "days-and-times",
    title: "Days & times of day",
    ar: "أَيّام الأُسْبوع",
    summary: "Morning to night, the days of the week, and how to say “at eight in the morning”.",
    sections: [
      {
        kind: "table",
        title: "Parts of the day",
        intro:
          "Arabic splits the day into named periods. Several (ظهر، عصر، مغرب، عشا) come from the prayer times and are used constantly to say roughly when something happens.",
        cols: [ar("Arabic"), tr(), tx("Roughly"), tx("Meaning")],
        rows: [
          ["صَباح", "ṣabāḥ", "", "morning"],
          ["ظُهْر", "ẓuhr", "11–2", "midday / noon"],
          ["عَصْر", "ʿaṣr", "3–5", "afternoon"],
          ["مَغْرِب", "maghrib", "6–7", "sunset / early evening"],
          ["عِشا", "ʿisha", "8 onward", "night / evening"],
          ["مَساء", "masāʾ", "", "evening (general term)"],
          ["لَيْل", "layl", "", "night (general term)"],
        ],
      },
      {
        kind: "note",
        tone: "fix",
        title: "Watch out: مساء is not a heading",
        text:
          "Your notes bracketed ظهر / عصر / مغرب / عشا underneath مساء as if they were kinds of “evening”. They are separate slots covering the afternoon through the night. مساء is a general word for “evening” used on its own (مساء الخير, “good evening”). Think of صباح and مساء as the two broad halves of the day, and ظهر / عصر / مغرب / عشا / ليل as the specific slots for telling time.",
      },
      {
        kind: "days",
        title: "Days of the week",
        intro:
          "The Arabic week runs Saturday to Friday, with Friday (الجمعة) the day of congregational prayer. Most day names are just numbered (“the first”, “the second”…).",
        items: [
          { ar: "السَّبْت", tr: "es-sabt", en: "Saturday" },
          { ar: "الأَحَد", tr: "el-aḥad", en: "Sunday" },
          { ar: "الإثْنَين", tr: "el-ithnēn", en: "Monday" },
          { ar: "الثَّلاثاء", tr: "eth-thalāthāʾ", en: "Tuesday" },
          { ar: "الأَرْبِعاء", tr: "el-arbaʿāʾ", en: "Wednesday" },
          { ar: "الخَمِيس", tr: "el-khamīs", en: "Thursday" },
          { ar: "الجُمْعَة", tr: "el-jumʿa", en: "Friday" },
        ],
      },
      {
        kind: "phrases",
        title: "Saying a time",
        intro:
          "The pattern is الساعة + number + time of day, and it goes at the end of the sentence, the same position as in English.",
        items: [
          { ar: "أَشوفَك بُكْرَة السّاعَة ثَمانْيَة الصَّباح", tr: "ashūfak bukra es-sāʿa thamānya eṣ-ṣabāḥ", en: "I'll see you tomorrow at eight in the morning." },
          { ar: "أَشوفَك", tr: "ashūfak", en: "I'll see you (m.)" },
          { ar: "السّاعَة", tr: "es-sāʿa", en: "the hour / o'clock" },
          { ar: "ثَمانْيَة", tr: "thamānya", en: "eight" },
          { ar: "الصَّباح", tr: "eṣ-ṣabāḥ", en: "the morning" },
        ],
      },
    ],
    cards: [
      { ar: "صَباح", tr: "ṣabāḥ", en: "morning" },
      { ar: "ظُهْر", tr: "ẓuhr", en: "midday / noon" },
      { ar: "عَصْر", tr: "ʿaṣr", en: "afternoon" },
      { ar: "مَغْرِب", tr: "maghrib", en: "sunset / early evening" },
      { ar: "عِشا", tr: "ʿisha", en: "night / evening (after 8)" },
      { ar: "مَساء", tr: "masāʾ", en: "evening (general)" },
      { ar: "لَيْل", tr: "layl", en: "night (general)" },
    ],
  },

  // ───────────────────────── Verbs (grammar) ─────────────────────────
  {
    slug: "how-verbs-work",
    title: "How verbs work",
    ar: "الماضي · المُضارِع · المُسْتَقْبَل · الأَمْر",
    summary: "Past, present, future and command; the present-tense prefixes; قاعد for “-ing” and راح for “will”.",
    sections: [
      {
        kind: "table",
        title: "The four forms at a glance",
        intro: "Using كتب (to write) as the model verb, “he”:",
        cols: [tx("Form"), ar("Arabic"), tr(), tx("Meaning")],
        rows: [
          ["Past (الماضي)", "كَتَب", "katab", "he wrote"],
          ["Present (المضارع)", "يِكْتُب", "yiktib", "he writes / is writing"],
          ["Future (المستقبل)", "راح يِكْتُب", "raḥ yiktib", "he will write"],
          ["Command (الأمر)", "اُكْتُب", "uktub!", "write! (to a man)"],
        ],
      },
      {
        kind: "note",
        title: "The big picture",
        text:
          "The past changes the **end** of the verb depending on who did it. The present changes the **beginning** (and sometimes the end). The future just puts راح in front of the present. The command is a trimmed-down version of the present.",
      },
      {
        kind: "table",
        title: "Present-tense prefixes",
        intro: "Shown with كتب (write) and راح (go):",
        cols: [ar("Pronoun"), ar("Prefix"), at("“write”"), at("“go”"), tx("Meaning")],
        rows: [
          ["أنا", "أَـ", "أَكْتُب|aktub", "أَروح|arūḥ", "I write / go"],
          ["إنت", "تِـ", "تِكْتُب|tiktib", "تَروح|tarūḥ", "you (m.) write / go"],
          ["إنتي", "تِـ … ين", "تِكْتُبين|tiktibīn", "تَروحين|tarūḥīn", "you (f.) write / go"],
          ["هو", "يِـ", "يِكْتُب|yiktib", "يَروح|yarūḥ", "he writes / goes"],
          ["هي", "تِـ", "تِكْتُب|tiktib", "تَروح|tarūḥ", "she writes / goes"],
          ["إحنا", "نِـ", "نِكْتُب|niktib", "نَروح|narūḥ", "we write / go"],
          ["إنتوا", "تِـ … ون", "تِكْتُبون|tiktibūn", "تَروحون|tarūḥūn", "you (pl.) write / go"],
          ["هم", "يِـ … ون", "يِكْتُبون|yiktibūn", "يَروحون|yarūḥūn", "they write / go"],
        ],
      },
      {
        kind: "note",
        title: "Note the overlap",
        text:
          "“You (m.)” and “she” share the same prefix تـ; context tells them apart. “You (f.)” and the plurals add an ending on top of the prefix.",
      },
      {
        kind: "note",
        tone: "fix",
        title: "Your teacher's endings: ـين and ـون",
        text:
          "Your first verb sheet showed the short endings تكتبي / يكتبوا. Your later notes use the fuller ـين (you f.) and ـون (you pl., they): تكتبين، يكتبون. These are the normal Gulf and Saudi forms; the short ones are Levantine / Egyptian. Both are understood, but follow your teacher.",
      },
      {
        kind: "phrases",
        title: "قاعِد: happening right now (“-ing”)",
        intro:
          "قاعد (literally “sitting”) before a present-tense verb marks an action in progress. Unlike the verb itself, قاعد changes to match the speaker's gender and number.",
        items: [
          { ar: "قاعِد أَكْتُب", tr: "qāʿid aktub", en: "I'm writing (male speaker)" },
          { ar: "قاعْدَة أَكْتُب", tr: "qāʿda aktub", en: "I'm writing (female speaker)" },
          { ar: "قاعِد يِكْتُب", tr: "qāʿid yiktib", en: "He's writing" },
          { ar: "قاعْدِين نِكْتُب", tr: "qāʿdīn niktib", en: "We're writing" },
        ],
      },
      {
        kind: "phrases",
        title: "راح: “will” (future)",
        intro: "راح (or the shorter رح) goes in front of the present-tense verb. Unlike قاعد it never changes form.",
        items: [
          { ar: "راح أَكْتُب", tr: "raḥ aktub", en: "I will write" },
          { ar: "راح تِكْتُب", tr: "raḥ tiktib", en: "You (m.) will write" },
          { ar: "راح يِكْتُب", tr: "raḥ yiktib", en: "He will write" },
        ],
      },
      {
        kind: "note",
        tone: "fix",
        title: "Watch out: بـ is not the same as راح",
        text:
          "Your notes grouped راح and بـ together under “will”. بـ attaches straight onto the present verb (بِكْتُب, baktub) and marks the habitual present: “I do / I regularly do”. With a time word (بروح بكرة, “I'm going tomorrow”) your teacher uses it for plans too, but راح is the one that clearly means “will”.",
      },
      {
        kind: "table",
        title: "The command form (الأمر)",
        intro: "Commands are built from the present-tense “you” forms by dropping the تـ prefix (adding a short helper vowel at the front if needed).",
        cols: [ar("From “you”"), ar("Command"), tr(), tx("Meaning")],
        rows: [
          ["تِكْتُب", "اُكْتُب", "uktub!", "write! (m.)"],
          ["تِكْتُبين", "اُكْتُبي", "uktubi!", "write! (f.)"],
          ["تِكْتُبون", "اُكْتُبوا", "uktubu!", "write! (pl.)"],
          ["تَروح", "روح", "rūḥ!", "go! (m.)"],
        ],
      },
      {
        kind: "phrases",
        title: "Putting it together",
        items: [
          { ar: "اُكْتُب اِسْمَك هِنا", tr: "uktub ismak hina", en: "Write your (m.) name here." },
          { ar: "صَديقي راح يِجي بُكْرَة السّاعَة ثَمانْيَة الصَّباح", tr: "ṣadīqī raḥ yiji bukra es-sāʿa thamānya eṣ-ṣabāḥ", en: "My friend will come tomorrow at eight in the morning." },
          { ar: "هِيَ قاعْدَة تِدْرُس بِالمَدْرَسَة", tr: "hiya qāʿda tidrus bil-madrasa", en: "She is studying at school (right now)." },
        ],
      },
      {
        kind: "note",
        title: "Bonus: roots",
        text:
          "تدرس (“studies”) and مدرسة (“school”) share the root د-ر-س. A school is literally “a place of studying”.",
      },
      {
        kind: "table",
        title: "The same endings on your other verbs",
        intro: "The ـين / ـون pattern applied to the verbs from your lessons (other persons unchanged):",
        cols: [at("Verb"), at("you (f.)"), at("you (pl.)"), at("they")],
        rows: [
          ["كَتَب|write", "تِكْتِبين|tiktibīn", "تِكْتِبون|tiktibūn", "يِكْتِبون|yiktibūn"],
          ["شاف|see", "تِشوفين|tishūfīn", "تِشوفون|tishūfūn", "يِشوفون|yishūfūn"],
          ["راح|go", "تِروحين|tirūḥīn", "تِروحون|tirūḥūn", "يِروحون|yirūḥūn"],
          ["سَوّى|do / make", "تِسَوّين|tsawwīn", "تِسَوّون|tsawwūn", "يِسَوّون|ysawwūn"],
          ["قَرا|read", "تِقْرين|tiqrīn", "تِقْرون|tiqrūn", "يِقْرون|yiqrūn"],
          ["اِشْتَرى|buy", "تِشْتِرين|tishtirīn", "تِشْتِرون|tishtirūn", "يِشْتِرون|yishtirūn"],
        ],
      },
      {
        kind: "note",
        title: "Check in class",
        text: "These forms apply the pattern from your buy notes to the other verbs. If your teacher uses a different form, trust the class.",
      },
      {
        kind: "tips",
        items: [
          "The present-tense prefix is the key: past, future, command and “-ing” are all built from or around it.",
          "قاعد agrees with the subject (قاعد / قاعدة / قاعدين); راح never changes.",
          "To form a command, start from the “you” present form and drop the تـ.",
        ],
      },
    ],
    cards: [
      { ar: "قاعِد أَكْتُب", tr: "qāʿid aktub", en: "I'm writing (male speaker)" },
      { ar: "قاعْدَة أَكْتُب", tr: "qāʿda aktub", en: "I'm writing (female speaker)" },
      { ar: "راح أَكْتُب", tr: "raḥ aktub", en: "I will write" },
      { ar: "اُكْتُب", tr: "uktub!", en: "write! (m.)" },
      { ar: "اُكْتُبي", tr: "uktubi!", en: "write! (f.)" },
    ],
  },

  // ───────────────────────── Everyday vocabulary ─────────────────────────
  {
    slug: "meals",
    title: "Meals & food",
    ar: "الوَجَبات",
    summary: "Breakfast, lunch, dinner and coffee, in Gulf speech and Fusha, with sentences using سوّى.",
    sections: [
      {
        kind: "table",
        title: "Meal vocabulary",
        cols: [at("Gulf (spoken)"), ar("Fusha"), tx("Meaning")],
        rows: [
          ["فُطور|fuṭūr", "الفَطور / الإفْطار", "breakfast"],
          ["غَدا|ghada", "الغَداء", "lunch"],
          ["عَشا|ʿasha", "العَشاء", "dinner"],
          ["قَهْوَة|qahwa", "القَهْوَة", "coffee"],
        ],
      },
      {
        kind: "note",
        title: "Spoken vs written: dropping the hamza",
        text:
          "عشا and غدا are the Fusha words with the final hamza (ء) dropped, which is normal in speech. Same with السَّماء (as-samāʾ, “the sky”, written) vs السَّما (es-sama, spoken). In Fusha, الإفطار is the standard word for breakfast (and for the meal that breaks the fast).",
      },
      {
        kind: "phrases",
        title: "In sentences",
        items: [
          { ar: "أَنا راح أَسَوّي العَشا بَعْد بُكْرَة", tr: "ana raḥ asawwi el-ʿasha baʿd bukra", fusha: "سَأَصْنَعُ العَشاءَ بَعْدَ غَدٍ", en: "I will make dinner the day after tomorrow." },
          { ar: "هُو راح يِسَوّي القَهْوَة بُكْرَة الصَّباح", tr: "huwa raḥ ysawwi el-qahwa bukra eṣ-ṣabāḥ", fusha: "سَيَصْنَعُ القَهْوَةَ غَداً صَباحاً", en: "He will make coffee tomorrow morning." },
          { ar: "هِيَ راح تِسَوّي الفُطور الأُسْبوع الجاي", tr: "hiya raḥ tsawwi el-fuṭūr el-usbūʿ el-jāy", fusha: "سَتَصْنَعُ الإفْطارَ الأُسْبوعَ القادِمَ", en: "She will make breakfast next week." },
        ],
      },
      {
        kind: "table",
        title: "Gulf ↔ Fusha time words",
        cols: [ar("Gulf"), ar("Fusha"), tx("Meaning")],
        rows: [
          ["بُكْرَة", "غَداً", "tomorrow"],
          ["بَعْد بُكْرَة", "بَعْدَ غَدٍ", "the day after tomorrow"],
          ["الأُسْبوع الجاي", "الأُسْبوع القادِم", "next week"],
        ],
      },
    ],
    cards: [
      { ar: "فُطور", tr: "fuṭūr", en: "breakfast", fusha: "الإفْطار" },
      { ar: "غَدا", tr: "ghada", en: "lunch", fusha: "الغَداء" },
      { ar: "عَشا", tr: "ʿasha", en: "dinner", fusha: "العَشاء" },
      { ar: "قَهْوَة", tr: "qahwa", en: "coffee", fusha: "القَهْوَة" },
      { ar: "بَعْد بُكْرَة", tr: "baʿd bukra", en: "the day after tomorrow", fusha: "بَعْدَ غَدٍ" },
    ],
  },
];
