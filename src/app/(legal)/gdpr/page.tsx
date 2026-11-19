import { LegalView, legalMetadata } from "@/features/legal/LegalView";

export const metadata = legalMetadata("gdpr");

export default function Page() {
  return <LegalView slug="gdpr" />;
}
