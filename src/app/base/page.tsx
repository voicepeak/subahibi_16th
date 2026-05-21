"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface BaseObject {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: string;
  title: string;
  text: string;
  found: boolean;
}

const BASE_OBJECTS: BaseObject[] = [
  {
    id: "notebook",
    label: "笔记本",
    x: 28, y: 52,
    icon: "\u{1F4D3}",
    title: "间宫卓司的日记",
    text: "7月2日。今天又去了那个秘密基地。\n这里很臭，但很安全。没有人会找到这里。\n母亲的声音又在我脑子里响起来了。\n她说我是救世主。\n但救世主为什么会被欺负呢？",
    found: false,
  },
  {
    id: "knife",
    label: "军用匕首",
    x: 65, y: 58,
    icon: "\u{1F5E1}",
    title: "军刀-EXTREMA RATIO",
    text: "从橘希实香那里没收来的军用匕首。\n「因为我是死宅，所以才会带军用匕首。」\n间宫卓司这样对自己解释。\n但在匕首的刀刃上，反射着他自己都未曾察觉的凶光。",
    found: false,
  },
  {
    id: "phone",
    label: "手机",
    x: 45, y: 45,
    icon: "\u{1F4F1}",
    title: "收到的新短信",
    text: "我借由死亡重生为战士\n本应该是这样\n好痛\n明明没有身体却好痛\n变成这样好痛\n因此\n大家都会死\n所有人肯定都会死。\n——发信人: 高岛柘榴",
    found: false,
  },
  {
    id: "doll",
    label: "莉露露",
    x: 72, y: 38,
    icon: "\u{1F38E}",
    title: "布偶-莉露露",
    text: "间宫卓司最珍视的莉露露酱。\n「不会有人来救你的。\n因为你的神已经死了。」\n在空荡的地下室里，他对着布偶自言自语。\n仿佛在对自己说话。",
    found: false,
  },
  {
    id: "book",
    label: "《西哈诺》",
    x: 20, y: 40,
    icon: "\u{1F4D6}",
    title: "《西哈诺-德-贝热拉克》",
    text: "埃德蒙-罗斯坦的戏剧。\n间宫卓司借给高岛柘榴的书。\n「拿去吧——由于不是出自真心，话就说得格外动听!」\n书页间夹着一片枯萎的四叶草。\n那是谁留下的呢？",
    found: false,
  },
  {
    id: "photo",
    label: "照片",
    x: 52, y: 28,
    icon: "\u{1F4F7}",
    title: "褪色的照片",
    text: "一个女人的照片。背面写着「母亲」。\n间宫琴美——被白莲华协会利用的女人。\n她相信自己的儿子是救世主，\n于是毁掉了整个家庭。\n照片上的她，笑得很温柔。",
    found: false,
  },
  {
    id: "pills",
    label: "药瓶",
    x: 38, y: 62,
    icon: "\u{1F48A}",
    title: "空药瓶",
    text: "抗抑郁药的瓶子。已经空了。\n间宫卓司并没有真的吃药。\n他只是把药扔掉，然后告诉母亲他吃了。\n「药物会让救世主的力量变弱的。」\n他是这样对母亲解释的。",
    found: false,
  },
];

export default function SecretBasePage() {
  const [objects, setObjects] = useState(BASE_OBJECTS);
  const [focus, setFocus] = useState<BaseObject | null>(null);
  const [foundCount, setFoundCount] = useState(0);
  const [allFound, setAllFound] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((obj: BaseObject) => {
    if (!obj.found) {
      setObjects(prev => prev.map(o => o.id === obj.id ? { ...o, found: true } : o));
      setFoundCount(prev => prev + 1);
    }
    setFocus(obj);
  }, []);

  useEffect(() => {
    if (foundCount === objects.length) setAllFound(true);
  }, [foundCount, objects.length]);

  const close = useCallback(() => setFocus(null), []);

  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus, close]);

  return (
    <>
      <section className="page-section first" style={{ minHeight: "80vh" }}>
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/bg/bg1022a.png")`, opacity: 0.06 }} />
        <div className="page-parallax" />
        <div className="page-head">
          <h1 className="page-title">秘密基地</h1>
          <p className="page-sub">— Underground Shelter —</p>
        </div>
      </section>

      <section ref={sectionRef} className="page-section page-section-narrow base-room-section">
        <div className="base-room">
          <div className="base-bg-layer">
            <img src="/assets/bg/bg1022a.png" alt="" className="base-bg-img" />
            <div className="base-bg-overlay" />
          </div>

          <div className="base-drip-counter">
            {Array.from({ length: foundCount }).map((_, i) => (
              <span key={i} className="base-drip-drop" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>

          <div className="base-hint">
            <span className="base-hint-text">
              {allFound
                ? "所有秘密都已揭开……"
                : `找到 ${foundCount} / ${objects.length} 件遗物`}
            </span>
            <div className="base-hint-bar">
              <div className="base-hint-fill" style={{ width: `${(foundCount / objects.length) * 100}%` }} />
            </div>
          </div>

          <div className="base-explore">
            {objects.map((obj) => (
              <button
                key={obj.id}
                className={`base-item${obj.found ? " base-item-found" : ""}`}
                style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                onClick={() => handleClick(obj)}
                aria-label={obj.label}
              >
                <span className="base-item-icon">
                  {obj.found ? "\u25C9" : "\u25CB"}
                </span>
                <span className="base-item-label">{obj.label}</span>
              </button>
            ))}
          </div>

          {allFound && (
            <div className="base-complete">
              <div className="base-complete-line" />
              <p className="base-complete-text">你知晓了这里所有的秘密。但真相远不止于此。</p>
              <div className="base-complete-line" />
            </div>
          )}
        </div>
      </section>

      <section className="page-section page-section-narrow">
        <blockquote className="quote-card">
          <div className="quote-mark" aria-hidden="true" />
          <p className="quote-text" style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)" }}>
            "要是没这地方，就是最好不过的秘密基地了……"
          </p>
          <cite className="quote-source">间宫卓司 · 2012年7月</cite>
        </blockquote>
      </section>

      <div className="divider-rule" />

      {focus && (
        <div className="base-overlay" onClick={close}>
          <div className="base-modal" onClick={(e) => e.stopPropagation()}>
            <div className="base-modal-icon">{focus.icon}</div>
            <p className="base-modal-title">{focus.title}</p>
            <div className="base-modal-mark" />
            <p className="base-modal-text">{focus.text}</p>
            <button className="base-modal-close" onClick={close}>闭</button>
          </div>
        </div>
      )}
    </>
  );
}
