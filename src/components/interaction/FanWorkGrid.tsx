"use client";

import { ExternalLink } from "lucide-react";
import { type FeaturedFanWork } from "@/content/fanworks";

export function FanWorkGrid({ works }: { works: FeaturedFanWork[] }) {
  return (
    <div className="fanwork-grid">
      {works.map((work) => (
        <article key={work.id} className="fanwork-card">
          <img src={work.image} alt={work.title} loading="lazy" />
          <div>
            <h2>{work.title}</h2>
            <p>{work.description}</p>
            <footer>
              <span>{work.author}</span>
              {work.sourceLink && (
                <a href={work.sourceLink} target="_blank" rel="noreferrer" aria-label={`${work.title} 外链`} title="打开外链">
                  <ExternalLink size={15} />
                </a>
              )}
            </footer>
          </div>
        </article>
      ))}
    </div>
  );
}

