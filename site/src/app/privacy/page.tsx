import { Shell } from "@/components/shell/Shell";
import { createPageMetadata } from "@/lib/seo";
import "../page-common.module.css";

export const metadata = createPageMetadata({
  title: "Site data",
  description: "이 사이트의 데이터 사용 방식을 짧게 설명합니다.",
  path: "/privacy/"
});

export default function PrivacyPage() {
  return (
    <Shell>
      <main className="view">
        <h1 className="page-title">Site data</h1>
        <p className="page-sub">사이트 운영과 개선을 위한 최소한의 기준입니다.</p>

        <section className="year-block" aria-labelledby="site-data-policy">
          <div className="year" id="site-data-policy">
            Policy
          </div>
          <p>
            이 사이트는 익명화된 사용 통계만 사용할 수 있습니다.
            개인 식별 정보, 입력값, 광고 목적 추적은 사용하지 않습니다.
          </p>
        </section>

        <section className="year-block" aria-labelledby="privacy-contact">
          <div className="year" id="privacy-contact">
            Contact
          </div>
          <p>
            데이터 수집 방식에 대해 궁금한 점이 있으면{" "}
            <a className="link" href="mailto:hmy751.dev@gmail.com">
              hmy751.dev@gmail.com
            </a>
            으로 연락할 수 있습니다.
          </p>
        </section>
      </main>
    </Shell>
  );
}
