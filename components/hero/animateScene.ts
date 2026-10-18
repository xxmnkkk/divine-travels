import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Loaded after the static illustration has rendered, and only when motion is allowed. */
export function animateScene(scene: HTMLDivElement): () => void {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  const media = gsap.matchMedia();

  media.add({
    mobile: "(max-width: 639px)",
    desktop: "(min-width: 640px)",
    finePointer: "(hover: hover) and (pointer: fine)",
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
    let removeVisibilityListener: (() => void) | undefined;
    let active = true;

    const context = gsap.context(() => {
      keep(
        gsap.timeline({ defaults: { ease: "power2.out" } })
          .from(".scene-sea-rise", { y: 28, opacity: 0.4, duration: 1.8 })
          .from(".scene-cruise-position", { opacity: 0, duration: 1.5 }, 0.35)
          .from(".scene-yacht-position", { opacity: 0, duration: 1.5 }, 0.65),
      );

      keep(gsap.to(".scene-sun-halo", { scale: 1.13, opacity: 0.7, transformOrigin: "center", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" }));

      gsap.utils.toArray<SVGGElement>(".scene-cloud").forEach((cloud, index) => {
        if (mobile && cloud.closest(".scene-cloud-extra")) return;
        const anchor = cloud.parentElement;
        const anchorX = Number(anchor?.getAttribute("data-cloud-x") ?? 0);
        const scale = Number(anchor?.getAttribute("data-cloud-scale") ?? 1);
        const minimum = (-220 - anchorX) / scale;
        const maximum = (1660 - anchorX) / scale;
        const distance = (maximum - minimum) * (index % 2 === 0 ? 1 : -1);
        // Wrapping happens only after the entire cloud has passed beyond the SVG.
        keep(gsap.to(cloud, {
          x: distance,
          duration: 65 + index * 14,
          repeat: -1,
          ease: "none",
          modifiers: { x: (value: string) => `${gsap.utils.wrap(minimum, maximum, Number.parseFloat(value))}px` },
        }));
      });

      gsap.utils.toArray<SVGGElement>(".scene-bird").forEach((bird, index) => {
        keep(gsap.to(bird, { scaleY: 0.52, transformOrigin: "center", duration: 0.8 + index * 0.16, repeat: -1, yoyo: true, ease: "sine.inOut", delay: index * 0.3 }));
        keep(gsap.to(bird, { x: "+=55", y: "-=9", duration: 24 + index * 5, repeat: -1, yoyo: true, ease: "sine.inOut" }));
      });

      const routes = [
        { depth: "mid", startX: -180, startY: 342, departure: "M1134 235 C1300 190 1480 175 1650 185", path: "M-180 342 C330 287 1005 125 1650 185", duration: mobile ? 110 : 90, departureDuration: 27 },
        { depth: "far", startX: -150, startY: 225, departure: "M386 166 C800 105 1300 78 1650 97", path: "M-150 225 C480 149 1030 72 1650 97", duration: 155, departureDuration: 110 },
        ...(!mobile ? [{ depth: "near", startX: -160, startY: 367, departure: "M113 336 C590 310 1130 285 1650 240", path: "M-160 367 C390 317 1020 288 1650 240", duration: 115, departureDuration: 96 }] : []),
      ];
      routes.forEach((route) => {
        const plane = scene.querySelector(`.scene-plane-flight-${route.depth}`);
        const contrail = plane?.querySelector(".scene-contrail");
        const pause = gsap.utils.random(22, 48);
        const flight = gsap.timeline({ delay: gsap.utils.random(2, 8) });
        // The first departure starts at the hand-composed static position.
        flight.to(plane, { motionPath: { path: route.departure, autoRotate: true }, duration: route.departureDuration, ease: "none" });
        if (contrail) flight.to(contrail, { opacity: 0.08, duration: 6 }, Math.max(0, route.departureDuration - 6));
        const passes = gsap.timeline({ repeat: -1, repeatDelay: pause });
        passes.fromTo(plane, { x: route.startX, y: route.startY }, {
          motionPath: { path: route.path, autoRotate: true },
          duration: route.duration,
          ease: "none",
          immediateRender: false,
        }, 0);
        if (contrail) {
          passes.fromTo(contrail, { opacity: 0.16 }, { opacity: 1, duration: 6, immediateRender: false }, 0)
            .to(contrail, { opacity: 0.08, duration: 6 }, route.duration - 6);
        }
        flight.add(passes, `+=${pause}`);
        keep(flight);
      });

      const sailAcross = (selector: string, anchor: number, scale: number, duration: number, pause: number) => {
        const start = (-440 - anchor) / scale;
        const end = (1540 - anchor) / scale;
        const sail = gsap.timeline();
        // Continue from the original illustration, then repeat complete, off-canvas passes.
        sail.to(selector, { x: end, duration: duration * end / (end - start), ease: "none" });
        const crossings = gsap.timeline({ repeat: -1, repeatDelay: pause });
        crossings.fromTo(selector, { x: start }, { x: end, duration, ease: "none", immediateRender: false });
        sail.add(crossings, `+=${pause}`);
        keep(sail);
      };
      sailAcross(".scene-cruise-sail", mobile ? 390 : 162, mobile ? 0.88 : 1, 90, 8);
      keep(gsap.to(".scene-cruise-bob", { y: -2.5, rotation: 0.5, transformOrigin: "50% 100%", duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" }));
      sailAcross(".scene-yacht-sail", mobile ? 755 : 815, mobile ? 0.78 : 1, 42, 18);
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

      if (!mobile && mediaContext.conditions?.finePointer) {
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
          if (!active) return;
          const bounds = scene.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          parallax.forEach((layer) => {
            layer.x(x * layer.amount);
            layer.y(y * layer.amount);
          });
        };
        const reset = () => {
          if (active) parallax.forEach((layer) => { layer.x(0); layer.y(0); });
        };
        const hero = scene.parentElement;
        hero?.addEventListener("pointermove", move, { passive: true });
        hero?.addEventListener("pointerleave", reset);
        removePointerListener = () => {
          hero?.removeEventListener("pointermove", move);
          hero?.removeEventListener("pointerleave", reset);
        };
      }

      let inView = true;
      const runningBeforePause = new Set<gsap.core.Animation>();
      const updatePlayback = () => {
        const shouldPlay = inView && document.visibilityState !== "hidden";
        if (shouldPlay === active) return;
        active = shouldPlay;
        if (active) {
          runningBeforePause.forEach((animation) => animation.resume());
          runningBeforePause.clear();
          scrollMotion.scrollTrigger?.enable(false, false);
          scrollMotion.scrollTrigger?.update();
        } else {
          loops.forEach((animation) => {
            if (!animation.paused() && animation.totalProgress() < 1) runningBeforePause.add(animation);
            animation.pause();
          });
          scrollMotion.scrollTrigger?.getTween()?.pause();
          scrollMotion.scrollTrigger?.disable(false);
          scrollMotion.pause();
        }
      };
      observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        updatePlayback();
      }, { threshold: 0 });
      observer.observe(scene);
      document.addEventListener("visibilitychange", updatePlayback);
      removeVisibilityListener = () => document.removeEventListener("visibilitychange", updatePlayback);
      updatePlayback();
    }, scene);

    return () => {
      observer?.disconnect();
      removePointerListener?.();
      removeVisibilityListener?.();
      context.revert();
    };
  });

  return () => media.revert();
}
