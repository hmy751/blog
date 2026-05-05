import Link from "next/link";
import { Shell } from "@/components/shell/Shell";

export default function SystemPreviewIndexPage() {
  return (
    <Shell footerExtra={<Link href="/system/">System</Link>}>
      <main className="view">
        <h1 className="page-title">System Preview</h1>
        <p className="page-sub">Local-only preview surface. Production routes live in the main app.</p>
        <p className="more-link">
          <Link className="link" href="/system/">
            Open system preview →
          </Link>
        </p>
      </main>
    </Shell>
  );
}
