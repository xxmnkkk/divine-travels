"use client";

import { useEffect, useRef } from "react";
import { Compass, MessageCircle, Route, Sunrise } from "lucide-react";
import { home } from "@/content/home";

const icons = [MessageCircle, Compass, Route, Sunrise];
export function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false; let cleanup: (()=>void)|undefined;
    Promise.all([import("gsap"),import("gsap/ScrollTrigger")]).then(([{gsap},{ScrollTrigger}])=>{
      if(cancelled) return; gsap.registerPlugin(ScrollTrigger);
      const ctx=gsap.context(()=>{gsap.from(".process-line",{scaleX:0,transformOrigin:"left center",ease:"none",scrollTrigger:{trigger:ref.current,start:"top 80%",end:"top 40%",scrub:1}});},ref);
      cleanup=()=>ctx.revert();
    });
    return()=>{cancelled=true;cleanup?.();};
  },[]);
  return <div ref={ref} className="relative mt-14 grid gap-9 md:grid-cols-4 md:gap-9"><div aria-hidden="true" className="process-line absolute left-0 right-0 top-[25px] hidden h-px bg-beige md:block"/>{home.process.steps.map((step,index)=>{const Icon=icons[index];return <div key={step.title} className="relative"><div className="relative mb-6 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-beige bg-sand"><Icon size={21} strokeWidth={1.15}/><span className="absolute -right-2 -top-1 rounded-full bg-sand px-1.5 text-[9px] text-ink-soft">0{index+1}</span></div><h3 className="font-display text-[25px] leading-tight">{step.title}</h3><p className="mt-3 max-w-[260px] text-xs leading-[1.9] text-ink-soft">{step.description}</p></div>;})}</div>;
}
