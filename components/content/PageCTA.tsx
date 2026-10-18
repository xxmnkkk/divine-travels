import Link from 'next/link';

export function PageCTA({ eyebrow, title, description, label, href = '/contact#plan-your-trip' }: { eyebrow?: string; title: string; description?: string; label: string; href?: string }) {
  return <section className="section-space relative overflow-hidden bg-sand/70"><svg viewBox="0 0 1440 220" fill="none" aria-hidden="true" className="pointer-events-none absolute -bottom-8 left-0 h-40 w-full text-beige/40" preserveAspectRatio="none"><path d="M0 114q180-90 360 0t360 0 360 0 360 0v106H0Z" fill="currentColor" /></svg><div className="container-shell relative text-center">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="section-heading mx-auto mt-4 max-w-3xl">{title}</h2>{description && <p className="body-copy mx-auto mt-5 max-w-lg">{description}</p>}<Link href={href} className="button-primary mt-8">{label}<span aria-hidden="true">↗</span></Link></div></section>;
}
