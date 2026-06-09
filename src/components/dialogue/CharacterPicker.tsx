"use client";

import type { DialogueCharacter } from "@/content/dialogue";

interface CharacterPickerProps {
  characters: DialogueCharacter[];
  selected: string;
  selectedVariant: string;
  onSelect: (id: string) => void;
  onVariantSelect: (id: string) => void;
}

export function CharacterPicker({
  characters,
  selected,
  selectedVariant,
  onSelect,
  onVariantSelect,
}: CharacterPickerProps) {
  const activeCharacter = characters.find((c) => c.id === selected) ?? characters[0];

  return (
    <div className="dialogue-section">
      <h3 className="dialogue-section-title">角色选择</h3>
      <div className="dialogue-chara-grid">
        {characters.map((c) => (
          <button
            type="button"
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
      {activeCharacter?.variants.length > 0 && (
        <div className="dialogue-variant-panel">
          <div className="dialogue-variant-head">
            <span>{activeCharacter.name}</span>
            <small>立绘替换</small>
          </div>
          <div className="dialogue-variant-row">
            {activeCharacter.variants.map((variant) => (
              <button
                type="button"
                key={variant.id}
                className={`dialogue-variant-thumb ${selectedVariant === variant.id ? "dialogue-variant-active" : ""}`}
                onClick={() => onVariantSelect(variant.id)}
                title={`${activeCharacter.name} / ${variant.label}`}
              >
                <img src={variant.sprite} alt="" loading="lazy" />
                <span>{variant.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
