"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { BulletinThread } from "@/content/bulletin";

const PAGE_SIZE = 8;

export function BulletinPostList({ thread }: { thread: BulletinThread }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(thread.posts.length / PAGE_SIZE));
  const posts = useMemo(() => {
    const start = page * PAGE_SIZE;
    return thread.posts.slice(start, start + PAGE_SIZE);
  }, [page, thread]);

  return (
    <div className="bulletin-post-panel">
      <div className="bulletin-post-headline">
        <div>
          <h2>{thread.title}</h2>
          <p>{thread.summary}</p>
        </div>
        <span className={`danger-level danger-level-${thread.dangerLevel}`}>danger {thread.dangerLevel}</span>
      </div>

      <div className="bulletin-post-list">
        {posts.map((post) => (
          <article key={post.id} className={cn("bulletin-post", post.highlight && "bulletin-post-highlight")}>
            <header>
              <span className="bulletin-post-no">No.{post.no}</span>
              <strong>{post.author}</strong>
              <span>{post.datetime}</span>
              {post.authorId && <span>ID:{post.authorId}</span>}
            </header>
            <p>{post.content}</p>
            <footer>
              <span>fear {post.fearScore ?? thread.dangerLevel}</span>
              <span>rumor {post.rumorScore ?? 1}</span>
              {post.tags?.map((tag) => <span key={tag}>{tag}</span>)}
            </footer>
          </article>
        ))}
      </div>

      <div className="bulletin-pager">
        <button type="button" onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={page === 0} aria-label="上一页" title="上一页">
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <span>{page + 1} / {totalPages}</span>
        <button type="button" onClick={() => setPage((value) => Math.min(totalPages - 1, value + 1))} disabled={page >= totalPages - 1} aria-label="下一页" title="下一页">
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

