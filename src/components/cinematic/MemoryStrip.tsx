"use client";

import { useCallback, useState } from "react";
import { X } from "lucide-react";
import type { VisualAsset } from "@/content/assets";

export function MemoryStrip({ assets }: { assets: VisualAsset[] }) {
  const [lightbox, setLightbox] = useState<VisualAsset | null>(null);

  const open = useCallback((asset: VisualAsset) => setLightbox(asset), []);
  const close = useCallback(() => setLightbox(null), []);

  return (
    <>
      <section className="memory-strip" aria-label="纪念影像胶片条">
        <div className="memory-strip-track">
          {assets.concat(assets).map((asset, index) => (
            <button
              key={`${asset.src}-${index}`}
              type="button"
              className="memory-strip-frame"
              onClick={() => open(asset)}
              aria-label={`查看 ${asset.alt}`}
            >
              <img src={asset.src} alt={asset.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {lightbox && (
        <div className="memory-lightbox" onClick={close} role="dialog" aria-modal="true" aria-label={lightbox.alt}>
          <button type="button" className="memory-lightbox-close" onClick={close} aria-label="关闭">
            <X size={20} aria-hidden="true" />
          </button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
          <p>{lightbox.alt}</p>
        </div>
      )}
    </>
  );
}
