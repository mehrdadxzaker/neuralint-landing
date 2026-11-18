import PersianWritingGuide from "../../components/PersianWritingGuide";
import { guideMetadata } from "../../content/persian-guides";

export const metadata = guideMetadata("half-space", "en");

export default function Page() {
  return <PersianWritingGuide guide="half-space" language="en" />;
}
