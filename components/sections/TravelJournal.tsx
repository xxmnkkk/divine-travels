import Image from "next/image";
import { destinations } from "@/content/destinations";
import { DestinationArt } from "@/components/content/DestinationArt";
import { home } from "@/content/home";

export function TravelJournal() {
  const destination = destinations.find((place) => place.slug === "maldives")!;
  return <div aria-hidden="true" className="relative mx-auto flex min-h-[470px] w-full max-w-[480px] items-center justify-center overflow-hidden rounded-t-[200px] rounded-b-3xl bg-sand p-9 md:min-h-[550px]">
    <div className="absolute inset-5 rounded-t-[180px] rounded-b-xl border border-taupe/30"/>
    <svg className="absolute right-7 top-10 h-24 w-24 -rotate-12 text-taupe" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="43" stroke="currentColor" strokeWidth=".7"/><circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth=".5" strokeDasharray="1 3"/><path d="m50 14 7 30 29 6-29 7-7 29-7-29-29-7 29-6Z" stroke="currentColor" strokeWidth=".7"/><path d="m50 31 5 14 14 5-14 5-5 14-5-14-14-5 14-5Z" fill="currentColor" fillOpacity=".2"/></svg>
    <div className="relative mt-12 w-[85%] -rotate-6 border border-beige bg-ivory p-3.5 pb-14 shadow-card"><div className="relative aspect-square w-full overflow-hidden">{destination.image ? <Image src={destination.image} alt="" fill sizes="(max-width: 527px) calc(85vw - 132px), 320px" className={`object-cover ${destination.imageClassName ?? ""}`}/> : <DestinationArt motif={destination.motif} className="h-full w-full"/>}</div><span className="absolute bottom-5 left-0 right-0 text-center font-display text-xl italic text-ink-soft">{home.journal.caption}</span></div>
    <div className="absolute bottom-12 right-5 rotate-6 rounded-lg border border-taupe/40 bg-ivory/95 px-5 py-4 shadow-sm"><p className="text-[8px] uppercase tracking-[.24em] text-ink-soft">{home.journal.brand}</p><p className="mt-2 font-display text-xl italic">{home.journal.title}</p><div className="mt-3 border-t border-dashed border-beige pt-2 text-[8px] uppercase tracking-[.14em] text-ink-soft">{home.journal.details}</div></div>
    <p className="absolute bottom-5 left-8 text-[8px] uppercase tracking-[.16em] text-ink-soft">{home.why.note}</p>
  </div>;
}
