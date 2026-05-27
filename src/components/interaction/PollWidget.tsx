"use client";

import { useCallback, useEffect, useState } from "react";
import { isSupabaseReady, supabase } from "@/lib/supabase";
import { readJson, writeJson } from "@/lib/storage";

type PollOption = { name: string; votes: number };
type PollData = { category: string; label: string; options: PollOption[] };

const POLLS_LOCAL_KEY = "sky_archive_polls";
const VOTES_LOCAL_KEY = "sky_archive_user_votes";

const DEFAULT_POLLS: PollData[] = [
  {
    category: "favorite_scene",
    label: "最喜欢的章节/场景",
    options: [
      { name: "周五的楼顶", votes: 0 },
      { name: "高岛短信", votes: 0 },
      { name: "北校揭示板", votes: 0 },
      { name: "世界终结 7.20", votes: 0 },
      { name: "终之空", votes: 0 },
      { name: "幸福地生活", votes: 0 },
    ],
  },
  {
    category: "favorite_character",
    label: "最受触动的角色",
    options: [
      { name: "水上由岐", votes: 0 },
      { name: "间宫卓司", votes: 0 },
      { name: "高岛柘榴", votes: 0 },
      { name: "若槻镜", votes: 0 },
      { name: "间宫羽咲", votes: 0 },
      { name: "音无彩名", votes: 0 },
    ],
  },
];

export function PollWidget() {
  const [polls, setPolls] = useState<PollData[]>(DEFAULT_POLLS);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [sending, setSending] = useState<string | null>(null);

  const loadLocal = useCallback(() => {
    setPolls(readJson(POLLS_LOCAL_KEY, DEFAULT_POLLS));
    setVotes(readJson(VOTES_LOCAL_KEY, {}));
  }, []);

  useEffect(() => { loadLocal(); }, [loadLocal]);

  const vote = async (category: string, optionName: string) => {
    if (votes[category]) return;
    setSending(category);

    if (isSupabaseReady()) {
      try { await supabase!.rpc("increment_poll_vote", { p_category: category, p_option: optionName }); } catch {}
    } else {
      const next = polls.map((poll) => {
        if (poll.category !== category) return poll;
        return {
          ...poll,
          options: poll.options.map((opt) =>
            opt.name === optionName ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      });
      setPolls(next);
      writeJson(POLLS_LOCAL_KEY, next);
    }

    const nextVotes = { ...votes, [category]: optionName };
    setVotes(nextVotes);
    writeJson(VOTES_LOCAL_KEY, nextVotes);
    setSending(null);
  };

  return (
    <section className="poll-section">
      <h2>投票</h2>
      <p className="poll-desc">选择你在素晴日中最受触动的场景和角色。（localStorage 记录，不跟踪个人数据）</p>
      {polls.map((poll) => {
        const total = poll.options.reduce((s, o) => s + o.votes, 0) || 1;
        return (
          <div key={poll.category} className="poll-group">
            <h3>{poll.label}</h3>
            <div className="poll-options">
              {poll.options.map((opt) => {
                const pct = Math.round((opt.votes / total) * 100);
                const voted = votes[poll.category] === opt.name;
                const disabled = Boolean(votes[poll.category]) || sending === poll.category;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    className={`poll-option ${voted ? "poll-option-voted" : ""}`}
                    disabled={disabled}
                    onClick={() => vote(poll.category, opt.name)}
                    aria-label={`投票给 ${opt.name}，当前 ${opt.votes} 票`}
                  >
                    <span className="poll-bar" style={{ width: `${pct}%` }} />
                    <span className="poll-label">{opt.name}</span>
                    <span className="poll-count">{opt.votes}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
