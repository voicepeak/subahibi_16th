"use client";

import { cn } from "@/lib/cn";
import type { BulletinThread } from "@/content/bulletin";

export function BulletinThreadList({
  threads,
  activeId,
  onSelect,
}: {
  threads: BulletinThread[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="bulletin-thread-list">
      <p className="archive-panel-label">threads</p>
      {threads.map((thread, index) => (
        <button
          key={thread.id}
          type="button"
          className={cn("bulletin-thread-button", activeId === thread.id && "bulletin-thread-button-active")}
          onClick={() => onSelect(thread.id)}
        >
          <span className="bulletin-thread-no">{String(index + 1).padStart(2, "0")}</span>
          <span className="bulletin-thread-title">{thread.title}</span>
          <span className="bulletin-thread-meta">{thread.dateRange}</span>
        </button>
      ))}
    </div>
  );
}

