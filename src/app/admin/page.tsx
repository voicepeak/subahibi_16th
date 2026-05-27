"use client";

import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { loadPendingMessages, savePendingMessages, type PendingMessage } from "@/components/interaction/MessageForm";
import { loadPendingFanWorks, savePendingFanWorks } from "@/components/interaction/FanWorkSubmitForm";

type PendingFanWork = ReturnType<typeof loadPendingFanWorks>[number];

type RemoteState = {
  unavailable?: boolean;
  messages: Array<Record<string, string>>;
  fanworks: Array<Record<string, string>>;
  stats?: {
    messages: number;
    fanworks: number;
    subscriptions: number;
  };
};

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [remote, setRemote] = useState<RemoteState | null>(null);
  const [messages, setMessages] = useState<PendingMessage[]>([]);
  const [fanworks, setFanworks] = useState<PendingFanWork[]>([]);

  const refreshLocal = () => {
    setMessages(loadPendingMessages());
    setFanworks(loadPendingFanWorks());
  };

  const refreshRemote = async () => {
    if (!passcode) return;
    const response = await fetch("/api/admin/moderation", {
      headers: { "x-admin-passcode": passcode },
    });
    if (response.ok) setRemote(await response.json());
  };

  useEffect(() => {
    if (!unlocked) return;
    refreshLocal();
    refreshRemote();
  }, [unlocked]);

  const unlock = (event: React.FormEvent) => {
    event.preventDefault();
    setUnlocked(Boolean(passcode.trim()));
  };

  const removeLocalMessage = (id: string) => {
    const next = messages.filter((message) => message.id !== id);
    savePendingMessages(next);
    setMessages(next);
  };

  const removeLocalFanWork = (id: string) => {
    const next = fanworks.filter((work) => work.id !== id);
    savePendingFanWorks(next);
    setFanworks(next);
  };

  const moderateRemote = async (type: "messages" | "fanworks", id: string, action: "approve" | "reject") => {
    const response = await fetch("/api/admin/moderation", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-admin-passcode": passcode,
      },
      body: JSON.stringify({ type, id, action }),
    });
    if (response.ok) refreshRemote();
  };

  if (!unlocked) {
    return (
      <main className="admin-page">
        <section className="admin-gate">
          <p className="landing-kicker">Admin</p>
          <h1>审核后台</h1>
          <form onSubmit={unlock}>
            <input type="password" value={passcode} onChange={(event) => setPasscode(event.target.value)} placeholder="passcode" />
            <button type="submit">进入</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-dashboard">
        <div className="admin-dashboard-head">
          <div>
            <p className="landing-kicker">Admin</p>
            <h1>审核后台</h1>
          </div>
          <button type="button" onClick={() => { refreshLocal(); refreshRemote(); }}>刷新</button>
        </div>

        <div className="admin-stats">
          <span>pending messages: {remote?.stats?.messages ?? messages.length}</span>
          <span>pending works: {remote?.stats?.fanworks ?? fanworks.length}</span>
          <span>subscriptions: {remote?.stats?.subscriptions ?? 0}</span>
        </div>

        <section className="admin-panel">
          <h2>Supabase 待审核留言</h2>
          {remote?.messages.length ? remote.messages.map((message) => (
            <article key={message.id} className="admin-item">
              <p>{message.content}</p>
              <small>{message.nickname} / {message.country}</small>
              <div>
                <button type="button" onClick={() => moderateRemote("messages", message.id, "approve")} title="通过" aria-label="通过">
                  <Check size={15} />
                </button>
                <button type="button" onClick={() => moderateRemote("messages", message.id, "reject")} title="拒绝" aria-label="拒绝">
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          )) : <p className="admin-empty">暂无远端待审核留言。</p>}
        </section>

        <section className="admin-panel">
          <h2>本地待审核留言</h2>
          {messages.length ? messages.map((message) => (
            <article key={message.id} className="admin-item">
              <p>{message.content}</p>
              <small>{message.nickname} / {message.country}</small>
              <div>
                <button type="button" onClick={() => removeLocalMessage(message.id)} title="移除本地待审核项" aria-label="移除本地待审核项">
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          )) : <p className="admin-empty">暂无本地待审核留言。</p>}
        </section>

        <section className="admin-panel">
          <h2>二创投稿</h2>
          {remote?.fanworks.length ? remote.fanworks.map((work) => (
            <article key={work.id} className="admin-item">
              <p>{work.title}</p>
              <small>{work.author}</small>
              <div>
                <button type="button" onClick={() => moderateRemote("fanworks", work.id, "approve")} title="通过" aria-label="通过">
                  <Check size={15} />
                </button>
                <button type="button" onClick={() => moderateRemote("fanworks", work.id, "reject")} title="拒绝" aria-label="拒绝">
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          )) : null}
          {fanworks.length ? fanworks.map((work) => (
            <article key={work.id} className="admin-item">
              <p>{work.title}</p>
              <small>{work.author}</small>
              <div>
                <button type="button" onClick={() => removeLocalFanWork(work.id)} title="移除本地待审核项" aria-label="移除本地待审核项">
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          )) : <p className="admin-empty">暂无本地二创投稿。</p>}
        </section>
      </section>
    </main>
  );
}

