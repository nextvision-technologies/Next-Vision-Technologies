import { LocationView, locationMetadata } from "@/features/locations/LocationView";

export const metadata = locationMetadata("software-house-lahore");

export default function Page() {
  return <LocationView slug="software-house-lahore" />;
}
