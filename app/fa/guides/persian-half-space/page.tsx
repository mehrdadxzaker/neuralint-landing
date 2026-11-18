import PersianWritingGuide from "../../../components/PersianWritingGuide";
import { guideMetadata } from "../../../content/persian-guides";

export const metadata = guideMetadata("half-space", "fa");

export default function Page() {
  return <PersianWritingGuide guide="half-space" language="fa" />;
}
