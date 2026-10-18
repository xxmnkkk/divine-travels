"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Beach from "./scene/Beach";
import Birds from "./scene/Birds";
import Clouds from "./scene/Clouds";
import CruiseShip from "./scene/CruiseShip";
import Glitter from "./scene/Glitter";
import PalmTree from "./scene/PalmTree";
import Plane from "./scene/Plane";
import Sky from "./scene/Sky";
import Sun from "./scene/Sun";
import Waves from "./scene/Waves";
import Yacht from "./scene/Yacht";

/** A single, scalable illustration. All motion is contained in this component. */
export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const media = gsap.matchMedia();

    media.add({
      mobile: "(max-width: 639px)",
      desktop: "(min-width: 640px)",
      motionAllowed: "(prefers-reduced-motion: no-preference)",
    }, (mediaContext) => {
      if (!mediaContext.conditions?.motionAllowed) return;
      const mobile = Boolean(mediaContext.conditions.mobile);
      const loops: gsap.core.Animation[] = [];
      const keep = <T extends gsap.core.Animation,>(animation: T): T => {
        loops.push(animation);
        return animation;
      };
      let observer: IntersectionObserver | undefined;
      let removePointerListener: (() => void) | undefined;

      const context = gsap.context(() => {
        keep(
          gsap.timeline({ defaults: { ease: "power2.out" } })
            .from(".scene-sea-rise", { y: 28, opacity: 0.4, duration: 1.8 })
            .from(".scene-cruise-position", { opacity: 0, duration: 1.5 }, 0.35)
            .from(".scene-yacht-position", { opacity: 0, duration: 1.5 }, 0.65),
        );

        keep(gsap.to(".scene-sun-halo", { scale: 1.13, opacity: 0.7, transformOrigin: "center", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" }));

        gsap.utils.toArray<SVGGElement>(".scene-cloud").forEach((cloud, index) => {
          keep(gsap.to(cloud, { x: index % 2 === 0 ? 95 : -115, duration: 65 + index * 14, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        });

        gsap.utils.toArray<SVGGElement>(".scene-bird").forEach((bird, index) => {
          keep(gsap.to(bird, { scaleY: 0.52, transformOrigin: "center", duration: 0.8 + index * 0.16, repeat: -1, yoyo: true, ease: "sine.inOut", delay: index * 0.3 }));
          keep(gsap.to(bird, { x: "+=55", y: "-=9", duration: 24 + index * 5, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        });

        // Begin partway along each route so the static composition remains alive immediately.
        keep(gsap.to(".scene-plane-flight-mid", {
          motionPath: { path: "M-180 342 C330 287 1005 125 1650 185", autoRotate: true },
          duration: mobile ? 110 : 90,
          repeat: -1,
          repeatDelay: 24,
          ease: "none",
        }).progress(0.72));
        keep(gsap.to(".scene-plane-flight-far", {
          motionPath: { path: "M-150 225 C480 149 1030 72 1620 97", autoRotate: true },
          duration: 155,
          repeat: -1,
          repeatDelay: 35,
          ease: "none",
        }).progress(0.29));
        if (!mobile) {
          keep(gsap.to(".scene-plane-flight-near", {
            motionPath: { path: "M-160 367 C390 317 1020 288 1650 240", autoRotate: true },
            duration: 115,
            repeat: -1,
            repeatDelay: 42,
            ease: "none",
          }).progress(0.15));
        }

        keep(gsap.to(".scene-cruise-sail", { x: mobile ? 35 : 180, duration: 90, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        keep(gsap.to(".scene-cruise-bob", { y: -2.5, rotation: 0.5, transformOrigin: "50% 100%", duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        keep(gsap.to(".scene-yacht-sail", { x: mobile ? -32 : -95, duration: 35, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        keep(gsap.to(".scene-yacht-bob", { y: 2, rotation: -0.65, transformOrigin: "50% 100%", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        keep(gsap.to(".scene-yacht-wake", { scaleX: 1.06, opacity: 0.6, transformOrigin: "right center", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" }));

        gsap.utils.toArray<SVGGElement>(".scene-wave").forEach((wave, index) => {
          keep(gsap.to(wave, { x: index % 2 === 0 ? 55 : -60, duration: 16 + index * 5, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        });
        keep(gsap.to(".scene-shore-foam", { y: 8, opacity: 0.2, duration: 5.4, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        gsap.utils.toArray<SVGGElement>(".scene-palm-sway").forEach((palm, index) => {
          keep(gsap.to(palm, { rotation: index === 0 ? 1.4 : -1.2, transformOrigin: "0px 0px", duration: 7 + index * 2, repeat: -1, yoyo: true, ease: "sine.inOut" }));
        });

        if (!mobile) {
          gsap.utils.toArray<SVGPathElement>(".scene-glint").forEach((glint, index) => {
            keep(gsap.to(glint, { opacity: index % 3 === 0 ? 0.82 : 0.08, duration: 1.1 + (index % 5) * 0.37, delay: (index % 7) * 0.24, repeat: -1, yoyo: true, ease: "sine.inOut" }));
          });
        }

        const scrollMotion = gsap.timeline({
          scrollTrigger: {
            trigger: scene.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        scrollMotion
          .to(".scene-scroll-sky", { y: mobile ? 35 : 95, ease: "none" }, 0)
          .to(".scene-scroll-ocean", { y: mobile ? 18 : 45, ease: "none" }, 0)
          .to(".scene-scroll-vessels", { y: mobile ? 10 : 25, ease: "none" }, 0)
          .to(".scene-scroll-beach", { y: mobile ? -12 : -36, ease: "none" }, 0)
          .to(".scene-sky-warm", { opacity: 0.55, ease: "none" }, 0);

        if (!mobile && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const parallax = [
            { selector: ".scene-sun-parallax", amount: 2.5 },
            { selector: ".scene-cloud-parallax", amount: 5 },
            { selector: ".scene-birds-parallax", amount: 7 },
            { selector: ".scene-palms-parallax", amount: 12 },
          ].map(({ selector, amount }) => {
            const element = scene.querySelector(selector);
            const layer = {
              amount,
              x: gsap.quickTo(element, "x", { duration: 1.7, ease: "power3.out" }),
              y: gsap.quickTo(element, "y", { duration: 1.7, ease: "power3.out" }),
            };
            keep(layer.x.tween);
            keep(layer.y.tween);
            return layer;
          });
          const move = (event: PointerEvent) => {
            const bounds = scene.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            parallax.forEach((layer) => {
              layer.x(x * layer.amount);
              layer.y(y * layer.amount);
            });
          };
          const reset = () => parallax.forEach((layer) => { layer.x(0); layer.y(0); });
          const hero = scene.parentElement;
          hero?.addEventListener("pointermove", move, { passive: true });
          hero?.addEventListener("pointerleave", reset);
          removePointerListener = () => {
            hero?.removeEventListener("pointermove", move);
            hero?.removeEventListener("pointerleave", reset);
          };
        }

        observer = new IntersectionObserver(([entry]) => {
          loops.forEach((animation) => {
            if (entry.isIntersecting) {
              if (animation.totalProgress() < 1) animation.resume();
            } else {
              animation.pause();
            }
          });
          if (entry.isIntersecting) scrollMotion.scrollTrigger?.enable(false, false);
          else scrollMotion.scrollTrigger?.disable(false);
        }, { threshold: 0 });
        observer.observe(scene);
      }, scene);

      return () => {
        observer?.disconnect();
        removePointerListener?.();
        context.revert();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={sceneRef} className="hero-scene pointer-events-none absolute inset-0 overflow-hidden" data-scene aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <g className="scene-scroll-sky">
          <Sky />
          <Sun />
          <Clouds />
          <Birds />
          <Plane depth="far" />
          <Plane depth="mid" />
          <Plane depth="near" />
        </g>
        <g className="scene-scroll-ocean">
          <Waves />
          <Glitter />
        </g>
        <g className="scene-scroll-vessels">
          <CruiseShip />
          <Yacht />
          <Waves foreground />
        </g>
        <g className="scene-scroll-beach"><Beach /></g>
        <g className="scene-palms-parallax">
          <PalmTree variant="far" />
          <PalmTree variant="near" />
        </g>
      </svg>
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
