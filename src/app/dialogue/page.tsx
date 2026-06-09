"use client";

import { useState } from "react";
import { dialogueCharacters, dialogueBackgrounds } from "@/content/dialogue";
import { CharacterPicker } from "@/components/dialogue/CharacterPicker";
import { BackgroundPicker } from "@/components/dialogue/BackgroundPicker";
import { DialogueEditor } from "@/components/dialogue/DialogueEditor";
import { PreviewCanvas } from "@/components/dialogue/PreviewCanvas";
import "@/components/dialogue/dialogue.css";

export default function DialoguePage() {
  const [charId, setCharId] = useState("yk");
  const [variantByChar, setVariantByChar] = useState<Record<string, string>>({});
  const [bgId, setBgId] = useState("bg1015a");
  const [customBg, setCustomBg] = useState<string | null>(null);
  const [text, setText] = useState("");

  const character = dialogueCharacters.find((c) => c.id === charId) ?? dialogueCharacters[0];
  const selectedVariantId = variantByChar[character.id] ?? character.variants[0]?.id ?? "default";
  const variant = character.variants.find((item) => item.id === selectedVariantId) ?? character.variants[0];
  const displayName = character.dialogueName;
  const charaSrc = variant?.sprite ?? character.sprite;
  const bgSrc = customBg || dialogueBackgrounds.find((b) => b.id === bgId)?.src || dialogueBackgrounds[0].src;

  const handleVariantSelect = (variantId: string) => {
    setVariantByChar((current) => ({ ...current, [character.id]: variantId }));
  };

  return (
    <>
      <section className="page-section first">
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/bg/bg1015a.png")` }} />
        <div className="page-parallax" />
        <div className="page-head">
          <h1 className="page-title">对话</h1>
          <p className="page-sub">— Dialogue Composer —</p>
        </div>
      </section>

      <section className="dialogue-layout">
        <div className="dialogue-controls">
          <CharacterPicker
            characters={dialogueCharacters}
            selected={charId}
            selectedVariant={selectedVariantId}
            onSelect={(id) => { setCharId(id); }}
            onVariantSelect={handleVariantSelect}
          />

          <BackgroundPicker
            backgrounds={dialogueBackgrounds}
            selected={bgId}
            onSelect={setBgId}
            customBg={customBg}
            onCustomBg={setCustomBg}
          />

          <DialogueEditor
            characterName={displayName}
            text={text}
            onTextChange={setText}
          />
        </div>

        <PreviewCanvas
          charaId={character.id}
          bgSrc={bgSrc}
          charaSrc={charaSrc}
          charaName={displayName}
          text={text}
        />
      </section>

      <div className="divider-rule" />
    </>
  );
}
