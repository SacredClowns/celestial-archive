import { LoagaethViewer } from "@/components/observatory/loagaeth/loagaeth-viewer";
import { getViewerData } from "@/lib/observatory/loagaeth-data";
import { loadLoagaethContent } from "@/lib/observatory/loagaeth-content";

export default function LoagaethPage() {
  const data = getViewerData();
  const content = loadLoagaethContent();

  return (
    <section>
      <LoagaethViewer
        data={data}
        introPrimary={content.introPrimary}
        introSecondary={content.introSecondary}
        sourceNote={content.sourceNote}
      />
    </section>
  );
}
