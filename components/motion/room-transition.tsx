"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

/**
 * Wraps page content with a calm room-enter fade on each navigation.
 * Header, footer, and starfield stay outside this wrapper.
 */
export function RoomTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <>{children}</>;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return <>{children}</>;
  }

  return (
    <div key={pathname} className="animate-room-enter">
      {children}
    </div>
  );
}
