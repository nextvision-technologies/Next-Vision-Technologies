import { LegalView, legalMetadata } from "@/components/sections/LegalView";

export const metadata = legalMetadata("gdpr");

export default function Page() {
  return <LegalView slug="gdpr" />;
}
