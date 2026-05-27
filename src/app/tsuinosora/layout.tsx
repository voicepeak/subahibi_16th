import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tsui no Sora",
  description: "终之空短片现已合并至主线——自动跳转至 7月20日 章节。",
};

export default function TsuiNoSoraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
