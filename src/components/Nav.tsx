"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/memories", label: "记忆", sub: "memories" },
  { href: "/characters", label: "邂逅", sub: "characters" },
  { href: "/messages", label: "车站", sub: "station" },
  { href: "/sunflower", label: "向日葵", sub: "hill" },
  { href: "/about", label: "关于", sub: "about" },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

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

  return (
    <nav ref={navRef} className="site-nav">
      <Link href="/" className="site-nav-mark" aria-label="回到首页">素</Link>
      <div className="site-nav-links">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`site-nav-link${pathname === link.href ? " site-nav-link-on" : ""}`}
          >
            <span className="site-nav-label">{link.label}</span>
            <span className="site-nav-sub">{link.sub}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
