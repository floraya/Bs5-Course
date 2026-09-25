# 🚀 Bootstrap 5 高中生線上互動教學平台 (Bootstrap Hero for High Schoolers)

專為高中生量身打造的 **Bootstrap 5 現代化線上互動學習平台**。透過**「📖 👩‍🏫 老師教學」**與**「</> 👨‍🎓 學生學習」**雙模式無縫切換，結合生活化校園情境（社團官網、班級聯絡簿、校慶售票、個人備審作品集），讓完全沒有前端基礎的高中生也能在動手實作中，輕鬆掌握世界主流的 Bootstrap 響應式網頁框架！

---

## 🎨 專案主色系與視覺設計

- **核心主色系**：`#712cf9`（官方經典 Bootstrap 標誌性紫）
- **互動輔助色**：
  - Primary 探索藍：`#0d6efd`
  - Success 闖關綠：`#198754`
  - Warning 提示黃：`#ffc107`
  - Danger 警示紅：`#dc3545`
  - Info 技巧青：`#0dcaf0`
  - 深邃星空底色：`#090d16` / `#0f172a`
- **設計哲學**：
  - 直覺雙模式膠囊切換器：`[ 📖 👩‍🏫 老師教學 ]  </> 👨‍🎓 學生學習`
  - 零 AI 假大空樣式，專注於清晰程式碼排版、直覺響應式斷點預覽與高對比閱讀體驗
  - 內建瀏覽器 Web Audio 合成音效與粒子彩帶特效，提供即時正向回饋

---

## 🛠️ 技術堆疊 (Tech Stack)

| 層級 | 使用技術 | 說明 |
| :--- | :--- | :--- |
| **核心框架** | **React 19 + TypeScript** | 嚴謹類型定義、模組化狀態管理與流暢渲染 |
| **建置工具** | **Vite 8** | 超高速開發編譯與輕量化打包 |
| **樣式系統** | **Tailwind CSS v4** | 深度自訂 Bootstrap 品牌紫主題變數與流暢響應式設計 |
| **外部相依** | **Bootstrap 5.3.3 + Icons 1.11** | 於沙盒 Iframe 中動態載入原生完整 CSS 與 JS 核心 |
| **圖示庫** | **Lucide React** | 現代簡約的幾何向量圖示 |
| **動畫與特效** | **Canvas-Confetti + Web Audio API** | 闖關成功彩帶慶祝與零外部音檔的輕量擬真合成音效 |
| **本地存儲** | **HTML5 LocalStorage** | 自動保存學習進度、代碼草稿、XP 等級與成就徽章 |

---

## 🚀 安裝與啟動指南 (Installation & Run Guide)

### 前置需求
- Node.js 18.0 或更高版本
- npm 或 pnpm / yarn

### 安裝步驟

```bash
# 1. 複製專案儲存庫
git clone <repository-url>
cd <project-folder>

# 2. 安裝所有依賴套件
npm install

# 3. 啟動本機開發伺服器 (預設運行於 http://localhost:3000)
npm run dev

# 4. 構建生產版本
npm run build

# 5. 程式碼型別驗證
npm run lint
```

---

## 📚 完整課程體系 (77 堂循序漸進互動課程)

本課程嚴格遵循 [getbootstrap.com](https://getbootstrap.com/) 官方文件結構，由淺入深分為 6 大核心領域、共 77 堂實戰課程：

### 1. Layout 佈局系統（8 課）
- `Breakpoints` 響應式斷點核心原理（xs / sm / md / lg / xl / xxl）
- `Containers` 容器版面（.container, .container-fluid, 響應式容器）
- `Grid` 12 欄網格核心概念
- `Columns` 欄位對齊、位移與重新排序
- `Gutters` 水平與垂直間距（g-*, gx-*, gy-*）
- `Utilities` 佈局專用輔助工具
- `Z-index` 圖層前後順序控制
- `CSS Grid` 現代 CSS 網格系統支援

### 2. Content 內容元素（5 課）
- `Reboot` 瀏覽器樣式重設標準
- `Typography` 標題、內文、引言與文字排版
- `Images` 響應式圖片、縮圖與圓角裁切
- `Tables` 斑馬紋、邊框與響應式表格
- `Figures` 圖文搭配與說明文字

### 3. Forms 表單元件（9 課）
- `Overview` 表單基礎架構
- `Form control` 文字輸入框與多行文字
- `Select` 下拉選擇選單
- `Checks & radios` 核取方塊與單選按鈕
- `Range` 範圍滑桿
- `Input group` 前綴與後綴輸入群組
- `Floating labels` 現代浮動標籤效果
- `Layout` 表單排版與欄位整合
- `Validation` 瀏覽器原生與自訂表單驗證提示

### 4. Components 常用元件（25 課）
- `Accordion` 手風琴折疊面板
- `Alerts` 訊息提示框
- `Badge` 標籤與未讀徽章
- `Breadcrumb` 麵包屑導航路徑
- `Buttons` 豐富按鈕色彩與樣式
- `Button group` 整合式按鈕群組
- `Card` 萬用卡片（圖文、社團成員介紹、商品卡）
- `Carousel` 首頁輪播投影片
- `Close button` 通用關閉按鈕
- `Collapse` 折疊收合內容
- `Dropdowns` 下拉選單互動
- `List group` 列表群組
- `Modal` 彈出對話視窗
- `Navbar` 響應式導覽列與漢堡選單
- `Navs & tabs` 分頁籤切換
- `Offcanvas` 側邊滑出抽屜導航
- `Pagination` 頁碼分頁切換器
- `Placeholders` 載入中骨架屏
- `Popovers` 彈出提示泡泡
- `Progress` 動態進度條
- `Scrollspy` 滾動監聽導航
- `Spinners` 讀取中轉圈動畫
- `Toasts` 右下角通知吐司
- `Tooltips` 工具提示文字

### 5. Helpers 輔助類別（12 課）
- `Clearfix` 浮動清除
- `Color & background` 色彩與背景文字整合
- `Colored links` 彩色超連結樣式
- `Focus ring` 無障礙焦點光暈
- `Icon link` 帶圖示連結特效
- `Position` 定位輔助（置頂、置底、絕對置中）
- `Ratio` 響應式影片比例封裝（16:9 / 4:3 / 1:1）
- `Stacks` 水平 (hstack) 與垂直 (vstack) 堆疊
- `Stretched link` 卡片全區點擊擴展
- `Text truncation` 單行過長文字省略號
- `Vertical rule` 垂直分隔線
- `Visually hidden` 無障礙螢幕閱讀專用隱藏

### 6. Utilities 通用工具（18 課）
- `API` Utilities 生成原理
- `Background` 背景顏色與漸層
- `Borders` 邊框寬度、顏色與圓角（rounded-*）
- `Colors` 文字顏色與透明度語法
- `Display` 顯示模式（d-none, d-flex, d-inline...）
- `Flex` 彈性盒模型對齊與均分
- `Float` 左右浮動控制
- `Interactions` 文字選取與點擊事件控制
- `Link` 連結下劃線與透明度
- `Object fit` 圖片填滿與裁切模式
- `Opacity` 不透明度級距
- `Overflow` 溢位隱藏與滾動條
- `Position` 快速定位類別
- `Shadows` 陰影層次（shadow-sm, shadow, shadow-lg）
- `Sizing` 寬高百分比（w-25, w-50, w-100...）
- `Spacing` 外距 margin (m-*) 與內距 padding (p-*)
- `Text` 文字對齊、變換與粗細
- `Vertical align` 垂直基線對齊
- `Visibility` 可見度控制
- `Z-index` 階層快速套用

---

## 🎮 遊戲化功能設計概要 (Gamification Overview)

為了讓高中生在練習網頁切版時保持充沛熱情與成就感，系統設計了多層次遊戲化機制：

1. **雙模式即時互動切換**：
   - 🧑‍🏫 **老師教學模式**：生活化校園場景引入、代碼解構、各類別效果圖解與即時互動參數控制。
   - 👨‍🎓 **學生實作挑戰**：即時代碼編輯器（支援自動縮排、重設草稿、查看提示與參考解答）、自動語法規則驗證。
   - ⚡ **雙欄比對模式**：一邊對照老師範例，一邊撰寫自己的實作代碼。
2. **多載具斷點模擬器**：
   - 提供手機 (375px)、平板 (768px)、筆電 (992px) 與全螢幕 (100%) 一鍵切換。
   - 實時計算並標記當前 Bootstrap 斷點（`<576px xs`、`≥576px sm`、`≥768px md`、`≥992px lg`、`≥1200px xl`、`≥1400px xxl`），幫助學生具體理解 RWD 原理。
3. **經驗值 (XP) 與高校等級體系**：
   - 每次成功通過實作挑戰即可獲得 50 ~ 100 XP。
   - 等級稱號隨積分晉升：
     - `Lv.1 網頁初心者`
     - `Lv.3 班級資訊股長`
     - `Lv.6 社團公關部長`
     - `Lv.10 校園網管領航員`
     - `Lv.15 校慶前台總工程師`
     - `Lv.20 Bootstrap 傳奇宗師`
4. **專屬榮譽成就徽章 (Achievements)**：
   - 累計通過各類別章節可解鎖專屬徽章與炫麗慶祝動畫。
5. **自由創作沙盒 (Playground)**：
   - 隨時可在開放式沙盒自由組合所學元件，並提供「社團介紹首頁」、「班級聯絡簿」、「個人作品集」等範本，更支援一鍵匯出 `index.html` 帶回家！
