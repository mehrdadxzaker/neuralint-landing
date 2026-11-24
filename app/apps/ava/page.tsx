import AppProductPage from "../../components/AppProductPage";
import { appMetadata, getApp } from "../../content/apps";

const app = getApp("ava");
export const metadata = appMetadata(app);

export default function AvaPage() {
  return <AppProductPage app={app} updated="November 24, 2026" />;
}
