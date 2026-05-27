"use client";

import { useCallback, useEffect, useState } from "react";
import { seedMessages, type ApprovedMessage } from "@/content/memories";
import { isSupabaseReady, supabase } from "@/lib/supabase";
import { loadPendingMessages, type PendingMessage } from "@/components/interaction/MessageForm";

export function MessageWall({ refreshKey = 0 }: { refreshKey?: number }) {
  const [messages, setMessages] = useState<ApprovedMessage[]>(seedMessages);
  const [pending, setPending] = useState<PendingMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    if (isSupabaseReady()) {
      const { data } = await supabase!
        .from("messages")
        .select("id,nickname,country,content,pinned,created_at")
        .eq("approved", true)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });
      if (data) setMessages(data as ApprovedMessage[]);
      setPending([]);
    } else {
      setMessages(seedMessages);
      setPending(loadPendingMessages());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  return (
    <div className="memory-wall">
      <div className="memory-wall-head">
        <h2>Messages</h2>
        <span>{loading ? "loading" : `${messages.length} approved`}</span>
      </div>
      <div className="memory-grid">
        {messages.map((message, index) => (
          <article key={message.id} className="memory-note">
            <span>#{String(index + 1).padStart(3, "0")}</span>
            <p>{message.content}</p>
            <footer>
              <strong>{message.nickname}</strong>
              <small>{message.country ?? "unknown"}</small>
            </footer>
          </article>
        ))}
      </div>
      {pending.length > 0 && (
        <div className="pending-messages">
          <p>{pending.length} 条本地留言待审核</p>
          {pending.slice(0, 3).map((message) => (
            <span key={message.id}>{message.nickname}: {message.content.slice(0, 28)}</span>
          ))}
        </div>
      )}
    </div>
  );
}

