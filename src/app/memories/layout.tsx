import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memories",
  description: "留言墙——主线结束后留下你的纪念留言。所有留言默认审核后公开。",
  openGraph: {
    title: "Memories — The Sky Archive",
    description: "素晴日16周年纪念留言墙。留下你的天空记忆。",
  },
};

export default function MemoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
