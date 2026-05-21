"use client";

import { useState, useEffect, useCallback } from "react";
import { MAIL_SEQUENCE, getDeliveredMails, getNextMailTime, type MailMessage } from "@/lib/takashima";

const STORAGE_KEY = "sb_takashima_sub";

interface SubData {
  email: string;
  subscribedAt: number;
}

function loadSub(): SubData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveSub(data: SubData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatTimeLeft(ms: number): string {
  const h = Math.floor(ms / (1000 * 60 * 60));
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (h > 24) return `${Math.floor(h / 24)}天${h % 24}小时`;
  if (h > 0) return `${h}小时${m}分`;
  return `${m}分钟`;
}

export function TakashimaSubscription() {
  const [sub, setSub] = useState<SubData | null>(null);
  const [email, setEmail] = useState("");
  const [mails, setMails] = useState<MailMessage[]>([]);
  const [nextIn, setNextIn] = useState<number | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const existing = loadSub();
    if (existing) setSub(existing);
  }, []);

  useEffect(() => {
    if (!sub) return;
    const update = () => {
      setMails(getDeliveredMails(sub.subscribedAt));
      setNextIn(getNextMailTime(sub.subscribedAt));
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, [sub]);

  const subscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const data: SubData = { email: email.trim(), subscribedAt: Date.now() };
    saveSub(data);
    setSub(data);
    setMails(getDeliveredMails(data.subscribedAt));
    setNextIn(getNextMailTime(data.subscribedAt));
  }, [email]);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSub(null);
    setMails([]);
    setNextIn(null);
    setOpenId(null);
  }, []);

  const progress = sub ? mails.length / MAIL_SEQUENCE.length : 0;

  if (!sub) {
    return (
      <div className="takashima-section">
        <div className="ticket-form-heading" style={{ marginBottom: "0.75rem" }}>
          订阅·高岛短信
          <span style={{ fontSize: "0.55rem", opacity: 0.3, display: "block", fontWeight: 400 }}>
            Takashima Mail Subscription
          </span>
        </div>
        <p className="takashima-desc">
          输入邮箱地址，你将开始收到来自高岛柘榴的短信。
          <br />
          <span style={{ fontSize: "0.6rem", opacity: 0.35 }}>
            Enter your email to receive the Takashima messages.
          </span>
        </p>
        <form className="takashima-form" onSubmit={subscribe}>
          <input
            className="ticket-form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
          <button className="ticket-form-submit" type="submit" style={{ marginTop: 0 }}>
            订阅 subscribe
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="takashima-section">
      <div className="takashima-header">
        <div className="takashima-header-left">
          <span className="takashima-header-label">高岛短信</span>
          <span className="takashima-header-sub">Takashima Mail</span>
        </div>
        <span className="takashima-header-email">{sub.email}</span>
        <button className="takashima-reset" onClick={reset} aria-label="取消订阅">
          ✕
        </button>
      </div>

      <div className="takashima-progress">
        <div className="takashima-progress-bar">
          <div className="takashima-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="takashima-progress-text">
          {mails.length} / {MAIL_SEQUENCE.length}
        </span>
      </div>

      {nextIn && mails.length < MAIL_SEQUENCE.length && (
        <p className="takashima-next">
          下一封将在 {formatTimeLeft(nextIn - Date.now())} 后送达
        </p>
      )}

      {mails.length === 0 && (
        <p className="takashima-empty">等待第一封短信的到来……</p>
      )}

      <div className="takashima-inbox">
        {mails.map((mail) => (
          <div key={mail.id} className="takashima-mail">
            <button
              className="takashima-mail-head"
              onClick={() => setOpenId(openId === mail.id ? null : mail.id)}
            >
              <span className="takashima-mail-sender">{mail.sender.split("@")[0].split("<")[0]}</span>
              <span className="takashima-mail-subject">{mail.subject}</span>
              <span className="takashima-mail-status">{openId === mail.id ? "▲" : "▼"}</span>
            </button>
            {openId === mail.id && (
              <div className="takashima-mail-body">
                <pre className="takashima-mail-text">{mail.body}</pre>
                <span className="takashima-mail-from">{mail.sender}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
