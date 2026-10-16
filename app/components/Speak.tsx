"use client";
import { useEffect, useState } from "react";

let voice: SpeechSynthesisVoice | null = null;
function pickVoice() {
  const vs = speechSynthesis.getVoices();
  voice = vs.find((v) => v.lang === "ar-SA") ?? vs.find((v) => v.lang.toLowerCase().startsWith("ar")) ?? null;
}

/** Pronounce Arabic text with the browser's speech engine. Hidden when unsupported. */
export default function Speak({ text, label }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (typeof speechSynthesis === "undefined") return;
    setOk(true);
    pickVoice();
    speechSynthesis.addEventListener?.("voiceschanged", pickVoice);
  }, []);
  if (!ok) return null;
  return (
    <button
      type="button"
      className={`speak${on ? " on" : ""}`}
      aria-label={label ?? `Pronounce ${text}`}
      title="Pronounce"
      onClick={(e) => {
        e.stopPropagation();
        // Drop "/" alternatives so the voice reads the first form only.
        const u = new SpeechSynthesisUtterance(text.split(" / ")[0]);
        u.lang = "ar-SA";
        u.rate = 0.8;
        if (voice) u.voice = voice;
        u.onend = u.onerror = () => setOn(false);
        speechSynthesis.cancel();
        setOn(true);
        speechSynthesis.speak(u);
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </button>
  );
}
