"use client";

import { useRef } from "react";
import type { DialogueBackground } from "@/content/dialogue";
import { Upload } from "lucide-react";

interface BackgroundPickerProps {
  backgrounds: DialogueBackground[];
  selected: string;
  onSelect: (id: string) => void;
  customBg: string | null;
  onCustomBg: (dataUrl: string) => void;
}

const groupLabels: Record<string, string> = {
  day: "晴日", sunset: "黄昏", night: "夜晚", fantasy: "幻想",
};

export function BackgroundPicker({ backgrounds, selected, onSelect, customBg, onCustomBg }: BackgroundPickerProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onCustomBg(reader.result);
        onSelect("__custom__");
      }
    };
    reader.readAsDataURL(file);
  };

  const groups = [...new Set(backgrounds.map((b) => b.group))];

  return (
    <div className="dialogue-section">
      <h3 className="dialogue-section-title">背景选择</h3>

      <div className="dialogue-upload-row">
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <button className="dialogue-upload-btn" onClick={() => fileRef.current?.click()}>
          <Upload size={16} aria-hidden="true" />
          <span>上传自定义背景</span>
        </button>
        {customBg && (
          <button className="dialogue-upload-clear" onClick={() => { onCustomBg(""); onSelect("bg1015a"); }}>
            清除
          </button>
        )}
      </div>

      {groups.map((g) => (
        <div key={g} className="dialogue-bg-group">
          <span className="dialogue-bg-group-label">{groupLabels[g]}</span>
          <div className="dialogue-bg-row">
            {backgrounds
              .filter((b) => b.group === g)
              .map((b) => (
                <button
                  key={b.id}
                  className={`dialogue-bg-thumb ${selected === b.id ? "dialogue-bg-active" : ""}`}
                  onClick={() => onSelect(b.id)}
                  title={b.label}
                >
                  <img src={b.src} alt={b.label} loading="lazy" />
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
