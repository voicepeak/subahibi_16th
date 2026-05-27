import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://subahibi-16th.example"),
  title: {
    default: "SubaHibi 16th Anniversary — The Sky Archive",
    template: "%s — The Sky Archive"
  },
  description: "A non-official fan anniversary project for Subarashiki Hibi, built around the sky, memory, messages, and July 20.",
  openGraph: {
    title: "SubaHibi 16th Anniversary — The Sky Archive",
    description: "素晴日16周年非官方粉丝纪念站，一个关于天空、短信、揭示板、7月20日与幸福地生活的沉浸式网页档案。",
    images: ["/assets/bg/bg1015a.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SubaHibi 16th Anniversary — The Sky Archive",
    description: "A non-official fan anniversary project for Subarashiki Hibi."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Noto+Serif+SC:wght@300;400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
