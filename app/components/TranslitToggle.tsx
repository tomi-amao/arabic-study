"use client";
import { useEffect, useState } from "react";

const KEY = "arabic-study:hide-tr";

/** Show / hide transliteration everywhere (useful once you can read the script). */
export default function TranslitToggle() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => setHidden(document.documentElement.classList.contains("hide-tr")), []);
  const flip = () => {
    const next = !hidden;
    setHidden(next);
    document.documentElement.classList.toggle("hide-tr", next);
    try {
      localStorage.setItem(KEY, next ? "1" : "0");
    } catch {}
  };
  return (
    <button type="button" className="toggle" aria-pressed={!hidden} onClick={flip} title="Show or hide transliteration">
      <span aria-hidden="true">Aa</span>
      <span className="brand-text">{hidden ? "Show" : "Hide"} transliteration</span>
    </button>
  );
}

/** Runs before paint so the saved preference doesn't flash. */
export const translitScript = `try{if(localStorage.getItem("${KEY}")==="1")document.documentElement.classList.add("hide-tr")}catch(e){}`;
