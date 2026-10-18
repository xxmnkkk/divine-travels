"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import HeroScene from "./HeroScene";
import { home } from "@/content/home";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    import("gsap").then(({gsap}) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.from(".hero-eyebrow", {y:12,opacity:0,duration:.8,delay:.15});
        gsap.from(".hero-reveal-line", {y:30,opacity:0,duration:1,stagger:.14,delay:.25,ease:"power3.out"});
        gsap.from(".hero-description,.hero-actions", {y:14,opacity:0,duration:.9,stagger:.1,delay:.65});
      },root);
      cleanup = () => ctx.revert();
    });
    return () => {cancelled = true; cleanup?.();};
  },[]);
  return <section ref={root} className="hero-shell relative isolate overflow-hidden bg-sand/30" aria-labelledby="hero-heading">
    <HeroScene/>
    <div className="hero-content relative z-10 mx-auto max-w-4xl px-6 text-center">
      <p className="hero-eyebrow eyebrow mb-6 flex items-center justify-center gap-3"><span className="h-px w-7 bg-taupe/70"/>{home.hero.eyebrow}<span className="h-px w-7 bg-taupe/70"/></p>
      <h1 id="hero-heading" className="hero-title"><span className="hero-reveal-line">{home.hero.lineOne}</span><span className="hero-reveal-line"><em className="font-normal text-[#8a775b]">{home.hero.emphasis}</em>{home.hero.lineTwo}</span></h1>
      <p className="hero-description mx-auto mt-6 max-w-[330px] text-[13px] leading-[1.8] text-ink-soft md:max-w-md md:text-sm">{home.hero.description}</p>
      <div className="hero-actions mt-7 flex flex-wrap items-center justify-center gap-3"><Link href="#plan-your-trip" className="button-primary">{home.hero.primary}<ArrowUpRight size={15} strokeWidth={1.5}/></Link><Link href="/destinations" className="button-secondary">{home.hero.secondary}<ArrowRight size={15} strokeWidth={1.5}/></Link></div>
    </div>
    <div className="absolute bottom-24 left-10 z-10 hidden items-center gap-3 text-ink-soft lg:flex"><Sparkles size={18} strokeWidth={1}/><span className="text-[9px] uppercase tracking-[.18em]">{home.hero.annotation}</span></div>
    <a href="#discover" className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-ink-soft"><span className="whitespace-nowrap text-[9px] uppercase tracking-[.2em]">{home.hero.scroll}</span><ArrowDown size={16} strokeWidth={1}/></a>
  </section>;
}
