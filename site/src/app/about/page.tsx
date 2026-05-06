import AboutPage from "@/components/about/AboutPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description: "프론트엔드와 AI 제품의 경계를 보며 기록하는 함명연의 공개 프로필입니다.",
  path: "/about/"
});

export default function Page() {
  return <AboutPage />;
}
