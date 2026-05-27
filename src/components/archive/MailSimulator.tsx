"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PhoneFrame } from "@/components/archive/PhoneFrame";
import { takashimaMails } from "@/content/takashima-mails";
import { readJson, removeStored, writeJson } from "@/lib/storage";
import { cn } from "@/lib/cn";

type StoredMailState = {
  subscriber: string;
  startedAt: number;
};

const STORAGE_KEY = "sky_archive_takashima";

export function MailSimulator({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [state, setState] = useState<StoredMailState | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    setState(readJson<StoredMailState | null>(STORAGE_KEY, null));
  }, []);

  useEffect(() => {
    if (!state) return;
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [state]);

  const delivered = useMemo(() => {
    if (!state) return [];
    const elapsed = now - state.startedAt;
    return takashimaMails.filter((mail) => elapsed >= mail.unlockDelayMs);
  }, [now, state]);

  const start = (event: React.FormEvent) => {
    event.preventDefault();
    const subscriber = name.trim() || "anonymous";
    const next = { subscriber, startedAt: Date.now() };
    writeJson(STORAGE_KEY, next);
    setState(next);
  };

  const reset = () => {
    removeStored(STORAGE_KEY);
    setState(null);
    setName("");
  };

  return (
    <div className={cn("mail-simulator", compact && "mail-simulator-compact")}>
      {!state && (
        <form className="mail-subscribe" onSubmit={start}>
          <label htmlFor="mail-name">昵称或邮箱</label>
          <div>
            <input
              id="mail-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="your name / email"
              maxLength={80}
            />
            <button type="submit">建立订阅</button>
          </div>
          <p>当前为站内短信模拟，不会发送真实邮件。解锁状态会保存在本机浏览器。</p>
        </form>
      )}

      <PhoneFrame time={delivered.at(-1)?.timestampLabel ?? "22:44"}>
        <div className="mail-phone-head">
          <span>Takashima Mail</span>
          {state && (
            <button type="button" onClick={reset} aria-label="重置短信体验" title="重置">
              <RotateCcw size={14} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="mail-bubbles">
          {!state && <p className="mail-placeholder">waiting for subscription...</p>}
          {state && delivered.length === 0 && <p className="mail-placeholder">signal searching...</p>}
          {delivered.map((mail) => (
            <article key={mail.id} className={cn("mail-bubble", `mail-bubble-${mail.severity}`)}>
              <span>{mail.timestampLabel}</span>
              <strong>{mail.subject}</strong>
              <p>{mail.body}</p>
            </article>
          ))}
        </div>
      </PhoneFrame>
    </div>
  );
}

