"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const LINKS = [
  { href: "/memories", label: "记忆", sub: "memories" },
  { href: "/characters", label: "邂逅", sub: "characters" },
  { href: "/messages", label: "车站", sub: "station" },
  { href: "/tsuinosora", label: "终之空", sub: "sky" },
  { href: "/base", label: "秘密基地", sub: "shelter" },
  { href: "/philosophy", label: "哲学手记", sub: "notes" },
  { href: "/bulletin", label: "揭示板", sub: "bbs" },
  { href: "/takashima", label: "短信", sub: "mail" },
  { href: "/about", label: "关于", sub: "about" },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const el = navRef.current;
    if (!el || pathname === "/") return;

    const onEnter = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLElement;
      const label = t.querySelector(".site-nav-label");
      if (label) gsap.to(label, { y: -2, duration: 0.2, ease: "power1.out", overwrite: "auto" });
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLElement;
      const label = t.querySelector(".site-nav-label");
      if (label) gsap.to(label, { y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
    };

    const links = el.querySelectorAll<HTMLAnchorElement>(".site-nav-link");
    links.forEach((link) => { link.addEventListener("mouseenter", onEnter); link.addEventListener("mouseleave", onLeave); });

    const onScroll = () => {
      const sy = window.scrollY;
      if (sy > lastY.current && sy > 80) { el.classList.add("site-nav-hidden"); }
      else { el.classList.remove("site-nav-hidden"); }
      lastY.current = sy;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      links.forEach((link) => { link.removeEventListener("mouseenter", onEnter); link.removeEventListener("mouseleave", onLeave); });
    };
  }, [pathname]);

  return (
    <nav ref={navRef} className="site-nav">
      <Link href="/" className="site-nav-mark" aria-label="回到首页">素</Link>
      <div className="site-nav-links">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={`site-nav-link${pathname === link.href ? " site-nav-link-on" : ""}`}>
            <span className="site-nav-label">{link.label}</span>
            <span className="site-nav-sub">{link.sub}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
