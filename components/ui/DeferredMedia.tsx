"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const subscribeToCapabilities = () => () => {};
const observerUnavailable = () => !("IntersectionObserver" in window);
const serverSnapshot = () => false;

/** Keep distant media out of the browser's generous native lazy-loading range. */
export function DeferredMedia({ children }: { children: ReactNode }) {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const showFallback = useSyncExternalStore(subscribeToCapabilities, observerUnavailable, serverSnapshot);

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary || showFallback || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { rootMargin: "400px", threshold: 0 });
    observer.observe(boundary);
    return () => observer.disconnect();
  }, [showFallback]);

  return <div ref={boundaryRef} className="absolute inset-0">
    {(visible || showFallback) && children}
    <noscript>{children}</noscript>
  </div>;
}
