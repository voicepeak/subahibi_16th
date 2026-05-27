"use client";

import type { BulletinThread } from "@/content/bulletin";

export function BulletinTimeline({ thread }: { thread: BulletinThread }) {
  const highlights = thread.posts.filter((post) => post.highlight).slice(0, 9);

  return (
    <aside className="bulletin-timeline">
      <p className="archive-panel-label">event timeline</p>
      <div className="bulletin-meter" aria-label={`恐惧指数 ${thread.dangerLevel}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={index < thread.dangerLevel ? "bulletin-meter-on" : ""} />
        ))}
      </div>
      <ol>
        {highlights.map((post) => (
          <li key={post.id}>
            <time>{post.datetime}</time>
            <span>No.{post.no}</span>
            <p>{post.content.slice(0, 56)}</p>
          </li>
        ))}
      </ol>
    </aside>
  );
}

