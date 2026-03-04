# 🚀 Ping-Chi Hsu's Personal Website (React Edition)

這是許秉棋的個人網站，已從原始的靜態 HTML 遷移至現代化的 **React** 框架，具備多國語系切換與自動化部署功能。

## 🌐 正式上線網址
👉 **[https://chichi0418.github.io/chiwebsite/](https://chichi0418.github.io/chiwebsite/)**

---

## ✨ 技術亮點 (Tech Stack)

*   **前端框架**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
*   **構建工具**: [Vite](https://vitejs.dev/) (極速編譯與熱更新)
*   **多國語系**: [react-i18next](https://react.i18next.com/) (支援 中文/English 即時切換)
*   **路由管理**: [React Router 6](https://reactrouter.com/) (單頁應用 SPA 導航)
*   **自動化部署 (CI/CD)**: [GitHub Actions](https://github.com/features/actions) (自動編譯並發布至 GitHub Pages)

---

## 📂 專案結構

*   `src/pages/`: 包含首頁、關於我、高中生活、系所介紹、專案與獎項等組件。
*   `src/components/`: 全站通用的 UI 組件（如 Navbar）。
*   `src/i18n.ts`: 多國語系設定中心。
*   `public/assets/`: 存放所有圖片與多媒體資源。
*   `.github/workflows/`: 自動化部署腳本。
*   `legacy/`: 存放原始 HW1 的靜態 HTML 備份。

---

## 🛠️ 開發與測試流程

本專案使用 Node.js 環境開發，無需額外手動建立虛擬環境。

### 1. 本地開發 (Local Development)
如果你想在自己的電腦跑起來進行修改：
```bash
# 安裝依賴套件 (這會建立 node_modules 隔離環境)
npm install

# 啟動開發伺服器
npm run dev
```

### 2. 部署方式 (Deployment)
本專案已整合 **GitHub Actions**。你只需要將改動推送到 GitHub，系統就會自動部署：
```bash
git add .
git commit -m "你的改動描述"
git push origin main
```

---

## 📝 備註
*   **Legacy Content**: 原始作業內容已完整遷移至 React 組件中。
*   **GAS 整合**: 預計下一階段將串接 Google Apps Script 進行資料動態存取。

---
© 2026 PINGCHI HSU. All rights reserved.
