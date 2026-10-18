"use client";

import { type ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { home } from "@/content/home";

export function Hero({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const hero = root.current;
    if (!hero) return;
    // Mobile starts with immediately readable copy; the lighter scene still
    // provides motion while the editorial entrance is reserved for wide screens.
    const eligibility = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 768px)");
    let cancelled = false;
    let generation = 0;
    let cleanup: (() => void) | undefined;
    const syncMotion = () => {
      const currentGeneration = ++generation;
      cleanup?.();
      cleanup = undefined;
      if (!eligibility.matches) return;
      void import("gsap").then(({gsap}) => {
        if (cancelled || currentGeneration !== generation || !eligibility.matches) return;
        let disconnect: (() => void) | undefined;
        const ctx = gsap.context(() => {
          const bounds = hero.getBoundingClientRect();
          let inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
          const intro = gsap.timeline({paused: !inView || document.visibilityState === "hidden"});
          intro.from(".hero-eyebrow", {y:12,opacity:0,duration:.8}, .15);
          // The heading stays painted, including throughout its entrance.
          intro.from(".hero-reveal-line", {y:20,duration:.8,stagger:.1,ease:"power3.out"}, 0);
          intro.from(".hero-description,.hero-actions", {y:14,opacity:0,duration:.9,stagger:.1}, .65);
          const updatePlayback = () => {
            if (inView && document.visibilityState !== "hidden") {
              if (intro.totalProgress() < 1) intro.resume();
            } else intro.pause();
          };
          const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            updatePlayback();
          }, {threshold: 0});
          observer.observe(hero);
          document.addEventListener("visibilitychange", updatePlayback);
          disconnect = () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", updatePlayback);
          };
        }, hero);
        cleanup = () => {disconnect?.(); ctx.revert();};
      }).catch(() => {
        // The server-rendered copy remains readable if optional motion cannot load.
      });
    };
    eligibility.addEventListener("change", syncMotion);
    syncMotion();
    return () => {
      cancelled = true;
      generation += 1;
      eligibility.removeEventListener("change", syncMotion);
      cleanup?.();
    };
  },[]);
  return <section ref={root} className="hero-shell relative isolate overflow-hidden bg-sand/30" aria-labelledby="hero-heading">
    {children}
    <div className="hero-content relative z-10 mx-auto max-w-4xl px-6 text-center">
      <p className="hero-eyebrow eyebrow mb-6 flex items-center justify-center gap-3"><span className="h-px w-7 bg-taupe/70"/>{home.hero.eyebrow}<span className="h-px w-7 bg-taupe/70"/></p>
      <h1 id="hero-heading" className="hero-title"><span className="hero-reveal-line">{home.hero.lineOne}</span><span className="hero-reveal-line"><em className="mr-[.08em] font-normal text-[#8a775b]">{home.hero.emphasis}</em>{home.hero.lineTwo}</span></h1>
      <p className="hero-description mx-auto mt-6 max-w-[330px] text-[13px] leading-[1.8] text-ink-soft md:max-w-md md:text-sm">{home.hero.description}</p>
      <div className="hero-actions mt-7 flex flex-wrap items-center justify-center gap-3"><Link href="#plan-your-trip" className="button-primary">{home.hero.primary}<ArrowUpRight size={15} strokeWidth={1.5}/></Link><Link href="/destinations" className="button-secondary">{home.hero.secondary}<ArrowRight size={15} strokeWidth={1.5}/></Link></div>
    </div>
    <div className="absolute bottom-24 left-10 z-10 hidden items-center gap-3 text-ink-soft lg:flex"><Sparkles size={18} strokeWidth={1}/><span className="text-[9px] uppercase tracking-[.18em]">{home.hero.annotation}</span></div>
    <a href="#discover" className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-ink-soft"><span className="whitespace-nowrap text-[9px] uppercase tracking-[.2em]">{home.hero.scroll}</span><ArrowDown size={16} strokeWidth={1}/></a>
  </section>;
}
