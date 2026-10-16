"use client";
import { useEffect } from "react";
import { markVisited } from "@/lib/progress";

export default function MarkVisited({ href }: { href: string }) {
  useEffect(() => markVisited(href), [href]);
  return null;
}
