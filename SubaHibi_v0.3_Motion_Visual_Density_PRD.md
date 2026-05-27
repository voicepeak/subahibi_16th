# SubaHibi 16th Anniversary Rebuild — v0.3 Iteration PRD

> 版本名称：**v0.3 — Motion & Visual Density Pass**  
> 项目代号：**The Sky Archive / 终末天空档案馆**  
> 适用分支：`rebuild-demo`  
> 面向对象：Codex / opencode / 前端开发者 / 设计实现者  
> 迭代目标：在不增加大量文案的前提下，通过 GSAP 动效、视觉层、滚动编排、素材轮询和互动装置，解决页面空、缺少高级感、缺少“演出感”的问题。

---

## 0. 本次迭代一句话目标

当前 `rebuild-demo` 已经具备较完整的页面骨架，但仍偏“静态展示页”。  
本次 v0.3 的目标是把它从：

```text
PRD 骨架实现
```

升级为：

```text
电影式滚动纪念体验
```

重点不是继续加文案，而是增加：

```text
动效系统
视觉层级
滚动叙事
CG / 视频氛围
短信演出
BBS 回放
终之空短片节奏
票据式留言墙
```

---

## 1. 当前版本问题判断

### 1.1 已完成的部分

当前版本已经具备：

- `/` 首页入口
- `/journey` 主线页面
- `/archive/bulletin` 北校揭示板档案
- `/archive/takashima` 高岛短信模块
- `/tsuinosora` 终之空短片模块
- `/memories` 留言墙
- `/works` 二创展示
- `/about` 非官方说明
- `src/components/cinematic`
- `src/components/archive`
- `src/components/interaction`
- `src/content`
- GSAP 依赖
- reduced-motion 基础考虑

说明前一版已经完成“页面结构搭建”。

### 1.2 当前核心问题

不是文案不够，而是视觉和运动系统不足。

具体问题：

1. `/journey` 仍像普通纵向信息页，缺少 pinned scroll 和滚动演出。
2. 多数章节只有标题、短句和按钮，视觉空间没有被填满。
3. 现有 GSAP 多为基础 fade / reveal，不够“电影式”。
4. CG、视频、BBS、短信等素材没有被编排成视觉层。
5. `/archive/takashima` 有逻辑，但短信演出不够强。
6. `/archive/bulletin` 有档案结构，但缺少“信息流回放”的紧张感。
7. `/tsuinosora` 有短片概念，但仍偏状态切换，缺少 GSAP timeline 的精确节奏。
8. `/memories` 仍像普通留言墙，缺少纪念仪式感。
9. 页面空感不能用长文案解决，否则会变成普通介绍站。

### 1.3 本次迭代原则

本轮严格遵守：

```text
不靠加长文案填空
不新增无关页面
不做真实邮件发送
不重写全部项目
不大规模替换现有内容
不引入重型新依赖
不堆砌廉价粒子、霓虹、满屏 glitch
```

应通过以下方式增加页面密度：

```text
多层背景
慢速运动
浮动档案元素
滚动触发状态变化
局部视觉噪声
日期与信号 UI
CG crossfade
手机短信演出
BBS 自动回放
票据化留言
短片式转场
```

---

## 2. 迭代范围

### 2.1 本次主要影响页面

P0 页面：

```text
/
首页入口

/journey
主滚动叙事页

/archive/takashima
高岛短信档案

/archive/bulletin
北校揭示板档案

/memories
留言墙
```

P1 页面：

```text
/tsuinosora
终之空短片

/works
二创展示页
```

### 2.2 本次主要新增组件

建议新增：

```text
src/components/cinematic/SceneStage.tsx
src/components/cinematic/ScrollScrubLayer.tsx
src/components/cinematic/KineticText.tsx
src/components/cinematic/DateDrift.tsx
src/components/cinematic/SignalDistortion.tsx
src/components/cinematic/FloatingArchiveCards.tsx
src/components/cinematic/SceneTransitionWipe.tsx
src/components/cinematic/ChapterProgress.tsx
src/components/cinematic/LightLeak.tsx
src/components/cinematic/FilmGrain.tsx

src/components/interaction/TicketCard.tsx
src/components/interaction/TicketWall.tsx

src/lib/motion-presets.ts
```

### 2.3 本次不做内容

暂不做：

```text
真实邮件发送
复杂后台
登录系统
新数据库表大改
多语言
投票系统
角色 AI 聊天
资源站
素材下载
复杂 3D 场景
```

---

## 3. 产品目标

### 3.1 体验目标

用户进入站点后，应感受到：

1. 首页不是普通 landing page，而像一次安静的开场。
2. `/journey` 不是信息页面，而像一条滚动短片。
3. 高岛短信不是普通表单，而像异常信号进入网页。
4. BBS 不是普通帖子列表，而像旧互联网恐惧传播档案。
5. 终之空不是普通页面，而像一次短暂但强烈的演出。
6. 留言墙不是普通留言卡，而像纪念票据墙。
7. 页面即使文案很少，也不会显得空。

### 3.2 设计目标

用视觉层级替代文字堆叠：

```text
背景层：天空 / CG / 视频 / 色彩变化
氛围层：噪声 / 光晕 / 扫描线 / 日期漂浮
信息层：短信 / BBS 帖子 / 时间线 / 票据
主内容层：标题 / 短句 / 行动按钮
转场层：白场 / 黑场 / CRT 横扫 / glitch burst
```

### 3.3 技术目标

- 建立可复用动效组件，而不是每页乱写动画。
- 所有复杂动画支持 reduced-motion 降级。
- GSAP 动画集中管理、可清理、不泄漏。
- 不破坏现有页面路由。
- 不破坏当前内容数据。
- 保持 `npm run typecheck` 和 `npm run build` 通过。

---

## 4. 核心设计方向

## 4.1 不加文案，增加“视觉装置”

页面空的时候，不要补大段介绍文字。  
优先补：

```text
漂浮日期
微弱云层视差
CG 轮询
短信 UI
BBS 卡片流
章节进度条
信号异常面板
票据卡
黑白转场
光泄漏
扫描线
```

### 错误做法

```text
在每个章节加 300 字剧情解释。
```

### 正确做法

```text
每个章节只保留 1–2 句短句，但增加背景、中景、前景三层运动。
```

---

## 4.2 GSAP 的使用边界

GSAP 只用于：

- 滚动触发
- pinned scene
- parallax
- timeline
- staggered text
- glitch burst
- 短片节奏
- 章节切换

不要用 GSAP 做：

- 普通 hover
- 小按钮过渡
- 简单 opacity CSS 可完成的效果
- 全站无意义循环动画

### GSAP 编码要求

必须：

- 使用 `gsap.context`
- 组件卸载时清理
- 避免服务端执行
- reduced-motion 时禁用复杂 ScrollTrigger
- 不要创建不可控的大量 ScrollTrigger

---

## 4.3 视觉密度的核心公式

每个主要页面至少包含三层：

```text
Layer 1：Atmosphere
天空、CG、视频、渐变、光晕、噪声

Layer 2：Signal
日期、短信、BBS 编号、时间线、票据编号、系统状态

Layer 3：Narrative
标题、短句、CTA、用户可交互内容
```

如果页面只有 Layer 3，就会显得空。

---

## 5. 页面级迭代要求

---

# 5.1 首页 `/`

## 当前问题

首页结构正确，但视觉过轻。  
目前更像普通项目入口，而不是纪念站开场。

## 迭代目标

让首页成为“进入仪式”。

## 页面结构

```text
全屏天空背景
低频 CG / sky crossfade
站点标题
16th Anniversary
剧透提醒
Enter Journey
Skip to Archive
底部细线时间轴：2010 — 2026 / 7.20
```

## 动效要求

1. 首屏加载后先空镜 0.8–1.2 秒。
2. 标题不是立即出现，而是轻微 blur-in。
3. 背景天空缓慢 scale drift。
4. 鼠标移动时背景层有极轻微视差。
5. Enter hover 时出现细微光晕或音频波纹。
6. 点击 Enter 时使用白场过曝转场进入 `/journey`。
7. reduced-motion 下关闭 scale drift 和鼠标视差。

## 不要做

- 不要加长介绍文案。
- 不要做满屏粒子。
- 不要使用强 glitch。
- 不要一开始就黑红恐怖风。

## 验收标准

- 用户 5 秒内能感受到“这是一个精心设计的纪念入口”。
- 即使没有阅读文案，也能感受到天空、静默、纪念感。
- 移动端不出现横向滚动。

---

# 5.2 主线 `/journey`

## 当前问题

已有 6 个章节，但仍像常规滚动页面。  
GSAP 动画以基础 reveal 为主，缺少 pinned scene、视觉层和滚动编排。

## 迭代目标

将 `/journey` 升级为全站核心的电影式滚动体验。

## 章节结构

保持 6 个章节：

```text
01 Friday Rooftop / 周五的楼顶
02 Takashima Mail / 高岛短信
03 North School Bulletin / 北校揭示板
04 World Ends on 7.20 / 世界终结
05 Tsui no Sora / 终之空
06 Wonderful Everyday / 幸福地生活
```

## 每章基础结构

每个章节至少包括：

```text
SceneStage
  Background Layer
    CGLoopBackdrop / Sky gradient / VideoPanel

  Atmosphere Layer
    NoiseLayer / LightLeak / FilmGrain

  Signal Layer
    DateDrift / SignalDistortion / FloatingArchiveCards

  Main Layer
    KineticText title
    short copy
    CTA
```

## GSAP 行为

每个章节：

- 高度不少于 `120vh`
- 关键章节可使用 `pin`
- 背景层 scrub parallax
- 标题逐字或逐词 stagger
- 短句不整块 fade，而是分行出现
- signal layer 根据 scroll progress 改变透明度 / 位置 / 密度
- 章节切换时使用 SceneTransitionWipe

## Chapter 01：Friday Rooftop

视觉：

- 明亮天空
- 楼顶栏杆剪影
- 云层慢速漂移
- 日期 `2012.07.12` 弱显示

动效：

- 标题轻微展开
- 云层 parallax
- 日期漂浮
- 滚动末尾白场过曝进入下一章

禁止：

- 不出现恐怖视觉
- 不出现强噪声

## Chapter 02：Takashima Mail

视觉：

- 手机 UI 从右侧进入
- 背景天空开始变暗
- 信号线轻微波动
- 时间显示 `22:44`

动效：

- 滚动 30%：第一条短信出现
- 滚动 55%：手机轻微震动
- 滚动 80%：信号短暂丢失
- 末尾 CTA：Open Mail Archive

## Chapter 03：North School Bulletin

视觉：

- BBS 卡片背景漂浮
- 帖子编号、匿名 ID、日期碎片
- CRT 扫描线
- 恐惧指数条

动效：

- 帖子卡片按 scroll progress 上浮
- 关键 ID 短暂高亮
- fear index 从低到高
- 进入 CTA：Open Bulletin Archive

## Chapter 04：World Ends on 7.20

视觉：

- 日期滚轮
- 背景从黄昏转暗
- 噪声明显增强
- 最后只剩 `2012.07.20 / 22:44`

动效：

- 日期随 scroll progress 跳动
- 7/20 出现时短暂黑屏
- warning line 闪现但不频繁

## Chapter 05：Tsui no Sora

视觉：

- letterbox 黑边
- CG 短闪
- 文字错位
- 黑白强对比

动效：

- 滚动中段 letterbox 出现
- 画面被拉伸
- 末尾出现 Enter Tsui no Sora
- 点击进入 `/tsuinosora`

## Chapter 06：Wonderful Everyday

视觉：

- 回到明亮天空
- 低噪声
- 票据 / 留言卡片漂浮
- 光线柔和

动效：

- 前面所有噪声逐渐消失
- 票据轻微漂浮
- CTA：Leave a Ticket / View Memories

## 页面固定元素

新增：

```text
ChapterProgress
```

要求：

- 右侧或底部显示 6 个章节点
- 当前章节高亮
- 可点击跳转
- 移动端简化为底部细线
- reduced-motion 下仍可用

## 验收标准

- 页面不增加长文案也不空。
- 滚动时有明确“章节推进感”。
- 高岛、BBS、7/20、终之空、留言都能被视觉识别。
- 移动端可正常滚动，不因 pin 失控。

---

# 5.3 `/archive/takashima`

## 当前问题

逻辑方向正确，但页面演出不足。  
用户提交后短信出现，但缺少手机震动、信号异常、22:44、CG 氛围等细节。

## 迭代目标

把它从表单模拟器升级为“异常短信演出页”。

## 页面结构

```text
左侧 / 背景：
  CGLoopBackdrop
  SignalDistortion
  低透明日期和系统状态

中间 / 右侧：
  PhoneFrame
  MailSimulator

底部 / 侧边：
  Signal Status Panel
  Received Count
  Reset
  Link to Bulletin
```

## 新增视觉元素

```text
Signal Status Panel:
  Signal: unstable
  Time: 22:44
  Received: 3 / 5
  Mode: Local simulation
```

## 动效要求

每条短信出现时：

1. 手机轻微 shake 0.18–0.25 秒。
2. 屏幕亮度闪一下。
3. 信号格短暂从满格变 0 格。
4. `22:44` 闪烁一次。
5. 背景 signal line 轻微错位。

## reduced-motion

如果用户开启 reduced-motion：

- 禁止 shake
- 禁止闪烁
- 短信直接 fade in
- 背景保持静态

## 验收标准

- 不误导用户以为真实发送邮件。
- 必须保留“站内模拟 / localStorage”说明。
- 短信页面即使只有少量文本，也应有足够氛围。
- 手机 UI 在移动端居中显示。

---

# 5.4 `/archive/bulletin`

## 当前问题

已有档案结构，但自动回放和信息流感不足。  
目前容易看起来像普通数据列表。

## 迭代目标

升级为“BBS 恐惧扩散回放系统”。

## 页面结构

```text
顶部：
  North School Bulletin Archive
  Date Range
  Replay Control

左侧：
  Thread List

中间：
  Post Stream

右侧：
  Timeline
  Fear Index
  Rumor Index
  Key IDs
```

## 自动回放机制

现有 Auto Replay 不应只切换主题。  
应改为：

```text
visiblePostCount 从 1 增加到当前主题总帖数
帖子逐条出现
timeline 同步亮起
fear index 同步增长
关键帖子出现时触发 glitch burst
```

## 交互要求

- Play / Pause
- Speed: 1x / 2x / 4x
- Reset
- 手动点击主题时停止自动回放
- 点击 timeline 节点跳到对应帖子
- hover 关键帖子时右侧摘要高亮

## 视觉要求

- CRT 外框
- scanline
- 帖子编号突出
- 匿名 ID 颜色区分
- 关键帖子轻微 warning red
- 背景漂浮旧帖编号

## 数据要求

不改原内容。  
只增加 UI 所需派生状态：

```ts
visiblePostCount
activePostId
isReplaying
replaySpeed
fearIndex
rumorIndex
```

## 验收标准

- 用户不读长文也能感到信息扩散。
- 自动回放能在当前主题内推进。
- 页面不因帖子多而明显卡顿。
- 移动端改为单列 + sticky control。

---

# 5.5 `/tsuinosora`

## 当前问题

已有短片页，但更像状态切换页面。  
下一步要让它变成“真正短片式演出”。

## 迭代目标

使用 GSAP timeline 重构播放节奏。

## Timeline 结构

建议阶段：

```text
idle
sky
noise
collapse
blackout
return
done
```

对应标签：

```ts
tl.addLabel("sky")
tl.addLabel("noise")
tl.addLabel("collapse")
tl.addLabel("blackout")
tl.addLabel("return")
```

## 动效内容

每个阶段控制：

```text
image opacity
image scale
text autoAlpha
text y
noise opacity
glitch burst
blackout opacity
progress bar
letterbox
```

## glitch 原则

错误：

```text
全程 glitch
```

正确：

```text
短 burst
0.12 秒强闪
0.08 秒归零
0.16 秒错位
然后安静 1–2 秒
```

## 必须保留

- Skip
- reduced-motion
- 20–40 秒总时长
- 演出结束后回到主线或进入 memories
- 不自动播放有声视频

## 验收标准

- 整体有短片感。
- 不依赖大量散乱 setTimeout。
- glitch 是节奏点，不是背景常驻噪声。
- 移动端可跳过。

---

# 5.6 `/memories`

## 当前问题

留言墙如果只是普通卡片，会显得像常规网站模块。  
这里需要纪念仪式感。

## 迭代目标

改造成：

```text
Sky Archive Ticket Wall / 终之空观测票墙
```

## 留言卡样式

每条留言渲染为一张票：

```text
THE SKY ARCHIVE TICKET
Passenger: 昵称
Date: 2026.07.20
Destination: 終ノ空
No. 0720-0016

留言内容
```

## TicketCard 字段

```ts
type TicketCardProps = {
  id: string
  nickname: string
  content: string
  createdAt: string
  ticketNo: string
  destination?: string
  pinned?: boolean
  pending?: boolean
}
```

## 视觉要求

- 票据圆角或打孔边
- 等宽编号
- 淡蓝 / 米白底色
- 轻微纸张纹理
- pinned 留言有 stamp 效果
- pending 本地留言半透明
- hover 时票据轻微抬起
- 进入视口时轻微翻起

## 不建议叫法

不要过度强调“银河铁道”，避免主题偏离。  
推荐叫法：

```text
Sky Archive Ticket
终之空观测票
7.20 Observation Ticket
Wonderful Everyday Pass
```

## 验收标准

- 留言墙有明显纪念物感。
- 不需要大段说明文字。
- 用户提交留言后能看到“自己的票”。
- 移动端票据可读。

---

# 5.7 `/works`

## 当前问题

二创展示页容易变成普通网格。

## 迭代目标

P1 阶段把它做成横向 gallery 或 film strip。

## 建议

- 使用 `MemoryStrip` 作为顶部视觉层
- 作品卡片可轻微 parallax
- hover 时显示作者和外链
- 不要一页塞太多文字
- 无投稿时显示“等待第一份二创”的空状态，但配合视觉装置

---

## 6. 新增组件规格

---

# 6.1 `SceneStage`

## 作用

统一每个滚动章节的舞台结构。

## Props

```ts
type SceneStageProps = {
  id: string
  tone: "bright" | "strange" | "archive" | "terminal" | "blackout" | "after"
  children: React.ReactNode
  background?: React.ReactNode
  signal?: React.ReactNode
  atmosphere?: React.ReactNode
  className?: string
}
```

## 要求

- 提供固定层级结构
- 支持 min-height
- 支持 overflow hidden
- 支持移动端降级
- 不直接绑定具体内容

---

# 6.2 `ScrollScrubLayer`

## 作用

封装随滚动 progress 变化的视觉层。

## Props

```ts
type ScrollScrubLayerProps = {
  speed?: number
  opacityRange?: [number, number]
  yRange?: [number, number]
  scaleRange?: [number, number]
  children: React.ReactNode
}
```

## 要求

- 使用 GSAP ScrollTrigger
- 支持 reduced-motion 时静态显示
- 不在 SSR 阶段访问 window

---

# 6.3 `KineticText`

## 作用

让短标题和短句产生逐字 / 逐词 / 逐行的演出。

## Props

```ts
type KineticTextProps = {
  text: string
  mode?: "chars" | "words" | "lines"
  delay?: number
  stagger?: number
  className?: string
}
```

## 要求

- 默认按 words
- 支持中文按字符
- reduced-motion 下直接渲染文本
- 不破坏可访问性，需要提供完整 aria-label

---

# 6.4 `DateDrift`

## 作用

用日期和时间补足画面空间。

## Props

```ts
type DateDriftProps = {
  dates: string[]
  intensity?: "low" | "medium" | "high"
  activeDate?: string
}
```

## 示例内容

```text
2012.07.12
2012.07.13
2012.07.20
22:44
7.20
```

## 要求

- 背景层显示
- 不抢主标题
- 可随机或固定排布
- reduced-motion 下静态

---

# 6.5 `SignalDistortion`

## 作用

短信、终之空、7/20 节点使用的信号异常层。

## Props

```ts
type SignalDistortionProps = {
  active?: boolean
  intensity?: "low" | "medium" | "high"
  label?: string
}
```

## 视觉

- 水平扫描线
- 局部错位
- 信号状态文字
- 微弱噪声

## 要求

- 不要高频闪烁
- 不要影响文字可读性
- reduced-motion 下禁用闪烁

---

# 6.6 `FloatingArchiveCards`

## 作用

BBS 或档案章节背景中的漂浮信息卡。

## Props

```ts
type FloatingArchiveCardsProps = {
  items: Array<{
    id: string
    title: string
    meta?: string
    severity?: "normal" | "warning" | "danger"
  }>
  density?: "low" | "medium" | "high"
}
```

## 要求

- 卡片不能覆盖主 CTA
- 移动端减少数量
- 不要使用真实大段帖子正文，只显示摘要碎片

---

# 6.7 `SceneTransitionWipe`

## 作用

章节之间的过场效果。

## 类型

```text
white-flash
blackout
crt-scan
sky-overexposure
```

## 要求

- 按章节 tone 使用不同效果
- 不要每个章节都强转场
- reduced-motion 下变成普通 fade

---

# 6.8 `TicketCard` / `TicketWall`

## 作用

替代普通留言卡片。

## 要求

- 不改变后端数据结构也可以运行
- 从已有 message 数据派生 ticketNo
- 支持 pinned / pending
- 支持空状态
- 支持移动端

---

## 7. motion-presets 规格

新增：

```text
src/lib/motion-presets.ts
```

内容包括：

```ts
export const motionDurations = {
  fast: 0.24,
  normal: 0.6,
  slow: 1.2,
  scene: 1.8,
}

export const motionEases = {
  soft: "power2.out",
  cinematic: "power3.inOut",
  snap: "expo.out",
  glitch: "steps(2)",
}

export const scrollDefaults = {
  start: "top 75%",
  end: "bottom 25%",
  scrub: 0.8,
}

export const pinSceneDefaults = {
  start: "top top",
  end: "+=120%",
  scrub: true,
  pin: true,
}
```

也可提供辅助函数：

```ts
fadeUp(targets, vars)
blurIn(targets, vars)
scaleDrift(targets, vars)
glitchBurst(timeline, targets, vars)
```

要求：

- 类型安全
- 不在服务端访问 DOM
- 不强绑定某个页面

---

## 8. CSS 规格

在 `globals.css` 或相关样式文件中新增：

```css
.scene-stage {}
.scene-layer {}
.scene-layer-background {}
.scene-layer-atmosphere {}
.scene-layer-signal {}
.scene-layer-main {}

.kinetic-text {}
.kinetic-token {}

.date-drift {}
.date-drift-item {}

.signal-distortion {}
.signal-line {}

.floating-archive-cards {}
.floating-archive-card {}

.scene-transition-wipe {}

.ticket-wall {}
.ticket-card {}
.ticket-card-pinned {}
.ticket-card-pending {}
```

要求：

- 使用 Tailwind 也可以，但复用类建议保留。
- 支持深浅层透明度。
- 避免全局污染。
- 移动端有明确降级。
- reduced-motion 有样式覆盖。

---

## 9. 分阶段开发计划

---

# Phase 1：Motion Primitives + Journey Upgrade

## 目标

先建立动效基础设施，并升级 `/journey`。

## 任务

1. 新增 cinematic motion primitives：
   - SceneStage
   - ScrollScrubLayer
   - KineticText
   - DateDrift
   - SignalDistortion
   - FloatingArchiveCards
   - SceneTransitionWipe
   - ChapterProgress

2. 新增：
   - `src/lib/motion-presets.ts`

3. 升级：
   - `src/components/cinematic/ScrollScene.tsx`
   - `src/app/journey/page.tsx`
   - `src/app/globals.css`

4. 保持：
   - 6 个章节不变
   - 原有 journeyScenes 数据不破坏
   - 原有 CTA 路由不破坏

## 验收

- `/journey` 明显不再空。
- 每个章节至少有三层视觉。
- GSAP 滚动效果明显，但不过度。
- reduced-motion 下可正常浏览。
- `npm run typecheck` 通过。
- `npm run build` 通过。

---

# Phase 2：Takashima + Bulletin Visual Upgrade

## 目标

增强两个核心档案模块。

## Takashima 任务

1. 手机新短信 shake。
2. `22:44` 闪烁。
3. signal loss 动画。
4. 背景接入 CGLoopBackdrop。
5. 增加 Signal Status Panel。
6. 保留 localStorage 模拟。
7. 明确说明不真实发送邮件。

## Bulletin 任务

1. Auto Replay 改为帖子逐条出现。
2. 增加 visiblePostCount。
3. timeline 与 visible posts 同步。
4. 增加 fear index / rumor index。
5. 增加 CRT scanline。
6. 关键帖子触发 glitch burst。
7. 支持 replay speed。

## 验收

- 高岛页面像异常短信页面。
- BBS 页面像恐惧扩散回放系统。
- 不改原内容数据。
- 移动端可用。

---

# Phase 3：Memories Ticket Wall

## 目标

留言墙票据化，增加纪念仪式感。

## 任务

1. 新增 TicketCard。
2. 新增 TicketWall。
3. 改造 MessageWall 展示层。
4. ticketNo 从 message id 或 index 派生。
5. pinned 留言增加 stamp。
6. pending 本地留言半透明显示。
7. 保留原留言提交逻辑。

## 验收

- 留言墙不再是普通卡片。
- 用户留言后能看到“终之空观测票”。
- 空状态也有视觉设计。
- 移动端可读。

---

# Phase 4：Tsui no Sora Timeline Rewrite

## 目标

用 GSAP timeline 重构终之空短片演出。

## 任务

1. 用单一 timeline 管理播放节奏。
2. 设置 labels：
   - sky
   - noise
   - collapse
   - blackout
   - return
3. 控制：
   - image opacity
   - image scale
   - text autoAlpha
   - noise opacity
   - glitch burst
   - progress bar
   - letterbox
4. 保留 Skip。
5. 保留 reduced-motion。
6. 总时长 20–40 秒。

## 验收

- 更像短片，不像普通状态页。
- glitch 是短 burst，不是常驻。
- Skip 可靠。
- 移动端可靠。

---

# Phase 5：Home + Works Polish

## 目标

收尾首页入口和二创页。

## 首页任务

1. 1 秒空镜。
2. 标题 blur-in。
3. 背景 sky crossfade。
4. Enter 白场转场。
5. 底部时间轴细线。
6. 移动端适配。

## Works 任务

1. 二创卡片 film strip 化。
2. 空状态视觉化。
3. hover 展示作者和链接。
4. 不增加大段文字。

## 验收

- 首页有进入仪式。
- Works 不像普通网格。
- 全站视觉语言一致。

---

## 10. Codex 执行提示词

## 10.1 Phase 1 提示词

```text
Use the subahibi-rebuild skill.

We are working on v0.3 — Motion & Visual Density Pass for the rebuild-demo branch.

Do not add long copywriting.
Do not rebuild the whole website.
Do not delete existing routes or content.
Do not implement real email sending.
Do not add heavy new dependencies.
Use existing gsap and @gsap/react.
Keep prefers-reduced-motion support.

Implement Phase 1 only.

Goal:
Create reusable cinematic motion primitives and upgrade /journey into a richer GSAP-driven scroll narrative.

Tasks:

1. Add:
- src/components/cinematic/SceneStage.tsx
- src/components/cinematic/ScrollScrubLayer.tsx
- src/components/cinematic/KineticText.tsx
- src/components/cinematic/DateDrift.tsx
- src/components/cinematic/SignalDistortion.tsx
- src/components/cinematic/FloatingArchiveCards.tsx
- src/components/cinematic/SceneTransitionWipe.tsx
- src/components/cinematic/ChapterProgress.tsx

2. Add:
- src/lib/motion-presets.ts

3. Upgrade:
- src/components/cinematic/ScrollScene.tsx
- src/app/journey/page.tsx
- src/app/globals.css

4. Requirements:
- Keep the six existing journey chapters.
- Keep existing links to /archive/takashima, /archive/bulletin, /tsuinosora, /memories.
- Use GSAP ScrollTrigger for scrubbed parallax and staggered scene reveals.
- Add at least three layers per scene: background, signal/atmosphere, main content.
- Add scene-specific atmosphere:
  bright: sky/date drift
  strange: signal distortion
  archive: floating archive cards
  terminal: date countdown / warning
  blackout: glitch burst
  after: calm ticket/memory hints
- Add ChapterProgress.
- Support reduced motion by rendering static layers without complex ScrollTrigger.
- Do not touch Supabase logic or existing content data.

5. Validation:
Run:
npm run typecheck
npm run build

Fix errors caused by your changes.

6. Final report:
Report created files, modified files, animation behavior added, commands run, and recommended Phase 2 tasks.
```

---

## 10.2 Phase 2 提示词

```text
Use the subahibi-rebuild skill.

Continue v0.3 — Motion & Visual Density Pass.

Implement Phase 2 only: upgrade /archive/takashima and /archive/bulletin visual density.

Do not implement real email sending.
Do not change existing content meaning.
Do not delete existing modules.
Keep reduced-motion support.

Takashima requirements:
- Add phone shake when a new mail appears.
- Add 22:44 flicker.
- Add signal loss animation.
- Add CGLoopBackdrop behind the phone.
- Add Signal Status Panel showing:
  Signal: unstable
  Time: 22:44
  Received: x / total
  Mode: Local simulation
- Keep localStorage simulation.
- Clearly state that this does not send real emails.

Bulletin requirements:
- Auto Replay should reveal posts within the selected thread, not just switch threads.
- Add visiblePostCount.
- Sync timeline with visible posts.
- Add fear index and rumor index.
- Add CRT scanline and BBS frame.
- Key posts should trigger a short glitch burst.
- Add replay speed controls: 1x / 2x / 4x.
- Keep existing BBS content unchanged.

Validation:
Run npm run typecheck and npm run build.
Report files changed and remaining Phase 3 tasks.
```

---

## 10.3 Phase 3 提示词

```text
Use the subahibi-rebuild skill.

Continue v0.3 — Motion & Visual Density Pass.

Implement Phase 3 only: upgrade /memories into Sky Archive Ticket Wall.

Do not change Supabase schema unless absolutely necessary.
Do not remove existing message submission logic.
Do not add long explanatory copy.

Tasks:
- Add src/components/interaction/TicketCard.tsx
- Add src/components/interaction/TicketWall.tsx
- Update MessageWall or /memories to render messages as tickets.
- Each ticket should show:
  THE SKY ARCHIVE TICKET
  Passenger: nickname
  Date: 2026.07.20
  Destination: 終ノ空
  No. 0720-xxxx
  message content
- Pinned messages should have a stamp effect.
- Pending local messages should render as translucent tickets.
- Empty state should still feel designed.
- Mobile layout must remain readable.

Validation:
Run npm run typecheck and npm run build.
Report files changed and remaining Phase 4 tasks.
```

---

## 10.4 Phase 4 提示词

```text
Use the subahibi-rebuild skill.

Continue v0.3 — Motion & Visual Density Pass.

Implement Phase 4 only: rewrite /tsuinosora playback as a GSAP timeline.

Do not remove Skip.
Do not remove reduced-motion.
Do not exceed 40 seconds.
Do not autoplay sound.

Tasks:
- Use a single GSAP timeline for the cinematic sequence.
- Add timeline labels:
  sky
  noise
  collapse
  blackout
  return
- Control image opacity, image scale, text autoAlpha, text y, noise opacity, glitch burst, blackout, progress bar, and letterbox.
- Replace scattered interval-based visual timing where possible.
- Glitch must be a short burst, not constant.
- Keep mobile stable.

Validation:
Run npm run typecheck and npm run build.
Report files changed and remaining Phase 5 tasks.
```

---

## 10.5 Phase 5 提示词

```text
Use the subahibi-rebuild skill.

Continue v0.3 — Motion & Visual Density Pass.

Implement Phase 5 only: polish homepage and works page.

Homepage:
- Add 0.8–1.2 second silent sky opening before title appears.
- Add title blur-in.
- Add subtle sky crossfade or scale drift.
- Add bottom timeline line: 2010 — 2026 / 7.20.
- Add white overexposure transition when entering /journey.
- Respect reduced-motion.

Works:
- Make the fanworks page feel like a film strip or gallery, not a plain grid.
- Add hover reveal for author and source link.
- Improve empty state without adding long copy.
- Keep mobile readable.

Validation:
Run npm run typecheck and npm run build.
Report final files changed and any unresolved issues.
```

---

## 11. 验收清单

### 11.1 体验验收

通过标准：

- 首页有开场仪式。
- `/journey` 有明显 GSAP 滚动叙事感。
- 页面不靠大段文案也不空。
- 高岛短信有手机、信号、时间、异常演出。
- BBS 有回放、指数、timeline、信息扩散感。
- 留言墙有票据纪念感。
- 终之空有短片节奏。
- 全站动效克制，不廉价。

### 11.2 技术验收

必须通过：

```bash
npm run typecheck
npm run build
```

如果存在：

```bash
npm run lint
```

也应运行。

### 11.3 可访问性验收

- reduced-motion 可用。
- 高频闪烁受控。
- 文字可读。
- 按钮可聚焦。
- 移动端可滚动。
- 不因 pinning 导致移动端卡死。

### 11.4 内容与合规验收

- 不提供游戏下载。
- 不提供补丁下载。
- 不提供原始素材下载。
- 非官方声明保留。
- 不真实发送邮件，除非后续明确实现。
- 用户内容仍需审核。

---

## 12. 最终效果预期

本轮结束后，站点应该从：

```text
结构完整，但页面偏空
```

变成：

```text
结构完整，并具备电影式滚动体验和纪念仪式感
```

用户的感受应该是：

```text
这个站不是靠文字介绍《素晴日》，而是让人重新进入一次天空、短信、揭示板、7月20日、终之空和幸福地生活的氛围。
```

这就是 v0.3 的核心目标。
