import { LegalView, legalMetadata } from "@/components/sections/LegalView";

export const metadata = legalMetadata("security");

export default function Page() {
  return <LegalView slug="security" />;
}
