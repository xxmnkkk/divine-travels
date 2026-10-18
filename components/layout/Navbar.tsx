"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";

const links = [{ label: "Destinations", href: "/destinations" }, { label: "How it works", href: "/how-it-works" }, { label: "Journeys", href: "/journeys" }, { label: "Stories", href: "/stories" }, { label: "Contact", href: "/contact" }];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const toggle = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const toggleButton = toggle.current;
    document.body.style.overflow = "hidden";
    const first = dialog.current?.querySelector<HTMLButtonElement>("button");
    first?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (e.key !== "Tab") return;
      const nodes = dialog.current?.querySelectorAll<HTMLElement>('a,button,[tabindex="0"]');
      if (!nodes?.length) return;
      const firstNode = nodes[0]; const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstNode) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); firstNode.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); toggleButton?.focus(); };
  }, [open]);
  return <>
    <header className={`fixed inset-x-4 top-5 z-50 mx-auto flex max-w-[1200px] items-center justify-between rounded-full border border-beige/65 bg-ivory/85 py-3 pl-5 pr-2.5 backdrop-blur-xl transition-transform duration-300 md:inset-x-8 md:top-7 md:pl-7 ${scrolled ? "scale-[.98] shadow-card" : ""}`}>
      <Brand />
      <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{links.map(link => <Link aria-current={pathname === link.href ? "page" : undefined} key={link.href} href={link.href} className={`text-[11px] transition-colors hover:text-sea-deep ${pathname === link.href ? "text-sea-deep" : "text-ink-soft"}`}>{link.label}</Link>)}</nav>
      <Link href="/#plan-your-trip" className="button-primary hidden min-h-10 px-5 py-3 sm:inline-flex">Plan my trip <ArrowUpRight size={14} /></Link>
      <button ref={toggle} onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" className="rounded-full p-3 text-ink lg:hidden"><Menu size={22} strokeWidth={1.4} /></button>
    </header>
    <AnimatePresence>{open && <motion.div ref={dialog} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation" data-lenis-prevent initial={{opacity: 0, y: reduce ? 0 : -15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduce ? 0 : -15}} transition={{duration:.25}} className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory px-7 py-8">
      <div className="mb-16 flex items-center justify-between"><Brand /><button className="rounded-full border border-beige p-3" aria-label="Close navigation" onClick={() => setOpen(false)}><X size={20}/></button></div>
      <nav aria-label="Mobile navigation" className="flex flex-col gap-6">{links.map((link, i) => <Link onClick={() => setOpen(false)} href={link.href} key={link.href} className="flex items-center justify-between border-b border-beige pb-5 font-display text-4xl"><span><span className="mr-5 font-sans text-[10px] text-ink-soft">0{i+1}</span>{link.label}</span><ArrowUpRight size={21}/></Link>)}</nav>
      <Link onClick={() => setOpen(false)} href="/#plan-your-trip" className="button-primary mt-10 self-start">Let’s plan your journey <ArrowUpRight size={15}/></Link>
      <p className="eyebrow mt-auto pt-12">Thoughtfully crafted. Entirely yours.</p>
    </motion.div>}</AnimatePresence>
  </>;
}
