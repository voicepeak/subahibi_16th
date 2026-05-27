import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secret Base",
  description: "秘密基地——交互式探索，点击可发现隐藏内容。",
};

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
