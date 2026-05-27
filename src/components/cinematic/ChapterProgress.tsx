"use client";

import { cn } from "@/lib/cn";
import type { JourneyScene } from "@/content/journey-scenes";

export function ChapterProgress({ scenes, activeId }: { scenes: JourneyScene[]; activeId?: string }) {
  return (
    <aside className="chapter-progress" aria-label="章节进度">
      {scenes.map((scene, index) => (
        <a key={scene.id} className={cn("chapter-progress-dot", activeId === scene.id && "chapter-progress-dot-active")} href={`#${scene.id}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </a>
      ))}
    </aside>
  );
}

