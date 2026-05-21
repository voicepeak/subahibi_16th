"use client";

import { useState } from "react";

interface BBSPost {
  num: number;
  name: string;
  date: string;
  uid: string;
  body: string;
}

interface BBSThread {
  title: string;
  posts: BBSPost[];
}

const THREADS: BBSThread[] = [
  {
    title: "关于城山翼跳楼事故",
    posts: [
      { num: 1, name: "北校生无名氏", date: "2012/07/10(金) 15:20", uid: "marudai", body: "虽然在其他帖子里这也是话题，但这是单独贴。" },
      { num: 2, name: "北校生无名氏", date: "2012/07/10(金) 15:21", uid: "KAERA", body: "人都死了说话别那么轻率。" },
      { num: 3, name: "北校生无名氏", date: "2012/07/10(金) 15:22", uid: "inkin", body: "那个真的是三班的城山吗？" },
      { num: 13, name: "北校生无名氏", date: "2012/07/10(金) 16:45", uid: "nekoneko", body: "我跟城山同班，他最近确实怪怪的，总是自言自语。" },
      { num: 25, name: "北校生无名氏", date: "2012/07/11(土) 00:20", uid: "KINKIN", body: "北校 3年6班 学号12号城山翼 身高 175cm 体重62kg 生日 5月10号" },
      { num: 26, name: "北校生无名氏", date: "2012/07/11(土) 00:20", uid: "Aanana", body: "个人情报（笑） 。为什么连体重身高都知道啊wwwwwww" },
      { num: 27, name: "高岛柘榴", date: "2012/07/11(土) 00:20", uid: "zakuro", body: "他会死是必然的。" },
      { num: 28, name: "北校生无名氏", date: "2012/07/11(土) 01:21", uid: "kintama", body: ">>27 你真心要自重。" },
      { num: 29, name: "北校生无名氏", date: "2012/07/11(土) 01:22", uid: "aria", body: "高岛柘榴是三班的吧。是你杀的吧。" },
      { num: 31, name: "北校生无名氏", date: "2012/07/11(土) 01:31", uid: "meka", body: "真恶心去死 果然被群嘲了……。这也是当然的……在这种时候发这种回复……。" },
      { num: 32, name: "高岛柘榴", date: "2012/07/11(土) 01:50", uid: "zakuro", body: "他的死只不过是一个开始。" },
      { num: 33, name: "北校生无名氏", date: "2012/07/11(土) 01:51", uid: "kinako", body: "只是不过是开始什么的wwww 在竖还会有人死的旗www" },
      { num: 34, name: "北校生无名氏", date: "2012/07/11(土) 01:53", uid: "aida", body: ">>30 你那种说话态度真的很有问题哦？高岛。" },
      { num: 36, name: "北校生无名氏", date: "2012/07/11(土) 02:02", uid: "kanakana", body: "预言是www" },
      { num: 37, name: "北校生无名氏", date: "2012/07/11(土) 02:03", uid: "kanakana", body: "电波系来了预言……是高岛同学说出来的？话说预言什么的……。" },
      { num: 680, name: "聪子", date: "2012/07/10(金) 01:21", uid: "satoko", body: "说真的，我们是不是有点过了？感觉事情闹大了啊……。" },
      { num: 681, name: "惠", date: "2012/07/10(金) 01:22", uid: "megu", body: "没啦，只要不露馅的话就完全没问题不是么。要是露馅了，就不会在这里跟妳说这么多了ww" },
      { num: 682, name: "聪子", date: "2012/07/10(金) 01:25", uid: "satoko", body: "那实在玩得有点过了。真要露馅的话，恐怕不止是停学了。卓司一直在问东问西的，他是不是发现了什么……到底怎么办啊……。" },
      { num: 683, name: "惠", date: "2012/07/10(金) 01:26", uid: "megu", body: "怕什么骨头啊www 反正事情已经做了，只要不说漏嘴就没问题啦ww" },
      { num: 684, name: "聪子", date: "2012/07/10(金) 01:28", uid: "satoko", body: "嗯……说的也是……没事的……。应该没事的。" },
      { num: 685, name: "惠", date: "2012/07/10(金) 01:32", uid: "megu", body: "就是说啊，怕什么毛啊www 反正只要你不说的话就没人知道啦www 截图的话让你看也完全OK啦。" },
      { num: 686, name: "惠", date: "2012/07/10(金) 01:36", uid: "megu", body: "高岛还是那德性的话就不会说漏嘴的www没事啦。卓司问「什么？是高岛同学的事吗？」他好像完全没写与我有关的事情……这里最近的话题全是和高岛同学有关的事……。" },
    ],
  },
  {
    title: "【Big hazard】被封印的阿扎",
    posts: [
      { num: 1, name: "高岛柘榴", date: "2012/07/11(土) 22:02", uid: "zakuro", body: "被封印的阿扎能使用物理特化符虫（外径魔法系暗黑召唤虫） ，想要将邪念植入到我们人类脑子里。那是人类长久的历史中出现的暴君们（希特勒·可汗·玛丽·安托瓦内特.etc）和我们（市民，革命军，人民）的战斗的真相。城山翼同学被那个物理特化符虫侵犯了。阿扎就是这样操纵他， 目的是为了让我堕落 （负性冲动能量下降现象） 。要问其中原因的话，那就是阿扎即将觉醒。Big hazard要来了。大灾难不久将要降临！" },
      { num: 2, name: "北校生无名氏", date: "2012/07/11(土) 22:10", uid: "KAERA", body: "Big hazard别过来这边// 、  |（●）（●） ||  ノ(，_)、 ||  ;－＝－、 | ｀二二′" },
      { num: 4, name: "北校生无名氏", date: "2012/07/11(土) 22:17", uid: "KAERA", body: "不对！那当然……是不对的……吧……。虽然我对Big hazard什么的也不太清楚……。" },
      { num: 24, name: "高岛柘榴", date: "2012/07/11(土) 23:31", uid: "zakuro", body: "为了要让唯一能阻止阿扎斯的存在一天使战士发生负性冲动能量下降现象，让其无力化所以才让物理特化符虫潜入城山翼君的身体里。城山君因为他的脑子已经被啃食干净，除掉物理特化虫后，就发狂从屋顶上跳了下去。之后的回帖也是各种嘲讽……。捣乱的人……生气的人……有点害怕的人……。" },
      { num: 256, name: "北校生无名氏", date: "2012/07/12(日) 00:30", uid: "daiki", body: "那么世界终结是什么时候？我听说过的预言都是事后诸葛亮一类的，到底什么时候世界才终结啊？" },
      { num: 265, name: "高岛柘榴", date: "2012/07/12(日) 04:18", uid: "zakuro", body: "不只是这几个，有许多的人将要死亡。" },
      { num: 266, name: "北校生无名氏", date: "2012/07/12(日) 04:31", uid: "KAERA", body: "其数量数之不尽……这个星球将迎来瓶颈期。" },
      { num: 267, name: "北校生无名氏", date: "2012/07/12(日) 04:33", uid: "daiki", body: "瓶颈……大概这里指的是遗传因子的瓶颈制约。 就是遗传多样性急剧减少。由于世界上众多的动物灭绝，遗传因子的种类大幅度减少……嘛，就跟大灾难和Big hazard所指的一样吧。" },
      { num: 652, name: "高岛柘榴", date: "2012/07/12(日) 05:18", uid: "zakuro", body: "我并不是人类这件事。以及世界将走向灭亡这件事……。" },
      { num: 856, name: "高岛柘榴", date: "2012/07/12(日) 09:02", uid: "zakuro", body: "再过不久Big hazard就要来了！" },
    ],
  },
  {
    title: "收到奇怪的短信……",
    posts: [
      { num: 1, name: "北校生无名氏", date: "2012/07/12(日) 22:52", uid: "MARUKOME", body: "貌似是收到短信了……。但上面是奇怪的照片跟文章……。>我借由死亡而重生为战士>本来应该是这样但好痛 >明明没有身体>好痛>因为变成这样了好痛 >所以>大家都会死>会在8天后死掉 >所有人肯定都会死。这个邮箱地址是takasimazakuro……。" },
      { num: 2, name: "北校生无名氏", date: "2012/07/12(日) 22:55", uid: "GENKI", body: "好像我也收到了……（\u00b7\u03c9\u00b7 ）" },
      { num: 3, name: "北校生无名氏", date: "2012/07/12(日) 22:58", uid: "KINDARMAN", body: "信？那之后满屏都是有人回贴说自己也收到短信了……。从数量上来看应该是上这个揭示板的所有人吧……。" },
      { num: 50, name: "北校生无名氏", date: "2012/07/12(日) 23:40", uid: "WAKAWAK", body: "几点收到的短信？" },
      { num: 54, name: "北校生无名氏", date: "2012/07/12(日) 23:48", uid: "GENKI", body: "好像是群发的吧？记得是10点44分左右。大家好像都是差不多时间收到的。" },
      { num: 55, name: "北校生无名氏", date: "2012/07/12(日) 23:50", uid: "WAKAWAK", body: ">>54 我差不多是在10点45分左右。我想应该是群发的……。不可能会一条条的发所有人的份吧……。也就是说……发送短信的人拥有名簿之类的资料……。" },
      { num: 152, name: "北校生无名氏", date: "2012/07/13(月) 01:40", uid: "satokon", body: "虽然有点不好意思开口……但那个短信应该真的是高岛柘榴发的……。因为我手机里有那个人的邮箱地址所以才知道。" },
      { num: 153, name: "赤坂惠", date: "2012/07/13(月) 01:42", uid: "megu", body: "是聪子吧……。我也知道……那个肯定是高岛发来的短信没错。因为邮箱地址一样嘛……而且拍出来的照片和那孩子拿的手机摄像头……。" },
      { num: 154, name: "聪子", date: "2012/07/13(月) 01:46", uid: "satokon", body: "怎么办……那个是高岛的手机吧。照片之类啊，跟之前拍的分辨率一样啊。跟拍那个快餐的时候一模一样。" },
      { num: 155, name: "北校生无名氏", date: "2012/07/13(月) 01:51", uid: "atata", body: "高岛还活着吗？高岛死了。没活着。这是肯定的" },
      { num: 160, name: "聪子", date: "2012/07/13(月) 03:12", uid: "satokon", body: "好害怕啊……我……该怎么办。" },
      { num: 161, name: "北校生无名氏", date: "2012/07/13(月) 03:15", uid: "atata", body: "干嘛要那么害怕？" },
      { num: 162, name: "赤坂惠", date: "2012/07/13(月) 03:22", uid: "megu", body: "大概高岛在憎恨着我们吧……那个短信果然是幽灵发的？是高岛的幽灵吗？那样的话我……。" },
      { num: 164, name: "聪子", date: "2012/07/13(月) 03:29", uid: "satokon", body: "是你们欺负高岛的吗？不只有我们哦……本来就是班里所有人做的……为什么只有我们……。" },
      { num: 165, name: "北校生无名氏", date: "2012/07/13(月) 03:33", uid: "atata", body: "只有你们是怎么一回事？" },
      { num: 167, name: "北校生无名氏", date: "2012/07/13(月) 03:40", uid: "manaka", body: "秋子跟爱理她们，班里的其他人都没收到短信。我们明明不认识高岛却也收到短信了呢ww" },
      { num: 168, name: "北校生无名氏", date: "2012/07/13(月) 03:40", uid: "kiri", body: "原因就是你们啊！为了让高岛的幽灵息怒请你们去死吧。" },
      { num: 171, name: "北校生无名氏", date: "2012/07/13(月) 03:55", uid: "akana", body: "谁管你们啊。受到高岛诅咒的只有你们俩就足够了。" },
      { num: 172, name: "北校生无名氏", date: "2012/07/13(月) 03:58", uid: "kotoko", body: "高岛有是不是说过自己死的时候不是人类？话说起来……。" },
      { num: 173, name: "北校生无名氏", date: "2012/07/13(月) 04:02", uid: "kotoko", body: ">2012年7月12号将进行脑袋·反转。>然后大家都会知道吧。 >我并不是人类这件事。>以及世界将走向灭亡这件事……。有说过。 在那时就已经是幽灵吗？" },
      { num: 174, name: "北校生无名氏", date: "2012/07/13(月) 04:06", uid: "mamada", body: ">>173 自杀是在这篇回贴之后，那时应该还是人类的。别说这种让人混乱的话啊" },
      { num: 392, name: "北校生无名氏", date: "2012/07/13(月) 11:42", uid: "ikeda", body: "倒不如说20号世界灭亡也太早了啦，这是高岛的诅咒引起的吗？" },
      { num: 393, name: "北校生无名氏", date: "2012/07/13(月) 11:45", uid: "mamada", body: ">>392 再怎么说一个幽灵也没办法毁灭世界吧。" },
      { num: 395, name: "北校生无名氏", date: "2012/07/13(月) 11:55", uid: "kimi", body: "那么世界应该不会灭亡吧。是指欺负她的人会毁灭吧。" },
      { num: 396, name: "北校生无名氏", date: "2012/07/13(月) 11:58", uid: "tomoda", body: "在20号被诅咒杀死。她大概很恨吧。还下诅咒给大家发那种照片……。" },
    ],
  },
  {
    title: "【确认】高岛同学的短信",
    posts: [
      { num: 1, name: "北校生无名氏", date: "2012/07/13(月) 18:52", uid: "MARUKOME", body: "这里是大家用来确认据说是高岛柘榴发来的短信的帖子。好像收到啥了(||||怓￣)」好可怕～" },
      { num: 2, name: "北校生无名氏", date: "2012/07/13(月) 18:58", uid: "MARUKOME", body: "●已确认的短信>我借由死亡重生为战士 >本应该是这样的>好痛>明明没有身体却好痛 >变成这样好痛>因此>大家都会死 >在8天后死掉>所有人肯定都会死。" },
      { num: 32, name: "北校生无名氏", date: "2012/07/14(火) 09:28", uid: "ERAE", body: ">我借由死亡重生为战士>本应该是这样的 >好痛>明明没有身体却好痛>变成这样好痛 >因此>大家都会死>在4天后死掉 >所有人肯定都会死。早上起来看到邮箱收到了这个，大家都有收到吗？" },
      { num: 33, name: "北校生无名氏", date: "2012/07/14(火) 09:38", uid: "MAME", body: "有收到。大概是AM09:12左右收到的。死亡的倒计时吗……。说起一模一样的文章确实让人格外害怕呢……。真是很厉害的手段……。" },
      { num: 120, name: "聪子", date: "2012/07/14(火) 13:20", uid: "satokon", body: ">好痛好痛>好痛318 >好痛>好痛好痛好痛好痛好痛>好痛好痛好痛好痛好痛好痛好痛 >好痛好痛>好痛好痛好痛好痛>好痛好痛好痛 >好痛每天都收到这种短信……。你都收到了？" },
      { num: 121, name: "北校生无名氏", date: "2012/07/14(火) 13:22", uid: "atata", body: "没有收全哦" },
      { num: 122, name: "赤坂惠", date: "2012/07/14(火) 13:22", uid: "megu", body: "我也收到了。跟你收到的一模一样。" },
      { num: 125, name: "北校生无名氏", date: "2012/07/14(火) 13:30", uid: "aQ3fG", body: "难道说是因为欺负过高岛的人才会收到吧" },
      { num: 232, name: "北校生无名氏", date: "2012/07/14(火) 16:20", uid: "ERAE", body: ">血和头发散落一地>手机沾满鲜血>鞋子上也沾了很多血 >衣服上也都是血>头发上沾满了血 早上的时候收到了这个短信。真的好恐怖……。" },
      { num: 233, name: "北校生无名氏", date: "2012/07/15(水) 07:28", uid: "MAME", body: "有收到。大概是AM07:10左右收到的。这次不光是我……手机好像坏掉了……" },
      { num: 236, name: "北校生无名氏", date: "2012/07/15(水) 07:42", uid: "ERAE", body: "话说回来，间宫卓司那家伙，用黑板擦打老师头的那件事，是几个小时前发生的吧？虽然那家伙以前确实有点问题，但没想到会突然变成那样……莫非是高岛的预言应验了吗？" },
    ],
  },
  {
    title: "救世主",
    posts: [
      { num: 1, name: "间宫卓司", date: "2012/07/15(水) 11:23", uid: "mamiya", body: "大家都已确信了吧。并且已看见了吧。高岛的邮件预言中，有预言过我的觉醒。我，现在将在这里站起来。作为救世主。此刻，将得到救赎者与得不到救赎者将被筛选出来。" },
      { num: 2, name: "北校生无名氏", date: "2012/07/15(水) 11:26", uid: "KAERA", body: "接在高岛后面又有人搞这些啊。恶心别再做这种事行不。" },
      { num: 4, name: "北校生无名氏", date: "2012/07/15(水) 11:35", uid: "ADAMO", body: "你还没被抓到啊wwwwww 间宫发的帖子充满各种嘲讽，肯定没有人会把那种事当真吧……。听说有几个人在间宫事件后消失了……但应该没什么关系……。" },
      { num: 356, name: "聪子", date: "2012/07/15(水) 23:13", uid: "satoko", body: "我要展示一个证据，证明我说的都是真的。如果这是真的话，就能证明高岛的诅咒是真的了。" },
      { num: 357, name: "赤坂惠", date: "2012/07/15(水) 23:15", uid: "megu", body: "你就别犯傻了，去阻止高岛的短信吧。聪子我们一起去见间宫吧。那家伙说能阻止高岛的诅咒……总之先听听他怎么说。" },
      { num: 430, name: "间宫卓司", date: "2012/07/16(木) 01:33", uid: "mamiya", body: "你说要停止高岛的诅咒？那是什么意思我不太明白，不过我倒是可以帮你们预言看看哦。" },
      { num: 431, name: "北校学生无名氏", date: "2012/07/16(木) 01:35", uid: "rondo", body: "要阻止高岛的短信，如果要让预言停止的话，就去把高岛给杀了吧。" },
      { num: 432, name: "赤坂惠", date: "2012/07/16(木) 01:36", uid: "megu", body: "停止吧，只有我和聪子收到的那种恶作剧短信。什么诅咒不诅咒的，这里本来就是个揭示板，大家不都是匿名在说话吗？为什么要说得好像真的有什么诅咒似的！" },
      { num: 444, name: "间宫卓司", date: "2012/07/16(木) 01:37", uid: "mamiya", body: "那么现在开始我说的话你们都听好了。首先，出了杉宫站之后，沿大路走过一个住宅区，然后往南走约5米的地方。" },
      { num: 446, name: "北校学生无名氏", date: "2012/07/16(木) 01:38", uid: "rondo", body: "那个地方就是高岛自杀的地方……" },
      { num: 447, name: "赤坂惠", date: "2012/07/16(木) 01:40", uid: "megu", body: "开什么玩笑，谁会去那种地方……" },
      { num: 448, name: "聪子", date: "2012/07/16(木) 01:41", uid: "satoko", body: "高岛死的地方太恐怖了，谁去的话会被附身的……" },
      { num: 453, name: "间宫卓司", date: "2012/07/16(木) 01:43", uid: "mamiya", body: "去不去都随便你们，反正不去的话大家都会被高岛的诅咒给杀掉哦。在高岛死的地方会有一束黑色的头发，把那东西带回家。" },
      { num: 456, name: "北校学生无名氏", date: "2012/07/16(木) 01:49", uid: "rama", body: ">>453 哈哈白痴www怎么可能还会有高岛的头发啊www而且现场早就被警方清理得什么也不剩了好吗www" },
      { num: 477, name: "赤坂惠", date: "2012/07/16(木) 02:45", uid: "megu", body: "我现在在公寓下面……找到了。一束黑色的头发……。这个怎么看都是高岛的头发啊……。因为……头发根部的地方带着头盖骨……" },
      { num: 478, name: "聪子", date: "2012/07/16(木) 02:45", uid: "satoko", body: "为什么你会知道那种地方……。在那个回复之后那个帖子就再也没有人回复了。不过就这样我们几个也就只能互相注视着，反正都知道结果了……。" },
      { num: 479, name: "赤坂惠", date: "2012/07/16(木) 05:05", uid: "megu", body: "停下了……短信停下来了……！" },
      { num: 481, name: "赤坂惠", date: "2012/07/16(木) 05:08", uid: "megu", body: "回到家后跟间宫打了电话。那家伙居然知道我的手机号码……。不管了，我把高岛的头发照片发了过去，然后短信真的就停了。" },
      { num: 482, name: "聪子", date: "2012/07/16(木) 05:15", uid: "satoko", body: "两个人在家里按照间宫说的进行了仪式，好像真的停下了。平时的话应该会在4:01和5:01收到的短信没有来了。" },
    ],
  },
];

const PAGE_SIZE = 1;

export default function BulletinPage() {
  const [page, setPage] = useState(0);
  const totalPages = THREADS.length;
  const thread = THREADS[page];

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
          <span className="bbs-header-title">◆ {thread.title} ◆</span>
          <span className="bbs-header-info">{thread.posts.length} res</span>
        </div>

        <div className="bbs-threads">
          {thread.posts.map((post, i) => (
            <div key={`${post.num}-${i}`} className="bbs-post">
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
          <button className="bbs-pager-btn" disabled={page === 0} onClick={() => setPage(p => Math.max(0, p - 1))}>‹ 前のページ</button>
          <span className="bbs-pager-info">{page + 1} / {totalPages}</span>
          <button className="bbs-pager-btn" disabled={page >= totalPages - 1} onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}>次のページ ›</button>
        </div>

        <div className="bbs-footer">◆ 2012年7月 · 北校揭示板 ◆</div>
      </section>

      <div className="divider-rule" />
    </>
  );
}
