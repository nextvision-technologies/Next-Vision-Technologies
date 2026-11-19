import { LegalView, legalMetadata } from "@/features/legal/LegalView";

export const metadata = legalMetadata("cookie-policy");

export default function Page() {
  return <LegalView slug="cookie-policy" />;
}
