"use client";

import { createElement, type JSX, type ReactNode } from "react";
import { useInscribe } from "./use-inscribe";
import type { InscribeOptions } from "./use-inscribe";

type InscribeProps = InscribeOptions & {
  children: ReactNode;
  /** Intrinsic element tag for the wrapper. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

/**
 * Wrap any content block in <Inscribe> to give it the scroll-triggered
 * ink-on-parchment reveal animation. The element starts invisible and
 * fades in with a gentle upward drift when it enters the viewport.
 *
 * The ink, once written, stays. Elements only animate on first appearance.
 */
export function Inscribe({ children, as = "div", className = "", ...options }: InscribeProps) {
  const { ref, isVisible } = useInscribe(options);
  const cn = `${isVisible ? "inscribe-visible" : "inscribe-ready"} ${className}`.trim();

  return createElement(as, { ref, className: cn }, children);
}
