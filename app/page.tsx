import { Hero } from "@/components/hero/Hero";
import HeroScene from "@/components/hero/HeroScene";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Compass, Headphones, Heart, MapPin } from "lucide-react";
import { DestinationCard } from "@/components/content/DestinationCard";
import { JourneyCard } from "@/components/content/JourneyCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TravelJournal } from "@/components/sections/TravelJournal";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { DeferredInquiry } from "@/components/inquiry/DeferredInquiry";
import { destinations } from "@/content/destinations";
import { journeys } from "@/content/journeys";
import { home } from "@/content/home";
import { AgencySchema } from "@/components/seo/AgencySchema";

const trustIcons = [Heart,MapPin,Headphones,Compass];
const featuredDestinations = home.destinations.featuredSlugs.flatMap((slug) => {
  const destination = destinations.find((item) => item.slug === slug);
  return destination ? [destination] : [];
});
const featuredJourneys = home.journeys.featuredSlugs.flatMap((slug) => {
  const journey = journeys.find((item) => item.slug === slug);
  return journey ? [journey] : [];
});

export default function Home() {
  return <main id="main-content">
    <AgencySchema/>
    <Hero><HeroScene/></Hero>
    <div className="border-y border-beige/65 bg-ivory"><div className="container-shell grid grid-cols-2 gap-x-5 gap-y-5 py-7 md:grid-cols-4 md:gap-7 md:py-8">{home.trust.map((text,i)=>{const Icon=trustIcons[i];return <div key={text} className={`flex items-center justify-center gap-3 ${i>0?"md:border-l md:border-beige":""}`}><Icon size={17} strokeWidth={1.2} className="shrink-0 text-[#8a775b]"/><span className="text-[10px] text-ink-soft md:text-[11px]">{text}</span></div>;})}</div></div>
    <section id="discover" className="section-space"><div className="container-shell"><div className="mb-11 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow mb-5">{home.destinations.eyebrow}</p><h2 className="section-heading max-w-2xl">{home.destinations.title}<em>{home.destinations.emphasis}</em></h2><p className="body-copy mt-5">{home.destinations.description}</p></div><Link href="/destinations" className="text-link shrink-0 self-start md:mb-1 md:self-auto">{home.destinations.link}<ArrowUpRight size={14}/></Link></div><div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">{featuredDestinations.map(destination=><DestinationCard key={destination.slug} destination={destination} compact deferImage/>)}</div></div></section>
    <section className="section-space bg-sand"><div className="container-shell"><div className="mx-auto max-w-[650px] text-center"><p className="eyebrow mb-5">{home.process.eyebrow}</p><h2 className="section-heading">{home.process.title}<em>{home.process.emphasis}</em></h2><p className="body-copy mx-auto mt-5 max-w-xl">{home.process.description}</p></div><ProcessSteps/></div></section>
    <section className="section-space"><div className="container-shell"><div className="mb-11 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow mb-5">{home.journeys.eyebrow}</p><h2 className="section-heading max-w-[690px]">{home.journeys.title}<em>{home.journeys.emphasis}</em></h2><p className="body-copy mt-5 max-w-xl">{home.journeys.description}</p></div><Link href="/journeys" className="text-link shrink-0 self-start md:self-auto">{home.journeys.link}<ArrowUpRight size={14}/></Link></div><div className="grid gap-6 md:grid-cols-3">{featuredJourneys.map(journey=><JourneyCard key={journey.slug} journey={journey} compact/>)}</div><p className="mt-6 max-w-2xl text-[10px] leading-relaxed text-ink-soft">{home.journeys.note}</p></div></section>
    <section className="section-space border-t border-beige/55"><div className="container-shell grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24"><TravelJournal/><div><p className="eyebrow mb-5">{home.why.eyebrow}</p><h2 className="section-heading">{home.why.title}<em>{home.why.emphasis}</em></h2><p className="body-copy mt-6">{home.why.description}</p><p className="body-copy mt-4">{home.why.second}</p><div className="mt-8 grid gap-6 sm:grid-cols-2">{home.why.values.map(value=><div key={value.title}><div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full border border-beige"><Check size={12} strokeWidth={1.4}/></div><h3 className="font-sans text-xs font-medium">{value.title}</h3><p className="mt-2 text-[11px] leading-[1.9] text-ink-soft">{value.description}</p></div>)}</div><Link href="/about" className="text-link mt-8">{home.why.link}<ArrowRight size={14}/></Link></div></div></section>
    <Testimonials/>
    <Stats/>
    <section className="section-space border-t border-beige/65"><div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><p className="eyebrow mb-5">{home.faq.eyebrow}</p><h2 className="section-heading max-w-md">{home.faq.title}<em>{home.faq.emphasis}</em></h2><p className="body-copy mt-6 max-w-sm">{home.faq.description}</p><Link href="/contact" className="text-link mt-7">{home.faq.link}<ArrowUpRight size={14}/></Link></div><FAQ/></div></section>
    <DeferredInquiry/>
  </main>;
}
