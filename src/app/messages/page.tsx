"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import type { Message } from "@/lib/types";
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("in"), delay); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`fi fi-up`}>{children}</div>;
}

function TicketCard({ msg, index }: { msg: Message; index: number }) {
  const ts = new Date(msg.createdAt);
  const dateStr = `${ts.getFullYear()}.${String(ts.getMonth() + 1).padStart(2, "0")}.${String(ts.getDate()).padStart(2, "0")}`;
  const timeStr = `${String(ts.getHours()).padStart(2, "0")}:${String(ts.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="ticket-card">
      <div className="ticket-head">
        <span className="ticket-num">№ {String(index + 1).padStart(4, "0")}</span>
        <span className="ticket-route">{msg.country} → 夏夜大三角</span>
      </div>
      <div className="ticket-body">
        <span className="ticket-name">{msg.nickname}</span>
        <p className="ticket-content">{msg.content}</p>
      </div>
      <div className="ticket-foot">
        <span className="ticket-time">{dateStr} · {timeStr}</span>
      </div>
      <div className="ticket-perf" aria-hidden="true" />
    </div>
  );
}

function genId() { return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`; }

function loadLocal(): Message[] {
  try {
    return JSON.parse(localStorage.getItem("sb_messages") || "[]");
  } catch { return []; }
}

function saveLocal(msgs: Message[]) {
  try { localStorage.setItem("sb_messages", JSON.stringify(msgs)); } catch {}
}

type FormState = "idle" | "sending" | "sent" | "error";

function MessageForm({ onSent }: { onSent: () => void }) {
  const [nickname, setNickname] = useState("");
  const [country, setCountry] = useState("");
  const [content, setContent] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const valid = nickname.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || state === "sending") return;

    if (isSupabaseReady()) {
      setState("sending");
      const { error } = await supabase!.from("messages").insert({
        nickname: nickname.trim(),
        country: country.trim() || "未知",
        content: content.trim(),
      });
      if (error) { setState("error"); return; }
      setState("sent");
      setNickname(""); setCountry(""); setContent("");
      onSent();
      return;
    }

    setState("sending");
    const msg: Message = {
      id: genId(),
      nickname: nickname.trim(),
      country: country.trim() || "未知",
      content: content.trim(),
      approved: true,
      pinned: false,
      createdAt: new Date().toISOString(),
    };
    const msgs = loadLocal();
    msgs.unshift(msg);
    saveLocal(msgs);
    setState("sent");
    setNickname(""); setCountry(""); setContent("");
    onSent();
  };

  if (state === "sent") {
    return (
      <FadeIn>
        <div className="form-sent">
          <div className="form-sent-mark" aria-hidden="true" />
          <p className="form-sent-text">你的信已送达</p>
          <p className="form-sent-sub">还会再寄来新的信吗？</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div className="ticket-form-field">
        <label className="ticket-form-label">
          <span className="ticket-form-lang">名字</span>
          <span className="ticket-form-sub">name</span>
        </label>
        <input
          className="ticket-form-input"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="你的名字"
          maxLength={48}
          disabled={state === "sending"}
        />
      </div>
      <div className="ticket-form-field">
        <label className="ticket-form-label">
          <span className="ticket-form-lang">所在地</span>
          <span className="ticket-form-sub">station</span>
        </label>
        <input
          className="ticket-form-input"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="你所在的城市或国度"
          maxLength={60}
          disabled={state === "sending"}
        />
      </div>
      <div className="ticket-form-field">
        <label className="ticket-form-label">
          <span className="ticket-form-lang">留言</span>
          <span className="ticket-form-sub">message</span>
        </label>
        <textarea
          className="ticket-form-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="把信拿去吧……"
          maxLength={500}
          rows={3}
          disabled={state === "sending"}
        />
        <span className="ticket-form-count">{content.length} / 500</span>
      </div>
      {state === "error" && (
        <p className="ticket-form-error">发送失败，请稍后再试。</p>
      )}
      <button
        className="ticket-form-submit"
        type="submit"
        disabled={!valid || state === "sending"}
      >
        {state === "sending" ? "寄出中…" : "寄出"}
      </button>
    </form>
  );
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = useCallback(async () => {
    if (isSupabaseReady()) {
      const { data } = await supabase!
        .from("messages")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      if (data) setMessages(data as Message[]);
    } else {
      setMessages(loadLocal());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return (
    <>
      <section className="page-section first">
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/cg/main/ev0009.png")` }} />
        <div className="page-parallax" />
        <FadeIn>
          <div className="page-head">
            <h1 className="page-title">银河铁道</h1>
            <p className="page-sub">— Message Board —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={80}>
          <blockquote className="quote-card">
            <div className="quote-mark" aria-hidden="true" />
            <p className="quote-text">
              "下一辆列车是特别快车，开往夏夜大三角。"
            </p>
            <cite className="quote-source">『素晴日 〜不连续存在〜』</cite>
          </blockquote>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={160}>
          <div className="ticket-form-wrap">
            <h2 className="ticket-form-heading">车票 · ticket</h2>
            <MessageForm onSent={loadMessages} />
          </div>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={240}>
          <h2 className="ticket-board-heading">
            留言 · messages
            <span className="ticket-board-count">{loading ? "" : `(${messages.length})`}</span>
          </h2>
        </FadeIn>

        {loading && (
          <p className="ticket-empty">加载中…</p>
        )}

        {!loading && messages.length === 0 && (
          <p className="ticket-empty">等待第一位乘客</p>
        )}

        {!loading && messages.length > 0 && (
          <div className="ticket-board">
            {messages.map((msg, i) => (
              <FadeIn key={msg.id} delay={Math.min(i * 40, 400)}>
                <TicketCard msg={msg} index={messages.length - 1 - i} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      <div className="divider-rule" />
    </>
  );
}
