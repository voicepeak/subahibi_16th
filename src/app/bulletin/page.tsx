"use client";

import { useState } from "react";

interface BBSPost {
  num: number;
  name: string;
  date: string;
  uid: string;
  body: string;
}

const POSTS: BBSPost[] = [
  { num: 1, name: "北校生无名氏", date: "2012/07/10(金) 15:20", uid: "marudai", body: "" },
  { num: 2, name: "北校生无名氏", date: "2012/07/10(金) 15:21", uid: "KAERA", body: "人都死了说话别那么轻率。" },
  { num: 3, name: "北校生无名氏", date: "2012/07/10(金) 15:22", uid: "inkin", body: "那个真的是三班的城山吗？" },
  { num: 4, name: "北校生无名氏", date: "2012/07/10(金) 15:25", uid: "ADAMO", body: "" },
  { num: 25, name: "北校生无名氏", date: "2012/07/11(土) 00:20", uid: "KINKIN", body: "北校 3年6班 学号12号城山翼 身高 175cm 体重62kg 生日 5月10号" },
  { num: 26, name: "北校生无名氏", date: "2012/07/11(土) 00:20", uid: "Aanana", body: "个人情报（笑） 。为什么连体重身高都知道啊wwwwwww" },
  { num: 27, name: "高岛柘榴", date: "2012/07/11(土) 00:20", uid: "zakuro", body: "他会死是必然的。" },
  { num: 28, name: "北校生无名氏", date: "2012/07/11(土) 01:21", uid: "kintama", body: ">>27 你真心要自重。" },
  { num: 29, name: "北校生无名氏", date: "2012/07/11(土) 01:22", uid: "aria", body: "高岛柘榴是三班的吧。是你杀的吧。" },
  { num: 30, name: "北校生无名氏", date: "2012/07/11(土) 01:22", uid: "anaana", body: "" },
  { num: 31, name: "北校生无名氏", date: "2012/07/11(土) 01:31", uid: "meka", body: "真恶心去死 果然被群嘲了……。这也是当然的……在这种时候发这种回复……。" },
  { num: 32, name: "高岛柘榴", date: "2012/07/11(土) 01:50", uid: "zakuro", body: "他的死只不过是一个开始。" },
  { num: 33, name: "北校生无名氏", date: "2012/07/11(土) 01:51", uid: "kinako", body: "只是不过是开始什么的wwww 在竖还会有人死的旗www" },
  { num: 34, name: "北校生无名氏", date: "2012/07/11(土) 01:53", uid: "aida", body: ">>30 你那种说话态度真的很有问题哦？高岛。" },
  { num: 35, name: "高岛柘榴", date: "2012/07/11(土) 02:00", uid: "zakuro", body: "" },
  { num: 36, name: "北校生无名氏", date: "2012/07/11(土) 02:02", uid: "kanakana", body: "预言是www" },
  { num: 37, name: "北校生无名氏", date: "2012/07/11(土) 02:03", uid: "kanakana", body: "电波系来了预言……是高岛同学说出来的？话说预言什么的……。" },
  { num: 1, name: "高岛柘榴", date: "2012/07/11(土) 22:02", uid: "zakuro", body: "被封印的阿扎能使用物理特化符虫（外径魔法系暗黑召唤虫） ，想要将邪念植入到我们人类脑子里。那是人类长久的历史中出现的暴君们（希特勒·可汗·玛丽·安托瓦内特.etc）和我们（市民，革命军，人民）的战斗的真相。城山翼同学被那个物理特化符虫侵犯了。阿扎就是这样操纵他， 目的是为了让我堕落 （负性冲动能量下降现象） 。要问其中原因的话，那就是阿扎即将觉醒。Big hazard要来了。大灾难不久将要降临！" },
  { num: 2, name: "北校生无名氏", date: "2012/07/11(土) 22:10", uid: "KAERA", body: "Big hazard别过来这边// 、  |（●）（●） ||  ノ(，_)、 ||  ;－＝－、 | ｀二二′" },
  { num: 3, name: "北校生无名氏", date: "2012/07/11(土) 22:16", uid: "KAERA", body: "" },
  { num: 4, name: "北校生无名氏", date: "2012/07/11(土) 22:17", uid: "KAERA", body: "不对！那当然……是不对的……吧……。虽然我对Big hazard什么的也不太清楚……。" },
  { num: 24, name: "高岛柘榴", date: "2012/07/11(土) 23:31", uid: "zakuro", body: "为了要让唯一能阻止阿扎斯的存在一天使战士发生负性冲动能量下降现象，让其无力化所以才让物理特化符虫潜入城山翼君的身体里。城山君因为他的脑子已经被啃食干净，除掉物理特化虫后，就发狂从屋顶上跳了下去。之后的回帖也是各种嘲讽……。捣乱的人……生气的人……有点害怕的人……但这个帖子发出来时候，帖子里的人们还没有什么恐惧。感觉只是单纯的大家在嘲讽一个很奇怪的家伙吧。" },
  { num: 256, name: "北校生无名氏", date: "2012/07/12(日) 00:30", uid: "daiki", body: "那么世界终结是什么时候？我听说过的预言都是事后诸葛亮一类的，到底什么时候世界才终结啊？" },
  { num: 257, name: "高岛柘榴", date: "2012/07/12(日) 02:10", uid: "zakuro", body: "" },
  { num: 265, name: "高岛柘榴", date: "2012/07/12(日) 04:18", uid: "zakuro", body: "不只是这几个，有许多的人将要死亡。" },
  { num: 266, name: "北校生无名氏", date: "2012/07/12(日) 04:31", uid: "KAERA", body: "其数量数之不尽……这个星球将迎来瓶颈期。" },
  { num: 267, name: "北校生无名氏", date: "2012/07/12(日) 04:33", uid: "daiki", body: "瓶颈……大概这里指的是遗传因子的瓶颈制约。 就是遗传多样性急剧减少。由于世界上众多的动物灭绝，遗传因子的种类大幅度减少……嘛，就跟大灾难和Big hazard所指的一样吧。" },
  { num: 652, name: "高岛柘榴", date: "2012/07/12(日) 05:18", uid: "zakuro", body: "我并不是人类这件事。以及世界将走向灭亡这件事……。" },
  { num: 856, name: "高岛柘榴", date: "2012/07/12(日) 09:02", uid: "zakuro", body: "再过不久Big hazard就要来了！" },
  { num: 1, name: "北校生无名氏", date: "2012/07/12(日) 22:52", uid: "MARUKOME", body: "貌似是收到短信了……。但上面是奇怪的照片跟文章……。>我借由死亡而重生为战士>本来应该是这样但好痛 >明明没有身体>好痛>因为变成这样了好痛 >所以>大家都会死>会在8天后死掉 >所有人肯定都会死。这个邮箱地址是takasimazakuro……。" },
  { num: 2, name: "北校生无名氏", date: "2012/07/12(日) 22:55", uid: "GENKI", body: "好像我也收到了……（\u00b7\u03c9\u00b7 ）" },
  { num: 3, name: "北校生无名氏", date: "2012/07/12(日) 22:58", uid: "KINDARMAN", body: "信？那之后满屏都是有人回贴说自己也收到短信了……。从数量上来看应该是上这个揭示板的所有人吧……。" },
  { num: 50, name: "北校生无名氏", date: "2012/07/12(日) 23:40", uid: "WAKAWAK", body: "几点收到的短信？" },
  { num: 52, name: "北校生无名氏", date: "2012/07/12(日) 23:45", uid: "KITAMURA", body: "" },
  { num: 54, name: "北校生无名氏", date: "2012/07/12(日) 23:48", uid: "GENKI", body: "好像是群发的吧？记得是10点44分左右。 >>52 大家好像都是差不多时间收到的。" },
  { num: 55, name: "北校生无名氏", date: "2012/07/12(日) 23:50", uid: "WAKAWAK", body: ">>54我差不多是在10点45分左右。>>52 我想应该是群发的……。群发……嘛，应该就是这样吧……。不可能会一条条的发所有人的份吧……。也就是说……。发送短信的人拥有名簿之类的资料……。" },
  { num: 152, name: "北校生无名氏", date: "2012/07/13(月) 01:40", uid: "satokon", body: "虽然有点不好意思开口……但那个短信应该真的是高岛柘榴发的……。因为我手机里有那个人的邮箱地址所以才知道。" },
  { num: 153, name: "赤坂惠", date: "2012/07/13(月) 01:42", uid: "megu", body: "是聪子吧……。我也知道……那个肯定是高岛发来的短信没错。因为邮箱地址一样嘛……而且拍出来的照片和那孩子拿的手机摄像头……。" },
  { num: 154, name: "聪子", date: "2012/07/13(月) 01:46", uid: "satokon", body: "怎么办……那个是高岛的手机吧。照片之类啊，跟之前拍的分辨率一样啊。跟拍那个快餐的时候一模一样。" },
  { num: 155, name: "北校生无名氏", date: "2012/07/13(月) 01:51", uid: "atata", body: "高岛还活着吗？高岛死了。没活着。这是肯定的" },
  { num: 160, name: "聪子", date: "2012/07/13(月) 03:12", uid: "satokon", body: "好害怕啊……我……该怎么办。" },
  { num: 161, name: "北校生无名氏", date: "2012/07/13(月) 03:15", uid: "atata", body: "" },
  { num: 162, name: "赤坂惠", date: "2012/07/13(月) 03:22", uid: "megu", body: "干嘛要那么害怕？大概高岛在憎恨着我们吧……那个短信果然是幽灵发的？是高岛的幽灵吗？那样的话我……。" },
  { num: 163, name: "北校生无名氏", date: "2012/07/13(月) 03:25", uid: "atata", body: "" },
  { num: 164, name: "聪子", date: "2012/07/13(月) 03:29", uid: "satokon", body: "是你们欺负高岛的吗？不只有我们哦……本来就是班里所有人做的……为什么只有我们……。" },
  { num: 165, name: "北校生无名氏", date: "2012/07/13(月) 03:33", uid: "atata", body: "只有你们是怎么一回事？" },
  { num: 166, name: "聪子", date: "2012/07/13(月) 03:36", uid: "satokon", body: "" },
  { num: 167, name: "北校生无名氏", date: "2012/07/13(月) 03:40", uid: "manaka", body: "秋子跟爱理她们，班里的其他人都没收到短信。我们明明不认识高岛却也收到短信了呢ww" },
  { num: 168, name: "北校生无名氏", date: "2012/07/13(月) 03:40", uid: "kiri", body: "原因就是你们啊！为了让高岛的幽灵息怒请你们去死吧。" },
  { num: 170, name: "聪子", date: "2012/07/13(月) 03:52", uid: "satokon", body: "" },
  { num: 171, name: "北校生无名氏", date: "2012/07/13(月) 03:55", uid: "akana", body: "谁管你们啊。受到高岛诅咒的只有你们俩就足够了。" },
  { num: 172, name: "北校生无名氏", date: "2012/07/13(月) 03:58", uid: "kotoko", body: "高岛有是不是说过自己死的时候不是人类？话说起来……。" },
  { num: 173, name: "北校生无名氏", date: "2012/07/13(月) 04:02", uid: "kotoko", body: ">2012年7月12号将进行脑袋·反转。>然后大家都会知道吧。 >我并不是人类这件事。>以及世界将走向灭亡这件事……。有说过。 在那时就已经是幽灵吗？" },
  { num: 174, name: "北校生无名氏", date: "2012/07/13(月) 04:06", uid: "mamada", body: ">>173 自杀是在这篇回贴之后，那时应该还是人类的OK。别说这种让人混乱的话啊" },
  { num: 392, name: "北校生无名氏", date: "2012/07/13(月) 11:42", uid: "ikeda", body: "倒不如说20号世界灭亡也太早了啦，这是高岛的诅咒引起的吗？" },
  { num: 393, name: "北校生无名氏", date: "2012/07/13(月) 11:45", uid: "mamada", body: ">>392 再怎么说一个幽灵也没办法毁灭世界吧。" },
  { num: 394, name: "北校生无名氏", date: "2012/07/13(月) 11:48", uid: "mini", body: "" },
  { num: 395, name: "北校生无名氏", date: "2012/07/13(月) 11:55", uid: "kimi", body: "那么世界应该不会灭亡吧。是指欺负她的人会毁灭吧。" },
  { num: 396, name: "北校生无名氏", date: "2012/07/13(月) 11:58", uid: "tomoda", body: "在20号被诅咒杀死。她大概很恨吧。还下诅咒给大家发那种照片……。" },
  { num: 1, name: "北校生无名氏", date: "2012/07/13(月) 18:52", uid: "MARUKOME", body: "这里是大家用来确认据说是高岛柘榴发来的短信的帖子。好像收到啥了(||||怓￣)」好可怕～" },
  { num: 2, name: "北校生无名氏", date: "2012/07/13(月) 18:58", uid: "MARUKOME", body: "●已确认的短信>我借由死亡重生为战士 >本应该是这样的>好痛>明明没有身体却好痛 >变成这样好痛>因此>大家都会死 >在8天后死掉>所有人肯定都会死。" },
  { num: 32, name: "北校生无名氏", date: "2012/07/14(火) 09:28", uid: "ERAE", body: ">我借由死亡重生为战士>本应该是这样的 >好痛>明明没有身体却好痛>变成这样好痛 >因此>大家都会死>在4天后死掉 >所有人肯定都会死。早上起来看到邮箱收到了这个，大家都有收到吗？" },
  { num: 33, name: "北校生无名氏", date: "2012/07/14(火) 09:38", uid: "MAME", body: "有收到。大概是AM09:12左右收到的。死亡的倒计时吗……。说起一模一样的文章确实让人格外害怕呢……。真是很厉害的手段……。" },
  { num: 120, name: "聪子", date: "2012/07/14(火) 13:20", uid: "satokon", body: ">好痛好痛>好痛318 >好痛>好痛好痛好痛好痛好痛>好痛好痛好痛好痛好痛好痛好痛 >好痛好痛>好痛好痛好痛好痛>好痛好痛好痛 >好痛每天都收到这种短信……。你都收到了？" },
  { num: 121, name: "北校生无名氏", date: "2012/07/14(火) 13:22", uid: "atata", body: "没有收全哦" },
  { num: 125, name: "北校生无名氏", date: "2012/07/14(火) 13:30", uid: "aQ3fG", body: "难道说是因为欺负过高岛的人才会收到吧" },
  { num: 232, name: "北校生无名氏", date: "2012/07/14(火) 16:20", uid: "satokon", body: ">血和头发散落一地>手机沾满鲜血>鞋子上也沾了很多血 >衣服上也都是血>头发上沾满了血 早上的时候收到了这个短信。真的好恐怖……。" },
];

const PAGE_SIZE = 12;

export default function BulletinPage() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(POSTS.length / PAGE_SIZE);
  const paged = POSTS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <section className="page-section first" style={{ paddingBottom: "2rem" }}>
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/bbs-bg.png")`, opacity: 0.05 }} />
        <div className="page-parallax" />
        <div className="page-head">
          <h1 className="page-title">北校揭示板</h1>
          <p className="page-sub">— North School Bulletin Board —</p>
        </div>
      </section>

      <section className="page-section page-section-narrow" style={{ paddingTop: 0 }}>
        <div className="bbs-header">
          <span className="bbs-header-title">◆ 北校·校内揭示板 ◆</span>
          <span className="bbs-header-info">投稿数: {POSTS.length} res</span>
        </div>

        <div className="bbs-threads">
          {paged.map((post, i) => (
            <div key={`${post.num}-${post.uid}-${i}`} className="bbs-post">
              <div className="bbs-post-head">
                <span className="bbs-post-id">{post.num}</span>
                <span className="bbs-post-name">{post.name}</span>
                <span className="bbs-post-date">{post.date}</span>
                <span className="bbs-post-uid">ID:{post.uid}</span>
              </div>
              {post.body && (
                <pre className="bbs-post-text">{post.body}</pre>
              )}
            </div>
          ))}
        </div>

        <div className="bbs-pager">
          <button className="bbs-pager-btn" disabled={page === 0} onClick={() => setPage(p => Math.max(0, p - 1))}>‹ 前页</button>
          <span className="bbs-pager-info">{page + 1} / {totalPages}</span>
          <button className="bbs-pager-btn" disabled={page >= totalPages - 1} onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}>次页 ›</button>
        </div>

        <div className="bbs-footer">◆ 以上为2012年5月-7月的投稿记录 ◆</div>
      </section>

      <div className="divider-rule" />
    </>
  );
}
