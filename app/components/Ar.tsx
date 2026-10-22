import type { ReactNode } from "react";

/** Arabic text, isolated so it never scrambles surrounding English. */
export default function Ar({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span lang="ar" dir="rtl" className={`ar ${className}`.trim()}>
      {children}
    </span>
  );
}
