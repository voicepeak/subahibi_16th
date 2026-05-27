"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { isSupabaseReady, supabase } from "@/lib/supabase";
import { readJson, writeJson } from "@/lib/storage";

const PENDING_WORKS_KEY = "sky_archive_pending_fanworks";

type PendingFanWork = {
  id: string;
  title: string;
  author: string;
  description: string;
  source_link?: string;
  image_url?: string;
  approved: false;
  created_at: string;
};

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function loadPendingFanWorks() {
  return readJson<PendingFanWork[]>(PENDING_WORKS_KEY, []);
}

export function savePendingFanWorks(works: PendingFanWork[]) {
  writeJson(PENDING_WORKS_KEY, works);
}

export function FanWorkSubmitForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const valid = title.trim() && author.trim() && description.trim();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!valid || state === "sending") return;
    setState("sending");

    const payload = {
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      source_link: sourceLink.trim() || null,
      image_url: imageUrl.trim() || null,
      approved: false,
    };

    if (isSupabaseReady()) {
      const { error } = await supabase!.from("fanworks").insert(payload);
      if (error) {
        setState("error");
        return;
      }
    } else {
      const pending = loadPendingFanWorks();
      pending.unshift({
        ...payload,
        source_link: payload.source_link ?? undefined,
        image_url: payload.image_url ?? undefined,
        id: makeId(),
        created_at: new Date().toISOString(),
        approved: false,
      });
      savePendingFanWorks(pending);
    }

    setTitle("");
    setAuthor("");
    setDescription("");
    setSourceLink("");
    setImageUrl("");
    setState("sent");
    onSubmitted?.();
  };

  return (
    <form className="fanwork-form" onSubmit={submit}>
      <div className="memory-form-row">
        <label>
          <span>title</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} placeholder="作品标题" />
        </label>
        <label>
          <span>author</span>
          <input value={author} onChange={(event) => setAuthor(event.target.value)} maxLength={80} placeholder="作者名" />
        </label>
      </div>
      <label>
        <span>description</span>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={800} rows={4} placeholder="简短说明" />
      </label>
      <div className="memory-form-row">
        <label>
          <span>source link</span>
          <input value={sourceLink} onChange={(event) => setSourceLink(event.target.value)} placeholder="https://..." />
        </label>
        <label>
          <span>image url</span>
          <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="可选展示图 URL" />
        </label>
      </div>
      <div className="memory-form-footer">
        <p>{state === "sent" ? "投稿已进入待审核队列。" : "投稿默认不公开，审核后展示。"}</p>
        {state === "error" && <p className="form-error">提交失败，请稍后再试。</p>}
        <button type="submit" disabled={!valid || state === "sending"}>
          <Send size={15} aria-hidden="true" />
          <span>{state === "sending" ? "sending" : "submit"}</span>
        </button>
      </div>
    </form>
  );
}

