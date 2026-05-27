import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fan Works",
  description: "二创展示墙——投稿默认进入审核队列。展示已审核或策展占位作品，不提供原始素材下载。",
  openGraph: {
    title: "Fan Works — The Sky Archive",
    description: "素晴日16周年粉丝二创展示。",
  },
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
