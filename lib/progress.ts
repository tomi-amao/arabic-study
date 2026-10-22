"use client";
// Per-browser study progress. Everything is optional: if storage is blocked the
// app still works, it just forgets between visits.
import { useEffect, useState } from "react";

const KEY = "arabic-study:v1";
type Store = { visited: string[]; last?: string; known: string[] };
const empty: Store = { visited: [], known: [] };

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}
function write(s: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
  window.dispatchEvent(new Event("progress"));
}

export function markVisited(href: string) {
  const s = read();
  write({ ...s, last: href, visited: s.visited.includes(href) ? s.visited : [...s.visited, href] });
}
export function setKnown(id: string, known: boolean) {
  const s = read();
  const set = new Set(s.known);
  known ? set.add(id) : set.delete(id);
  write({ ...s, known: [...set] });
}
export function resetKnown(ids: string[]) {
  const s = read();
  const drop = new Set(ids);
  write({ ...s, known: s.known.filter((k) => !drop.has(k)) });
}

/** Live view of progress; null until mounted so server and client markup match. */
export function useProgress(): Store | null {
  const [s, set] = useState<Store | null>(null);
  useEffect(() => {
    const sync = () => set(read());
    sync();
    window.addEventListener("progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return s;
}
