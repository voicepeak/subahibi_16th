"use client";

import {
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  GalleryHorizontal,
  ImageUp,
  Layers3,
  Lock,
  MessageSquare,
  Pin,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Vote,
  type LucideIcon
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { FanWork, Message, PollCategory } from "@/lib/types";

const TARGET_DATE = new Date("2026-07-20T00:00:00+09:00").getTime();
const ADMIN_PASSCODE = "admin2026";

const storageKeys = {
  messages: "subahibi16.v2.messages",
  works: "subahibi16.v2.fanworks",
  polls: "subahibi16.v2.polls",
  receipts: "subahibi16.v2.pollReceipts"
};

type PanelId = "messages" | "works" | "timeline" | "polls" | "about";

const chapterPanels: Array<{
  id: PanelId;
  label: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: "messages",
    label: "留言墙",
    eyebrow: "Message Wall",
    description: "短句、地区、头像，审核后进入公开墙。",
    icon: MessageSquare
  },
  {
    id: "works",
    label: "二创展厅",
    eyebrow: "Fan Works",
    description: "投稿、CG-like 视觉、外链与作者署名。",
    icon: GalleryHorizontal
  },
  {
    id: "timeline",
    label: "时间线",
    eyebrow: "Timeline",
    description: "以章节感整理 2010 到 2026 的节点。",
    icon: CalendarDays
  },
  {
    id: "polls",
    label: "投票箱",
    eyebrow: "Favorite Poll",
    description: "角色、章节、OST 与 CG 的轻量投票。",
    icon: Vote
  },
  {
    id: "about",
    label: "企划说明",
    eyebrow: "About",
    description: "非官方声明、版权边界与联系方式。",
    icon: BookOpen
  }
];

const cgScenes = [
  {
    title: "Rooftop / 2026",
    image: "/cg-rooftop.png",
    caption: "夏空、屋顶、远处电线，做成原创纪念站氛围图。"
  },
  {
    title: "Mirror Room",
    image: "/cg-mirror.png",
    caption: "镜面、低饱和蓝灰与一条红色信号线。"
  },
  {
    title: "Archive Desk",
    image: "/cg-archive.png",
    caption: "像视觉小说存档页一样的 CRT、纸张和旧噪声。"
  }
];

const countries = ["中国大陆", "中国台湾", "中国香港", "日本", "韩国", "美国", "欧洲", "东南亚", "其他"];

const seedMessages: Message[] = [
  {
    id: "seed-message-1",
    nickname: "skyline",
    country: "中国大陆",
    content: "十六年后的夏天，还是会想起那些难以言说的章节。",
    approved: true,
    pinned: true,
    createdAt: "2026-05-01T12:00:00.000Z"
  },
  {
    id: "seed-message-2",
    nickname: "madoromi",
    country: "日本",
    content: "祝 SubaHibi 16 周年。愿玩家们继续在同一片天空下重逢。",
    approved: true,
    pinned: false,
    createdAt: "2026-05-09T07:30:00.000Z"
  },
  {
    id: "seed-message-3",
    nickname: "mono-noise",
    country: "美国",
    content: "The OST still feels like summer static and a very old dream.",
    approved: true,
    pinned: false,
    createdAt: "2026-05-15T22:10:00.000Z"
  }
];

const seedWorks: FanWork[] = [
  {
    id: "seed-work-1",
    title: "Down the Rabbit-Hole VHS Study",
    author: "ao",
    description: "一张偏 VHS 质感的纪念插图草稿，用低饱和蓝灰和少量红色点缀。",
    sourceLink: "https://example.com",
    approved: true,
    createdAt: "2026-05-10T10:00:00.000Z"
  }
];

const seedPolls: PollCategory[] = [
  {
    id: "character",
    label: "最喜欢的角色",
    options: [
      { name: "Yuki", votes: 34 },
      { name: "Zakuro", votes: 29 },
      { name: "Kimika", votes: 22 },
      { name: "Takuji", votes: 18 }
    ]
  },
  {
    id: "chapter",
    label: "最喜欢的章节",
    options: [
      { name: "Down the Rabbit-Hole", votes: 31 },
      { name: "It's my own Invention", votes: 19 },
      { name: "Jabberwocky", votes: 24 },
      { name: "Wonderful Everyday", votes: 27 }
    ]
  },
  {
    id: "ost",
    label: "最喜欢的 OST",
    options: [
      { name: "Kuuki Rikigaku Shoujo to Shounen no Uta", votes: 42 },
      { name: "Yoru no Himawari", votes: 36 },
      { name: "Kagami no Sekai ni wa Watashi Shika Inai", votes: 21 },
      { name: "Owari no Sora", votes: 16 }
    ]
  },
  {
    id: "cg",
    label: "最喜欢的 CG 记忆",
    options: [
      { name: "夏空", votes: 28 },
      { name: "屋顶", votes: 25 },
      { name: "镜面", votes: 20 },
      { name: "终章", votes: 23 }
    ]
  }
];

const timeline = [
  {
    year: "2010",
    title: "原作发售",
    body: "作品发售，玩家社群开始沉淀文本讨论、音乐记忆和长线回声。"
  },
  {
    year: "2017",
    title: "海外版本",
    body: "英文版本推动更多视觉小说玩家接触作品，也让二创和长文感想继续扩散。"
  },
  {
    year: "2020",
    title: "十周年回望",
    body: "十周年后，围绕角色、章节和 OST 的再评价逐渐形成新的入口。"
  },
  {
    year: "2026",
    title: "十六周年企划",
    body: "短期纪念站开放留言、投稿、投票与时间线，用于聚合活动期内容。"
  }
];

function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      setValue(initialValue);
    } finally {
      setReady(true);
    }
  }, [key]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, ready, value]);

  return [value, setValue] as const;
}

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function useCountdown() {
  const [remaining, setRemaining] = useState(() => Math.max(TARGET_DATE - Date.now(), 0));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(Math.max(TARGET_DATE - Date.now(), 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  return [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds }
  ];
}

function IconButton({
  children,
  icon,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const styles = {
    primary: "bg-ink text-paper hover:bg-black",
    ghost: "bg-white/72 text-ink ring-1 ring-ink/12 hover:bg-white",
    danger: "bg-signal text-white hover:bg-[#9e3937]"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${styles[variant]}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export default function Home() {
  const countdown = useCountdown();
  const [messages, setMessages] = useStoredState<Message[]>(storageKeys.messages, seedMessages);
  const [fanWorks, setFanWorks] = useStoredState<FanWork[]>(storageKeys.works, seedWorks);
  const [polls, setPolls] = useStoredState<PollCategory[]>(storageKeys.polls, seedPolls);
  const [receipts, setReceipts] = useStoredState<Record<string, string>>(storageKeys.receipts, {});
  const [adminOpen, setAdminOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [activePanel, setActivePanel] = useState<PanelId>("messages");

  const approvedMessages = useMemo(
    () =>
      messages
        .filter((message) => message.approved)
        .sort((a, b) => Number(b.pinned) - Number(a.pinned) || Date.parse(b.createdAt) - Date.parse(a.createdAt)),
    [messages]
  );

  const pendingMessages = messages.filter((message) => !message.approved);
  const pendingWorks = fanWorks.filter((work) => !work.approved);
  const approvedWorks = fanWorks.filter((work) => work.approved);

  function openPanel(id: PanelId) {
    setActivePanel(id);
    window.requestAnimationFrame(() => {
      document.getElementById("chapters")?.scrollIntoView({ block: "start" });
    });
  }

  function approveMessage(id: string) {
    setMessages((items) => items.map((item) => (item.id === id ? { ...item, approved: true } : item)));
  }

  function removeMessage(id: string) {
    setMessages((items) => items.filter((item) => item.id !== id));
  }

  function togglePin(id: string) {
    setMessages((items) => items.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item)));
  }

  function approveWork(id: string) {
    setFanWorks((items) => items.map((item) => (item.id === id ? { ...item, approved: true } : item)));
  }

  function removeWork(id: string) {
    setFanWorks((items) => items.filter((item) => item.id !== id));
  }

  function voteFor(categoryId: string, optionName: string) {
    if (receipts[categoryId]) {
      return;
    }

    setPolls((items) =>
      items.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              options: category.options.map((option) =>
                option.name === optionName ? { ...option, votes: option.votes + 1 } : option
              )
            }
          : category
      )
    );
    setReceipts((items) => ({ ...items, [categoryId]: optionName }));
  }

  return (
    <main className="min-h-screen text-ink">
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/45 glass-strip">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-paper">16</span>
            <span>SubaHibi Anniversary</span>
          </a>
          <div className="hidden items-center gap-2 text-sm md:flex">
            {chapterPanels.map((panel) => (
              <button key={panel.id} className="rounded-md px-3 py-2 hover:bg-white/70" onClick={() => openPanel(panel.id)} type="button">
                {panel.label}
              </button>
            ))}
            <button className="rounded-md px-3 py-2 hover:bg-white/70" onClick={() => setAdminOpen(true)} type="button">
              Admin
            </button>
          </div>
        </nav>
      </header>

      <section
        id="top"
        className="hero-stage scanlines relative min-h-[92vh] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(247,247,242,0.97) 0%, rgba(247,247,242,0.86) 37%, rgba(247,247,242,0.38) 66%, rgba(23,23,24,0.18) 100%), url('/anniversary-hero.png')"
        }}
      >
        <div className="relative z-10 mx-auto grid min-h-[92vh] w-full max-w-7xl items-end gap-8 px-4 pb-8 pt-28 md:grid-cols-[0.92fr_1.08fr] md:px-8 md:pb-12">
          <div className="max-w-3xl pb-4">
            <p className="mb-4 inline-flex items-center gap-2 rounded-md bg-white/78 px-3 py-2 text-sm font-semibold text-dusk ring-1 ring-dusk/15">
              <Clock3 size={16} />
              2026.07.20 / Unofficial Fan Archive
            </p>
            <h1 className="hero-title text-5xl font-semibold leading-[1.02] md:text-7xl">SubaHibi 16th Anniversary</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-dusk">
              用章节入口、留言墙和原创 CG-like 视觉，做一个短期运营的粉丝纪念空间。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <IconButton icon={<MessageSquare size={18} />} onClick={() => openPanel("messages")}>
                写下留言
              </IconButton>
              <IconButton icon={<GalleryHorizontal size={18} />} variant="ghost" onClick={() => openPanel("works")}>
                进入展厅
              </IconButton>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_0.64fr]">
            <figure className="cg-frame min-h-[350px] overflow-hidden rounded-md bg-ink text-paper shadow-soft">
              <img alt="原创屋顶纪念视觉" className="h-full min-h-[350px] w-full object-cover" src="/cg-rooftop.png" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/72 p-4 backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase text-pollen">Anniversary CG 01</span>
                <h2 className="mt-1 text-2xl font-semibold">夏日屋顶记录</h2>
              </figcaption>
            </figure>
            <div className="grid gap-4">
              {cgScenes.slice(1).map((scene) => (
                <figure key={scene.title} className="cg-frame min-h-[166px] overflow-hidden rounded-md bg-ink text-paper shadow-soft">
                  <img alt={scene.title} className="h-full min-h-[166px] w-full object-cover" src={scene.image} />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/70 p-3 text-sm font-semibold backdrop-blur-sm">
                    {scene.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-band bg-ink px-4 py-8 text-paper md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1.6fr]">
          <div className="flex items-center gap-3">
            <Layers3 className="text-pollen" size={24} />
            <div>
              <p className="text-xs font-semibold uppercase text-paper/58">Memory Route</p>
              <h2 className="text-xl font-semibold">选择一个章节进入</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {countdown.map((item) => (
              <div key={item.label} className="rounded-md border border-paper/14 bg-paper/8 p-4">
                <div className="text-3xl font-semibold tabular-nums">{String(item.value).padStart(2, "0")}</div>
                <div className="mt-1 text-xs font-semibold uppercase text-paper/58">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="chapters" className="section-band chapter-shell px-4 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-signal">
              <Sparkles size={16} />
              Chapter Select
            </div>
            <div className="chapter-tabs grid gap-2">
              {chapterPanels.map((panel) => {
                const Icon = panel.icon;
                const active = panel.id === activePanel;

                return (
                  <button
                    key={panel.id}
                    className={`chapter-tab ${active ? "chapter-tab-active" : ""}`}
                    onClick={() => setActivePanel(panel.id)}
                    type="button"
                  >
                    <Icon size={18} />
                    <span>
                      <strong>{panel.label}</strong>
                      <small>{panel.eyebrow}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
            {activePanel === "messages" ? <MessagesPanel approvedMessages={approvedMessages} setMessages={setMessages} /> : null}
            {activePanel === "works" ? <WorksPanel approvedWorks={approvedWorks} setFanWorks={setFanWorks} /> : null}
            {activePanel === "timeline" ? <TimelinePanel /> : null}
            {activePanel === "polls" ? <PollPanel polls={polls} receipts={receipts} voteFor={voteFor} /> : null}
            {activePanel === "about" ? <AboutPanel /> : null}
          </div>
        </div>
      </section>

      <AdminPanel
        adminOpen={adminOpen}
        approveMessage={approveMessage}
        approveWork={approveWork}
        passcode={passcode}
        pendingMessages={pendingMessages}
        pendingWorks={pendingWorks}
        removeMessage={removeMessage}
        removeWork={removeWork}
        setAdminOpen={setAdminOpen}
        setPasscode={setPasscode}
        togglePin={togglePin}
      />
    </main>
  );
}

function SectionTitle({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-semibold text-signal">{kicker}</p>
      <h2 className="section-title text-3xl font-semibold md:text-5xl">{title}</h2>
      <p className="mt-4 leading-7 text-dusk">{body}</p>
    </div>
  );
}

function MessagesPanel({
  approvedMessages,
  setMessages
}: {
  approvedMessages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  return (
    <div className="panel-surface reveal-in">
      <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
        <div>
          <SectionTitle kicker="Message Wall" title="留言墙" body="留下昵称、地区与一句给 16 周年的话；公开展示前会先进入审核队列。" />
          <MessageForm setMessages={setMessages} />
        </div>
        <div className="message-lane grid content-start gap-4">
          {approvedMessages.map((message) => (
            <article key={message.id} className="rounded-md bg-white/86 p-5 shadow-soft ring-1 ring-ink/8">
              <div className="flex items-start gap-4">
                {message.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" className="h-12 w-12 rounded-md object-cover" src={message.avatarUrl} />
                ) : (
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-mist text-lg font-semibold text-dusk">
                    {message.nickname.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{message.nickname}</h3>
                    <span className="rounded-md bg-mist/70 px-2 py-1 text-xs text-dusk">{message.country}</span>
                    {message.pinned ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-pollen/30 px-2 py-1 text-xs font-semibold text-ink">
                        <Pin size={12} />
                        Pinned
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 leading-7 text-ink/88">{message.content}</p>
                  <time className="mt-4 block text-xs text-dusk">{formatDate(message.createdAt)}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorksPanel({
  approvedWorks,
  setFanWorks
}: {
  approvedWorks: FanWork[];
  setFanWorks: React.Dispatch<React.SetStateAction<FanWork[]>>;
}) {
  return (
    <div className="panel-surface reveal-in">
      <SectionTitle kicker="Fan Works" title="二创展厅" body="投稿区和原创 CG-like 氛围图放在同一个章节里，保留审核流和外链署名。" />
      <div className="mt-8 grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
        <FanWorkForm setFanWorks={setFanWorks} />
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            {cgScenes.map((scene) => (
              <figure key={scene.title} className="cg-frame min-h-[210px] overflow-hidden rounded-md bg-ink text-paper shadow-soft">
                <img alt={scene.title} className="h-full min-h-[210px] w-full object-cover transition duration-500 hover:scale-[1.035]" src={scene.image} />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/76 p-3 backdrop-blur-sm">
                  <h3 className="font-semibold">{scene.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-paper/70">{scene.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {approvedWorks.map((work) => (
              <article key={work.id} className="overflow-hidden rounded-md bg-white shadow-soft ring-1 ring-ink/8">
                <div className="aspect-[4/3] bg-mist">
                  {work.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="" className="h-full w-full object-cover" src={work.imageUrl} />
                  ) : (
                    <div className="flex h-full items-end bg-[url('/cg-archive.png')] bg-cover bg-center p-4">
                      <span className="rounded-md bg-white/80 px-3 py-2 text-sm font-semibold text-dusk">Fan Work</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{work.title}</h3>
                  <p className="mt-1 text-sm text-dusk">by {work.author}</p>
                  <p className="mt-3 leading-7 text-ink/82">{work.description}</p>
                  {work.sourceLink ? (
                    <a
                      className="mt-4 inline-flex items-center gap-2 rounded-md px-0 py-2 text-sm font-semibold text-signal hover:underline"
                      href={work.sourceLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Source
                      <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelinePanel() {
  return (
    <div className="panel-surface reveal-in">
      <SectionTitle kicker="Timeline" title="时间线" body="把周年信息做成章节式节点，避免和投稿、留言混在一个连续页面里。" />
      <div className="timeline-scroll mt-8 flex gap-4 overflow-x-auto pb-4">
        {timeline.map((item, index) => (
          <article key={item.year} className="min-w-[260px] rounded-md bg-white p-5 shadow-soft ring-1 ring-ink/8 md:min-w-[340px]">
            <div className="flex items-center justify-between gap-4">
              <div className="text-4xl font-semibold text-dusk">{item.year}</div>
              <span className="rounded-md bg-ink px-2 py-1 text-xs font-semibold text-paper">CH {index + 1}</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 leading-7 text-ink/78">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function PollPanel({
  polls,
  receipts,
  voteFor
}: {
  polls: PollCategory[];
  receipts: Record<string, string>;
  voteFor: (categoryId: string, optionName: string) => void;
}) {
  return (
    <div className="panel-surface reveal-in">
      <SectionTitle kicker="Favorite Poll" title="周年投票箱" body="每个类别在当前浏览器只能投一次，结果会即时更新。" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {polls.map((category) => {
          const total = category.options.reduce((sum, option) => sum + option.votes, 0);
          const voted = receipts[category.id];

          return (
            <article key={category.id} className="rounded-md bg-white p-5 shadow-soft ring-1 ring-ink/8">
              <div className="mb-4 flex items-center gap-2">
                <Vote size={18} className="text-dusk" />
                <h3 className="text-lg font-semibold">{category.label}</h3>
              </div>
              <div className="grid gap-3">
                {category.options.map((option) => {
                  const ratio = total === 0 ? 0 : Math.round((option.votes / total) * 100);
                  const selected = voted === option.name;

                  return (
                    <button
                      key={option.name}
                      type="button"
                      disabled={Boolean(voted)}
                      onClick={() => voteFor(category.id, option.name)}
                      className="rounded-md border border-dusk/15 bg-paper/72 p-3 text-left transition hover:border-tide disabled:cursor-default"
                    >
                      <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                        <span>{option.name}</span>
                        <span>{ratio}%</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-md bg-mist">
                        <div className={`h-full ${selected ? "bg-signal" : "bg-tide"}`} style={{ width: `${ratio}%` }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="panel-surface reveal-in">
      <SectionTitle kicker="About" title="非官方粉丝纪念企划" body="站点的边界、素材使用和短期运营目标集中放在说明章节里。" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <InfoBlock title="项目说明" body="本站用于 2026 年 7 月 20 日前后的短期纪念活动，聚合玩家留言、感想和二创。" />
        <InfoBlock title="非官方声明" body="本项目为粉丝自发企划，与原作版权方、发行方及相关公司没有从属关系。" />
        <InfoBlock title="素材版权" body="不分发游戏资源，不提供下载；展示内容以用户原创、少量引用和纪念性质为边界。" />
        <InfoBlock title="联系" body="Contact: subahibi16@example.com" />
      </div>
    </div>
  );
}

function MessageForm({ setMessages }: { setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) {
  const [nickname, setNickname] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [content, setContent] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [status, setStatus] = useState("");

  async function onAvatarChange(file?: File) {
    if (!file) {
      setAvatarUrl(undefined);
      return;
    }

    if (file.size > 1_200_000) {
      setStatus("头像图片请控制在 1.2MB 内。");
      return;
    }

    setAvatarUrl(await fileToDataUrl(file));
    setStatus("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nickname.trim() || !content.trim()) {
      setStatus("昵称和留言不能为空。");
      return;
    }

    const message: Message = {
      id: createId("message"),
      nickname: nickname.trim(),
      country,
      content: content.trim(),
      avatarUrl,
      approved: false,
      pinned: false,
      createdAt: new Date().toISOString()
    };

    setMessages((items) => [message, ...items]);
    setNickname("");
    setContent("");
    setAvatarUrl(undefined);
    setStatus("已进入待审核队列。");
  }

  return (
    <form className="mt-8 grid gap-4 rounded-md bg-white/86 p-5 shadow-soft ring-1 ring-ink/8" onSubmit={onSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="message-nickname">
            昵称
          </label>
          <input id="message-nickname" className="field px-3 py-2" maxLength={24} value={nickname} onChange={(event) => setNickname(event.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="message-country">
            国家/地区
          </label>
          <select id="message-country" className="field px-3 py-2" value={country} onChange={(event) => setCountry(event.target.value)}>
            {countries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <label className="grid gap-2 text-sm font-semibold" htmlFor="message-content">
        留言
      </label>
      <textarea id="message-content" className="field min-h-32 px-3 py-2" maxLength={280} value={content} onChange={(event) => setContent(event.target.value)} />
      <label className="grid gap-2 text-sm font-semibold" htmlFor="message-avatar">
        头像
      </label>
      <input id="message-avatar" accept="image/*" className="field px-3 py-2" type="file" onChange={(event) => onAvatarChange(event.target.files?.[0])} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="min-h-6 text-sm text-dusk">{status}</p>
        <IconButton type="submit" icon={<Send size={18} />}>
          Submit Message
        </IconButton>
      </div>
    </form>
  );
}

function FanWorkForm({ setFanWorks }: { setFanWorks: React.Dispatch<React.SetStateAction<FanWork[]>> }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [status, setStatus] = useState("");

  async function onImageChange(file?: File) {
    if (!file) {
      setImageUrl(undefined);
      return;
    }

    if (file.size > 2_000_000) {
      setStatus("投稿图片请控制在 2MB 内。");
      return;
    }

    setImageUrl(await fileToDataUrl(file));
    setStatus("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !author.trim() || !description.trim()) {
      setStatus("标题、作者和说明不能为空。");
      return;
    }

    const work: FanWork = {
      id: createId("work"),
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      sourceLink: sourceLink.trim() || undefined,
      imageUrl,
      approved: false,
      createdAt: new Date().toISOString()
    };

    setFanWorks((items) => [work, ...items]);
    setTitle("");
    setAuthor("");
    setDescription("");
    setSourceLink("");
    setImageUrl(undefined);
    setStatus("投稿已进入审核队列。");
  }

  return (
    <form className="grid gap-4 rounded-md bg-white/86 p-5 shadow-soft ring-1 ring-ink/8" onSubmit={onSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="work-title">
            标题
          </label>
          <input id="work-title" className="field px-3 py-2" maxLength={48} value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor="work-author">
            作者
          </label>
          <input id="work-author" className="field px-3 py-2" maxLength={32} value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
      </div>
      <label className="grid gap-2 text-sm font-semibold" htmlFor="work-description">
        说明
      </label>
      <textarea id="work-description" className="field min-h-28 px-3 py-2" maxLength={320} value={description} onChange={(event) => setDescription(event.target.value)} />
      <label className="grid gap-2 text-sm font-semibold" htmlFor="work-link">
        外链
      </label>
      <input id="work-link" className="field px-3 py-2" placeholder="Pixiv / X / 个人站链接" value={sourceLink} onChange={(event) => setSourceLink(event.target.value)} />
      <label className="grid gap-2 text-sm font-semibold" htmlFor="work-image">
        图片
      </label>
      <input id="work-image" accept="image/*" className="field px-3 py-2" type="file" onChange={(event) => onImageChange(event.target.files?.[0])} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="min-h-6 text-sm text-dusk">{status}</p>
        <IconButton type="submit" icon={<Upload size={18} />}>
          Submit Work
        </IconButton>
      </div>
    </form>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-ink/10 bg-white/72 p-5 shadow-soft">
      <h3 className="font-semibold text-signal">{title}</h3>
      <p className="mt-3 leading-7 text-ink/76">{body}</p>
    </div>
  );
}

function AdminPanel({
  adminOpen,
  approveMessage,
  approveWork,
  passcode,
  pendingMessages,
  pendingWorks,
  removeMessage,
  removeWork,
  setAdminOpen,
  setPasscode,
  togglePin
}: {
  adminOpen: boolean;
  approveMessage: (id: string) => void;
  approveWork: (id: string) => void;
  passcode: string;
  pendingMessages: Message[];
  pendingWorks: FanWork[];
  removeMessage: (id: string) => void;
  removeWork: (id: string) => void;
  setAdminOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPasscode: React.Dispatch<React.SetStateAction<string>>;
  togglePin: (id: string) => void;
}) {
  const unlocked = passcode === ADMIN_PASSCODE;

  if (!adminOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/62 p-4 backdrop-blur-sm">
      <div className="mx-auto my-8 max-w-5xl rounded-md bg-paper p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-signal">
              <ShieldCheck size={16} />
              Admin
            </p>
            <h2 className="text-2xl font-semibold">审核后台</h2>
          </div>
          <button className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-white" onClick={() => setAdminOpen(false)} type="button">
            Close
          </button>
        </div>

        {!unlocked ? (
          <form className="mt-6 grid max-w-sm gap-3" onSubmit={(event) => event.preventDefault()}>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="admin-passcode">
              Passcode
            </label>
            <input id="admin-passcode" className="field px-3 py-2" type="password" value={passcode} onChange={(event) => setPasscode(event.target.value)} />
            <div className="inline-flex items-center gap-2 text-sm text-dusk">
              <Lock size={16} />
              本地演示口令见 README。
            </div>
          </form>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ModerationList
              empty="暂无待审核留言"
              items={pendingMessages}
              title="留言审核"
              renderBody={(item) => (
                <>
                  <p className="font-semibold">
                    {item.nickname} / {item.country}
                  </p>
                  <p className="mt-2 leading-7 text-ink/78">{item.content}</p>
                </>
              )}
              renderActions={(item) => (
                <>
                  <IconButton icon={<Check size={16} />} onClick={() => approveMessage(item.id)}>
                    Approve
                  </IconButton>
                  <IconButton icon={<Pin size={16} />} variant="ghost" onClick={() => togglePin(item.id)}>
                    Pin
                  </IconButton>
                  <IconButton icon={<Trash2 size={16} />} variant="danger" onClick={() => removeMessage(item.id)}>
                    Delete
                  </IconButton>
                </>
              )}
            />

            <ModerationList
              empty="暂无待审核投稿"
              items={pendingWorks}
              title="投稿审核"
              renderBody={(item) => (
                <>
                  <p className="font-semibold">
                    {item.title} / {item.author}
                  </p>
                  <p className="mt-2 leading-7 text-ink/78">{item.description}</p>
                </>
              )}
              renderActions={(item) => (
                <>
                  <IconButton icon={<Check size={16} />} onClick={() => approveWork(item.id)}>
                    Approve
                  </IconButton>
                  <IconButton icon={<Trash2 size={16} />} variant="danger" onClick={() => removeWork(item.id)}>
                    Delete
                  </IconButton>
                </>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ModerationList<T extends { id: string }>({
  empty,
  items,
  renderActions,
  renderBody,
  title
}: {
  empty: string;
  items: T[];
  renderActions: (item: T) => React.ReactNode;
  renderBody: (item: T) => React.ReactNode;
  title: string;
}) {
  return (
    <section>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.length === 0 ? <p className="rounded-md bg-white p-5 text-dusk ring-1 ring-dusk/10">{empty}</p> : null}
        {items.map((item) => (
          <article key={item.id} className="rounded-md bg-white p-4 ring-1 ring-dusk/10">
            {renderBody(item)}
            <div className="mt-4 flex flex-wrap gap-2">{renderActions(item)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
