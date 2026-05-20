"use client";

import { useEffect, useRef, useState } from "react";
import { CGLightbox } from "@/components/CGLightbox";
import { TextShard } from "@/components/TextShard";

const CGS = [
  { src: "/assets/cg/main/ev0009.png", passage: "在人挤人的车站大楼的楼顶上……只有我一个人在这片天空下注视着这个世界。", chapter: "BGT1 序章 — 7月12日" },
  { src: "/assets/cg/main/ev0008b.png", passage: "由岐：我啊……是从什么时候开始存在于此的呢……从何时开始……我成为了我呢……", chapter: "BGT1 序章" },
  { src: "/assets/cg/main/ev7001.png", passage: "世界是我所看到、触摸到、感受到的东西。所以，世界和我没有差别。", chapter: "BGT4 偏在转生" },
  { src: "/assets/cg/main/ev6005.png", passage: "下一辆列车是特别快车，开往夏夜大三角。", chapter: "BGT6 银河铁道之夜" },
  { src: "/assets/cg/main/ev7010.png", passage: "悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是我。", chapter: "BGT4 — 假设" },
  { src: "/assets/cg/main/ev8011a.png", passage: "向日葵依旧向着太阳，仿佛什么也不曾发生过。", chapter: "BGT8 尾声 — 向日葵的坡道" },
  { src: "/assets/cg/main/ev8017.png", passage: "皆守：那……不是英雄会做的约定啊……", chapter: "BGT8 尾声" },
  { src: "/assets/cg/main/ev4006a.png", passage: "由岐：蝉的叫声……这里是……屋顶？为什么……为什么会在这里……", chapter: "终之空Ⅱ" },
  { src: "/assets/cg/main/ev4001a.png", passage: "彩名：没有什么……我们走吧……去那开始的地点……", chapter: "终之空Ⅱ" },
];

const SHARDS = [
  { text: "我们的情人，不过是随便借个名字，用幻想吹出来的肥皂泡。", source: "埃德蒙·罗斯坦《西哈诺·德·贝热拉克》" },
  { text: "这个周末并非世界末日，平淡无比。非常平凡的周末。他就在那里。", source: "BGT1 序章" },
  { text: "所以我才有办法喜欢上你。因为在那一刻你让我看到，你的世界，是不同于我的世界的另一个世界。", source: "第1卷" },
  { text: "这个世界，究竟何处才是尽头呢……", source: "水上由岐" },
  { text: "天空的起始和终焉……终焉和起始的天空……", source: "『终之空』" },
];

const QUOTES = [
  { text: "世界は、まだ続いている。", source: "『素晴日 〜不连续存在〜』" },
  { text: "幸福とは、ただそこにあるものではなく、自分自身で見つけ出すものだ。", source: "『素晴日 〜不连续存在〜』" },
];

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("in"); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`fi ${className}`}>{children}</div>;
}

export default function MemoriesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="page-section first">
        <div
          className="page-parallax"
          style={{ transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0002})` }}
        />
        <FadeIn>
          <div className="page-head">
            <h1 className="page-title">記憶</h1>
            <p className="page-sub">— Scene Archive —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <TextShard pool={SHARDS.slice(0, 2)} delay={100} />
      </section>

      <section className="page-section">
        <FadeIn>
          <CGLightbox images={CGS} />
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <TextShard pool={SHARDS.slice(2, 5)} delay={100} />
      </section>

      <section className="page-section page-section-narrow">
        {QUOTES.map((q, i) => (
          <FadeIn key={i}>
            <blockquote className="quote-card">
              <div className="quote-mark" aria-hidden="true" />
              <p className="quote-text">{q.text}</p>
              <cite className="quote-source">{q.source}</cite>
            </blockquote>
          </FadeIn>
        ))}
      </section>

      <div className="divider-rule" />
    </>
  );
}
