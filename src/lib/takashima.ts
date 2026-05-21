export interface MailMessage {
  id: number;
  subject: string;
  body: string;
  sender: string;
  delay: number;
}

export const MAIL_SEQUENCE: MailMessage[] = [
  {
    id: 0,
    subject: "被封印的阿扎",
    sender: "高岛柘榴 <zakuro@bb.example.jp>",
    delay: 0,
    body: "被封印的阿扎能使用物理特化符虫（外径魔法系暗黑召唤虫） ，想要将邪念植入到我们人类脑子里。那是人类长久的历史中出现的暴君们（希特勒·可汗·玛丽·安托瓦内特.etc）和我们（市民，革命军，人民）的战斗的真相。城山翼同学被那个物理特化符虫侵犯了。阿扎就是这样操纵他， 目的是为了让我堕落 （负性冲动能量下降现象） 。要问其中原因的话，那就是阿扎即将觉醒。Big hazard要来了。大灾难不久将要降临！",
  },
  {
    id: 1,
    subject: "RE: 被封印的阿扎",
    sender: "北校生无名氏 <north@bb.example.jp>",
    delay: 4,
    body: "不对！那当然……是不对的……吧……。虽然我对Big hazard什么的也不太清楚……。",
  },
  {
    id: 2,
    subject: "RE: 被封印的阿扎",
    sender: "高岛柘榴 <zakuro@bb.example.jp>",
    delay: 8,
    body: "为了要让唯一能阻止阿扎斯的存在一天使战士发生负性冲动能量下降现象，让其无力化所以才让物理特化符虫潜入城山翼君的身体里。城山君因为他的脑子已经被啃食干净，除掉物理特化虫后，就发狂从屋顶上跳了下去。之后的回帖也是各种嘲讽……。捣乱的人……生气的人……有点害怕的人……但这个帖子发出来时候，帖子里的人们还没有什么恐惧。感觉只是单纯的大家在嘲讽一个很奇怪的家伙吧。",
  },
  {
    id: 3,
    subject: "收到奇怪的短信",
    sender: "北校生无名氏 <MARUKOME@bb.example.jp>",
    delay: 24,
    body: "貌似是收到短信了……。但上面是奇怪的照片跟文章……。>我借由死亡而重生为战士>本来应该是这样但好痛 >明明没有身体>好痛>因为变成这样了好痛 >所以>大家都会死>会在8天后死掉 >所有人肯定都会死。这个邮箱地址是takasimazakuro……。",
  },
  {
    id: 4,
    subject: "RE: 收到奇怪的短信",
    sender: "聪子 <satoko@bb.example.jp>",
    delay: 30,
    body: "虽然有点不好意思开口……但那个短信应该真的是高岛柘榴发的……。因为我手机里有那个人的邮箱地址所以才知道。",
  },
  {
    id: 5,
    subject: "RE: 收到奇怪的短信",
    sender: "赤坂惠 <megu@bb.example.jp>",
    delay: 48,
    body: "是聪子吧……。 我也知道……那个肯定是高岛发来的短信没错。因为邮箱地址一样嘛……而且拍出来的照片和那孩子拿的手机摄像头……。怎么办……那个是高岛的手机吧。 照片之类啊，跟之前拍的分辨率一样啊。跟拍那个快餐的时候一模一样。",
  },
  {
    id: 6,
    subject: "我会死吗？会被高岛杀死吗？",
    sender: "北校生无名氏 <kiri@bb.example.jp>",
    delay: 60,
    body: "我会死吗？会被高岛杀死吗？不如说为了别连累到我们请快点去死吧……。是不是注册这个揭示板的所有人都有收到高岛短信了啊？但是……。",
  },
  {
    id: 7,
    subject: "【确认】高岛同学的短信",
    sender: "北校生无名氏 <MARUKOME@bb.example.jp>",
    delay: 80,
    body: "这里是大家用来确认据说是高岛柘榴发来的短信的帖子。好像收到啥了(||||怓￣)」好可怕～●已确认的短信>我借由死亡重生为战士 >本应该是这样的>好痛>明明没有身体却好痛 >变成这样好痛>因此>大家都会死 >在8天后死掉>所有人肯定都会死。收到除这个以外的短信的人请写出来。",
  },
  {
    id: 8,
    subject: "停下了",
    sender: "聪子 <satoko@bb.example.jp>",
    delay: 100,
    body: "两个人在家里按照间宫说的进行了仪式好像真的停下了。 平时的话应该会在4:01和5:01收到的短信没有来了。由岐：「这是什么……」在那之后，又有几个人找间宫商量同样的事。 那些应该都是受到高岛诅咒的事情，全部都被间宫解决掉了。然后，今天AM9:20又有新的高岛短信。又有人死掉了 从屋顶落到中庭无人可以阻止更多人死去再过不久就是真正的终结 这种内容的短信，发给了这个揭示板里的人。因为这是跟昨天间宫的预言的内容一样的事情，所以可信度进一步增加。",
  },
  {
    id: 9,
    subject: "真相",
    sender: "水上由岐 <yuki@inquiry.example.jp>",
    delay: 130,
    body: "使用高岛同学的手机……向尽可能多的人发送了高岛短信……。从高岛同学的手机上，检测出高岛同学的指纹……并且还检测出了你的指纹。你在自杀现场捡到高岛同学的手机吧。或者说……是偷来了。然后利用这部手机，冒充高岛柘榴发送了那些短信。你操纵了大家的恐惧，把自己塑造成了救世主。一切都已结束。",
  },
];

export function getDeliveredMails(subscribedAt: number): MailMessage[] {
  const now = Date.now();
  const elapsed = (now - subscribedAt) / (1000 * 60 * 60);
  return MAIL_SEQUENCE.filter((m) => elapsed >= m.delay);
}

export function getNextMailTime(subscribedAt: number): number | null {
  const now = Date.now();
  const elapsed = (now - subscribedAt) / (1000 * 60 * 60);
  const next = MAIL_SEQUENCE.find((m) => elapsed < m.delay);
  if (!next) return null;
  return subscribedAt + next.delay * 60 * 60 * 1000;
}
