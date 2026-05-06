import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ReaderAnalytics } from "@/components/analytics/ReaderAnalytics";
import { createBaseMetadata } from "@/lib/seo";
import "@/styles/globals.css";

export const metadata: Metadata = createBaseMetadata();

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body data-motion="on" data-body-font="sans">
        <ReaderAnalytics />
        {children}
      </body>
    </html>
  );
}
