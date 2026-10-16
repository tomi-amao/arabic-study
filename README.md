# Arabic Study

Study companion for Gulf / Saudi Arabic lessons, with the Fusha (MSA) equivalent alongside.
Next.js 15 (App Router), fully statically generated.

```bash
npm install
npm run dev
```

## Pages

- `/`: topics in study order, with visited lessons and cards learned
- `/learn/[slug]`: lesson pages (pronouns, possessives, prepositions, question words, time, how verbs work, meals)
- `/verbs/[slug]`: full conjugation (past / present / future / command), Gulf + Fusha toggle, notes and example sentences
- `/practice`: flashcards by topic or by page, Arabic → English or reverse, "Again / Got it" tracking
- `/quiz`: multiple-choice quiz by topic

Progress is stored in the browser (localStorage) only. Pronunciation uses the Web Speech API (`ar-SA`).

## Content

All content is data, separate from the UI:

- `lib/content/lessons.ts`: lesson pages, built from typed sections (`table`, `phrases`, `note`, `tips`, `days`). `note` with `tone: "fix"` marks corrections to the lesson notes.
- `lib/content/verbs.json`: verb conjugations, notes and example sentences.
- `lib/data.ts`: topic (unit) order, study path, and the flashcard deck (built from lesson `cards`, every `phrases` section, and each verb).

To add a lesson: add it to `lessons.ts`, then list its slug under a unit in `lib/data.ts`.
