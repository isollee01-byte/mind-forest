import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { AppNav } from "@/components/AppNav";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "마음숲 · Mind Forest",
  description: "하루 중 잠시, 나를 위한 시간을 만들어보세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <AppNav />
        {children}
      </body>
    </html>
  );
}
