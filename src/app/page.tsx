import Link from "next/link";
import { ArrowRight, Archive } from "lucide-react";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { MediaOverlay } from "@/components/cinematic/MediaOverlay";
import { videoAssets } from "@/content/videos";

export default function LandingPage() {
  const video = videoAssets[0];

  return (
    <main className="landing-page">
      <VideoHero
        video={video}
        fallbackImage="/assets/bg/bg1015a.png"
        overlay={
          <MediaOverlay
            headline="SubaHibi 16th Anniversary"
            subtitle="The Sky Archive / 终末天空档案馆"
            tone="bright"
            cta={
              <>
                <div className="media-driven-cta-row">
                  <Link href="/journey" className="sky-button">
                    <span>Enter</span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                <Link href="/archive/takashima" className="sky-button sky-button-ghost">
                  <Archive size={16} aria-hidden="true" />
                  <span>Skip to Takashima</span>
                  </Link>
                </div>
                <p className="landing-warning-media">包含《素晴日》关键剧情意象与剧透内容。</p>
                <p className="landing-after-media">sky / mail / character parade / 7.20 / wonderful everyday</p>
              </>
            }
          />
        }
      />
    </main>
  );
}
