"use client";

import { type ReactNode, useEffect, useRef } from "react";

/** Animates server-rendered SVG children without adding another scene wrapper. */
export default function SceneMotion({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const loadMotion = () => {
      if (preference.matches) {
        cleanup?.();
        cleanup = undefined;
        return;
      }
      void import("./animateScene").then(({ animateScene }) => {
        if (disposed || preference.matches || cleanup) return;
        cleanup = animateScene(scene);
      }).catch(() => {
        // The complete, accessible page still works if the optional motion chunk fails.
      });
    };
    preference.addEventListener("change", loadMotion);
    loadMotion();
    return () => {
      disposed = true;
      preference.removeEventListener("change", loadMotion);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-scene pointer-events-none absolute inset-0 overflow-hidden" data-scene aria-hidden="true">
      {children}
      <style jsx global>{`
        .hero-scene { background: #fffdf8; }
        @media (max-width: 639px) {
          .hero-scene .scene-cloud-extra,
          .hero-scene .scene-plane-extra,
          .hero-scene .scene-glitter,
          .hero-scene .scene-wave-distant { display: none; }
          .hero-scene .scene-sun-parallax { transform: translate(-205px, 15px); }
          .hero-scene .scene-cruise-position { transform: translate(390px, 539px) scale(.88); }
          .hero-scene .scene-yacht-position { transform: translate(755px, 703px) scale(.78); }
          .hero-scene .scene-palm-near { transform: translate(1055px, 1000px) rotate(-8deg) scale(.92); }
          .hero-scene .scene-palm-far { transform: translate(1170px, 945px) rotate(8deg) scale(.7); }
        }
      `}</style>
    </div>
  );
}
