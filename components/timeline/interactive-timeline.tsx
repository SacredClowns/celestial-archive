"use client";

import { useMemo, useState } from "react";
import { TimelineEventCard } from "@/components/timeline/timeline-event-card";
import { TimelineFilterBar } from "@/components/timeline/timeline-filter-bar";
import { getTimelineActors, getTimelineEras, getTimelineEvents } from "@/lib/timeline/timeline-data";
import type { TimelineCategory, TimelineEra } from "@/lib/timeline/timeline-types";

function eventYear(date: string): number {
  const y = parseInt(date.slice(0, 4), 10);
  return Number.isFinite(y) ? y : 0;
}

export function InteractiveTimeline() {
  const events = getTimelineEvents();
  const actors = getTimelineActors();
  const eras = getTimelineEras();
  const [category, setCategory] = useState<TimelineCategory | "all">("all");
  const [era, setEra] = useState<TimelineEra | "all">("all");
  const [actor, setActor] = useState("");
  const [yearMin, setYearMin] = useState(1527);
  const [yearMax, setYearMax] = useState(1904);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (category !== "all" && e.category !== category) return false;
      if (era !== "all" && e.era !== era) return false;
      if (actor && !e.actors.includes(actor)) return false;
      const y = eventYear(e.date);
      if (y < yearMin || y > yearMax) return false;
      return true;
    });
  }, [events, category, era, actor, yearMin, yearMax]);

  return (
    <div className="space-y-8">
      <TimelineFilterBar
        category={category}
        era={era}
        actor={actor}
        yearMin={yearMin}
        yearMax={yearMax}
        actors={actors}
        eras={eras}
        onCategory={setCategory}
        onEra={setEra}
        onActor={setActor}
        onYearMin={setYearMin}
        onYearMax={setYearMax}
      />
      <p className="text-sm text-gold-dim">
        {filtered.length} event{filtered.length === 1 ? "" : "s"} · drag the year sliders to narrow the span
      </p>
      <div className="relative border-l border-gold-dim/25 pl-4 md:pl-6">
        <div className="space-y-10">
          {filtered.length === 0 ? (
            <p className="text-gold-dim italic">No events match these filters.</p>
          ) : (
            filtered.map((event) => <TimelineEventCard key={event.id} event={event} />)
          )}
        </div>
      </div>
    </div>
  );
}
