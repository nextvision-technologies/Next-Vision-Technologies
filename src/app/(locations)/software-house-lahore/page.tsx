import { LocationView, locationMetadata } from "@/components/sections/LocationView";

export const metadata = locationMetadata("software-house-lahore");

export default function Page() {
  return <LocationView slug="software-house-lahore" />;
}
