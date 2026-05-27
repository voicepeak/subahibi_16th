# SubaHibi 16th Anniversary Fan Project — Rebuild PRD

> 项目代号：**The Sky Archive / 终末天空档案馆**  
> 文档版本：v2.0  
> 面向对象：AI Coding Agent / Opencode / Claude Code / 前端开发者  
> 项目性质：非官方粉丝纪念站  
> 核心目标：从“功能集合型粉丝站”重构为“可滚动、可探索、可互动的纪念体验站”

---

## 0. 一句话定义

把《素晴日》16周年纪念站重构为一个以“天空、短信、揭示板、世界终结、终之空、幸福地生活”为叙事主线的沉浸式网页体验。网站不是普通资源站，也不是长期论坛，而是一次围绕 7 月 20 日前后的短期互联网纪念事件。

---

## 1. 背景与问题

### 1.1 当前站点已有基础

当前项目已经具备以下基础模块：

- Next.js + Tailwind CSS 项目结构
- 非官方粉丝纪念站定位
- 留言墙、投稿、时间线、投票等原始 PRD 构想
- `/bulletin` 北校揭示板模块
- `/takashima` 高岛短信模块
- `/tsuinosora` 终之空模块
- 一定数量的 CG、背景、角色立绘、BGM、手机图像等素材

### 1.2 当前主要问题

现有版本的问题不是“功能太少”，而是“体验没有被统一叙事组织起来”。

具体表现：

1. 页面之间像功能入口的并列集合，缺少主线。
2. BBS、短信、终之空等强内容模块没有形成逐步递进的情绪路径。
3. 视觉上有电波、glitch、暗色等元素，但缺少克制和层次。
4. 滚动特效如果只是堆叠，会变成炫技，不会产生作品感。
5. 站点需要从“信息展示”转向“纪念体验”。

### 1.3 重构目标

重构后的网站应当让用户产生如下体验：

> 一开始是明亮、安静、夏日、天空。  
> 随后出现异常短信、旧式揭示板、匿名恐惧、日期倒计时。  
> 中段进入电波、崩坏、世界终结。  
> 最后回到天空，留下纪念、留言、二创和“幸福地生活”的余韵。

---

## 2. 产品定位

### 2.1 产品名称

推荐名称：

```text
SubaHibi 16th Anniversary — The Sky Archive
```

中文副标题：

```text
素晴日16周年纪念站：终末天空档案馆
```

### 2.2 定位关键词

- 周年纪念
- 沉浸式网页
- 视觉小说式叙事
- 滚动电影感
- 电波感
- 旧互联网档案
- 天空与终末
- 粉丝共创
- 非商业
- 短期活动站

### 2.3 产品不做什么

本项目不做：

- 不做游戏下载站
- 不做汉化资源分发
- 不做长期论坛社区
- 不做即时聊天社区
- 不做商业化售卖
- 不做角色 AI 陪聊作为 MVP
- 不做大规模百科资料库
- 不提供高分辨率游戏素材下载

---

## 3. 用户画像

### 3.1 核心用户：玩过《素晴日》的 VN 玩家

用户特征：

- 熟悉作品剧情和角色
- 对 7 月 20 日、终之空、幸福地生活等意象有情绪记忆
- 愿意看剧情向网页演出
- 愿意留言、截图、转发

需求：

- 被作品氛围击中
- 看到高质量纪念设计
- 能留下自己的纪念痕迹

### 3.2 二创作者

用户特征：

- 可能会投稿插画、MAD、截图、短文
- 希望自己的作品被展示和署名
- 对页面审美要求较高

需求：

- 有投稿入口
- 有作品墙
- 有外链展示
- 审核后展示，不被垃圾内容污染

### 3.3 路过用户 / 社交媒体访客

用户特征：

- 通过 X、B站、贴吧、群聊进入
- 可能未完整玩过作品
- 只停留 30 秒到 3 分钟

需求：

- 第一屏要有冲击力
- 不需要理解所有剧情也能感到“这是一个认真做的纪念站”
- 能快速知道这是什么项目

---

## 4. 核心设计原则

### 4.1 先天空，后电波

不要一进入页面就红黑、乱码、强 glitch。  
作品的气质应先从明亮、日常、夏日天空开始，再逐渐被异常信息污染。

页面情绪顺序：

```text
明亮 → 安静 → 异常 → 不安 → 恐惧 → 崩坏 → 静默 → 释然
```

### 4.2 少量高级特效胜过大量廉价特效

禁止堆砌：

- 满屏粒子
- 过度 glitch
- 过度霓虹
- 频繁震屏
- 无意义 3D
- 每屏都做大动画

推荐使用：

- 慢速视差
- 低频画面噪声
- 文字逐行显现
- CG 缓慢 crossfade
- 滚动锁定章节
- 黑屏硬切
- 关键节点突发失真

### 4.3 模块必须服务叙事

`/bulletin`、`/takashima`、`/tsuinosora` 不是孤立页面，而是主线叙事中的“档案层”。

- `/bulletin` 是恐惧扩散档案
- `/takashima` 是短信异常入口
- `/tsuinosora` 是情绪高潮
- `/memories` 是纪念落点
- `/works` 是粉丝共创落点

### 4.4 不要把站点做成“资源页”

即使页面中使用 CG、BGM、角色立绘，也必须作为氛围材料，而不是素材下载展示。所有资源展示应压缩、限制下载、标注非官方粉丝用途。

---

## 5. 信息架构

### 5.1 推荐路由结构

```text
/
  开场入口 / Landing Gate

/journey
  主滚动叙事页，整个站点的核心体验

/archive/bulletin
  北校揭示板档案

/archive/takashima
  高岛短信 / 邮件模拟 / 订阅页面

/tsuinosora
  终之空短片式开场动画

/memories
  粉丝留言墙

/works
  二创展示墙

/about
  项目说明、非官方声明、版权说明、联系方式

/admin
  管理后台，仅管理员访问
```

### 5.2 导航策略

桌面端：

- 左上角：站点标题
- 右上角：Archive / Memories / Works / About
- 页面滚动时导航半透明隐藏
- 进入 `/journey` 后出现章节进度条

移动端：

- 右下角浮动菜单
- 菜单打开后展示主要入口
- 避免复杂 hover 交互

### 5.3 首页与主体验关系

`/` 首页不承载太多内容，只做“进入仪式”。

首页结构：

1. 静态天空背景
2. 项目标题
3. 16th Anniversary
4. 一句简短引导
5. Enter 按钮
6. Skip to Archive 小链接

点击 Enter 后进入 `/journey`。

---

## 6. 主体验页 `/journey`

### 6.1 页面定位

`/journey` 是整个站点的核心。  
它不是普通页面，而是一条纵向滚动的视觉小说式纪念短片。

### 6.2 章节结构

推荐分为 6 个章节。

---

### Chapter 01：Friday Rooftop / 周五的楼顶

目标：

- 建立天空、日常、楼顶、夏日感。
- 第一印象必须克制、明亮、干净。

视觉：

- 全屏蓝天
- 楼顶栏杆剪影
- 轻微云层移动
- 白色 / 淡蓝标题文字

交互：

- 滚动时文字逐行出现
- 背景以极慢速度视差移动
- 鼠标移动时云层产生微弱偏移

内容：

- 不放大量原文
- 只放极短引导句
- 重点是氛围，不是讲剧情

验收标准：

- 第一屏必须有高级感
- 不得出现廉价恐怖感
- 不得一开始就强 glitch

---

### Chapter 02：Takashima Mail / 高岛短信

目标：

- 从日常过渡到异常。
- 用手机短信 UI 引入高岛模块。

视觉：

- 页面右侧浮现手机
- 手机时间固定在 22:44
- 背景天空开始轻微变暗
- 少量信号干扰线

交互：

- 用户滚动到本章时，手机收到第一条短信
- 短信气泡逐条出现
- 每条短信出现时有轻微震动动画
- 点击手机可进入 `/archive/takashima`

内容：

- 站内短信模拟为主
- 真实邮件订阅为可选增强功能

验收标准：

- 短信出现节奏不能太快
- UI 要像“异常通知”，不要像普通聊天页
- 点击后进入完整短信档案页

---

### Chapter 03：North School Bulletin / 北校揭示板

目标：

- 呈现匿名讨论、流言扩散、恐惧放大的过程。
- 把 BBS 模块从“帖子展示”变成“事件回放”。

视觉：

- 旧式网页 / BBS / CRT 显示器感
- 等宽字体
- 淡灰背景
- 绿色或蓝绿色文字点缀
- 局部红色警告文本

交互：

- 滚动到本章后 BBS 帖子开始自动滚动
- 右侧出现时间线
- 关键帖子出现时背景轻微闪烁
- 点击“Open Archive”进入 `/archive/bulletin`

内容：

- 保留现有 5 个主题帖：
  - 城山翼跳楼
  - Big Hazard
  - 收到奇怪短信
  - 确认高岛短信
  - 救世主
- 内容从页面组件中抽离到 `src/content/bulletin.ts`

验收标准：

- 至少支持按主题切换
- 至少支持帖子分页
- 至少支持时间线模式
- 至少支持关键发言高亮

---

### Chapter 04：World Ends on 7.20 / 世界终结

目标：

- 形成全站情绪转折点。
- 把 7 月 20 日作为核心时间锚点。

视觉：

- 背景由蓝天转为黄昏 / 暗色
- 日期数字不断跳动
- 页面出现倒计时式 UI
- 噪声增强，但不满屏遮挡

交互：

- 滚动过程中日期从 7/12、7/13、7/14 逐步逼近 7/20
- 到达关键点时页面短暂黑屏
- 黑屏后进入终之空入口

验收标准：

- 7/20 必须成为用户明确感知到的节点
- 不允许只是普通倒计时组件
- 要和前面的短信、BBS 形成因果感

---

### Chapter 05：Tsui no Sora / 终之空

目标：

- 作为整个站点的情绪高潮。
- 不做长篇文本堆叠，而做短片式演出。

视觉：

- 黑屏
- 白字
- 瞬间画面撕裂
- 天空切片
- 坠落感
- 最后静止

交互：

- 用户点击“Enter Tsui no Sora”后触发 20–40 秒演出
- 必须提供 Skip
- 演出结束后自动进入 Chapter 06
- 可从独立路由 `/tsuinosora` 重新观看

演出节奏：

```text
Act 1：静默天空，3–5 秒
Act 2：信号污染，8–15 秒
Act 3：世界终结，5–10 秒
Act 4：黑屏归零，3–5 秒
Act 5：回到天空，5 秒
```

验收标准：

- 不超过 40 秒
- 必须可跳过
- glitch 不得全程持续
- 结尾必须回到安静天空

---

### Chapter 06：Wonderful Everyday / 幸福地生活

目标：

- 让站点不止停在猎奇和恐怖，而是回到纪念、共创、留言。
- 引导用户进入 `/memories` 或 `/works`。

视觉：

- 噪声消失
- 白色天空
- 柔和光晕
- 向日葵、坡道、云层等意象可作为抽象背景

交互：

- 出现留言入口
- 出现二创展示入口
- 出现分享按钮
- 可以播放一段柔和 BGM

验收标准：

- 用户完成主线后能明确知道下一步可以留言或投稿
- 情绪上要有“结束后的平静”
- 不要再继续追加恐怖元素

---

## 7. 保留模块重构要求

## 7.1 `/archive/bulletin` 北校揭示板

### 7.1.1 模块定位

从“BBS 页面”升级为“北校揭示板事件档案”。

### 7.1.2 页面结构

```text
顶部：模块标题 + 日期范围
左侧：主题帖列表
中间：帖子内容
右侧：事件时间线 / 恐惧指数
底部：分页 / 自动回放 / 速度控制
```

### 7.1.3 功能要求

P0：

- 展示 5 个主题帖
- 支持主题切换
- 支持分页
- 支持帖子数量较多时性能稳定
- 支持关键 ID 高亮
- 支持返回 `/journey`

P1：

- 自动回放模式
- 按日期过滤
- 恐惧指数 / 谣言指数 / 可信度标签
- 关键发言浮层解释
- 事件摘要卡片

P2：

- 搜索帖子
- 导出当前时间线截图
- 根据访问时间触发隐藏帖子

### 7.1.4 数据结构

```ts
export type BulletinThread = {
  id: string
  title: string
  dateRange: string
  summary: string
  dangerLevel: 1 | 2 | 3 | 4 | 5
  posts: BulletinPost[]
}

export type BulletinPost = {
  id: string
  no: number
  author: string
  authorId?: string
  datetime: string
  content: string
  tags?: string[]
  highlight?: boolean
  fearScore?: number
  rumorScore?: number
}
```

### 7.1.5 视觉要求

- 字体以等宽字体为主
- 不要做成现代社交媒体样式
- 页面要像“被保存下来的旧互联网档案”
- 关键帖子可以有轻微红色噪点或扫描线
- 不允许满屏血色或廉价恐怖图

---

## 7.2 `/archive/takashima` 高岛短信

### 7.2.1 模块定位

高岛短信模块分为两层：

1. 站内短信模拟：用户在网页中逐步收到短信。
2. 真实邮件订阅：可选，在 7/19、7/20 等节点发送周年提醒。

### 7.2.2 P0 功能：站内短信模拟

流程：

1. 用户输入昵称或邮箱。
2. 系统提示“订阅已建立”。
3. 网页内出现手机 UI。
4. 短信按设定顺序逐步解锁。
5. 解锁状态保存在 localStorage。
6. 可重置体验。

注意：

- P0 不要求真实发邮件。
- 如果输入邮箱，必须明确告知“当前为站内模拟”或“是否同时订阅真实邮件”。

### 7.2.3 P1 功能：真实周年提醒

技术方案：

- Supabase `email_subscriptions` 表
- Edge Function / Cron
- 第三方邮件服务：Resend / Loops / Buttondown / Mailgun
- Cloudflare Turnstile 防刷
- Double opt-in 邮件确认

邮件节点建议：

```text
7/12：第一封，纪念活动开始
7/19：前夜提醒
7/20 00:00：世界终结日
7/20 22:44：特殊纪念邮件
7/21：结束与留言邀请
```

### 7.2.4 页面视觉

- 手机外壳 UI
- 旧式短信界面
- 时间固定为 22:44 或根据剧情节点变化
- 信号格偶发丢失
- 收到短信时轻微震动
- 背景可轮询低透明 CG 或天空图

### 7.2.5 数据结构

```ts
export type TakashimaMail = {
  id: string
  from: string
  subject?: string
  body: string
  unlockDelayMs: number
  timestampLabel: string
  severity: "normal" | "strange" | "danger" | "terminal"
  relatedArchive?: {
    type: "bbs" | "cg" | "video" | "quote"
    id: string
  }
}
```

---

## 7.3 `/tsuinosora` 终之空开场动画

### 7.3.1 模块定位

这是站点最重要的情绪高潮，不是普通页面。

### 7.3.2 重构原则

- 保留“章节式演出”的概念
- 删除过密文案
- 控制时长
- 强化电影感
- 允许用户跳过
- 演出结束必须回到主线

### 7.3.3 推荐实现

组件：

```text
TsuiNoSoraIntro
  ├─ IntroFrame
  ├─ NoiseLayer
  ├─ TextFlash
  ├─ CGFlash
  ├─ Blackout
  └─ ExitToSky
```

状态：

```ts
type IntroPhase =
  | "idle"
  | "sky"
  | "noise"
  | "collapse"
  | "blackout"
  | "return"
  | "done"
```

### 7.3.4 验收标准

- 演出时长 20–40 秒
- 可跳过
- 支持 reduced-motion 模式
- 移动端不崩
- 不得依赖大量 setTimeout 硬编码导致难以维护
- 动画配置应集中在 `src/content/tsuinosora.ts`

---

## 8. CG 轮询与视频播放

## 8.1 CG 展示组件

### 8.1.1 `CGLoopBackdrop`

用途：

- `/journey` 各章节背景
- `/takashima` 背景
- `/tsuinosora` 演出片段

要求：

- 支持图片数组
- 支持 crossfade
- 支持轻微 scale
- 支持 blur-up 加载
- 支持 reduced-motion 时静态第一张
- 不允许左右轮播式切换

接口：

```ts
type CGLoopBackdropProps = {
  images: string[]
  intervalMs?: number
  fadeMs?: number
  intensity?: "calm" | "normal" | "unstable"
  paused?: boolean
}
```

### 8.1.2 `MemoryStrip`

用途：

- `/memories`
- `/works`
- 主线章节间隔

视觉：

- 胶片条
- 横向滚动
- 可点击放大
- 不提供原图下载

### 8.1.3 `EvidenceLightbox`

用途：

- BBS / 短信中点击关键证据时弹出

内容类型：

- CG
- 文本碎片
- 视频
- 音频
- 时间线节点

---

## 8.2 视频播放组件

### 8.2.1 `VideoPanel`

要求：

- 支持 `muted autoplay loop playsInline`
- 默认静音
- 用户点击后才播放声音
- 必须有暂停按钮
- 移动端必须兼容
- 支持海报图 poster
- reduced-motion 下不自动播放

接口：

```ts
type VideoPanelProps = {
  src: string
  poster?: string
  title?: string
  mode: "ambient" | "focus" | "intro"
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}
```

### 8.2.2 视频使用策略

- 首页可以使用 5–10 秒无声循环视频作为背景
- `/journey` 中的视频只用于章节重点，不要每章都有
- `/tsuinosora` 可使用短视频片段，但必须可跳过
- 不允许自动播放带声音视频

---

## 9. 视觉设计规范

### 9.1 色彩

基础色：

```text
Sky White       #F7FAFF
Pale Sky Blue   #DCEEFF
Deep Sky Blue   #6FA9D8
Mist Gray       #D8DEE8
Ink Black       #101217
```

污染色：

```text
CRT Green       #7CFFB2
Warning Red     #D44C4C
Terminal Purple #6B5FA7
Noise Yellow    #F1D36B
```

使用原则：

- 前半段以白、淡蓝、灰蓝为主
- 中段引入 CRT Green 和 Warning Red
- 终之空段使用黑白强对比
- 结尾回到白和淡蓝

### 9.2 字体

建议：

```text
标题：serif / 日文感字体 fallback
正文：system sans-serif
BBS：monospace
数字日期：monospace
```

CSS token：

```css
--font-title: "Noto Serif SC", "Noto Serif JP", serif;
--font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
```

### 9.3 动效语言

允许：

- opacity fade
- y 轴轻微位移
- clip-path reveal
- parallax
- blur transition
- slow zoom
- scanline
- low-frequency glitch

禁止：

- 高频闪烁
- 大量彩虹色 glitch
- 页面疯狂抖动
- 每个元素都飞入
- 3D 翻转卡片泛滥
- 粒子雨泛滥

### 9.4 响应式

桌面端优先完成沉浸感。  
移动端优先保证可读性和稳定性。

移动端策略：

- `/journey` 仍可滚动，但减少 pinning
- BBS 改为上下结构
- 手机短信模块全屏展示
- 终之空动画自动降级
- 禁止横向溢出

---

## 10. 技术方案

### 10.1 技术栈

基础：

```text
Next.js
React
TypeScript
Tailwind CSS
Supabase
Vercel
```

新增建议：

```bash
npm install gsap @gsap/react
```

可选：

```bash
npm install zustand
npm install clsx tailwind-merge
npm install zod
```

不要为了炫技引入过多库。  
MVP 阶段不强制引入 Framer Motion，避免和 GSAP 职责重叠。

### 10.2 目录结构

```text
src/
  app/
    page.tsx
    journey/
      page.tsx
    archive/
      bulletin/
        page.tsx
      takashima/
        page.tsx
    tsuinosora/
      page.tsx
    memories/
      page.tsx
    works/
      page.tsx
    about/
      page.tsx
    admin/
      page.tsx

  components/
    layout/
      SiteShell.tsx
      SiteNav.tsx
      AudioGate.tsx
      SpoilerGate.tsx

    cinematic/
      ScrollScene.tsx
      SkyStage.tsx
      CGLoopBackdrop.tsx
      VideoPanel.tsx
      GlitchLayer.tsx
      NoiseLayer.tsx
      ChapterProgress.tsx
      Letterbox.tsx

    archive/
      BulletinArchive.tsx
      BulletinThreadList.tsx
      BulletinPostList.tsx
      BulletinTimeline.tsx
      MailSimulator.tsx
      PhoneFrame.tsx
      EvidenceLightbox.tsx

    interaction/
      MessageWall.tsx
      MessageForm.tsx
      FanWorkGrid.tsx
      FanWorkSubmitForm.tsx
      SharePanel.tsx

  content/
    journey-scenes.ts
    bulletin.ts
    takashima-mails.ts
    tsuinosora.ts
    characters.ts
    quotes.ts
    assets.ts

  lib/
    gsap.ts
    supabase.ts
    motion.ts
    date.ts
    storage.ts
    cn.ts

  styles/
    globals.css
```

### 10.3 数据与组件分离

所有剧情片段、BBS 帖子、短信、章节配置都必须从页面组件中抽离。

禁止：

```tsx
// 不要在 page.tsx 里塞几百行帖子数据
const posts = [...]
```

推荐：

```tsx
import { bulletinThreads } from "@/content/bulletin"
```

这样后续 AI Coding Agent 修改时不会破坏组件结构。

### 10.4 GSAP 使用规范

集中封装：

```text
src/lib/gsap.ts
```

需要注册：

```ts
gsap.registerPlugin(ScrollTrigger)
```

要求：

- 所有 ScrollTrigger 在组件卸载时清理
- 使用 `gsap.context`
- 避免在服务端执行
- reduced-motion 下禁用复杂动画

示例规则：

```text
每个 ScrollScene 只负责一个章节
不要一个巨大 useEffect 控制全站所有动画
不要无限创建 ScrollTrigger
```

---

## 11. Supabase 数据设计

## 11.1 留言表 `messages`

```sql
create table messages (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  country text,
  content text not null,
  avatar_url text,
  approved boolean default false,
  pinned boolean default false,
  ip_hash text,
  user_agent text,
  created_at timestamptz default now()
);
```

## 11.2 二创投稿表 `fanworks`

```sql
create table fanworks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  description text,
  image_url text,
  source_link text,
  approved boolean default false,
  created_at timestamptz default now()
);
```

## 11.3 邮件订阅表 `email_subscriptions`

```sql
create table email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  nickname text,
  confirmed boolean default false,
  unsubscribed boolean default false,
  created_at timestamptz default now()
);
```

## 11.4 投票表 `poll_votes`

```sql
create table poll_votes (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  option_name text not null,
  ip_hash text,
  created_at timestamptz default now()
);
```

### 11.5 审核原则

所有用户生成内容默认 `approved = false`。  
管理员审核后才公开。

禁止内容：

- 广告
- 攻击性内容
- NSFW
- 违法内容
- 政治争议内容
- 恶意刷屏
- 大段剧透刷屏

---

## 12. 后台管理

### 12.1 MVP 后台功能

`/admin` 需要支持：

- 管理员登录
- 查看待审核留言
- 通过 / 拒绝留言
- 删除留言
- 查看待审核二创
- 通过 / 拒绝二创
- 简单统计：留言数、投稿数、订阅数

### 12.2 非 MVP 功能

- IP 封禁
- 批量审核
- 敏感词列表
- 邮件发送日志
- 访问统计看板

---

## 13. SEO 与分享

### 13.1 基础 SEO

每页需要：

- title
- description
- Open Graph title
- Open Graph image
- Twitter card
- canonical URL

### 13.2 推荐文案

Title：

```text
SubaHibi 16th Anniversary — The Sky Archive
```

Description：

```text
A non-official fan anniversary project for Subarashiki Hibi, built around the sky, memory, messages, and July 20.
```

中文描述：

```text
素晴日16周年非官方粉丝纪念站，一个关于天空、短信、揭示板、7月20日与幸福地生活的沉浸式网页档案。
```

### 13.3 分享图

分享图建议：

- 16:9
- 蓝天背景
- 中央标题
- 底部小字标注 fan project
- 不使用过多游戏原始 CG

---

## 14. 可访问性与安全

### 14.1 Reduced Motion

必须支持：

```css
@media (prefers-reduced-motion: reduce) {
  /* 禁用复杂动画 */
}
```

功能层面：

- 关闭强 glitch
- 禁用 parallax
- CG 轮询暂停
- 视频不自动播放
- 终之空动画提供静态摘要

### 14.2 闪烁安全

避免高频闪烁。  
glitch 频率和亮度必须受控，避免造成不适。

### 14.3 剧透提醒

首页或进入 `/journey` 前可提供轻量提醒：

```text
本网站包含《素晴日》关键剧情意象与剧透内容。
```

提供：

- Enter
- Skip to Archive
- About

### 14.4 年龄与内容提醒

由于作品本身包含成人、暴力、精神压迫等主题，站点应避免直接展示露骨成人内容，但可以提示：

```text
本纪念站包含强剧透、死亡、精神压迫等主题表现。
```

---

## 15. 版权与合规

### 15.1 非官方声明

`/about` 必须包含：

```text
本项目为非官方粉丝纪念站，与原作版权方、发行方无商业合作关系。
所有相关名称、角色、音乐、图像等权利归原权利方所有。
本站不提供游戏下载、破解、汉化补丁或商业化服务。
```

### 15.2 素材使用原则

- 不提供原始素材下载
- 不开放批量下载
- CG 仅用于网页氛围展示
- 尽量使用压缩图、裁切图、抽象化处理
- 用户投稿必须获得投稿者授权
- 侵权请求提供联系邮箱并及时下架

---

## 16. 性能要求

### 16.1 页面性能

目标：

- 首屏加载尽量小于 3 秒
- 首页初始 JS 不得过大
- 图片必须懒加载
- 视频必须使用 poster
- CG 背景使用压缩 webp / avif
- 移动端不加载超大视频

### 16.2 图片策略

- 背景图：1920px 宽以内
- 缩略图：480px 宽以内
- Lightbox 图：1280px 宽以内
- 优先 webp
- 大图预加载仅限当前章节前后各一张

### 16.3 动画性能

- 优先 transform / opacity
- 避免频繁 layout
- 避免 scroll 事件中直接 setState
- ScrollTrigger 数量受控
- 移动端减少 pin

---

## 17. MVP 范围

### 17.1 P0 必须完成

1. 新首页 `/`
2. 主体验页 `/journey`
3. `/archive/bulletin` 重构
4. `/archive/takashima` 站内短信模拟
5. `/tsuinosora` 短片式开场动画
6. `/memories` 留言墙基础功能
7. `/about` 非官方说明
8. 基础响应式
9. reduced-motion 降级
10. 基础 SEO

### 17.2 P1 建议完成

1. 真实邮件订阅
2. 二创投稿 `/works`
3. BBS 自动回放
4. CG Lightbox
5. 视频背景组件
6. 分享图生成
7. 管理后台审核

### 17.3 P2 后续扩展

1. 多语言
2. 投票
3. 章节成就 / 隐藏档案
4. 年度活动归档
5. 访问统计
6. 高级邮件剧情
7. 二创专题页

---

## 18. 开发阶段计划

### Phase 0：清理与备份

任务：

- 保留当前仓库
- 新建重构分支
- 迁移现有内容到 `src/content`
- 梳理素材路径
- 删除无用实验代码

输出：

- `rebuild` 分支
- `src/content` 初版
- 素材清单

### Phase 1：设计系统与基础组件

任务：

- 建立颜色变量
- 建立字体规范
- 建立 `SiteShell`
- 建立 `CGLoopBackdrop`
- 建立 `NoiseLayer`
- 建立 `GlitchLayer`
- 建立 `VideoPanel`
- 建立 reduced-motion 机制

输出：

- 基础视觉系统
- 可复用 cinematic 组件

### Phase 2：主体验页 `/journey`

任务：

- 实现 6 个章节
- 接入 GSAP ScrollTrigger
- 实现章节进度
- 实现章节入口跳转
- 完成桌面端体验

输出：

- 可完整滚动的主线体验

### Phase 3：档案模块

任务：

- 重构 `/archive/bulletin`
- 重构 `/archive/takashima`
- 重构 `/tsuinosora`
- 接入主体验页跳转

输出：

- 三个核心保留模块升级完成

### Phase 4：互动模块

任务：

- 留言墙
- 二创展示
- 投稿表单
- Supabase 数据库
- 管理审核

输出：

- 纪念站具备用户互动能力

### Phase 5：上线优化

任务：

- SEO
- OG 图
- 性能优化
- 移动端适配
- 内容审核
- 法务说明
- Vercel 部署

输出：

- 可公开传播的正式版本

---

## 19. AI Coding Agent 执行要求

如果使用 opencode / Claude Code 等 AI Coding 工具执行，请遵守以下要求：

### 19.1 每次只做一个明确任务

正确：

```text
请先建立新的目录结构和空组件，不要实现全部功能。
```

错误：

```text
请直接把整个网站重做完。
```

### 19.2 每步必须给出真实文件变更

Agent 每轮必须说明：

- 修改了哪些文件
- 新增了哪些文件
- 删除了哪些文件
- 如何运行验证
- 是否通过 typecheck / build

### 19.3 不允许只口头声称完成

所有任务必须以真实代码变更为准。

### 19.4 推荐任务拆分

#### Task 1：建立重构目录

```text
请根据 PRD 创建新的目录结构：src/app/journey、src/app/archive/bulletin、src/app/archive/takashima、src/components/cinematic、src/components/archive、src/content、src/lib。先只创建占位组件和基础导出，不要实现复杂动画。
```

#### Task 2：迁移内容数据

```text
请把现有 bulletin、takashima、tsuinosora 中硬编码的数据抽离到 src/content 下，并让原页面继续能正常渲染。不要改 UI。
```

#### Task 3：建立视觉系统

```text
请在 globals.css 中建立 PRD 中的颜色变量、字体变量和基础背景类，并创建 SiteShell、NoiseLayer、GlitchLayer、CGLoopBackdrop 四个组件。
```

#### Task 4：实现 `/journey` 骨架

```text
请实现 /journey 的 6 个章节骨架，先不做复杂动画，只保证页面结构、章节标题、章节说明、跳转按钮正确。
```

#### Task 5：接入 GSAP

```text
请安装并配置 gsap 和 @gsap/react，在 src/lib/gsap.ts 中集中注册 ScrollTrigger，然后给 /journey 每个章节增加基础 fade/parallax 动画。必须支持 prefers-reduced-motion 降级。
```

#### Task 6：重构 BBS

```text
请把 /bulletin 迁移为 /archive/bulletin，使用左侧主题列表、中间帖子、右侧时间线的三栏布局。保留原内容，增加主题切换和分页。
```

#### Task 7：重构高岛短信

```text
请把 TakashimaSubscription 重构为 MailSimulator + PhoneFrame。P0 只做站内模拟和 localStorage，不做真实邮件发送。
```

#### Task 8：重构终之空

```text
请把 /tsuinosora 重构为 20–40 秒短片式演出，提供 Skip，支持 reduced-motion，并把动画阶段配置放在 src/content/tsuinosora.ts。
```

#### Task 9：留言墙

```text
请使用 Supabase 实现 /memories 的留言提交和已审核留言展示。默认 approved=false，管理员审核后展示。
```

#### Task 10：上线前检查

```text
请运行 npm run typecheck 和 npm run build，修复所有错误，并检查移动端布局、reduced-motion、SEO metadata。
```

---

## 20. 验收标准

### 20.1 体验验收

通过标准：

- 用户进入首页 5 秒内能感知“高质量纪念站”
- `/journey` 能形成完整情绪路径
- BBS、短信、终之空不再像孤立页面
- 最后能自然引导到留言和二创
- 页面不是普通资源导航站

### 20.2 技术验收

通过标准：

```bash
npm run typecheck
npm run build
```

必须通过。

### 20.3 内容验收

通过标准：

- 无游戏下载或补丁分发
- 无商业化售卖
- 无大量原始素材下载入口
- 有非官方声明
- 有剧透提醒
- 用户内容默认审核

### 20.4 移动端验收

通过标准：

- 首页可正常浏览
- `/journey` 可滚动
- BBS 不横向溢出
- 手机短信 UI 不超屏
- 终之空动画不卡死
- 菜单可用

---

## 21. 最终目标

重构后的站点应该达到：

> 它看起来不像一个普通粉丝页面，而像一次认真设计过的互联网纪念事件。  
> 它不是靠堆砌特效变高级，而是靠清晰的叙事、克制的视觉、准确的作品母题和可参与的纪念互动形成高级感。  
> 用户离开时记住的不是“这个站特效很多”，而是“我好像重新走过了一次 7 月 20 日前后的天空”。

---

## 22. 最小可执行版本总结

如果时间有限，最小可执行版本只做以下内容：

1. 首页 `/`
2. 主线 `/journey`
3. BBS 档案 `/archive/bulletin`
4. 高岛短信 `/archive/takashima`
5. 终之空短片 `/tsuinosora`
6. 留言墙 `/memories`
7. 关于页 `/about`

并确保：

- 天空开场
- 短信异常
- BBS 扩散
- 7/20 节点
- 终之空高潮
- 幸福地生活收束

这就是本项目最核心的产品闭环。
