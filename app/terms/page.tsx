import { LegalPage } from "@/components/seo/LegalPage";
import { termsContent } from "@/content/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Terms preview", description: termsContent.description, path: "/terms", noIndex: true });

export default function TermsPage() {
  return <LegalPage content={termsContent} otherPage="privacy" />;
}
