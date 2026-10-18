"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }} className="mt-5">
    <label htmlFor="newsletter-email" className="sr-only">Email address for the travel newsletter</label>
    <div className="flex border-b border-ink-soft/40 pb-3"><input id="newsletter-email" name="email" type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-xs placeholder:text-ink-soft" disabled={subscribed}/><button type="submit" className="rounded-full px-2" aria-label="Join the newsletter" disabled={subscribed}>{subscribed ? <Check size={18}/> : <ArrowRight size={18}/>}</button></div>
    <p role="status" className="mt-3 text-[10px] leading-relaxed text-ink-soft">{subscribed ? "You’re on the demo list. Newsletter delivery will be available when we launch." : "Occasional inspiration. A considered escape from your inbox."}</p>
  </form>;
}
