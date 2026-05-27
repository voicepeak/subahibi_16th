import Link from "next/link";
import { ArrowRight, Archive } from "lucide-react";
import { CGLoopBackdrop } from "@/components/cinematic/CGLoopBackdrop";
import { Letterbox } from "@/components/cinematic/Letterbox";

export default function LandingPage() {
  return (
    <main className="landing-page">
      <Letterbox />
      <section className="landing-hero">
        <CGLoopBackdrop images={["/assets/bg/bg1015a.png"]} intensity="calm" paused />
        <div className="landing-copy">
          <p className="landing-kicker">Non-official fan anniversary project</p>
          <h1>SubaHibi 16th Anniversary</h1>
          <p className="landing-subtitle">The Sky Archive / 终末天空档案馆</p>
          <p className="landing-warning">包含《素晴日》关键剧情意象与剧透内容。</p>
          <div className="landing-actions">
            <Link href="/journey" className="sky-button">
              <span>Enter</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/archive/bulletin" className="sky-button sky-button-ghost">
              <Archive size={16} aria-hidden="true" />
              <span>Skip to Archive</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="landing-after">
        <p>sky / mail / bulletin / 7.20 / tsui no sora / wonderful everyday</p>
      </section>
    </main>
  );
}
