import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export function AgencySchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": absoluteUrl("/#agency"),
    name: site.name,
    description: site.description,
    url: absoluteUrl(),
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/images/brand/divines-travels-transparent.png"),
    email: site.email,
    telephone: site.phoneHref,
  };

  // Escape script delimiters if editable content ever contains HTML-like text.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
