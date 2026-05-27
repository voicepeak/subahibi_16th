import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Philosophy Notes",
  description: "哲学手记——维特根斯坦、狄金森、卡罗尔、罗斯丹、萨蒂、库萨的哲学思想与素晴日的交汇。",
};

export default function PhilosophyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
