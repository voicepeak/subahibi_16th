import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SubaHibi 16th Anniversary Fan Project",
  description: "A short-run unofficial fan anniversary site for SubaHibi players."
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
