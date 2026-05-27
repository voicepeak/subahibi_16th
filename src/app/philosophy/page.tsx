"use client";

import { useState, useEffect, useRef } from "react";

interface PhilosophyEntry {
  name: string;
  title: string;
  period: string;
  quote: string;
  context: string;
  body: string;
  connection: string;
}

const PHILOSOPHERS: PhilosophyEntry[] = [
  {
    name: "路德维希·维特根斯坦",
    title: "语言·世界·界限",
    period: "1889 - 1951",
    quote: "幸福地生活吧！",
    context: "《逻辑哲学论》·《草稿1916年7月8日》",
    body: "维特根斯坦认为，世界的意义必定在世界之外。\n语言是世界的图画，而能够被言说的，都能够被说清楚。\n对于不可言说之物，必须保持沉默。\n\n在《草稿》中他写道：「主体不属于世界，然而它是世界的一个界限。」\n这意味着——我们无法站在世界之外审视世界。\n但我们依然可以，也必须——幸福地生活。",
    connection: "在《素晴日》中，维特根斯坦的哲学贯穿始终。\n皆守在结尾背诵《逻辑哲学论》的片段，由岐引用「幸福地生活吧」作为对所有人的命令。\n世界的意义不在世界内部——而在我们如何生活。",
  },
  {
    name: "艾米莉·狄金森",
    title: "头脑·天空·无限",
    period: "1830 - 1886",
    quote: "我们的头脑比天空更辽阔……\n来，将二者对比着看一看……\n我们的思维可以轻易地将这片广阔的天空完全容纳……\n然后……连你也可以……",
    context: "《我们的头脑比天空更辽阔》(1862)",
    body: "狄金森的诗探索了意识与无限的relationship。\n她生前默默无闻，死后留下1700余首诗。\n她的诗简短、锋利，以破折号和倾斜的语法著称。\n\n「头脑比天空更辽阔」——这不是浪漫的比喻，\n而是一个严谨的思考：如果我能思考天空，\n那么我的意识就容纳了天空。\n意识是比宇宙更广阔的空间。",
    connection: "由岐在屋顶上与音无彩名相遇时，彩名背诵了这首诗。\n这是作品核心观念的浓缩——世界即我的表象。\n如果我的头脑能容纳天空，那么世界与我的界限在哪里？",
  },
  {
    name: "刘易斯·卡罗尔",
    title: "镜子·语言·意义",
    period: "1832 - 1898",
    quote: "炸脖龙之诗——\n「真当是你把怪龙斩于马下？\n奋勇吾儿！来我怀里！奔走相告！衣锦还乡！」",
    context: "《爱丽丝镜中奇遇记》·《炸脖龙》",
    body: "卡罗尔（本名查尔斯·道奇森）是数学家兼作家。\n他创造了无意义文学的最高峰。\n《炸脖龙》全诗由 invented words 组成，\n却依然能传达出英雄斩杀怪物的叙事结构。\n\n这表明：意义不依赖于单词本身，\n而来自于语法结构和语境。\n语言创造了世界——即使词语本身毫无意义。",
    connection: "《素晴日》第4卷以《炸脖龙之诗》开篇。\n多重人格下的不同「我」，正如诗中的无名英雄与无名怪物——\n同一具身体中，谁是英雄，谁是怪物，\n取决于你从哪个角度观看。",
  },
  {
    name: "埃德蒙·罗斯坦",
    title: "诗人·剑客·Panache",
    period: "1868 - 1918",
    quote: "我们的情人不过是随便借个名字，用幻想吹出来的肥皂泡……\n拿去吧！——由于不是出自真心，话就说得格外动听！",
    context: "《西哈诺·德·贝热拉克》(1897)",
    body: "罗斯坦笔下的西哈诺是诗人、剑客、哲学家——\n以及空气力学的先驱。\n他有一个巨大的鼻子，因此不敢向心爱的罗克珊表白。\n他替别人写情书，用最动人的文字表达不属于自己的爱。\n\n「Panache」——这个词在西哈诺的语境中，\n意味着在绝境中仍保持的勇气与风度。\n即使面对死亡，也要优雅地战斗。",
    connection: "《素晴日》开篇和终章都在引用《西哈诺》。\n由岐在屋顶读这本书，柘榴能背诵里面的台词。\n间宫卓司把这本书借给柘榴——这是他们之间最深的联结。\n而Panache，那种在不完美的世界中保持勇气的态度，\n正是由岐和皆守最后的选择。",
  },
  {
    name: "埃里克·萨蒂",
    title: "家具音乐·重复·静默",
    period: "1866 - 1925",
    quote: "柘榴：「嗯……就先从埃里克·萨蒂的……Le Piccadilly……」\n柘榴：「没错呢……萨蒂的曲子很有品位……很有型哦」",
    context: "《Le Piccadilly》·《家具音乐》",
    body: "萨蒂是音乐界的怪人。\n他创作了「家具音乐」——一种应该被忽略的背景音。\n他给作品起荒谬的名字：\n《枯胎》《官僚风的小奏鸣曲》《3首梨形曲》。\n\n他的音乐像是日常生活中的一部分，\n不引人注目，但不可或缺。\n重复是他的核心手法——\n在不断的重复中，细微的变化被放大。",
    connection: "由岐和柘榴在Bar白州峡的约会中，\n由岐弹奏了萨蒂的《Le Piccadilly》和《做梦的鱼》。\n萨蒂的「家具音乐」哲学——\n音乐应该融入生活，如同家具融入房间——\n与《素晴日》对「日常」的礼赞相呼应。\n幸福就藏在那些看似平凡的重复之中。",
  },
  {
    name: "尼古拉·库萨",
    title: "无限的三角·有学识的无知",
    period: "1401 - 1464",
    quote: "三角形既是圆又是球……也就是说，三角形可变化为一切图形，而这一切的图形便能得到无限。",
    context: "《论有学识的无知》(1440)",
    body: "库萨的尼古拉是文艺复兴早期的神学家。\n他用几何学来思考神学：\n一个无限的三角形，其边无限延伸，\n最终会变成圆——因为圆的边界无处不在又无处所在。\n\n「有学识的无知」指的是：\n真正的智慧在于认识到自己的无知。\n我们知道的越多，就越能意识到自己不知道的更多。",
    connection: "柘榴在屋顶引用库萨的「无限的三角」理论，\n谈论她寻找天空的仪式。\n夏夜大三角——织女、牛郎、天津四——\n被赋予了形而上的意义：三条边构成三角形，\n当边无限延伸时，三角形就成了圆，成了球，\n成了一切。",
  },
];

function PhiloCard({ entry, index }: { entry: PhilosophyEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`philo-card${seen ? " in" : ""}${open ? " philo-card-open" : ""}`}>
      <button className="philo-card-front" onClick={() => setOpen(!open)}>
        <div className="philo-card-front-content">
          <div className="philo-card-period">{entry.period}</div>
          <p className="philo-card-name">{entry.name}</p>
          <p className="philo-card-title">{entry.title}</p>
          <div className="philo-card-mark" />
          <p className="philo-card-preview">{entry.quote}</p>
          <span className="philo-card-hint">{open ? "收起 \u25B3" : "展开 \u25BD"}</span>
        </div>
      </button>
      <div className="philo-card-back">
        <div className="philo-card-back-content">
          <p className="philo-card-back-context">{entry.context}</p>
          <div className="philo-card-back-divider" />
          <p className="philo-card-back-body">{entry.body}</p>
          <div className="philo-card-back-divider" />
          <div className="philo-card-back-connect">
            <span className="philo-card-back-connect-label">与作品的关系</span>
            <p className="philo-card-back-connect-text">{entry.connection}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhilosophyPage() {
  return (
    <>
      <section className="page-section first">
        <div className="page-parallax" />
        <div className="page-head">
          <h1 className="page-title">哲学手记</h1>
          <p className="page-sub">— Philosophical Notes —</p>
        </div>
      </section>

      <section className="page-section page-section-narrow">
        <blockquote className="quote-card">
          <div className="quote-mark" aria-hidden="true" />
          <p className="quote-text">
            "和在这个无聊的世界里的我一样的表情。\n为什么爱丽丝会认为镜子世界和这里不同呢？"
          </p>
          <cite className="quote-source">『素晴日 ?不连续存在?』</cite>
        </blockquote>
      </section>

      <section className="page-section">
        <div className="philo-grid">
          {PHILOSOPHERS.map((entry, i) => (
            <PhiloCard key={i} entry={entry} index={i} />
          ))}
        </div>
      </section>

      <div className="divider-rule" />
    </>
  );
}
