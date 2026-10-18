export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro"><div className="container-shell"><p className="eyebrow">{eyebrow}</p><h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] tracking-[-.04em] text-ink md:text-7xl">{title}</h1><p className="body-copy mt-6 max-w-xl">{description}</p></div></section>;
}
