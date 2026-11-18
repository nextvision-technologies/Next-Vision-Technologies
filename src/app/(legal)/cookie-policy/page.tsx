import { LegalView, legalMetadata } from "@/components/sections/LegalView";

export const metadata = legalMetadata("cookie-policy");

export default function Page() {
  return <LegalView slug="cookie-policy" />;
}
