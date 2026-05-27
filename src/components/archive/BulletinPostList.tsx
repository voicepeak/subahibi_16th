"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import type { BulletinThread } from "@/content/bulletin";

const PAGE_SIZE = 8;

export function BulletinPostList({ thread }: { thread: BulletinThread }) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = useMemo(() => {
    let posts = thread.posts;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      posts = posts.filter((post) =>
        post.content.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.authorId?.toLowerCase().includes(q)
      );
    }
    if (dateFilter) {
      posts = posts.filter((post) => post.datetime.includes(dateFilter));
    }
    return posts;
  }, [thread, query, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const posts = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [page, filtered]);

  const dates = useMemo(() => {
    const set = new Set<string>();
    thread.posts.forEach((post) => {
      const d = post.datetime.slice(0, 10);
      if (d) set.add(d);
    });
    return Array.from(set).sort();
  }, [thread]);

  return (
    <div className="bulletin-post-panel">
      <div className="bulletin-post-headline">
        <div>
          <h2>{thread.title}</h2>
          <p>{thread.summary}</p>
        </div>
        <span className={`danger-level danger-level-${thread.dangerLevel}`}>danger {thread.dangerLevel}</span>
      </div>

      <div className="bulletin-filters">
        <label className="bulletin-filter">
          <Search size={14} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            placeholder="搜索帖子..."
          />
        </label>
        <select
          className="bulletin-filter-select"
          value={dateFilter}
          onChange={(e) => { setDateFilter(e.target.value); setPage(0); }}
          aria-label="按日期过滤"
        >
          <option value="">全部日期</option>
          {dates.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <p className="bulletin-filter-count">{filtered.length} 条匹配 / {thread.posts.length} 条总计</p>

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

