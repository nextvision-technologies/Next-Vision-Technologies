import { LegalView, legalMetadata } from "@/features/legal/LegalView";

export const metadata = legalMetadata("terms");

export default function Page() {
  return <LegalView slug="terms" />;
}
