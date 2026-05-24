import Link from "next/link";
import { dictionaryHref } from "@/lib/language/dictionary-links";

export function EnochianTextLink({ word }: { word: string }) {
  const href = dictionaryHref(word);
  if (!href) return <span className="font-enochian text-gold">{word}</span>;
  return (
    <Link
      href={href}
      className="font-enochian text-gold underline decoration-gold-dim/40 underline-offset-2 hover:text-amber"
      title={`Dictionary: ${word}`}
    >
      {word}
    </Link>
  );
}
