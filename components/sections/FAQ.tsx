"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/content/faqs";

export function FAQ({limit}: {limit?:number}) {
  const [open,setOpen]=useState<number|null>(0);
  const reduce=useReducedMotion();
  return <div>{faqs.slice(0,limit).map((faq,index)=><div key={faq.question} className="border-b border-beige"><h3 className="font-sans"><button id={`faq-button-${index}`} aria-expanded={open===index} aria-controls={`faq-panel-${index}`} onClick={()=>setOpen(open===index?null:index)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[13px] font-medium"><span>{faq.question}</span>{open===index?<Minus size={17} className="shrink-0" strokeWidth={1.3}/>:<Plus size={17} className="shrink-0" strokeWidth={1.3}/>}</button></h3><div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={open!==index}>{open===index&&<motion.p initial={{opacity:reduce?1:0,y:reduce?0:-5}} animate={{opacity:1,y:0}} transition={{duration:.2}} className="pb-6 pr-8 text-xs leading-[1.9] text-ink-soft">{faq.answer}</motion.p>}</div></div>)}</div>;
}
