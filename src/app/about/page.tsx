import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "项目说明、非官方声明、版权说明与内容提醒。",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="landing-kicker">About</p>
        <h1>非官方粉丝纪念站</h1>
        <p>SubaHibi 16th Anniversary — The Sky Archive</p>
      </section>

      <section className="about-sections">
        <article>
          <h2>项目定位</h2>
          <p>本站是围绕《素晴日》16 周年的非官方粉丝纪念体验站，以天空、短信、掲示板、7 月 20 日和“幸福地生活”为叙事主线。</p>
        </article>
        <article>
          <h2>内容提醒</h2>
          <p>本纪念站包含强剧透、死亡、精神压迫等主题表现。站点避免直接展示露骨成人内容，也不提供游戏本体、破解、汉化补丁或商业化服务。</p>
        </article>
        <article>
          <h2>非官方声明</h2>
          <p>本项目为非官方粉丝纪念站，与原作版权方、发行方无商业合作关系。所有相关名称、角色、音乐、图像等权利归原权利方所有。本站不提供游戏下载、破解、汉化补丁或商业化服务。</p>
        </article>
        <article>
          <h2>素材原则</h2>
          <p>站内素材仅用于网页氛围展示，不开放批量下载。用户投稿必须拥有授权；若权利人提出下架请求，将及时移除相关内容。</p>
        </article>
      </section>
    </main>
  );
}

