import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MailSimulator } from "@/components/archive/MailSimulator";
import { CGLoopBackdrop } from "@/components/cinematic/CGLoopBackdrop";

export const metadata: Metadata = {
  title: "Takashima Mail",
  description: "高岛短信站内模拟，使用 localStorage 保存解锁状态，不发送真实邮件。",
};

export default function ArchiveTakashimaPage() {
  return (
    <main className="archive-page takashima-page">
      <CGLoopBackdrop images={["/assets/phone-cg.png", "/assets/phone-cg2.png", "/assets/bg/bg1015d.png"]} intensity="normal" />
      <section className="takashima-layout">
        <div className="takashima-copy">
          <Link href="/journey#takashima-signal" className="archive-return">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Return to Journey</span>
          </Link>
          <p className="landing-kicker">Archive / Mail Simulator</p>
          <h1>高岛短信</h1>
          <p>输入昵称或邮箱后，短信会按设定顺序逐步解锁。P0 只做站内模拟，不发送真实邮件。</p>
          <p className="takashima-note">时间固定在 22:44，信号偶发丢失。解锁状态保存在当前浏览器。</p>
          <div className="takashima-signal-grid" aria-label="archive state">
            <span><b>04</b> mails</span>
            <span><b>22:44</b> anchor</span>
            <span><b>local</b> only</span>
          </div>
        </div>
        <div className="takashima-device-stage">
          <div className="takashima-device-note" aria-hidden="true">
            <span>signal</span>
            <strong>lost / found</strong>
          </div>
          <MailSimulator />
        </div>
      </section>
    </main>
  );
}

