"use client";

import { usePathname } from "next/navigation";
import { DidYouKnow } from "@/components/discernment/did-you-know";
import { tipForPathname } from "@/lib/content/did-you-know-tips";

export function PageDidYouKnow() {
  const pathname = usePathname() ?? "";
  const tip = tipForPathname(pathname);
  if (!tip) return null;
  return <DidYouKnow tip={tip} />;
}
