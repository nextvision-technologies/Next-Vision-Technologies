import { LocationView, locationMetadata } from "@/components/sections/LocationView";

export const metadata = locationMetadata("web-development-company-uk");

export default function Page() {
  return <LocationView slug="web-development-company-uk" />;
}
