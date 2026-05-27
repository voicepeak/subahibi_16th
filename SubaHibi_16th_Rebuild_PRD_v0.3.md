# SubaHibi 16th — Rebuild PRD v0.3

> 迭代自 v2.0，覆盖验收级剩余缺口 + 生产质量升级

## v0.3 目标

在 v2.0 P0 100% / P1 85% 基础上，补齐所有验收缺口，达到可上线生产级别。

## v0.3 Scope

### P0 (必须)
1. **Image optimization** — 全站 `<img>` → Next.js `<Image>`，添加模糊占位、width/height、priority hints
2. **Mobile responsive** — 所有页面移动端布局审计 + 修复（横向溢出、触摸目标、字体缩放）
3. **Error boundaries** — 关键组件包裹 ErrorBoundary，避免白屏
4. **Loading states** — Suspense + skeleton 加载态
5. **Accessibility** — 键盘导航、focus-visible、ARIA 补全、色彩对比度审计
6. **Voting UI** — 基于已有 DB schema 实现投票页面

### P1 (应该)
7. **OG image generation** — 动态生成社交分享图（Vercel `@vercel/og` 或静态 fallback）
8. **Email subscription** — Supabase Edge Function + Resend 邮件发送

### P2 (可选)
9. Dark mode toggle
10. Chapter achievements

## 验收标准
- `npm run typecheck` 通过
- `npm run build` 通过
- 移动端 375px 宽度无横向溢出
- 所有交互可通过键盘完成
- Lighthouse Performance > 85
