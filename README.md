# JavRanking Relay Gateway (javranking.top)

[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Destination](https://img.shields.io/badge/Primary%20Site-javranking.cc-blue?style=flat-square)](https://javranking.cc)
[![Status](https://img.shields.io/badge/Status-Operational-brightgreen?style=flat-square)](https://javranking.github.io/status/)

JavRanking 官方常青中转站与全路由 301 域名迁移网关（托管于 [https://javranking.top](https://javranking.top)）。

---

## 🧭 系统定位与架构设计 (Architecture & Role)

1. **纯净中立与 100% SFW (Safe For Work)**：
   - 本站点为中立的“域名迁移通知与安全重定向导航站”，**不承载任何敏感成人图片、视频或违规内容**。
   - 正因为纯净中立，它不会被注册局或合规审查二次封停，成为立于风暴之外的永久中转哨所。
2. **SEO 权重完整传承 (Full-Route 301 Redirects)**：
   - 通过 Cloudflare Pages 原生 [`_redirects`](_redirects) 引擎，对所有深层路由（如 `/{locale}/videos/:id`、`/{locale}/rankings/:slug` 等）实行 HTTP 301 永久重定向，将老域名的搜索权重无损移交至全新主力域名 `https://javranking.cc`。
3. **友好的人机交互与防失联指引**：
   - 首页为访客提供清晰的域名迁移声明、秒级自动跳转、公共 DNS / DoH 防劫持排障方案及离线应急找回邮箱。

---

## 🛠️ 本地调试与部署 (Development & Deployment)

本项目基于纯静态原生 HTML/CSS/JS 构建，托管于 Cloudflare Pages。

```bash
# 本地启动预览
npm run dev

# 部署至 Cloudflare Pages
npm run deploy
```

---

## 📄 许可证 (License)

[MIT License](LICENSE) © 2026 [JavRanking](https://javranking.cc)
