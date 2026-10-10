"use client";
export default function Speak({ text }: { text: string }) {
  return (<button aria-label="Pronounce" title="Pronounce" onClick={(e) => { e.stopPropagation();
    if (typeof speechSynthesis === "undefined") return;
    const u = new SpeechSynthesisUtterance(text); u.lang = "ar-SA"; speechSynthesis.cancel(); speechSynthesis.speak(u); }}
    style={{ padding: "0 8px", marginInlineStart: 6 }}>🔊</button>);
}
