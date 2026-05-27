"use client";

import { PollWidget } from "@/components/interaction/PollWidget";

export default function PollPage() {
  return (
    <main className="poll-page">
      <section className="poll-hero">
        <p className="landing-kicker">Community Polls</p>
        <h1>社区投票</h1>
        <p>每个人眼中的素晴日都不相同。投下你的选择。</p>
      </section>
      <PollWidget />
    </main>
  );
}
