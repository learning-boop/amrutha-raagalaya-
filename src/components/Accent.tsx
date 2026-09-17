import { Fragment, type ReactNode } from "react";

/**
 * Turns `*word*` in a heading into gold italic text, so page titles can
 * stay plain strings: "Two ways to be part of the *tradition*".
 */
export function withAccent(text: string): ReactNode {
  const parts = text.split(/\*([^*]+)\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 ? <span key={i} className="accent">{part}</span> : <Fragment key={i}>{part}</Fragment>));
}
