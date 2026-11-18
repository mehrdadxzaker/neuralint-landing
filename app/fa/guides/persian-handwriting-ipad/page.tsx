import PersianWritingGuide from "../../../components/PersianWritingGuide";
import { guideMetadata } from "../../../content/persian-guides";

export const metadata = guideMetadata("handwriting-ipad", "fa");

export default function Page() {
  return <PersianWritingGuide guide="handwriting-ipad" language="fa" />;
}
