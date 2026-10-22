"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Learn", match: (p: string) => p === "/" || p.startsWith("/learn") || p.startsWith("/verbs") },
  { href: "/practice", label: "Flashcards", match: (p: string) => p.startsWith("/practice") },
  { href: "/quiz", label: "Quiz", match: (p: string) => p.startsWith("/quiz") },
  { href: "/homework", label: "Homework", match: (p: string) => p.startsWith("/homework") },
];

export default function Nav() {
  const path = usePathname() ?? "/";
  return (
    <nav aria-label="Main" className="row" style={{ gap: 2 }}>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="navlink" aria-current={l.match(path) ? "page" : undefined}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
