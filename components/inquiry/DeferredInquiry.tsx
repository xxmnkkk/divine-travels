"use client";

import { Component, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Compass, Feather, LoaderCircle, Sparkles } from "lucide-react";
import { inquiryContent as copy } from "@/content/inquiry";

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

function InquiryPlaceholder({ loading = false, failed = false, onReveal }: {
  loading?: boolean;
  failed?: boolean;
  onReveal?: () => void;
}) {
  // A reveal control only appears when it can work. The contact link is rendered
  // on the server as well, including when JavaScript is unavailable.
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  return <section id="plan-your-trip" aria-labelledby="inquiry-title" aria-busy={loading} className="section-space scroll-mt-28 bg-sand">
    <div className="container-shell grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div className="lg:sticky lg:top-36">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="inquiry-title" className="section-heading mt-5 max-w-lg">{copy.heading} <em className="font-normal text-sea-ink">{copy.headingEmphasis}</em></h2>
        <p className="body-copy mt-6 max-w-md">{copy.description}</p>
        <div className="mt-9 space-y-6">{copy.promises.map((promise, index) => {
          const Icon = index === 0 ? Compass : Feather;
          return <div key={promise.title} className="flex max-w-md gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-beige bg-ivory/60 text-sea-ink"><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></span><div><h3 className="text-sm font-medium text-ink">{promise.title}</h3><p className="mt-1 text-sm leading-relaxed text-ink-soft">{promise.text}</p></div></div>;
        })}</div>
        <p className="mt-10 flex items-center gap-2.5 font-display text-xl italic text-ink-soft"><Sparkles size={16} strokeWidth={1.5} className="text-sea-ink" aria-hidden="true" />{copy.asideNote}</p>
      </div>
      <div className="flex min-h-[880px] flex-col rounded-3xl border border-beige bg-ivory p-5 shadow-[0_20px_60px_-20px_rgba(43,42,40,0.12)] sm:min-h-[700px] sm:p-9 lg:p-10">
        <div aria-hidden="true" className="mb-8 flex items-center gap-4 border-b border-beige pb-7">{copy.steps.map((label, index) => <div key={label} className="flex flex-1 items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-beige text-xs text-ink-soft">0{index + 1}</span><span className="h-px flex-1 bg-beige" /></div>)}</div>
        <h3 className="max-w-sm font-display text-3xl leading-tight text-ink sm:text-4xl">{copy.deferred.title}</h3>
        <p className="mt-5 text-sm leading-7 text-ink-soft">{copy.deferred.description}</p>
        <div aria-hidden="true" className="my-8 space-y-6"><div><div className="mb-3 h-2 w-36 rounded-full bg-beige/65" /><div className="h-12 rounded-xl border border-beige bg-sand/25" /></div><div><div className="mb-3 h-2 w-28 rounded-full bg-beige/65" /><div className="grid grid-cols-2 gap-3"><div className="h-12 rounded-xl border border-beige bg-sand/25" /><div className="h-12 rounded-xl border border-beige bg-sand/25" /></div></div></div>
        <div className="mt-auto border-t border-beige pt-6">
          {(loading || failed) && <p role="status" className="mb-5 flex items-start gap-2 text-sm leading-6 text-ink-soft">{loading && <LoaderCircle size={16} className="mt-1 shrink-0 motion-safe:animate-spin" aria-hidden="true" />}{failed ? copy.deferred.unavailable : copy.deferred.loading}</p>}
          {hydrated && onReveal && !loading && !failed && <button type="button" onClick={onReveal} className="button-primary mb-5">{copy.deferred.open}<ArrowRight size={16} aria-hidden="true" /></button>}
          <Link href="/contact#plan-your-trip" prefetch={false} className="text-link flex w-fit">{copy.deferred.contact}<ArrowRight size={14} aria-hidden="true" /></Link>
          <noscript><p className="mt-4 text-xs leading-6 text-ink-soft">{copy.deferred.noScript}</p></noscript>
          <p className="mt-5 text-[10px] leading-relaxed text-ink-soft">{copy.demoNote}</p>
        </div>
      </div>
    </div>
  </section>;
}

// Declaring this split point does not request the form. It is rendered only once
// the observer (or explicit reveal control) changes the conditional below.
type LazyInquiryProps = { focusOnMount: boolean };

const LazyInquiryForm = dynamic<LazyInquiryProps>(() => import("./InquiryForm").then(({ InquiryForm }) => {
  function MountedInquiry({ focusOnMount }: LazyInquiryProps) {
    const formRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (focusOnMount) formRef.current?.querySelector<HTMLSelectElement>("#inquiry-destination")?.focus();
    }, [focusOnMount]);
    return <div ref={formRef}><InquiryForm /></div>;
  }
  return MountedInquiry;
}), {
  ssr: false,
  loading: () => <InquiryPlaceholder loading />,
});

class InquiryLoadBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <InquiryPlaceholder failed /> : this.props.children;
  }
}

export function DeferredInquiry() {
  const [requested, setRequested] = useState<"idle" | "nearby" | "manual">("idle");
  const boundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary || requested !== "idle") return;
    if (!("IntersectionObserver" in window)) return; // The reveal button remains available.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setRequested("nearby");
    }, { rootMargin: "800px 0px", threshold: 0 });
    observer.observe(boundary);
    return () => observer.disconnect();
  }, [requested]);

  return <div ref={boundaryRef}><InquiryLoadBoundary>{requested !== "idle" ? <LazyInquiryForm focusOnMount={requested === "manual"} /> : <InquiryPlaceholder onReveal={() => setRequested("manual")} />}</InquiryLoadBoundary></div>;
}
