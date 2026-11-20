import { CompanyRegistrationView } from "@/features/legal/CompanyRegistrationView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/company-registration");

export default function CompanyRegistrationPage() {
  return <CompanyRegistrationView />;
}
