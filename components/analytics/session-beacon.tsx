"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/track-event";

function sessionId(): string {
  if (typeof window === "undefined") return "";
  const key = "enochia_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

/** Lightweight product analytics — page views to celestial_marketing_events. */
export function SessionBeacon() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === last.current) return;
    last.current = pathname;
    trackEvent("page_view", { path: pathname }, sessionId());
  }, [pathname]);

  return null;
}
