import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import Nav from "./components/Nav";
import TranslitToggle, { translitScript } from "./components/TranslitToggle";

export const metadata = {
  title: { default: "Arabic Study: Gulf & Fusha", template: "%s · Arabic Study" },
  description: "Lesson notes, flashcards and quizzes for Gulf / Saudi Arabic with Fusha equivalents.",
};
export const viewport = { width: "device-width", initialScale: 1 };

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: translitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="topbar">
          <div className="topbar-in">
            <Link href="/" className="brand">
              <span lang="ar" className="ar">عربي</span>
              <span className="brand-text">Arabic Study</span>
            </Link>
            <Nav />
            <TranslitToggle />
          </div>
        </header>
        <main id="main" className="wrap">
          {children}
        </main>
      </body>
    </html>
  );
}
