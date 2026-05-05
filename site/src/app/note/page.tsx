import { Shell } from "@/components/shell/Shell";
import "../page-common.module.css";
import "../note-about.module.css";

export const metadata = {
  title: "Note"
};

export default function NotePage() {
  return (
    <Shell current="note">
      <main className="view">
        <h1 className="page-title">Note</h1>
        <p className="page-sub">짧은 메모 source가 붙으면 이 화면에 시간순으로 들어옵니다.</p>
        <div className="notes">
          <div className="note">
            <div className="when">empty</div>
            <div className="body">아직 site 전용 note source는 연결하지 않았습니다.</div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
