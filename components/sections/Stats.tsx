"use client";

import { useEffect, useRef } from "react";
import { home } from "@/content/home";

export function Stats() {
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const observer=new IntersectionObserver(entries=>{
      if(!entries[0].isIntersecting)return;
      root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach(element=>{
        const target=Number(element.dataset.count); const start=performance.now();
        let frame=0;
        const tick=(now:number)=>{const progress=Math.min((now-start)/1000,1);element.textContent=String(Math.round(target*(1-Math.pow(1-progress,3))));if(progress<1)frame=requestAnimationFrame(tick);};
        frame=requestAnimationFrame(tick); cleanups.push(()=>cancelAnimationFrame(frame));
      });observer.disconnect();
    },{threshold:.5});
    const cleanups:(()=>void)[]=[];
    if(root.current)observer.observe(root.current);
    return()=>{observer.disconnect();cleanups.forEach(cleanup=>cleanup());};
  },[]);
  return <div ref={root} className="container-shell grid grid-cols-3 py-14 md:py-20">{home.stats.map((stat,i)=><div key={stat.label} className={`px-3 text-center ${i>0?"border-l border-beige":""}`}><p className="font-display text-5xl text-[#8a775b] md:text-6xl"><span aria-hidden="true" data-count={stat.value}>{stat.value}</span><span className="sr-only">{stat.value}</span>{stat.suffix}</p><p className="mx-auto mt-3 max-w-[160px] text-[9px] leading-relaxed tracking-wide text-ink-soft md:text-xs">{stat.label}</p></div>)}</div>;
}
