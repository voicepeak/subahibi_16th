import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journey — The Sky Archive",
  description: "从明亮的天空进入短信、揭示板、7月20日与终之空，再回到纪念。主线滚动叙事体验。",
  openGraph: {
    title: "Journey — The Sky Archive",
    description: "素晴日16周年纪念主线体验——从天空进入异常短信、旧式揭示板、世界终结与终之空，最后回到幸福地生活。",
  },
};

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
