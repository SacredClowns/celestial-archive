"use client";

import { useEffect, useRef, useState } from "react";

export type InscribeOptions = {
  /** Delay before the animation starts, in ms. Default 0. */
  delay?: number;
  /** Only animate once. Default true. */
  once?: boolean;
  /**
   * IntersectionObserver threshold. Default 0 (any pixel visible).
   * Do not use a high ratio (e.g. 0.15) on very tall blocks: for a long lesson,
   * 15% of the element’s height may never fit in the viewport at once, so the
   * callback never fires and content stays at opacity 0.
   */
  threshold?: number;
  /** Root margin. Default "0px 0px -40px 0px" (trigger slightly before fully visible). */
  rootMargin?: string;
};

function elementTouchesViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return rect.top < vh && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;
}

/**
 * Returns a ref and a visibility flag.
 * Attach the ref to any element; when it enters the viewport,
 * `isVisible` becomes true (and stays true if `once` is set).
 */
export function useInscribe<T extends HTMLElement = HTMLDivElement>(options: InscribeOptions = {}) {
  const { delay = 0, once = true, threshold = 0, rootMargin = "0px 0px -40px 0px" } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    type TimeoutHandle = ReturnType<typeof globalThis.setTimeout>;

    const reveal = (): TimeoutHandle | undefined => {
      if (delay > 0) {
        return globalThis.setTimeout(() => setIsVisible(true), delay);
      }
      setIsVisible(true);
      return undefined;
    };

    // If element is already in viewport on mount, reveal immediately
    if (elementTouchesViewport(el)) {
      const timer = reveal();
      return () => { if (timer) clearTimeout(timer); };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          reveal();
          if (once) observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once, threshold, rootMargin]);

  return { ref, isVisible };
}