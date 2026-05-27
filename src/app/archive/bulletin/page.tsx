import type { Metadata } from "next";
import { BulletinArchive } from "@/components/archive/BulletinArchive";

export const metadata: Metadata = {
  title: "North School Bulletin",
  description: "北校揭示板事件档案，按主题、帖子和时间线回放恐惧扩散过程。",
};

export default function ArchiveBulletinPage() {
  return (
    <main className="archive-page archive-bulletin-page">
      <section className="archive-hero">
        <p className="landing-kicker">Archive / Bulletin</p>
        <h1>北校揭示板事件档案</h1>
        <p>旧式 BBS、匿名 ID、关键发言高亮和事件时间线。</p>
      </section>
      <BulletinArchive />
    </main>
  );
}

