# SubaHibi 16th Anniversary Fan Project

一个根据 `SubaHibi_16th_Anniversary_PRD.md` 落地的非官方粉丝纪念站 MVP。

## 已实现范围

- Landing Page：主视觉、周年标题、倒计时、进入按钮
- 章节式层级：首屏入口 + Chapter Select，避免所有模块平铺在一个长页面下
- 原创 CG-like 视觉：屋顶、镜面、存档桌三张纪念站氛围图
- Message Wall：昵称、地区、留言、可选头像上传；默认进入审核
- Fan Works：图片、说明、作者署名、外链投稿；默认进入审核
- Timeline：横向滚动周年节点
- Favorite Poll：四类投票，本地防刷新重复投票
- About：非官方声明、版权边界、联系方式
- Admin：本地审核、删除、置顶

## 本地运行

```bash
npm install
npm run assets
npm run dev
```

打开 `http://localhost:3000`。

本地演示后台口令：

```text
admin2026
```

## 数据说明

当前版本用 `localStorage` 模拟 `messages`、`fanworks`、`polls` 和审核状态，便于无云服务凭据时直接试用。后续接 Supabase 时，可从 `supabase/schema.sql` 开始建表，并把页面中的本地状态替换为 API 调用。

## 注意

该项目为粉丝纪念性质的非官方站点，不应分发游戏资源或大量原始 CG。上线时建议加入 Cloudflare Turnstile、管理员认证、图片存储限制与内容审核规则。
