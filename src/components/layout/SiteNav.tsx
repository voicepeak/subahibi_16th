"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, Info, Menu, MessageCircle, Palette, Route, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/journey", label: "Journey", sub: "主线", icon: Route },
  { href: "/archive/bulletin", label: "Archive", sub: "档案", icon: Archive },
  { href: "/memories", label: "Memories", sub: "留言", icon: MessageCircle },
  { href: "/works", label: "Works", sub: "二创", icon: Palette },
  { href: "/about", label: "About", sub: "说明", icon: Info },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sky-nav" data-nav>
        <Link href="/" className="sky-nav-brand" aria-label="回到首页">
          <span>素晴日 16th</span>
          <small>The Sky Archive</small>
        </Link>
        <nav className="sky-nav-links" aria-label="主导航">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={cn("sky-nav-link", active && "sky-nav-link-active")}>
                <Icon size={15} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="sky-mobile-nav">
        <button
          type="button"
          className="sky-mobile-trigger"
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          title={open ? "关闭导航" : "打开导航"}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        {open && (
          <div className="sky-mobile-panel">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("sky-mobile-link", active && "sky-mobile-link-active")}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{item.label}</span>
                  <small>{item.sub}</small>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

