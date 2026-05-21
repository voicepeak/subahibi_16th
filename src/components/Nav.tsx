"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Cloud,
  Home,
  Mail,
  Menu,
  MessageSquareText,
  NotebookText,
  RadioTower,
  ShieldQuestion,
  TrainFront,
  Users,
  X,
} from "lucide-react";

const LINKS = [
  { href: "/memories", label: "记忆", sub: "memories", Icon: BookOpen },
  { href: "/characters", label: "邂逅", sub: "characters", Icon: Users },
  { href: "/messages", label: "车站", sub: "station", Icon: TrainFront },
  { href: "/tsuinosora", label: "终之空", sub: "sky", Icon: Cloud },
  { href: "/base", label: "秘密基地", sub: "shelter", Icon: ShieldQuestion },
  { href: "/philosophy", label: "哲学手记", sub: "notes", Icon: NotebookText },
  { href: "/bulletin", label: "揭示板", sub: "bbs", Icon: RadioTower },
  { href: "/takashima", label: "短信", sub: "mail", Icon: Mail },
  { href: "/about", label: "关于", sub: "about", Icon: MessageSquareText },
];

const MOBILE_PRIMARY = LINKS.slice(0, 4);
const MOBILE_MORE = [
  { href: "/", label: "首页", sub: "entry", Icon: Home },
  ...LINKS.slice(4),
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el || pathname === "/") return;

    const onScroll = () => {
      const sy = window.scrollY;
      if (sy > lastY.current && sy > 80) {
        el.classList.add("site-nav-hidden");
      } else {
        el.classList.remove("site-nav-hidden");
      }
      lastY.current = sy;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <>
      <nav ref={navRef} className="site-nav" aria-label="主导航">
        <Link href="/" className="site-nav-mark" aria-label="回到首页">素</Link>
        <div className="site-nav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`site-nav-link${pathname === link.href ? " site-nav-link-on" : ""}`}
            >
              <span className="site-nav-label">{link.label}</span>
              <span className="site-nav-sub">{link.sub}</span>
            </Link>
          ))}
        </div>
      </nav>

      <nav className="mobile-nav-shell" aria-label="移动导航">
        <div className="mobile-nav-bar">
          {MOBILE_PRIMARY.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`mobile-nav-item${pathname === href ? " mobile-nav-item-on" : ""}`}
            >
              <Icon aria-hidden="true" size={17} strokeWidth={1.7} />
              <span>{label}</span>
            </Link>
          ))}
          <button
            className={`mobile-nav-item mobile-nav-more${moreOpen ? " mobile-nav-item-on" : ""}`}
            type="button"
            aria-label={moreOpen ? "关闭更多导航" : "打开更多导航"}
            aria-expanded={moreOpen}
            aria-controls="mobile-nav-more-panel"
            onClick={() => setMoreOpen((open) => !open)}
          >
            <Menu aria-hidden="true" size={17} strokeWidth={1.7} />
            <span>更多</span>
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div className="mobile-nav-layer">
          <button
            className="mobile-nav-backdrop"
            type="button"
            aria-label="关闭更多导航"
            onClick={() => setMoreOpen(false)}
          />
          <div id="mobile-nav-more-panel" className="mobile-nav-panel">
            <div className="mobile-nav-panel-head">
              <span className="mobile-nav-panel-title">更多入口</span>
              <button
                className="mobile-nav-close"
                type="button"
                aria-label="关闭更多导航"
                onClick={() => setMoreOpen(false)}
              >
                <X aria-hidden="true" size={17} strokeWidth={1.7} />
              </button>
            </div>
            <div className="mobile-nav-more-grid">
              {MOBILE_MORE.map(({ href, label, sub, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`mobile-nav-more-link${pathname === href ? " mobile-nav-more-link-on" : ""}`}
                  onClick={() => setMoreOpen(false)}
                >
                  <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
                  <span className="mobile-nav-more-label">{label}</span>
                  <span className="mobile-nav-more-sub">{sub}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
