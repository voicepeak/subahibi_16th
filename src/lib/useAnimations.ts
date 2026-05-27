"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ duration: 0.7, ease: "power2.out" });

/* ─── Page entry: stagger-fade children ─── */
export function usePageEntry(ref: React.RefObject<HTMLElement | null>, deps: any[] = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const kids = el.querySelectorAll<HTMLElement>(".fi, [data-reveal]");
    if (!kids.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        kids,
        { y: 30, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1, stagger: 0.08, duration: 0.7, ease: "power2.out", delay: 0.15 }
      );
    }, el);
    return () => ctx.revert();
  }, deps);
}

/* ─── Stagger from below on scroll ─── */
export function useStaggerReveal(
  ref: React.RefObject<HTMLElement | null>,
  selector = ".fi, [data-reveal]",
  opts = { stagger: 0.07, y: 40 }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const kids = el.querySelectorAll<HTMLElement>(selector);
    if (!kids.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(kids, { y: opts.y, opacity: 0 }, {
        y: 0, opacity: 1, stagger: opts.stagger, duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    }, el);
    return () => ctx.revert();
  }, []);
}

/* ─── Simple fade-in on scroll ─── */
export function useFadeIn(ref: React.RefObject<HTMLElement | null>, start = "top 88%") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      });
    }, el);
    return () => ctx.revert();
  }, []);
}

/* ─── Parallax hover on cards ─── */
export function useCardHover(ref: React.RefObject<HTMLElement | null>, strength = 6) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(el, { rotationX: -y * strength, rotationY: x * strength, duration: 0.35, ease: "power1.out" });
      };
      const onLeave = () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
    }, el);
    return () => ctx.revert();
  }, []);
}

/* ─── BG parallax on scroll ─── */
export function useBgParallax(ref: React.RefObject<HTMLElement | null>, speed = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => window.innerHeight * 0.15 * speed,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);
}

/* ─── Page exit (optional flash) ─── */
export function usePageExit() {
  const flash = useCallback(() => {
    const d = document.createElement("div");
    d.style.cssText = "position:fixed;inset:0;z-index:9999;background:#fff;pointer-events:none;opacity:0";
    document.body.appendChild(d);
    gsap.to(d, { opacity: 1, duration: 0.06, yoyo: true, repeat: 1, onComplete: () => d.remove() });
  }, []);
  return flash;
}
