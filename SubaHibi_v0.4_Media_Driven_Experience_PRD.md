# SubaHibi 16th Anniversary Rebuild — v0.4 迭代 PRD

> 版本名称：**v0.4 — Media-Driven Experience Pass**  
> 中文名：**媒体驱动体验迭代**  
> 项目代号：**The Sky Archive / 终末天空档案馆**  
> 适用分支：`rebuild-demo` 或后续迭代分支  
> 面向对象：Codex / opencode / AI Coding Agent / 前端开发者  
> 核心目标：从“页面驱动”升级为“媒体驱动”，用视频、CG、人物立绘、背景素材和 GSAP 滚动编排提升视觉密度，而不是继续用长文案填空。

---

## 0. 本次迭代核心决策

### 0.1 `/tsuinosora` 撤出主流程

当前阶段，`/tsuinosora` 不再作为主线核心模块继续强化。

这不是永久删除“终之空”概念，而是：

```text
保留 /tsuinosora 代码和路由
不把它放在主导航和主流程核心 CTA
本轮不继续重点打磨 /tsuinosora 独立页
把精力转向全站级媒体演出能力
```

旧方向：

```text
首页 → /journey → /tsuinosora → memories
```

新方向：

```text
首页 Video / CG Hero
→ /journey 媒体驱动滚动主线
→ 高岛短信 / 北校揭示板 / 7月20日
→ CG / 视频 / 人物立绘展演
→ memories 终之空观测票墙
```

### 0.2 新方向一句话

不是做一个“终之空页面”，而是让整个网站具备“终之空式演出能力”。

---

## 1. 当前问题

当前版本已经完成结构搭建，但仍存在以下问题：

1. 多数页面视觉密度不足。
2. `/journey` 仍偏“章节卡片 + 简短文案”。
3. GSAP 感不足，缺少 pinned scene、scrub parallax、video reveal、character entrance。
4. 视频、CG、人物立绘、背景素材尚未成为主要内容。
5. 页面看起来“空”，但不能继续靠文案填补。
6. `/tsuinosora` 如果继续单独做，需要投入大量特效成本，但收益不如建立媒体系统。
7. 现有素材价值没有被充分发挥。

---

## 2. 本次迭代目标

### 2.1 一句话目标

将站点从：

```text
页面结构完整，但视觉偏空
```

升级为：

```text
视频、CG、人物立绘、BBS、短信和滚动演出共同驱动的纪念体验站
```

### 2.2 具体目标

本次迭代应完成：

1. 撤下 `/tsuinosora` 在主流程中的核心入口。
2. 建立统一媒体资产系统。
3. 建立视频、CG、人物立绘的可复用组件。
4. 首页改为 Video Hero / CG Hero 入口。
5. `/journey` 改为媒体驱动滚动主线。
6. 新增人物立绘展示段落。
7. 高岛短信和 BBS 不再只是文本档案，而要成为视觉信号层。
8. 留言墙继续使用 `Sky Archive Ticket / 终之空观测票` 思路。
9. 保留 `/tsuinosora` 代码，但不作为本轮重点投入。
10. 保持 reduced-motion、移动端、构建稳定性。

---

## 3. 本次不做什么

不做：

```text
不继续重点打磨 /tsuinosora 独立页
不删除 /tsuinosora 历史代码
不实现真实邮件发送
不新增复杂后台
不新增大量说明文案
不做游戏下载或补丁分发
不开放原始素材下载
不做大规模 3D 场景
不引入重型新依赖
不把 gallery 做成素材下载站
```

---

## 4. 信息架构调整

推荐路由结构：

```text
/
  首页入口：Video Hero / CG Hero

/journey
  主滚动叙事：媒体驱动核心体验

/archive/takashima
  高岛短信档案：异常信号演出

/archive/bulletin
  北校揭示板档案：BBS 恐惧扩散回放

/gallery
  素材展演总入口，P1 可做

/gallery/cg
  CG 展示，P1 可做

/gallery/characters
  人物立绘展示，P1 可做

/memories
  Sky Archive Ticket Wall / 终之空观测票墙

/works
  二创展示

/about
  项目说明、非官方声明、版权说明

/tsuinosora
  暂时保留，但不作为主流程核心入口
```

`/tsuinosora` 本轮策略：

```text
保留文件
保留可访问路由
不放在主导航
不作为 /journey 的主要 CTA
不在本轮继续投入大规模重构
```

---

## 5. 媒体资产系统

### 5.1 推荐新增文件

```text
src/content/videos.ts
src/content/cg.ts
src/content/characters.ts
src/content/media-groups.ts  # 可选
```

### 5.2 VideoAsset

```ts
export type VideoAsset = {
  id: string
  title: string
  src: string
  poster?: string
  section?: "home" | "journey" | "takashima" | "bulletin" | "memories" | "ambient"
  tone?: "bright" | "strange" | "archive" | "terminal" | "after"
  tags?: string[]
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}
```

### 5.3 CGAsset

```ts
export type CGAsset = {
  id: string
  title: string
  src: string
  chapter?: "sky" | "characters" | "takashima" | "bulletin" | "july20" | "after"
  tone?: "bright" | "strange" | "archive" | "terminal" | "after"
  characters?: string[]
  tags?: string[]
  priority?: number
}
```

### 5.4 CharacterAsset

```ts
export type CharacterAsset = {
  id: string
  name: string
  image: string
  side?: "left" | "right" | "center"
  accent?: string
  quote?: string
  tags?: string[]
  order?: number
}
```

### 5.5 MediaGroup

```ts
export type MediaGroup = {
  id: string
  title: string
  description?: string
  videoIds?: string[]
  cgIds?: string[]
  characterIds?: string[]
  route?: string
  tone?: "bright" | "strange" | "archive" | "terminal" | "after"
}
```

---

## 6. 素材路径规则

推荐 public 目录：

```text
public/
  assets/
    videos/
      op.mpg
      ambient-sky.mp4
      fragment-01.mp4

    cg/
      chapter-sky/
      chapter-takashima/
      chapter-bulletin/
      chapter-july20/
      chapter-after/

    characters/
      yuki/
      zakuro/
      kagami/
      tsukasa/
      takuji/

    backgrounds/
      sky/
      rooftop/
      archive/
      terminal/

    ui/
      phone/
      bbs/
      ticket/
```

命名建议：

```text
lowercase-kebab-case
```

避免中文文件名、空格、特殊符号和极长文件名。

---

## 7. 新增组件规格

### 7.1 `VideoHero`

用途：用于首页或关键章节的全屏视频入口。

```ts
type VideoHeroProps = {
  video: VideoAsset
  fallbackImage?: string
  title?: string
  subtitle?: string
  children?: React.ReactNode
  overlay?: "light" | "dark" | "sky" | "terminal"
  enableMouseParallax?: boolean
}
```

要求：

- 全屏铺满。
- `muted autoplay loop playsInline`。
- 支持 poster。
- reduced-motion 下退回 fallbackImage。
- 不自动播放声音。
- 移动端可用。
- 允许叠加 Enter Journey CTA。

### 7.2 `InlineCinematicVideo`

用途：用于 `/journey` 中的视频片段。

```ts
type InlineCinematicVideoProps = {
  video: VideoAsset
  mode?: "ambient" | "focus" | "fragment"
  letterbox?: boolean
  playOnEnter?: boolean
  pauseOnLeave?: boolean
  overlayContent?: React.ReactNode
}
```

要求：

- 进入视口时播放。
- 离开视口暂停。
- 支持 letterbox。
- 支持静音和 poster。
- reduced-motion 下显示 poster。

### 7.3 `CGShowcase`

用途：全屏或半屏 CG 轮询展示。

```ts
type CGShowcaseProps = {
  items: CGAsset[]
  mode?: "background" | "panel" | "hero"
  intervalMs?: number
  crossfadeMs?: number
  scaleDrift?: boolean
  overlay?: React.ReactNode
}
```

要求：

- crossfade。
- slow scale drift。
- 不做左右滑动式轮播。
- 不提供原图下载。
- reduced-motion 下显示第一张。

### 7.4 `CGRail`

用途：横向 CG 胶片轨道。

```ts
type CGRailProps = {
  items: CGAsset[]
  density?: "low" | "medium" | "high"
  autoScroll?: boolean
  onSelect?: (item: CGAsset) => void
}
```

要求：

- 像 film strip，不像普通卡片网格。
- 可自动缓慢横移。
- hover 时轻微放大。
- 移动端改为横向滚动。

### 7.5 `CGLightbox`

要求：

- 点击 CG 后放大查看。
- 支持 ESC 关闭。
- 支持上一张 / 下一张。
- 不提供原图下载。
- 移动端可关闭。

### 7.6 `CharacterStage`

```ts
type CharacterStageProps = {
  character: CharacterAsset
  background?: CGAsset
  side?: "left" | "right" | "center"
  showName?: boolean
  showQuote?: boolean
}
```

动效：

- 从左 / 右 / 中央轻微入场。
- 立绘有轻微 floating。
- 背景 CG 模糊或降低透明度。
- 名字和短句延迟出现。

### 7.7 `CharacterParade`

```ts
type CharacterParadeProps = {
  characters: CharacterAsset[]
  mode?: "scroll" | "grid" | "stage"
}
```

要求：

- 不使用大段角色介绍。
- 每位角色只展示名字、短句或 tag。
- 滚动时逐个入场。
- 移动端改为纵向卡片。

### 7.8 `MediaOverlay`

```ts
type MediaOverlayProps = {
  chapter?: string
  date?: string
  label?: string
  status?: string
  children?: React.ReactNode
  tone?: "bright" | "strange" | "archive" | "terminal" | "after"
}
```

用途：为视频 / CG 添加统一信息层，可包含日期、章节编号、信号状态、BBS 编号、短句和 CTA。

---

## 8. 首页 `/` 改造要求

首页从普通入口升级为：

```text
Video / CG Opening Gate
```

页面结构：

```text
VideoHero 或 CGShowcase
  背景视频 / CG
  遮罩层
  标题
  16th Anniversary
  剧透提醒
  Enter Journey
  Skip to Archive
  底部日期线 2010 — 2026 / 7.20
```

动效要求：

- 首屏先空镜 0.8–1.2 秒。
- 标题 blur-in。
- 背景 slow scale drift。
- Enter hover 出现光晕。
- 点击 Enter 白场过曝进入 `/journey`。
- reduced-motion 下静态背景。

不要做：

- 不要增加大量介绍文案。
- 不要全屏强 glitch。
- 不要自动播放有声视频。
- 不要让视频影响按钮可读性。

---

## 9. `/journey` 改造要求

### 9.1 新章节结构

保留 6 段，但调整重点：

```text
01 Sky Opening / 天空开场
02 Character Parade / 人物入场
03 Takashima Signal / 高岛异常信号
04 Bulletin Spread / 揭示板扩散
05 July 20 / 7月20日
06 Wonderful Everyday / 纪念与回响
```

### 9.2 第 1 章：Sky Opening

媒体：

- 天空视频或 CGShowcase。
- 楼顶 / 云 / 蓝天背景。

动效：

- VideoHero / CGShowcase。
- slow parallax。
- 日期漂浮。
- 标题轻微展开。

文案：极少，不超过 2 句。

### 9.3 第 2 章：Character Parade

媒体：

- 人物立绘。
- 角色相关 CG 作为背景。

动效：

- CharacterParade。
- 每个角色滚动入场。
- 立绘前景漂浮。
- 背景轻微模糊。

推荐角色：

```text
水上由岐
高岛柘榴
若槻镜
若槻司
间宫卓司
```

文案：每个角色只放名字和短 tag，不写长角色介绍。

### 9.4 第 3 章：Takashima Signal

媒体：

- 手机 UI。
- 高岛相关 CG。
- 信号异常 overlay。

动效：

- 手机从右侧进入。
- 短信气泡出现。
- 信号短暂丢失。
- `22:44` 闪烁。
- CG 背景缓慢切换。

CTA：

```text
Open Takashima Archive
```

### 9.5 第 4 章：Bulletin Spread

媒体：

- BBS 卡片。
- 浮动帖子编号。
- Archive UI。
- 相关 CG 暗层。

动效：

- FloatingArchiveCards。
- fear index 增长。
- CRT scanline。
- 关键帖子短 glitch。
- 滚动中信息越来越密。

CTA：

```text
Open Bulletin Archive
```

### 9.6 第 5 章：July 20

媒体：

- 全屏视频片段或高强度 CGShowcase。
- 日期 UI。
- 黑白 / 过曝 / 噪声。

动效：

- 日期滚轮。
- 视频 reveal。
- 短暂 blackout。
- `7.20 / 22:44` 定格。
- 不再跳转到 `/tsuinosora` 作为核心 CTA。

CTA：

```text
Continue
Leave a Ticket
```

不推荐：

```text
Enter Tsui no Sora
```

### 9.7 第 6 章：Wonderful Everyday

媒体：

- 明亮 CG。
- 人物 / 天空 / 票据。
- Ticket Wall 预览。

动效：

- 噪声消失。
- CG 转亮。
- 票据漂浮。
- 进入 memories。

CTA：

```text
Leave a Ticket
View Memories
View Fan Works
```

---

## 10. 档案模块联动要求

### 10.1 `/archive/takashima`

继续保留，但接入媒体系统：

- 背景使用 `CGShowcase`。
- 手机界面使用 `MediaOverlay`。
- 新短信出现时触发局部视频 / CG fragment。
- `22:44` 作为视觉符号。
- 不做真实邮件发送。
- 保留 localStorage 模拟说明。

### 10.2 `/archive/bulletin`

继续保留，但接入媒体系统：

- 背景使用低透明 CG 或 archive background。
- 右侧 timeline 增加 visual density。
- 自动回放时可同步切换背景 CG。
- 关键帖子可触发 `SignalDistortion`。
- 不改原帖子内容。

---

## 11. `/gallery` 规划

`/gallery` 可作为 P1，不必 Phase 1 必做。

功能：

```text
/gallery
  总入口

/gallery/cg
  CG 展示

/gallery/characters
  人物立绘展示
```

限制：Gallery 不是资源站，不提供下载。

页面必须有说明：

```text
本页面仅用于非官方粉丝纪念展示，不提供素材下载。
```

---

## 12. `/memories` 联动要求

继续沿用 Ticket Wall 思路：

```text
THE SKY ARCHIVE TICKET
Passenger: 昵称
Date: 2026.07.20
Destination: 終ノ空
No. 0720-0016
```

本轮可以增强：

- 背景 CGShowcase。
- ticket card 轻微漂浮。
- 用户留言后生成终之空观测票。
- 票据编号与 7.20 相关。

---

## 13. GSAP 动效清单

优先实现：

### 13.1 Scroll Pin

用于 `/journey` 关键章节。

### 13.2 Scrub Parallax

不同层不同速度：

```text
背景视频 / CG：慢
人物立绘：中
UI overlay：快
主标题：稳定
```

### 13.3 Video Reveal

视频进入视口时：

- opacity 0 → 1
- scale 1.08 → 1
- letterbox 出现
- overlay 延迟进入

### 13.4 Character Entrance

立绘：

- x 位移进入
- opacity
- blur 解除
- 轻微 floating

### 13.5 CG Crossfade

用于首页、journey 背景、memories、takashima。

### 13.6 Glitch Burst

只用于关键节点：

- 高岛短信到达
- BBS 关键帖子
- 7月20日定格

禁止常驻满屏 glitch。

### 13.7 Transition Wipe

章节切换：

- white flash
- black wipe
- CRT scan
- sky overexposure

---

## 14. Reduced Motion 要求

如果用户开启 reduced-motion，必须：

- 停止视频自动播放或改为 poster。
- 禁用强 parallax。
- 禁用 character entrance 的大幅位移。
- 禁用 glitch burst。
- 禁用自动横向 CG rail。
- 保留所有内容可访问。

---

## 15. 移动端要求

移动端策略：

- 视频默认 poster 或低开销播放。
- CharacterParade 改为纵向卡片。
- CGRail 改为横向手动滚动。
- pinned scene 减少或禁用。
- overlay 不遮挡按钮。
- 字体和按钮足够大。

---

## 16. 分阶段计划

### Phase 1：媒体资产系统 + 首页 + Journey 第一轮

目标：建立媒体资产系统和核心媒体组件，并让首页和 `/journey` 明显变成媒体驱动。

任务：

1. 新增媒体内容文件：
   - `src/content/videos.ts`
   - `src/content/cg.ts`
   - `src/content/characters.ts`
   - 可选：`src/content/media-groups.ts`

2. 新增组件：
   - `VideoHero`
   - `InlineCinematicVideo`
   - `CGShowcase`
   - `CGRail`
   - `CGLightbox`
   - `CharacterStage`
   - `CharacterParade`
   - `MediaOverlay`

3. 改造首页：
   - 使用 VideoHero 或 CGShowcase。
   - 保留 Enter Journey。
   - 保留 archive link。
   - 增加媒体背景。

4. 改造 `/journey`：
   - 新结构六章。
   - 加入人物立绘展示段。
   - 加入视频 / CG 背景。
   - 减少 `/tsuinosora` CTA 权重。
   - 保留 `/archive/takashima`、`/archive/bulletin`、`/memories` 入口。

验收：

- 首页明显更有视觉冲击力。
- `/journey` 不再主要依赖文本。
- 至少一个章节使用视频或 CGShowcase。
- 至少一个章节使用人物立绘。
- `/tsuinosora` 不再是主线核心 CTA。
- typecheck 和 build 通过。

### Phase 2：Takashima + Bulletin 媒体化增强

Takashima：

- 背景接入 CGShowcase。
- 手机短信出现时触发 signal effect。
- `22:44` 闪烁。
- 新增 Signal Status Panel。
- 可选视频 fragment。

Bulletin：

- 背景接入 archive CG。
- 帖子回放时同步视觉层变化。
- 关键帖子触发 glitch burst。
- timeline 视觉增强。
- fear index / rumor index 动效化。

### Phase 3：Gallery + Character Page

- 新增 `/gallery`。
- 新增 `/gallery/cg`。
- 新增 `/gallery/characters`。
- 使用 CGRail、CGLightbox、CharacterParade。
- 增加非下载说明。

### Phase 4：Memories + Works 媒体化

- memories 背景使用 CGShowcase。
- TicketWall 增强。
- works 使用 film strip gallery。
- 空状态视觉化。

### Phase 5：统一打磨

- 移动端修正。
- reduced-motion 全站检查。
- build/typecheck。
- SEO/OG 检查。
- 非官方声明检查。
- 素材下载入口检查。
- 性能优化。

---

## 17. 验收清单

### 17.1 体验验收

- 首页有媒体开场感。
- `/journey` 是媒体驱动，而不是文本驱动。
- 人物立绘有存在感。
- 视频/CG 被用于叙事，而不是简单贴图。
- 高岛和 BBS 有视觉信号层。
- `/tsuinosora` 不再占用主线核心。
- 留言墙仍有纪念仪式感。

### 17.2 技术验收

必须通过：

```bash
npm run typecheck
npm run build
```

如存在，也运行：

```bash
npm run lint
```

### 17.3 内容验收

- 无游戏下载。
- 无补丁分发。
- 无原始素材下载。
- 非官方声明存在。
- 不误导真实邮件发送。
- 用户内容仍需审核。

### 17.4 性能验收

- 视频有 poster。
- 大图懒加载。
- 不在移动端强制加载过多视频。
- reduced-motion 降级可用。
- 不因 GSAP 导致滚动卡顿。

---

## 18. 最终预期

本轮完成后，站点应从：

```text
页面骨架完整，但视觉空
```

升级为：

```text
视频、CG、人物立绘和滚动演出共同构成的纪念体验
```

用户感受到的不是：

```text
这个站文案很多
```

而是：

```text
这个站像一个有素材、有呼吸、有场景、有演出的纪念空间
```
