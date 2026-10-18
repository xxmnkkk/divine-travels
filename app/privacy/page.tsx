import { LegalPage } from "@/components/seo/LegalPage";
import { privacyContent } from "@/content/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Privacy preview", description: privacyContent.description, path: "/privacy", noIndex: true });

export default function PrivacyPage() {
  return <LegalPage content={privacyContent} otherPage="terms" />;
}
