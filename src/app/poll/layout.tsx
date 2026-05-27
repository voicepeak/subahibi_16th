import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polls",
  description: "投票——选择你最受触动的素晴日场景和角色。",
};

export default function PollLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
