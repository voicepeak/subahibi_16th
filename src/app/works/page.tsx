"use client";

import { useState } from "react";
import { FanWorkGrid } from "@/components/interaction/FanWorkGrid";
import { FanWorkSubmitForm } from "@/components/interaction/FanWorkSubmitForm";
import { featuredFanWorks } from "@/content/fanworks";

export default function WorksPage() {
  const [submitted, setSubmitted] = useState(0);

  return (
    <main className="works-page">
      <section className="memory-hero works-hero">
        <p className="landing-kicker">Fan Works</p>
        <h1>二创展示墙</h1>
        <p>投稿默认进入审核队列。此页只展示已审核或策展占位作品，不提供原始素材下载。</p>
      </section>

      <section className="works-content">
        <FanWorkGrid works={featuredFanWorks} />
        <div className="memory-form-card">
          <h2>提交作品</h2>
          <FanWorkSubmitForm onSubmitted={() => setSubmitted((value) => value + 1)} />
          {submitted > 0 && <p className="pending-count">{submitted} 件本地投稿已进入待审核队列。</p>}
        </div>
      </section>
    </main>
  );
}

