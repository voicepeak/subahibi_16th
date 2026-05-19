import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "素晴らしき日々 — 16th Anniversary",
  description: "Subarashiki Hibi 16th Anniversary Fan Project"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
