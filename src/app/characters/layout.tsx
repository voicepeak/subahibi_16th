import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Characters",
  description: "素晴日9名角色画廊——水上由岐、间宫卓司、高岛柘榴、若槻镜、若槻司、间宫羽咲、音无彩名、间宫皆守、木村。",
  openGraph: {
    title: "Characters — The Sky Archive",
    description: "邂逅所有角色——他们都只是同一个灵魂在不同世界中的投影。",
  },
};

export default function CharactersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
