"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/memories", label: "記憶", sub: "memories" },
  { href: "/characters", label: "邂逅", sub: "characters" },
  { href: "/about", label: "about", sub: "about" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav">
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
