import { Lesson } from '../types/curriculum';
import { hasExactClass, hasExactClasses } from '../utils/htmlValidator';

export const LESSONS_HELPERS: Lesson[] = [
  {
    id: 'helpers-clearfix',
    categoryId: 'helpers',
    title: 'Clearfix 浮動清除助手',
    officialName: 'Clearfix',
    level: '中階',
    summary: '解決 CSS 浮動 (float) 造成的父層高度塌陷問題，確保後續排版不受干擾。',
    teacherDialogue: '在做圖文環繞排版時，如果圖片加了 float-start，外層的盒子會抓不到高度而塌陷！加上 clearfix 類別，就能乾淨俐落地在底端清除浮動，把外框撐回正確高度！',
    keyClasses: [
      { name: 'clearfix', desc: '清除內部子元素的浮動效果' },
      { name: 'float-start', desc: '向左浮動' },
      { name: 'float-end', desc: '向右浮動' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="bg-light p-3 border rounded clearfix">
    <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=160" 
         class="float-start me-3 rounded" style="width: 100px;" alt="開會同學">
    <p class="mb-0">
      <strong>幹部籌備會議：</strong> 透過 clearfix，即便這張照片向左浮動，外層的灰色背景框依然能完整包住整張照片與文字，絕對不會破版！
    </p>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為浮動按鈕與標題的介紹區塊補上 clearfix 防塌陷',
      scenario: '大明高中社團成發看板中，右側浮動按鈕造成外框高度塌陷，請使用 `clearfix` 修復外框高度！',
      instructions: [
        '步驟 1：在外層容器加入清除浮動 (clearfix) 樣式，修復因內部子元素向右浮動引發的高度塌陷問題。',
        '步驟 2：保持右側按鈕向右浮動 (float-end) 的配置，並維持 h4 活動標題架構。',
        '步驟 3：為標題設定底部外距 (margin-bottom) 為 0，消除預設留白以呈現緊湊外觀。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在下方父層容器加上 clearfix -->
  <div class="bg-light border p-3 rounded">
    <button class="btn btn-primary float-end">查看詳情</button>
    <h4>社團成發總彩排</h4>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="bg-light border p-3 rounded clearfix">
    <button class="btn btn-primary float-end">查看詳情</button>
    <h4 class="mb-0">社團成發總彩排</h4>
  </div>
</div>`,
      hints: [
        '在外層 div 的 class 屬性中加入精確類別 clearfix',
        '在 h4 標籤加入 class="mb-0"',
      ],
      rules: [
        {
          description: '外層父容器必須精準包含 clearfix 類別',
          test: (html) => hasExactClass(html, 'clearfix', 'div'),
        },
        {
          description: '必須保留 float-end 浮動按鈕',
          test: (html) => hasExactClass(html, 'float-end', 'button'),
        },
        {
          description: '標題 h4 必須包含 mb-0 緊湊外距類別',
          test: (html) => hasExactClass(html, 'mb-0', 'h4'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-color-background',
    categoryId: 'helpers',
    title: 'Color & background 智慧配色助手',
    officialName: 'Color & background',
    level: '初階',
    summary: 'text-bg-* 超級實用！自動幫你配好背景色與對比度合格的最佳文字顏色。',
    teacherDialogue: '以往寫背景 bg-dark 時，文字常常黑壓壓一片看不清，還得自己手動寫 text-white。Bootstrap 5 提供了神級助手 text-bg-*（例如 text-bg-primary, text-bg-dark），它會自動算出最清晰的文字顏色，再也不怕對比度不夠！',
    keyClasses: [
      { name: 'text-bg-primary', desc: '深藍背景 + 自動適配純白文字' },
      { name: 'text-bg-warning', desc: '警示黃背景 + 自動適配深黑文字' },
      { name: 'text-bg-dark', desc: '夜幕黑背景 + 自動適配純白文字' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="p-3 text-bg-primary rounded mb-2 shadow-sm">
    🌟 <strong>.text-bg-primary</strong>：自動確保深藍底與純白文字的高對比！
  </div>
  <div class="p-3 text-bg-warning rounded shadow-sm">
    ⚡ <strong>.text-bg-warning</strong>：黃底自動搭配黑字，完全符合無障礙可讀性規範！
  </div>
</div>`,
    studentTask: {
      title: '挑戰：使用 text-bg-success 製作通過審核橫幅',
      scenario: '大明高中自主學習計畫審查通過，請使用 `text-bg-success` 製作一個符合無障礙對比標準的高質感橫幅！',
      instructions: [
        '步驟 1：在通知區塊套用成功綠色智慧背景色彩 (text-bg-success)，自動取得符合 WCAG 無障礙對比標準的高對比文字。',
        '步驟 2：容器需具備標準圓角 (rounded) 與小尺寸陰影 (shadow-sm)，增加視覺立體層次。',
        '步驟 3：保留行內粗體語意標籤，強調自主學習計畫審核通過的關鍵字。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將此區塊升級為 text-bg-success 智慧配色 -->
  <div class="p-3">
    🎉 恭喜！你的自主學習計畫已通過校內初審！
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="p-3 text-bg-success rounded shadow-sm">
    🎉 恭喜！你的<strong>自主學習計畫</strong>已通過校內初審！
  </div>
</div>`,
      hints: [
        '為容器加上 class="p-3 text-bg-success rounded shadow-sm"',
      ],
      rules: [
        {
          description: '容器必須精確包含 text-bg-success 類別',
          test: (html) => hasExactClass(html, 'text-bg-success', 'div'),
        },
        {
          description: '容器必須包含 rounded 與 shadow-sm 類別',
          test: (html) => hasExactClass(html, 'rounded', 'div') && hasExactClass(html, 'shadow-sm', 'div'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-colored-links',
    categoryId: 'helpers',
    title: 'Colored links 彩色超連結',
    officialName: 'Colored links',
    level: '初階',
    summary: 'link-primary, link-success, link-danger 讓超連結擁有與品牌一致的色彩與滑鼠懸停回饋。',
    teacherDialogue: '預設的藍色底線超連結是不是很老氣？使用 link-* 類別（例如 link-success、link-danger），超連結就會換上相應色彩，而且滑鼠移過去時還會自動微調深淺，質感超棒！',
    keyClasses: [
      { name: 'link-primary', desc: '主色系藍色連結' },
      { name: 'link-danger', desc: '紅色警示連結' },
      { name: 'link-secondary', desc: '低調次要灰色連結' },
    ],
    teacherHtml: `<div class="container py-3">
  <p>請造訪我們的校慶專題報導：</p>
  <p><a href="#" class="link-primary">🔗 閱讀校慶園遊會特別專欄 (link-primary)</a></p>
  <p><a href="#" class="link-success">🔗 下載園遊會優惠券 (link-success)</a></p>
  <p><a href="#" class="link-danger">⚠️ 遺失物招領登記處 (link-danger)</a></p>
</div>`,
    studentTask: {
      title: '挑戰：將社團邀請連結升級為彩色連結與加粗強調',
      scenario: '請為大明高中熱音社 Discord 交流群連結加上 `link-primary` 與 `fw-bold`！',
      instructions: [
        '步驟 1：為超連結套用主題主要色色彩連結 (link-primary)，確保具備滑鼠懸停 (hover) 明暗自動回饋。',
        '步驟 2：字體設定為加粗粗細 (fw-bold)，並移除預設的下底線文字裝飾 (text-decoration-none)。',
      ],
      starterHtml: `<div class="container py-3">
  <p>相關資訊：<a href="#">點此加入熱音社官方 Discord 交流群</a></p>
</div>`,
      solutionHtml: `<div class="container py-3">
  <p>相關資訊：<a href="#" class="link-primary fw-bold text-decoration-none">點此加入熱音社官方 Discord 交流群</a></p>
</div>`,
      hints: ['為 <a> 標籤加上 class="link-primary fw-bold text-decoration-none"！'],
      rules: [
        {
          description: 'a 標籤必須精確包含 link-primary 類別',
          test: (html) => hasExactClass(html, 'link-primary', 'a'),
        },
        {
          description: 'a 標籤必須包含 fw-bold 粗體類別',
          test: (html) => hasExactClass(html, 'fw-bold', 'a'),
        },
        {
          description: 'a 標籤必須包含 text-decoration-none 類別',
          test: (html) => hasExactClass(html, 'text-decoration-none', 'a'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-focus-ring',
    categoryId: 'helpers',
    title: 'Focus ring 焦點光暈',
    officialName: 'Focus ring',
    level: '中階',
    summary: '鍵盤無障礙操作必備！使用 Tab 鍵導航時，為元素呈現醒目的半透明自定義焦點環。',
    teacherDialogue: '很多視障或習慣用鍵盤操控的同學，都是按鍵盤上的 Tab 鍵在網頁裡移動。focus-ring 可以為任意元素加上優美的無障礙焦點圈，不僅好看，更符合國際 WCAG 友善網頁規範！',
    keyClasses: [
      { name: 'focus-ring', desc: '套用現代化焦點環' },
      { name: 'focus-ring-primary', desc: '主色系藍色光暈' },
      { name: 'focus-ring-danger', desc: '紅色焦點光暈' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <p class="text-muted small">點選按鈕或按 Tab 鍵觀察焦點外圈：</p>
  <a href="#" class="d-inline-block p-2 text-decoration-none rounded focus-ring focus-ring-primary border">
    🎯 具備無障礙 focus-ring 的快捷入口
  </a>
</div>`,
    studentTask: {
      title: '挑戰：為大明高中註冊按鈕套用 focus-ring 無障礙焦點環',
      scenario: '請在按鈕上精確套用 `focus-ring` 與 `focus-ring-primary`，確保鍵盤操作時具備醒目無障礙外圈！',
      instructions: [
        '步驟 1：維持外層居中容器結構完整，確保所有 HTML 標籤皆有成對角括號且正確閉合。',
        '步驟 2：為按鈕啟用鍵盤無障礙焦點光暈 (focus-ring)，並將光暈色調指定為主要品牌色 (focus-ring-primary)。',
        '步驟 3：保留按鈕基礎樣式與外框型主要色外觀 (btn-outline-primary)，確保按鍵在未聚焦時具備清晰輪廓。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <button class="btn btn-outline-primary">
    立即登記
  </button>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <button class="btn btn-outline-primary focus-ring focus-ring-primary">
    立即登記
  </button>
</div>`,
      hints: [
        '在 button 標籤中填寫 class="btn btn-outline-primary focus-ring focus-ring-primary"',
        '注意檢查字母拼寫，必須是 focus-ring，後面不可有多餘的字母！',
      ],
      rules: [
        {
          description: 'button 必須精準包含 focus-ring 類別（不能多字母或拼錯）',
          test: (html) => hasExactClass(html, 'focus-ring', 'button'),
        },
        {
          description: 'button 必須精準包含 focus-ring-primary 焦點色彩類別',
          test: (html) => hasExactClass(html, 'focus-ring-primary', 'button'),
        },
        {
          description: 'button 必須保留 btn 與 btn-outline-primary 外觀類別',
          test: (html) => hasExactClass(html, 'btn', 'button') && hasExactClass(html, 'btn-outline-primary', 'button'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-icon-link',
    categoryId: 'helpers',
    title: 'Icon link 圖示連結助手',
    officialName: 'Icon link',
    level: '初階',
    summary: '文字與右側箭頭小圖示的完美結合！icon-link-hover 讓滑鼠移過時箭頭向右滑動。',
    teacherDialogue: '常常在「了解更多 →」看到滑鼠移過去時，箭頭會悄悄往右邊滑動一下對吧？這在 Bootstrap 5.3 叫做 icon-link 與 icon-link-hover！完全不用寫 keyframes 動畫，一個類別直接搞定！',
    keyClasses: [
      { name: 'icon-link', desc: '圖示與文字垂直對齊排版' },
      { name: 'icon-link-hover', desc: '滑鼠懸停時圖示平移動畫' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="card p-3 shadow-sm" style="max-width: 380px;">
    <h5>學術競賽榮譽榜</h5>
    <p class="text-muted small mb-2">了解更多高一二學生代表出賽獲獎名單...</p>
    <a class="icon-link icon-link-hover text-decoration-none fw-bold" href="#">
      查看完整得獎名冊 →
    </a>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：製作「探索更多社團 →」動態圖示連結',
      scenario: '請為大明高中社團連結加上 `icon-link` 與 `icon-link-hover` 類別！',
      instructions: [
        '步驟 1：為超連結套用圖示連結 (icon-link) 佈局，並啟用滑鼠懸停時箭頭向右滑動的平移動畫 (icon-link-hover)。',
        '步驟 2：移除預設超連結下底線裝飾 (text-decoration-none)，並套用粗體字重 (fw-bold) 提升辨識度。',
      ],
      starterHtml: `<div class="container py-3">
  <a href="#">探索更多學生社團 →</a>
</div>`,
      solutionHtml: `<div class="container py-3">
  <a class="icon-link icon-link-hover text-decoration-none fw-bold text-primary" href="#">
    探索更多學生社團 →
  </a>
</div>`,
      hints: ['為 <a> 標籤加上 class="icon-link icon-link-hover text-decoration-none fw-bold"！'],
      rules: [
        {
          description: 'a 標籤必須精確包含 icon-link 類別',
          test: (html) => hasExactClass(html, 'icon-link', 'a'),
        },
        {
          description: 'a 標籤必須精確包含 icon-link-hover 懸浮動畫類別',
          test: (html) => hasExactClass(html, 'icon-link-hover', 'a'),
        },
        {
          description: 'a 標籤必須包含 fw-bold 粗體類別',
          test: (html) => hasExactClass(html, 'fw-bold', 'a'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-position',
    categoryId: 'helpers',
    title: 'Position 定位輔助',
    officialName: 'Position',
    level: '中階',
    summary: '固定置頂 fixed-top、固定置底 fixed-bottom 與滾動吸頂 sticky-top。',
    teacherDialogue: '常常看到網站上方那條選單在頁面往下滑時「吸在最上面」，或者即時公告貼在畫面最底部。用 fixed-top 可以讓導覽列固定在螢幕頂端；用 sticky-top 則會在滾動到它時優雅黏在頂端！',
    keyClasses: [
      { name: 'fixed-top', desc: '固定鎖死在視窗頂端 (position: fixed; top: 0)' },
      { name: 'fixed-bottom', desc: '固定鎖死在視窗最底端' },
      { name: 'sticky-top', desc: '隨捲軸滾動，到達頂端時自動吸附固定' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="sticky-top bg-warning p-2 rounded shadow-sm text-center fw-bold mb-3">
    📌 sticky-top：滾動到頂端時我會吸附在最上方！
  </div>
  <div class="bg-light p-4 rounded" style="height: 140px; overflow-y: scroll;">
    <p>試著在此處上下滾動...</p>
    <p>第二段文字內容...</p>
    <p>第三段文字內容...</p>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為班級聯絡簿公告加上 sticky-top 吸頂效果',
      scenario: '請為大明高中緊急演習公告條加上 `sticky-top`、圓角與陰影！',
      instructions: [
        '步驟 1：為緊急公告列設定滾動吸頂定位 (sticky-top)，使頁面向下捲動時自動釘選於視窗頂端。',
        '步驟 2：保留紅色危險警示背景 (bg-danger)、白色文字 (text-white)、水平文字置中與 2 級內距。',
        '步驟 3：追加標準圓角 (rounded) 與輕量陰影 (shadow-sm)，營造懸浮於版面上方的視覺層次。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在下方加上 sticky-top -->
  <div class="bg-danger text-white p-2 text-center">
    🚨 緊急提醒：第 4 節為防震疏散演練，請勿待在教室！
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="sticky-top bg-danger text-white p-2 text-center rounded shadow-sm">
    🚨 緊急提醒：第 4 節為防震疏散演練，請勿待在教室！
  </div>
</div>`,
      hints: ['在 div 加上 class="sticky-top bg-danger text-white p-2 text-center rounded shadow-sm"！'],
      rules: [
        {
          description: '公告容器必須精確包含 sticky-top 類別',
          test: (html) => hasExactClass(html, 'sticky-top', 'div'),
        },
        {
          description: '必須保留 bg-danger 與 text-white 警示配色',
          test: (html) => hasExactClass(html, 'bg-danger', 'div') && hasExactClass(html, 'text-white', 'div'),
        },
        {
          description: '必須包含 rounded 與 shadow-sm 類別',
          test: (html) => hasExactClass(html, 'rounded', 'div') && hasExactClass(html, 'shadow-sm', 'div'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-ratio',
    categoryId: 'helpers',
    title: 'Ratio 響應式比例封裝',
    officialName: 'Ratio',
    level: '中階',
    summary: '完美嵌入 YouTube 影片或 Google 地圖！ratio-16x9 確保在手機與電腦上絕不變形或出現黑邊。',
    teacherDialogue: '大家在網頁嵌入 YouTube 影片時，是不是常遇到手機版影片變形拉長、或者兩側有一大條黑邊？用 ratio 和 ratio-16x9，它會用純 CSS 精確維持 16:9 劇院級比例，不管螢幕怎麼縮放都完美自適應！',
    keyClasses: [
      { name: 'ratio ratio-16x9', desc: '16:9 標準寬螢幕劇院比例（最常用於 YouTube）' },
      { name: 'ratio ratio-4x3', desc: '4:3 傳統螢幕比例' },
      { name: 'ratio ratio-1x1', desc: '1:1 正方形比例（常用於 Instagram 貼文或頭像）' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 450px;">
  <p class="small text-muted mb-2">16:9 響應式 YouTube 影片嵌入：</p>
  <div class="ratio ratio-16x9 rounded shadow-sm overflow-hidden bg-dark">
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="社團精彩影片" allowfullscreen></iframe>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為校慶成果回顧影片製作 ratio-16x9 封裝容器',
      scenario: '請使用 `ratio ratio-16x9` 包裹嵌入式 `<iframe>`，並加上圓角與防溢出保護！',
      instructions: [
        '步驟 1：建立響應式比例容器 (ratio)，強制鎖定為 16:9 寬螢幕劇院比例 (ratio-16x9)，防止影片在不同螢幕縮放時拉伸變形。',
        '步驟 2：為比例容器設定外框圓角 (rounded)，並加上防溢出隱藏 (overflow-hidden) 避免內部 iframe 尖角穿透圓角邊緣。',
        '步驟 3：確保內部包含提供無障礙 title 說明的 iframe 內嵌網頁標籤。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在此建立 ratio 16:9 比例容器 -->
  <div>
    <iframe src="about:blank"></iframe>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
    <iframe src="about:blank" title="校慶回顧影片"></iframe>
  </div>
</div>`,
      hints: ['外層使用 class="ratio ratio-16x9 rounded overflow-hidden"！'],
      rules: [
        {
          description: '外層容器必須精確包含 ratio 比例基底類別',
          test: (html) => hasExactClass(html, 'ratio', 'div'),
        },
        {
          description: '外層容器必須精確包含 ratio-16x9 劇院比例類別',
          test: (html) => hasExactClass(html, 'ratio-16x9', 'div'),
        },
        {
          description: '必須包含 rounded 與 overflow-hidden 圓角防溢出類別',
          test: (html) => hasExactClass(html, 'rounded', 'div') && hasExactClass(html, 'overflow-hidden', 'div'),
        },
      ],
      xp: 60,
    },
  },
  {
    id: 'helpers-stacks',
    categoryId: 'helpers',
    title: 'Stacks 水平與垂直堆疊',
    officialName: 'Stacks',
    level: '初階',
    summary: '比寫 Flexbox 更快十倍！vstack (垂直垂直排) 與 hstack (水平橫向排)，搭配 gap-* 輕鬆調間距。',
    teacherDialogue: '常常要讓三個按鈕水平排開，以前要寫 d-flex align-items-center gap-3，字超多！在 Bootstrap 5 裡，只要寫一個 hstack gap-3 就搞定了！想直向排就寫 vstack gap-2，簡單明瞭又超神速！',
    keyClasses: [
      { name: 'vstack gap-*', desc: '垂直堆疊，子元素由上往下整齊排列' },
      { name: 'hstack gap-*', desc: '水平堆疊，子元素由左往右並排' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="hstack gap-3 bg-light p-3 rounded mb-3">
    <span class="fw-bold">🏫 快捷通道：</span>
    <button class="btn btn-primary btn-sm">學務處</button>
    <button class="btn btn-secondary btn-sm">教務處</button>
    <button class="btn btn-outline-dark btn-sm ms-auto">登出</button>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：使用 hstack gap-2 打造社群按鈕水平列',
      scenario: '請使用 `hstack gap-2` 讓大明高中校刊社 IG、FB、YouTube 三個社群按鈕橫向水平排列！',
      instructions: [
        '步驟 1：將外層容器設定為水平堆疊 (hstack)，並設定子元素之間具備 2 級間距 (gap-2)。',
        '步驟 2：內部 3 個社群連結按鈕需保持標準小尺寸 (btn-sm) 按鈕規範。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將此處改為 hstack gap-2 -->
  <div>
    <button class="btn btn-outline-danger btn-sm">📸 Instagram</button>
    <button class="btn btn-outline-primary btn-sm">📘 Facebook</button>
    <button class="btn btn-outline-danger btn-sm">🎥 YouTube</button>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="hstack gap-2">
    <button class="btn btn-outline-danger btn-sm">📸 Instagram</button>
    <button class="btn btn-outline-primary btn-sm">📘 Facebook</button>
    <button class="btn btn-outline-danger btn-sm">🎥 YouTube</button>
  </div>
</div>`,
      hints: ['為外層容器加上 class="hstack gap-2"！'],
      rules: [
        {
          description: '外層容器必須精確包含 hstack 水平堆疊類別',
          test: (html) => hasExactClass(html, 'hstack', 'div'),
        },
        {
          description: '外層容器必須精確包含 gap-2 間距類別',
          test: (html) => hasExactClass(html, 'gap-2', 'div'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-stretched-link',
    categoryId: 'helpers',
    title: 'Stretched link 卡片全區點擊擴展',
    officialName: 'Stretched link',
    level: '中階',
    summary: '讓整張卡片任何地方都能點！只要在內部的 <a> 加上 stretched-link，點擊區域瞬間鋪滿整張卡片。',
    teacherDialogue: '同學在瀏覽卡片時，常常期待點擊卡片的照片或空白處就能跳轉，而不是只能可憐兮兮地瞄準那行小小的藍色連結。只要在 card 裡的 <a> 加上 stretched-link，整張卡片直接化身為超大可點擊感應區！',
    keyClasses: [
      { name: 'stretched-link', desc: '將超連結的點擊範圍擴展至包含它的最近 position: relative 父容器' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 320px;">
  <div class="card shadow-sm p-3">
    <h5 class="fw-bold">🎸 吉他社成發特刊</h5>
    <p class="text-muted small">點擊卡片任何地方（即便點在文字或空白處），都能跳轉！</p>
    <a href="#" class="stretched-link text-primary fw-bold text-decoration-none">
      立即線上購票 →
    </a>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：讓幹部介紹卡片任何位置皆可點選查看詳細檔案',
      scenario: '請為大明高中吉他社社長卡片中的 `<a>` 連結加上 `stretched-link` 與質感樣式！',
      instructions: [
        '步驟 1：確認外層為具備卡片 (card) 定位的父容器。',
        '步驟 2：為超連結加上全區延伸點選 (stretched-link)，將感應熱區無縫鋪滿整個卡片範圍。',
        '步驟 3：超連結文字設定為加粗粗細 (fw-bold) 並取消預設下底線 (text-decoration-none)。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 300px;">
  <div class="card p-3">
    <h5>社長個人檔案</h5>
    <p>深入了解社長的吉他心路歷程。</p>
    <a href="#">點此查看</a>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 300px;">
  <div class="card p-3 shadow-sm">
    <h5>社長個人檔案</h5>
    <p class="text-muted small">深入了解社長的吉他心路歷程。</p>
    <a href="#" class="stretched-link fw-bold text-decoration-none text-primary">點此查看 →</a>
  </div>
</div>`,
      hints: ['為 <a> 標籤加上 class="stretched-link fw-bold text-decoration-none"！'],
      rules: [
        {
          description: 'a 標籤必須精確包含 stretched-link 類別',
          test: (html) => hasExactClass(html, 'stretched-link', 'a'),
        },
        {
          description: '外層容器必須包含 card 類別',
          test: (html) => hasExactClass(html, 'card', 'div'),
        },
        {
          description: 'a 標籤必須包含 fw-bold 加粗類別',
          test: (html) => hasExactClass(html, 'fw-bold', 'a'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-text-truncation',
    categoryId: 'helpers',
    title: 'Text truncation 單行文字截斷',
    officialName: 'Text truncation',
    level: '初階',
    summary: '文字太長爆出版面怎麼辦？text-truncate 自動將過長文字縮減為優雅的省略號「...」。',
    teacherDialogue: '常常有同學發文標題寫了 50 個字，結果把整排表格和卡片撐壞變形。加上 class="text-truncate"，過長的文字就會被瀏覽器自動切斷，並在尾巴顯示三個點點（...），視覺乾淨利落！',
    keyClasses: [
      { name: 'text-truncate', desc: '單行過長文字自動產生省略號（需搭配 block 或 inline-block）' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 300px;">
  <p class="small text-muted mb-1">未截斷（會折行）：</p>
  <div class="bg-light p-2 mb-2">
    114 學年度全校熱音社年度大型成果發表盛典暨全國高中聯合音樂祭最新籌備進度報告
  </div>
  
  <p class="small text-muted mb-1">使用 text-truncate 優雅單行截斷：</p>
  <div class="bg-primary text-white p-2 text-truncate rounded">
    114 學年度全校熱音社年度大型成果發表盛典暨全國高中聯合音樂祭最新籌備進度報告
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為大明高中最新公告清單項目加上 text-truncate',
      scenario: '請在過長的新聞段落上精確套用 `text-truncate` 類別，防止撐破版面！',
      instructions: [
        '步驟 1：為長段落文字設定單行文字截斷 (text-truncate)，使超出寬度時自動以「...」省略號收斂，防止撐壞版面。',
        '步驟 2：消除段落預設的下外距 (mb-0) 以達成緊湊對齊。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 250px;">
  <div class="border p-2 rounded">
    <p class="mb-0">
      公告：本週五第七節課全校防災演練注意事項與疏散避難路線圖公佈
    </p>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 250px;">
  <div class="border p-2 rounded">
    <p class="text-truncate mb-0 fw-semibold">
      公告：本週五第七節課全校防災演練注意事項與疏散避難路線圖公佈
    </p>
  </div>
</div>`,
      hints: ['為 <p> 標籤加上 class="text-truncate mb-0"！'],
      rules: [
        {
          description: 'p 標籤必須精確包含 text-truncate 類別',
          test: (html) => hasExactClass(html, 'text-truncate', 'p'),
        },
        {
          description: 'p 標籤必須包含 mb-0 緊湊外距類別',
          test: (html) => hasExactClass(html, 'mb-0', 'p'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-vertical-rule',
    categoryId: 'helpers',
    title: 'Vertical rule 垂直分隔線',
    officialName: 'Vertical rule',
    level: '初階',
    summary: '微小但高質感的設計細節！.vr 在按鈕群或文字之間畫出一道精緻的灰色垂直線。',
    teacherDialogue: '常常看到網站上的導覽列寫著「首頁 | 關於我們 | 聯絡我們」，大家以前都傻傻用鍵盤打直線符號「|」，粗細高低都很難對齊。Bootstrap 提供了專門的 class="vr"，高度自動適應父層，極具設計感！',
    keyClasses: [
      { name: 'vr', desc: '垂直分隔線（Vertical Rule），通常置於 hstack 或 d-flex 中' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="hstack gap-3 bg-light p-3 rounded">
    <span>🏫 大明高中</span>
    <div class="vr"></div>
    <span>總機：(02) 2345-6789</span>
    <div class="vr"></div>
    <span class="text-muted">傳真：(02) 2345-6780</span>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：在社團名稱與指導老師之間加入 vr 垂直分隔線',
      scenario: '請在 `hstack` 容器內加入標準 `<div class="vr"></div>` 分隔線！',
      instructions: [
        '步驟 1：維持外層水平堆疊 (hstack) 與 3 級元素間隔架構。',
        '步驟 2：在社團名稱與指導老師資訊之間，插入垂直分隔線元素 (vr)。',
        '步驟 3：將社團名稱文字加粗 (fw-bold) 以凸顯層級。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="hstack gap-3">
    <span>天文社</span>
    <!-- 請在此處插入 vr 垂直線 -->
    <span>指導老師：張天宇 老師</span>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="hstack gap-3">
    <span class="fw-bold">天文社</span>
    <div class="vr"></div>
    <span>指導老師：張天宇 老師</span>
  </div>
</div>`,
      hints: ['在兩個 span 中間加入 <div class="vr"></div>！'],
      rules: [
        {
          description: '必須精確包含 vr 類別的 div 元素',
          test: (html) => hasExactClass(html, 'vr', 'div'),
        },
        {
          description: '天文社 span 標籤必須包含 fw-bold 加粗類別',
          test: (html) => hasExactClass(html, 'fw-bold', 'span'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'helpers-visually-hidden',
    categoryId: 'helpers',
    title: 'Visually hidden 無障礙視覺隱藏',
    officialName: 'Visually hidden',
    level: '高階',
    summary: '讓螢幕閱讀器能讀出內容，但視覺畫面上完全隱藏，是無障礙 (Accessibility) 的神兵利器。',
    teacherDialogue: '當你在按鈕裡只放了一個放大鏡圖示 🔍，明眼人知道是搜尋，但視障同學使用語音讀屏軟體時，只會聽到「按鈕」兩個字，完全不知道是幹嘛的！加上 `<span class="visually-hidden">送出搜尋</span>`，視覺上看完全隱形，但讀屏器會大聲朗讀出來，這就是優秀工程師的體貼！',
    keyClasses: [
      { name: 'visually-hidden', desc: '視覺上隱藏但讀屏軟體可識別' },
      { name: 'visually-hidden-focusable', desc: '平時隱藏，鍵盤按 Tab 選中時浮現（如「跳至主內容」）' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <button class="btn btn-primary">
    🔍 <span class="visually-hidden">搜尋全校社團活動</span>
  </button>
  <p class="text-muted small mt-2">（畫面上只看得到放大鏡，但螢幕閱讀器會正確讀出「搜尋全校社團活動」）</p>
</div>`,
    studentTask: {
      title: '挑戰：為純圖示的關閉按鈕加上 visually-hidden 說明文字',
      scenario: '請在按鈕內加上 `<span class="visually-hidden">關閉公告視窗</span>`！',
      instructions: [
        '步驟 1：在純圖示按鈕內嵌入 span 說明文字「關閉公告視窗」。',
        '步驟 2：套用無視覺隱藏輔助 (visually-hidden)，使文字在視覺上隱形，但螢幕閱讀器能清楚朗讀出按鈕意圖。',
        '步驟 3：按鈕保留輪廓型次要外觀 (btn-outline-secondary) 與標準按鈕架構。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <button class="btn btn-outline-secondary">
    ❌
    <!-- 請在此處加入 visually-hidden 說明 -->
  </button>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <button class="btn btn-outline-secondary">
    ❌
    <span class="visually-hidden">關閉公告視窗</span>
  </button>
</div>`,
      hints: ['加入 <span class="visually-hidden">關閉公告視窗</span>！'],
      rules: [
        {
          description: 'span 標籤必須精確包含 visually-hidden 類別',
          test: (html) => hasExactClass(html, 'visually-hidden', 'span'),
        },
        {
          description: 'button 必須保留 btn 與 btn-outline-secondary 類別',
          test: (html) => hasExactClass(html, 'btn', 'button') && hasExactClass(html, 'btn-outline-secondary', 'button'),
        },
      ],
      xp: 60,
    },
  },
];
