"use client";

import { useState, type ReactNode } from "react";
import { siteCopy } from "@/content/site";

export type JourneyExplorerItem = {
  slug: string;
  collection: "india" | "international";
  card: ReactNode;
};

const copy = siteCopy.journeysPage;
type Collection = typeof copy.filters[number]["value"];

/** Cards remain server-rendered; only collection selection needs client state. */
export function JourneyExplorer({ items }: { items: readonly JourneyExplorerItem[] }) {
  const [collection, setCollection] = useState<Collection>("all");
  const filtered = items.filter((item) => collection === "all" || item.collection === collection);

  return <div>
    <fieldset className="mb-7 rounded-3xl border border-beige bg-sand/35 p-5 md:p-7">
      <legend className="sr-only">{copy.filterLabel}</legend>
      <p aria-hidden="true" className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-ink-soft">{copy.filterLabel}</p>
      <div className="flex flex-wrap gap-2">{copy.filters.map((filter) => <button key={filter.value} type="button" aria-pressed={collection === filter.value} aria-controls="journey-results" onClick={() => setCollection(filter.value)} className={`rounded-full border px-4 py-2 text-xs transition-colors ${collection === filter.value ? "border-ink bg-ink text-ivory" : "border-beige bg-ivory text-ink-soft hover:border-taupe"}`}>{filter.label}</button>)}</div>
    </fieldset>
    <p className="mb-6 text-xs text-ink-soft" role="status" aria-live="polite" aria-atomic="true">{filtered.length} {filtered.length === 1 ? copy.countSingular : copy.countLabel}</p>
    <div id="journey-results">{filtered.length ? <div className="grid gap-7 md:grid-cols-2">{filtered.map((item) => <div key={item.slug}>{item.card}</div>)}</div> : <div className="rounded-3xl border border-beige bg-sand/40 px-6 py-16 text-center"><h2 className="font-display text-4xl text-ink">{copy.emptyTitle}</h2><p className="mt-3 text-sm text-ink-soft">{copy.emptyDescription}</p><button type="button" onClick={() => setCollection("all")} className="button-secondary mt-6">{copy.reset}</button></div>}</div>
  </div>;
}
