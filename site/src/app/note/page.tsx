import { Shell } from "@/components/shell/Shell";
import { getNotes } from "@/lib/notes";
import { createPageMetadata } from "@/lib/seo";
import "../page-common.module.css";
import "../note-about.module.css";

export const metadata = createPageMetadata({
  title: "Note",
  description: "짧은 공개 노트를 모아두는 공간입니다.",
  path: "/note/"
});

export default async function NotePage() {
  const notes = await getNotes();

  return (
    <Shell current="note">
      <main className="view">
        <h1 className="page-title">Note</h1>
        <p className="page-sub">짧은 관찰과 작업 메모를 따로 모읍니다.</p>
        <div className="notes">
          {notes.length ? (
            notes.map((note) => (
              <div className="note" key={note.slug}>
                <time className="when" dateTime={note.date}>
                  {note.dateText}
                </time>
                <div className="body">
                  {note.title ? <strong>{note.title}</strong> : null}
                  {note.title && note.body ? " " : null}
                  {note.body || (note.title ? null : "메모를 정리 중입니다.")}
                </div>
              </div>
            ))
          ) : (
            <div className="note note-empty">
              <div className="when">준비 중</div>
              <div className="body">아직 공개한 노트가 없습니다.</div>
            </div>
          )}
        </div>
      </main>
    </Shell>
  );
}
