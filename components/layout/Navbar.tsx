"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";
import { layout } from "@/content/layout";

const copy = layout.navigation;
const links = copy.links;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const toggle = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
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
    const modal = dialog.current;
    document.body.style.overflow = "hidden";
    // Native modal dialogs make the rest of the page inert and contain keyboard
    // focus, including for assistive technologies and programmatic focus changes.
    modal?.showModal();
    const first = modal?.querySelector<HTMLButtonElement>("button");
    first?.focus();
    return () => { modal?.close(); document.body.style.overflow = previous; toggleButton?.focus(); };
  }, [open]);
  return <>
    <header className={`fixed inset-x-4 top-5 z-50 mx-auto flex max-w-[1200px] items-center justify-between rounded-full border border-beige/65 bg-ivory/85 py-3 pl-5 pr-2.5 backdrop-blur-xl transition-transform duration-300 md:inset-x-8 md:top-7 md:pl-7 ${scrolled ? "scale-[.98] shadow-card" : ""}`}>
      <Brand />
      <nav aria-label={copy.mainLabel} className="hidden items-center gap-7 lg:flex">{links.map(link => <Link aria-current={pathname === link.href ? "page" : undefined} key={link.href} prefetch={link.href === "/contact" ? false : undefined} href={link.href} className={`text-[11px] transition-colors hover:text-sea-ink ${pathname === link.href ? "text-sea-ink" : "text-ink-soft"}`}>{link.label}</Link>)}</nav>
      <Link href="/#plan-your-trip" className="button-primary hidden min-h-10 px-5 py-3 sm:inline-flex">{copy.primaryCta} <ArrowUpRight size={14} aria-hidden="true" /></Link>
      <button ref={toggle} onClick={() => setOpen(true)} aria-label={copy.openLabel} aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" className="rounded-full p-3 text-ink lg:hidden"><Menu size={22} strokeWidth={1.4} aria-hidden="true" /></button>
    </header>
    {open && <motion.dialog ref={dialog} id="mobile-navigation" aria-modal="true" aria-label={copy.dialogLabel} data-lenis-prevent initial={reduce ? false : {opacity: 0, y: -15}} animate={{opacity:1,y:0}} transition={{duration:reduce ? 0 : .25}} onCancel={(event) => { event.preventDefault(); setOpen(false); }} onClick={(event) => { if (event.target instanceof Element && event.target.closest("a")) setOpen(false); }} className="fixed inset-0 z-[60] m-0 h-dvh max-h-none w-screen max-w-none flex-col overflow-y-auto border-0 bg-ivory px-7 py-8 text-ink open:flex">
      <div className="mb-16 flex items-center justify-between"><Brand /><button className="rounded-full border border-beige p-3" aria-label={copy.closeLabel} onClick={() => setOpen(false)}><X size={20} aria-hidden="true" /></button></div>
      <nav aria-label={copy.mobileLabel} className="flex flex-col gap-6">{links.map((link, i) => <Link aria-current={pathname === link.href ? "page" : undefined} href={link.href} key={link.href} className="flex items-center justify-between border-b border-beige pb-5 font-display text-4xl"><span><span className="mr-5 font-sans text-[10px] text-ink-soft" aria-hidden="true">0{i+1}</span>{link.label}</span><ArrowUpRight size={21} aria-hidden="true" /></Link>)}</nav>
      <Link href="/#plan-your-trip" className="button-primary mt-10 self-start">{copy.mobileCta} <ArrowUpRight size={15} aria-hidden="true" /></Link>
      <p className="eyebrow mt-auto pt-12">{copy.mobileNote}</p>
    </motion.dialog>}
  </>;
}
