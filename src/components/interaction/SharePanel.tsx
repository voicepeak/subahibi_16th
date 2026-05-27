"use client";

import { Copy, Share2 } from "lucide-react";
import { useState } from "react";

export function SharePanel() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.origin;
    const title = "SubaHibi 16th Anniversary — The Sky Archive";
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button type="button" className="share-panel-button" onClick={share}>
      {copied ? <Copy size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
      <span>{copied ? "copied" : "share"}</span>
    </button>
  );
}

