import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tsui no Sora",
  description: "终之空短片式演出——天空、信号污染、世界终结、黑屏归零，最后回到天空。约29秒可跳过。",
  openGraph: {
    title: "Tsui no Sora — The Sky Archive",
    description: "素晴日16周年——终之空沉浸式短片演出。",
  },
};

export default function TsuiNoSoraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
