import { notFound } from "next/navigation";
import { AethyrDetail } from "@/components/aethyrs/aethyr-detail";
import { ChamberSourceNote } from "@/components/language/chamber-page-header";
import { getAdjacentAethyrs, getAethyrByName } from "@/lib/aethyrs/aethyr-data";

type PageProps = { params: Promise<{ name: string }> };

export async function generateStaticParams() {
  const { getAllAethyrs } = await import("@/lib/aethyrs/aethyr-data");
  return getAllAethyrs().map((a) => ({ name: a.name }));
}

export async function generateMetadata({ params }: PageProps) {
  const { name } = await params;
  const aethyr = getAethyrByName(name);
  if (!aethyr) return { title: "Aethyr · Celestial Archive" };
  return {
    title: `${aethyr.name} · Aethyr ${aethyr.number}`,
    description: `The ${aethyr.order} Aethyr ${aethyr.name} — Call 19 variant.`
  };
}

export default async function AethyrPage({ params }: PageProps) {
  const { name } = await params;
  let adjacent;
  try {
    adjacent = getAdjacentAethyrs(name);
  } catch {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <AethyrDetail aethyr={adjacent.aethyr} prev={adjacent.prev} next={adjacent.next} />
      <ChamberSourceNote>
        <p>Aethyr data from Dee&apos;s reception (Kraków, 1584). Call text from James (1984) edition.</p>
      </ChamberSourceNote>
    </section>
  );
}
