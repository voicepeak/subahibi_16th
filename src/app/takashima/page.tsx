"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TakashimaSubscription } from "@/components/TakashimaSubscription";

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, delay: delay / 1000, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
      });
    }, el);
    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

export default function TakashimaPage() {
  return (
    <>
      <section className="page-section first">
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/phone-cg.png")` }} />
        <div className="page-parallax" />
        <FadeInSection>
          <div className="page-head">
            <h1 className="page-title">高岛短信</h1>
            <p className="page-sub">— Takashima Mail —</p>
          </div>
        </FadeInSection>
      </section>

      <section className="page-section page-section-narrow">
        <FadeInSection delay={80}>
          <div className="takashima-hero">
            <img src="/assets/chara-zk.png" alt="" className="takashima-chara" loading="lazy" />
            <blockquote className="quote-card" style={{ margin: "0" }}>
              <div className="quote-mark" aria-hidden="true" />
              <p className="quote-text">
                "被封印的阿萨使用物理特化符虫，向我们人类注入邪恶的思想。"
              </p>
              <cite className="quote-source">高岛柘榴 · 2012/07/11</cite>
            </blockquote>
          </div>
        </FadeInSection>
      </section>

      <section className="page-section page-section-narrow">
        <FadeInSection delay={120}>
          <p className="takashima-intro">
            2012年7月，校内揭示板上开始出现来自高岛柘榴的短信。
            最初只是被视为恶作剧，但随着短信内容越发具体、越发黑暗，
            恐惧开始在学生之间蔓延——
          </p>
        </FadeInSection>
      </section>

      <section className="page-section page-section-narrow">
        <FadeInSection delay={160}>
          <TakashimaSubscription />
        </FadeInSection>
      </section>

      <div className="divider-rule" />
    </>
  );
}
