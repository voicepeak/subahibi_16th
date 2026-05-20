"use client";

import { useEffect, useRef, useState } from "react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("in"), delay); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`fi`}>{children}</div>;
}

export default function SunflowerPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="page-section first">
        <div className="sunflower-hero">
          <img src="/assets/ev8018.png" alt="" className="sunflower-hero-img" />
          <div className="sunflower-hero-overlay" />
        </div>
        <FadeIn>
          <div className="page-head" style={{ position: "relative", zIndex: 2 }}>
            <h1 className="page-title">向日葵の坂道</h1>
            <p className="page-sub">— Sunflower Hill —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={80}>
          <blockquote className="quote-card">
            <div className="quote-mark" aria-hidden="true" />
            <p className="quote-text">
              "没有必要给死者供花了……"
            </p>
            <cite className="quote-source">水上由岐</cite>
          </blockquote>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={160}>
          <div className="sunflower-body">
            <p className="sunflower-text">
              那一年夏天，我们回到了那个村子。
            </p>
            <p className="sunflower-text">
              向日葵依旧向着太阳，仿佛什么也不曾发生过。
            </p>
            <p className="sunflower-text">
              站在坡道上眺望，天空还是那片天空。
            </p>
            <p className="sunflower-text">
              什么都不曾改变，一切都已改变。
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={240}>
          <blockquote className="quote-card">
            <div className="quote-mark" aria-hidden="true" />
            <p className="quote-text">
              "幸福的每一天……<br />每一天都很幸福……<br />我便是生活在这样一个世界上……"
            </p>
            <cite className="quote-source">『素晴らしき日々 〜不連続存在〜』</cite>
          </blockquote>
        </FadeIn>
      </section>

      <div className="divider-rule" />
    </>
  );
}
