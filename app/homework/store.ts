"use client";
// Homework answers live only in this browser. Blocked storage just means no autosave.

export type Saved = { answers: Record<string, string>; name: string };
const key = (id: string) => `arabic-study:homework:${id}`;

export function loadAnswers(id: string): Saved {
  try {
    const raw = localStorage.getItem(key(id));
    if (raw) return { answers: {}, name: "", ...JSON.parse(raw) };
  } catch {}
  return { answers: {}, name: "" };
}

export function saveAnswers(id: string, s: Saved) {
  try {
    localStorage.setItem(key(id), JSON.stringify(s));
    return true;
  } catch {
    return false;
  }
}
