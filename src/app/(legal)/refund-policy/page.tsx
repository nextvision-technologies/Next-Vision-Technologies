import { LegalView, legalMetadata } from "@/components/sections/LegalView";

export const metadata = legalMetadata("refund-policy");

export default function Page() {
  return <LegalView slug="refund-policy" />;
}
