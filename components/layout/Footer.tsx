import Link from "next/link";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { Brand } from "./Brand";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return <footer className="bg-sand">
    <svg aria-hidden="true" className="footer-wave text-ivory" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="currentColor" d="M0 0h1440v16c-160 60-360 24-550 16S350 82 0 17Z"/></svg>
    <div className="container-shell pb-7 pt-14">
      <div className="grid gap-12 border-b border-beige pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.8fr_1.1fr] lg:gap-12">
        <div><Brand/><p className="body-copy mt-5 max-w-[260px] text-[13px]">A world of possibilities.<br/>A journey that’s entirely yours.</p><Link href="/about" className="text-link mt-5">A little about us <ArrowUpRight size={13}/></Link></div>
        <div><p className="eyebrow mb-5">Explore</p><nav aria-label="Footer explore" className="flex flex-col items-start gap-3 text-xs text-ink-soft"><Link className="hover:text-ink" href="/destinations">Destinations</Link><Link className="hover:text-ink" href="/journeys">Our journeys</Link><Link className="hover:text-ink" href="/how-it-works">How it works</Link><Link className="hover:text-ink" href="/stories">Traveler stories</Link></nav></div>
        <div><p className="eyebrow mb-5">Let’s talk travel</p><Link href="/contact" className="inline-flex items-center gap-2 text-xs">Meet your consultant <ArrowUpRight size={13}/></Link><p className="mt-3 text-xs text-ink-soft">hello@divinetravels.example</p><p className="mt-2 text-[10px] text-ink-soft">Contact details coming soon</p><div className="mt-5 flex gap-3"><Link href="/contact" aria-label="Contact Divine Travels" className="rounded-full border border-beige p-2.5"><Mail size={14}/></Link><Link href="/stories" aria-label="Explore our travel stories" className="rounded-full border border-beige p-2.5"><Instagram size={14}/></Link></div></div>
        <div><p className="eyebrow mb-5">A little wanderlust</p><p className="font-display text-2xl">Good things on the horizon.</p><Newsletter/></div>
      </div>
      <div className="flex flex-col gap-4 pt-6 text-[10px] text-ink-soft sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Divine Travels. Thoughtfully crafted journeys.</p><p className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><span>Made for the way you travel.</span></p></div>
    </div>
  </footer>;
}
