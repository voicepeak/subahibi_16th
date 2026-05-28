"use client";

import type { DialogueCharacter } from "@/content/dialogue";

interface CharacterPickerProps {
  characters: DialogueCharacter[];
  selected: string;
  onSelect: (id: string) => void;
}

export function CharacterPicker({ characters, selected, onSelect }: CharacterPickerProps) {
  return (
    <div className="dialogue-section">
      <h3 className="dialogue-section-title">角色选择</h3>
      <div className="dialogue-chara-grid">
        {characters.map((c) => (
          <button
            key={c.id}
            className={`dialogue-chara-card ${selected === c.id ? "dialogue-chara-active" : ""}`}
            onClick={() => onSelect(c.id)}
          >
            <div className="dialogue-chara-fig">
              <img src={c.sprite} alt={c.name} loading="lazy" />
            </div>
            <span className="dialogue-chara-name">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
