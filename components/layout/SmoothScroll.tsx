"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    let cancelled = false;
    async function setup() {
      if (query.matches) return;
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || query.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -105 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      dispose = () => { gsap.ticker.remove(tick); lenis.destroy(); };
    }
    const change = () => { dispose?.(); dispose = undefined; void setup(); };
    void setup();
    query.addEventListener("change", change);
    return () => { cancelled = true; dispose?.(); query.removeEventListener("change", change); };
  }, []);
  return null;
}
