"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

const vnActions = [
  { mark: "↧", label: "SAVE" },
  { mark: "↥", label: "LOAD" },
  { mark: "↧", label: "Q.SAVE" },
  { mark: "↥", label: "Q.LOAD" },
  { mark: "▷", label: "AUTO" },
  { mark: "▶▶", label: "SKIP" },
  { mark: "⚙", label: "CONFIG" },
  { mark: "⊠", label: "Hide W." },
];

const fallbackDialogueText = "在这里写下你想说的话……";

function formatDialogueText(value: string) {
  const line = value.trim() || fallbackDialogueText;
  if ((line.startsWith("「") && line.endsWith("」")) || (line.startsWith("『") && line.endsWith("』"))) {
    return line;
  }
  return `「${line}」`;
}

interface PreviewCanvasProps {
  charaId: string;
  bgSrc: string;
  charaSrc: string;
  charaName: string;
  text: string;
}

export function PreviewCanvas({ charaId, bgSrc, charaSrc, charaName, text }: PreviewCanvasProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const displayText = formatDialogueText(text);

  const handleDownload = async () => {
    if (!previewRef.current || exporting) return;
    setExporting(true);
    try {
      const rect = previewRef.current.getBoundingClientRect();
      const pixelRatio = rect.width > 0 ? 1280 / rect.width : 1;
      const dataUrl = await toPng(previewRef.current, {
        pixelRatio,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `subahibi_dialogue_${charaName}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      //
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="dialogue-preview-col">
      <div className="dialogue-preview-frame" data-chara={charaId} ref={previewRef}>
        <img src={bgSrc} alt="" className="dialogue-preview-bg" />
        <img src={charaSrc} alt={charaName} className="dialogue-preview-chara" />
        <div className="dialogue-preview-text-panel" aria-hidden="true" />
        <div className="dialogue-preview-name">{charaName || "——"}</div>
        <div className="dialogue-preview-text">{displayText}</div>
        <div className="dialogue-preview-actions" aria-hidden="true">
          {vnActions.map((action) => (
            <div className="dialogue-preview-action" key={action.label}>
              <span className="dialogue-preview-action-mark">{action.mark}</span>
              <span>{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="dialogue-download-btn"
        onClick={handleDownload}
        disabled={exporting}
      >
        <Download size={18} aria-hidden="true" />
        <span>{exporting ? "生成中…" : "下载 PNG"}</span>
      </button>
    </div>
  );
}
