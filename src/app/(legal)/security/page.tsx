import { LegalView, legalMetadata } from "@/features/legal/LegalView";

export const metadata = legalMetadata("security");

export default function Page() {
  return <LegalView slug="security" />;
}
