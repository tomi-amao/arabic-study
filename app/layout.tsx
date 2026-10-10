import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
export const metadata = { title: "Arabic Study — Gulf & Fusha", description: "Gulf/Saudi Arabic verbs with Fusha equivalents" };
export default function Root({ children }: { children: ReactNode }) {
  return (<html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap" rel="stylesheet" />
  </head><body>
    <nav className="nav"><Link href="/">Home</Link><Link href="/flashcards">Flashcards</Link></nav>
    <div className="wrap">{children}</div></body></html>);
}
