import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "myeongyeon ham",
    template: "%s | myeongyeon ham"
  },
  description: "기술을 만들며 바뀐 생각을 기록합니다."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body data-motion="on" data-body-font="sans">
        {children}
      </body>
    </html>
  );
}
