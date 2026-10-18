"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { home } from "@/content/home";

export function Testimonials() {
  const [index,setIndex]=useState(0); const reduce=useReducedMotion();
  const current=testimonials[index];
  const move=(direction:number)=>setIndex((index+direction+testimonials.length)%testimonials.length);
  return <section className="section-space bg-sand/45" aria-label="Illustrative traveler stories"><div className="container-shell grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><div><p className="eyebrow mb-5">{home.stories.eyebrow}</p><h2 className="section-heading max-w-[430px]">{home.stories.title}<em>{home.stories.emphasis}</em></h2><Link href="/stories" className="text-link mt-7">{home.stories.link}<ArrowRight size={14}/></Link></div><div role="region" aria-roledescription="carousel" aria-label="Traveler testimonials" tabIndex={0} onKeyDown={event=>{if(event.key==="ArrowRight"){event.preventDefault();move(1);}if(event.key==="ArrowLeft"){event.preventDefault();move(-1);}if(event.key==="Home"){event.preventDefault();setIndex(0);}if(event.key==="End"){event.preventDefault();setIndex(testimonials.length-1);}}}>
    <div className="mb-5 flex gap-1 text-[#9d773d]" aria-label={`${current.rating} out of 5 stars`}>{Array.from({length:current.rating}).map((_,i)=><Star key={i} size={13} fill="currentColor" strokeWidth={0}/>)}</div>
    <div className="min-h-[210px]" aria-live="polite" aria-atomic="true"><AnimatePresence mode="wait" initial={false}><motion.div key={index} initial={{opacity:0,x:reduce?0:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:reduce?0:-10}} transition={{duration:.2}}><blockquote className="font-display text-[29px] leading-[1.35] tracking-[-.015em] md:text-[33px]">“{current.quote}”</blockquote><div className="mt-7 flex items-center gap-3.5"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-beige/55 font-display text-lg">{current.initials}</span><div><p className="text-xs font-medium">{current.name}</p><p className="mt-1 text-[10px] text-ink-soft">{current.trip}</p></div></div></motion.div></AnimatePresence></div>
    <div className="mt-6 flex items-center justify-between gap-4"><p className="max-w-[250px] text-[9px] leading-relaxed text-ink-soft">{home.stories.disclaimer}</p><div className="flex gap-2"><button aria-label="Previous story" onClick={()=>move(-1)} className="rounded-full border border-beige p-3 transition-colors hover:bg-beige/40"><ArrowLeft size={15}/></button><button aria-label="Next story" onClick={()=>move(1)} className="rounded-full border border-beige p-3 transition-colors hover:bg-beige/40"><ArrowRight size={15}/></button></div></div>
    <p className="sr-only" role="status">Story {index+1} of {testimonials.length}</p>
  </div></div></section>;
}
