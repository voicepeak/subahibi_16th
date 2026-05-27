"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "@/components/layout/SiteNav";
import { NoiseLayer } from "@/components/cinematic/NoiseLayer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      {!isLanding && <SiteNav />}
      <NoiseLayer fixed subtle />
      <div className="sky-shell">{children}</div>
    </>
  );
}

