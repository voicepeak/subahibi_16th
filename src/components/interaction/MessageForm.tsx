"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import { readJson, writeJson } from "@/lib/storage";

const PENDING_KEY = "sky_archive_pending_messages";

export type PendingMessage = {
  id: string;
  nickname: string;
  country: string;
  content: string;
  created_at: string;
  approved: false;
};

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function loadPendingMessages() {
  return readJson<PendingMessage[]>(PENDING_KEY, []);
}

export function savePendingMessages(messages: PendingMessage[]) {
  writeJson(PENDING_KEY, messages);
}

export function MessageForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [nickname, setNickname] = useState("");
  const [country, setCountry] = useState("");
  const [content, setContent] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const valid = nickname.trim().length > 0 && content.trim().length > 0;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!valid || state === "sending") return;

    setState("sending");
    const payload = {
      nickname: nickname.trim(),
      country: country.trim() || "unknown",
      content: content.trim(),
      approved: false,
    };

    if (isSupabaseReady()) {
      const { error } = await supabase!.from("messages").insert(payload);
      if (error) {
        setState("error");
        return;
      }
    } else {
      const pending = loadPendingMessages();
      pending.unshift({ ...payload, id: makeId(), created_at: new Date().toISOString(), approved: false });
      savePendingMessages(pending);
    }

    setNickname("");
    setCountry("");
    setContent("");
    setState("sent");
    onSubmitted?.();
  };

  return (
    <form className="memory-form" onSubmit={submit}>
      <div className="memory-form-row">
        <label>
          <span>name</span>
          <input value={nickname} onChange={(event) => setNickname(event.target.value)} maxLength={48} placeholder="昵称" />
        </label>
        <label>
          <span>place</span>
          <input value={country} onChange={(event) => setCountry(event.target.value)} maxLength={60} placeholder="所在地" />
        </label>
      </div>
      <label>
        <span>message</span>
        <textarea value={content} onChange={(event) => setContent(event.target.value)} maxLength={500} rows={4} placeholder="留下你的纪念" />
      </label>
      <div className="memory-form-footer">
        <p>{state === "sent" ? "已进入待审核队列。" : "公开展示前需要管理员审核。"}</p>
        {state === "error" && <p className="form-error">提交失败，请稍后再试。</p>}
        <button type="submit" disabled={!valid || state === "sending"}>
          <Send size={15} aria-hidden="true" />
          <span>{state === "sending" ? "sending" : "submit"}</span>
        </button>
      </div>
    </form>
  );
}

