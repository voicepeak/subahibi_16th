"use client";

interface DialogueEditorProps {
  characterName: string;
  text: string;
  onTextChange: (val: string) => void;
}

const MAX_CHARS = 200;

export function DialogueEditor({ characterName, text, onTextChange }: DialogueEditorProps) {
  const charCount = text.length;

  return (
    <div className="dialogue-section">
      <h3 className="dialogue-section-title">对话编辑</h3>
      <div className="dialogue-editor-field">
        <label className="dialogue-editor-label">角色名</label>
        <div className="dialogue-editor-fixed-name">{characterName}</div>
      </div>
      <div className="dialogue-editor-field">
        <label className="dialogue-editor-label">对话内容</label>
        <textarea
          className="dialogue-editor-textarea"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="输入你想让角色说的话……"
          maxLength={MAX_CHARS}
          rows={4}
        />
        <span className="dialogue-editor-count">{charCount} / {MAX_CHARS}</span>
      </div>
    </div>
  );
}
