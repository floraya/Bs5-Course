import { Lesson } from '../types/curriculum';

export const LESSONS_LAYOUT: Lesson[] = [
  {
    id: 'layout-breakpoints',
    categoryId: 'layout',
    title: 'Breakpoints 斷點與響應式等級',
    officialName: 'Breakpoints',
    level: '初階',
    summary: '認識 Bootstrap 5 的 6 大螢幕斷點 (xs, sm, md, lg, xl, xxl)，讓網頁在手機與電腦都能完美自適應。',
    teacherDialogue: '想像你在看大明高中的校刊，如果把整份報紙塞進手機小螢幕，字會小到像螞蟻！Bootstrap 的「斷點（Breakpoints）」就像神奇的伸縮開關：當螢幕小於 768px（手機）時，內容排成單欄直排；大於 768px（平板與電腦）時，自動展開成多欄並排！',
    keyClasses: [
      { name: 'col-12', desc: '手機直向極小螢幕 (xs < 576px) 滿版佔滿' },
      { name: 'col-sm-6', desc: '大手機/橫向 (sm ≥ 576px) 佔一半寬度' },
      { name: 'col-md-4', desc: '平板 (md ≥ 768px) 三等分排版' },
      { name: 'col-lg-3', desc: '筆記型電腦 (lg ≥ 992px) 四等分並排' },
    ],
    teacherHtml: `<div class="container py-4">
  <div class="alert alert-primary text-center">
    <h5 class="fw-bold mb-1">📱 斷點實時偵測器 (試著拉動右上角視窗寬度)</h5>
    <p class="mb-0 text-muted small">當前設備滿足的響應式等級：</p>
  </div>
  
  <div class="row g-3 text-white text-center fw-bold">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="p-3 bg-primary rounded shadow-sm">
        📱 手機直向 (col-12)<br><span class="badge bg-light text-primary mt-1">永遠佔滿</span>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="p-3 bg-success rounded shadow-sm">
        📲 大手機 (col-sm-6)<br><span class="badge bg-light text-success mt-1">sm 佔 50%</span>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="p-3 bg-warning text-dark rounded shadow-sm">
        📟 平板 (col-md-4)<br><span class="badge bg-dark text-warning mt-1">md 佔 33.3%</span>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="p-3 bg-danger rounded shadow-sm">
        💻 筆電 (col-lg-3)<br><span class="badge bg-light text-danger mt-1">lg 佔 25%</span>
      </div>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：打造社團成發活動的三段式響應海報',
      scenario: '熱音社要在大明高中辦成發，請幫忙排版 3 個活動亮點卡片，要求：在手機 (xs) 單行全滿 (col-12)，平板 (md) 雙欄並排 (col-md-6)，筆電 (lg) 以上三張並排 (col-lg-4)，且卡片需有圓角陰影與網格間隔！',
      instructions: [
        '步驟 1：網格列容器 (row) 必須設定 3 級或 4 級的格線間距 (gutter 3/4)，營造欄位舒適留白。',
        '步驟 2：將 3 個卡片外層欄位設定為響應式三段斷點：手機單欄滿版 (col-12)、平板雙欄並排 (col-md-6)、桌機大螢幕三欄均分 (col-lg-4)。',
        '步驟 3：卡片內部內容容器設定標準圓角 (rounded) 與小尺寸陰影 (shadow-sm)，增加視覺立體層次。',
      ],
      starterHtml: `<div class="container py-3">
  <h4 class="text-center fw-bold text-primary mb-3">🎸 2026 校園熱音社成發盛典</h4>
  <div class="row">
    <!-- TODO: 請修改下方欄位 class，加入完整三段響應斷點與卡片美化 -->
    <div class="col">
      <div class="p-4 bg-light border text-center">
        <h5>🔥 樂團聯演</h5>
        <p class="small text-muted">全校 8 組金曲樂團輪番上陣</p>
      </div>
    </div>
    <div class="col">
      <div class="p-4 bg-light border text-center">
        <h5>🍔 園遊市集</h5>
        <p class="small text-muted">美味美食攤位與周邊大放送</p>
      </div>
    </div>
    <div class="col">
      <div class="p-4 bg-light border text-center">
        <h5>🎁 壓軸抽獎</h5>
        <p class="small text-muted">吉他與知名耳機大獎等你拿</p>
      </div>
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <h4 class="text-center fw-bold text-primary mb-3">🎸 2026 校園熱音社成發盛典</h4>
  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="p-4 bg-light border rounded shadow-sm text-center">
        <h5>🔥 樂團聯演</h5>
        <p class="small text-muted">全校 8 組金曲樂團輪番上陣</p>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="p-4 bg-light border rounded shadow-sm text-center">
        <h5>🍔 園遊市集</h5>
        <p class="small text-muted">美味美食攤位與周邊大放送</p>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="p-4 bg-light border rounded shadow-sm text-center">
        <h5>🎁 壓軸抽獎</h5>
        <p class="small text-muted">吉他與知名耳機大獎等你拿</p>
      </div>
    </div>
  </div>
</div>`,
      hints: [
        '使用 class="col-12 col-md-6 col-lg-4" 可以讓手機呈現滿版，平板呈現雙欄，桌機大螢幕剛好三分天下 (12 / 4 = 3)！',
        '記得在 row 加上 class="row g-3" 提供欄位呼吸間隙！',
      ],
      rules: [
        {
          description: '必須包含 col-12 類別（手機直向預設滿版）',
          test: (html) => html.includes('col-12'),
        },
        {
          description: '必須包含 col-md-6 類別（平板設備雙欄分配）',
          test: (html) => html.includes('col-md-6'),
        },
        {
          description: '必須包含 col-lg-4 類別（桌機大螢幕三欄並排）',
          test: (html) => html.includes('col-lg-4'),
        },
        {
          description: '外層 row 必須設定網格間距 g-3 或 g-4',
          test: (html) => /g-[234]/.test(html),
        },
        {
          description: '卡片必須具備 rounded 圓角與 shadow-sm 陰影',
          test: (html) => html.includes('rounded') && html.includes('shadow-sm'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'layout-containers',
    categoryId: 'layout',
    title: 'Containers 容器佈局',
    officialName: 'Containers',
    level: '初階',
    summary: '容器是 Bootstrap 最基礎的元素，負責將頁面內容安全鎖定在適當寬度並水平置中。',
    teacherDialogue: '想像容器就像你書桌上的墊子，如果沒有容器，所有文字跟照片會緊緊貼在螢幕最左邊和最右邊，看起來超突兀！.container 會隨螢幕寬度自動留白置中；而 .container-fluid 則會 100% 鋪滿螢幕。',
    keyClasses: [
      { name: '.container', desc: '預設固定最大寬度的響應式置中容器（最常用）' },
      { name: '.container-fluid', desc: '全螢幕 100% 滿版容器' },
      { name: '.container-md', desc: '小於 md (768px) 時 100% 寬，大於 md 時固定寬度' },
    ],
    teacherHtml: `<div class="bg-light py-3">
  <!-- 固定寬度容器 -->
  <div class="container bg-primary text-white p-3 rounded mb-3 text-center">
    <strong>.container</strong> (水平置中，兩側隨螢幕有優雅留白)
  </div>
  
  <!-- 流式 100% 容器 -->
  <div class="container-fluid bg-secondary text-white p-3 text-center">
    <strong>.container-fluid</strong> (永遠 100% 佔滿整個視窗寬度)
  </div>
</div>`,
    studentTask: {
      title: '挑戰：將貼壁的校慶公告放進乾淨的 container 中',
      scenario: '大明高中校慶的首頁公告目前整面貼壁很難閱讀，請將外層改為標準 container，並給予置中、垂直內距、標題加粗與副文字樣式！',
      instructions: [
        '步驟 1：最外層改為標準固定寬度置中容器 (container)，確保在大螢幕自動居中且兩側留白（注意不要誤用滿版貼壁的 container-fluid）。',
        '步驟 2：外層加上垂直內距 (padding-y) 4 級或 5 級，營造大器的版面呼吸感。',
        '步驟 3：容器全區套用水平文字置中 (text-center)。',
        '步驟 4：標題套用加粗字重 (fw-bold) 與校園主題主要色 (text-primary)。',
        '步驟 5：活動時地說明文字套用淡化次要色彩 (text-muted)。',
      ],
      starterHtml: `<!-- 請將這個貼在邊緣的公告放入適當的容器中 -->
<div>
  <h2>🎉 大明高中 70 週年校慶盛會</h2>
  <p>時間：2026 年 11 月 15 日 08:30 - 16:30 | 地點：大操場與綜合體育館</p>
  <button class="btn btn-primary">下載活動手冊</button>
</div>`,
      solutionHtml: `<div class="container py-4 text-center">
  <h2 class="fw-bold text-primary">🎉 大明高中 70 週年校慶盛會</h2>
  <p class="text-muted">時間：2026 年 11 月 15 日 08:30 - 16:30 | 地點：大操場與綜合體育館</p>
  <button class="btn btn-primary">下載活動手冊</button>
</div>`,
      hints: [
        '外層使用 class="container py-4 text-center" 即可達成完美自適應置中！',
        '標題 h2 加入 class="fw-bold text-primary"！',
      ],
      rules: [
        {
          description: '最外層必須使用標準 .container（不可為 container-fluid）',
          test: (html) => html.includes('container') && !html.includes('container-fluid'),
        },
        {
          description: '必須設定垂直內距 py-4 或 py-5',
          test: (html) => /py-[45]/.test(html),
        },
        {
          description: '必須設定全區水平置中 text-center',
          test: (html) => html.includes('text-center'),
        },
        {
          description: '標題必須包含 fw-bold 與 text-primary',
          test: (html) => html.includes('fw-bold') && html.includes('text-primary'),
        },
        {
          description: '說明文字必須包含 text-muted',
          test: (html) => html.includes('text-muted'),
        },
      ],
      xp: 80,
    },
  },
  {
    id: 'layout-grid',
    categoryId: 'layout',
    title: 'Grid 12 欄網格系統',
    officialName: 'Grid',
    level: '初階',
    summary: 'Bootstrap 的精華！整個網頁水平被切分為 12 等分，你可以任意組合成 6+6、4+4+4、8+4 等神奇比例。',
    teacherDialogue: '網格系統（Grid System）就像樂高積木！Bootstrap 把每一行（.row）切成 12 格小空間。如果你寫 col-6，它就佔 6/12（也就是一半寬度）；如果寫 col-4，就佔三分之一（4/12）。只要一行相加等於 12，就能完美並排！超過 12 就會自動換到下一行喔！',
    keyClasses: [
      { name: '.row', desc: '欄位外層包裹容器（必須直接包住 .col）' },
      { name: '.col-6', desc: '佔滿 12 格中的 6 格 (50%)' },
      { name: '.col-4', desc: '佔滿 12 格中的 4 格 (33.33%)' },
      { name: '.col-8', desc: '佔滿 12 格中的 8 格 (66.67%)' },
      { name: '.col', desc: '自動均分剩餘寬度' },
    ],
    teacherHtml: `<div class="container py-3">
  <h6 class="fw-bold text-muted mb-2">12 欄數學示範：</h6>
  <div class="row text-center text-white g-2 mb-2">
    <div class="col-12"><div class="p-2 bg-primary">col-12 (100%)</div></div>
  </div>
  <div class="row text-center text-white g-2 mb-2">
    <div class="col-6"><div class="p-2 bg-success">col-6 (50%)</div></div>
    <div class="col-6"><div class="p-2 bg-success">col-6 (50%)</div></div>
  </div>
  <div class="row text-center text-white g-2 mb-2">
    <div class="col-4"><div class="p-2 bg-warning text-dark">col-4 (1/3)</div></div>
    <div class="col-4"><div class="p-2 bg-warning text-dark">col-4 (1/3)</div></div>
    <div class="col-4"><div class="p-2 bg-warning text-dark">col-4 (1/3)</div></div>
  </div>
  <div class="row text-center text-white g-2">
    <div class="col-8"><div class="p-2 bg-danger">col-8 (主要文章區 2/3)</div></div>
    <div class="col-4"><div class="p-2 bg-info text-dark">col-4 (側邊欄 1/3)</div></div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：班級圖書角首頁排版 (8+4 黃金比例)',
      scenario: '為高二 3 班設計班級閱讀牆：外層建立 row 並設定 g-3 間距，左邊 col-8（手機 col-12）放置今日主打選書，右邊 col-4（手機 col-12）放置排行榜，兩者均加圓角與陰影！',
      instructions: [
        '步驟 1：建立網格列容器 (row)，並設定 3 級欄位間隙 (gutter 3)。',
        '步驟 2：左側主打選書區依循 12 欄黃金分割設定為佔 8 欄比例（手機單欄滿版 col-12、電腦佔 8 欄 col-md-8）。',
        '步驟 3：右側排行榜區設定為佔 4 欄比例（手機單欄滿版 col-12、電腦佔 4 欄 col-md-4）。',
        '步驟 4：左右兩側卡片皆加上圓角 (rounded) 與小尺寸陰影 (shadow-sm)。',
        '步驟 5：左右區塊標題分別套用主要色彩 (text-primary) 與成功綠色 (text-success)。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- TODO: 在這裡設定網格容器與比例欄位 -->
  <div>
    <div>
      <div class="p-3 bg-light border">
        <h4>📖 本週選書：《費曼的物理學講義》</h4>
        <p>探索科學奧秘，感受物理名師的風趣解說！</p>
      </div>
    </div>
    <div>
      <div class="p-3 bg-light border">
        <h4>🏆 借閱排行榜</h4>
        <ol class="mb-0">
          <li>小王子</li>
          <li>被討厭的勇氣</li>
          <li>原子習慣</li>
        </ol>
      </div>
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="row g-3">
    <div class="col-12 col-md-8">
      <div class="p-3 bg-light border rounded shadow-sm">
        <h4 class="text-primary fw-bold">📖 本週選書：《費曼的物理學講義》</h4>
        <p class="text-muted mb-0">探索科學奧秘，感受物理名師的風趣解說！</p>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="p-3 bg-light border rounded shadow-sm">
        <h4 class="text-success fw-bold">🏆 借閱排行榜</h4>
        <ol class="mb-0 small">
          <li>小王子</li>
          <li>被討厭的勇氣</li>
          <li>原子習慣</li>
        </ol>
      </div>
    </div>
  </div>
</div>`,
      hints: [
        '外層要用 class="row g-3"，裡面兩層分別是 class="col-12 col-md-8" 與 class="col-12 col-md-4"！',
        '8 + 4 正好等於 12，加上 g-3 能使欄位之間有適當縫隙！',
      ],
      rules: [
        {
          description: '外層必須包含 row 容器與網格間距 g-2/g-3/g-4',
          test: (html) => html.includes('row') && /g-[234]/.test(html),
        },
        {
          description: '主選書區必須包含 col-8 或 col-md-8',
          test: (html) => html.includes('col-8') || html.includes('col-md-8'),
        },
        {
          description: '排行榜區必須包含 col-4 或 col-md-4',
          test: (html) => html.includes('col-4') || html.includes('col-md-4'),
        },
        {
          description: '兩側卡片皆需具備 rounded 圓角與 shadow-sm 陰影',
          test: (html) => html.includes('rounded') && html.includes('shadow-sm'),
        },
        {
          description: '左右標題分別套用 text-primary 與 text-success',
          test: (html) => html.includes('text-primary') && html.includes('text-success'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'layout-columns',
    categoryId: 'layout',
    title: 'Columns 欄位對齊與排序',
    officialName: 'Columns',
    level: '中階',
    summary: '深入學習欄位垂直對齊 (align-items)、水平對齊 (justify-content) 與順序調換 (order-*)。',
    teacherDialogue: '常常有同學問老師：「老師！我左邊的文字很少，右邊的照片很高，文字怎麼垂直置中在中間？」這時候只要在 row 加上 align-items-center 就解決了！另外還能用 order-1、order-2 來讓手機版跟電腦版的閱讀順序自動互換喔！',
    keyClasses: [
      { name: 'align-items-center', desc: '讓同一行中的欄位垂直居中對齊' },
      { name: 'align-items-end', desc: '讓同一行中的欄位底部對齊' },
      { name: 'justify-content-center', desc: '欄位在水平方向置中' },
      { name: 'order-first / order-last', desc: '強制改變欄位顯示前後順序' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="row align-items-center bg-light border p-3 rounded" style="min-height: 140px;">
    <div class="col-6 bg-primary text-white p-3 rounded">
      <h5>垂直居中內容</h5>
      <p class="mb-0 small">藉由父層 align-items-center，矮的這塊也能在正中間！</p>
    </div>
    <div class="col-6 bg-secondary text-white p-4 rounded">
      <h5>較高的內容區</h5>
      <p class="small">我有兩行文字<br>撐開了整個容器高度！</p>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：讓校園演講講者資訊垂直居中與響應排版',
      scenario: '左邊是高大頭照，右邊是簡短的介紹。請在父層 row 加上 align-items-center 讓介紹文字垂直置中，並配置 col-md-4 與 col-md-8 響應寬度，最後美化姓名標題！',
      instructions: [
        '步驟 1：在網格列 (row) 加上垂直交叉軸置中 (align-items-center)，使兩側不論內容高度多懸殊都能完美垂直居中。',
        '步驟 2：左側講者照片欄位設定為佔 4 欄比例（手機滿版 col-12、電腦 col-md-4）。',
        '步驟 3：右側講者介紹欄位設定為佔 8 欄比例（手機滿版 col-12、電腦 col-md-8）。',
        '步驟 4：講者姓名標題套用加粗字重 (fw-bold) 與主題主要色 (text-primary)。',
        '步驟 5：外層卡片確認具備標準圓角 (rounded) 與小尺寸陰影 (shadow-sm)。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="row bg-light p-4">
    <div class="col">
      <div class="bg-primary text-white rounded p-4 text-center">
        📸 講者照片 (高)
      </div>
    </div>
    <div class="col">
      <h4>陳教授 博士</h4>
      <p class="text-muted">人工智慧與未來高中生必修課特邀主講人</p>
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="row align-items-center bg-light p-4 rounded shadow-sm">
    <div class="col-12 col-md-4 text-center">
      <div class="bg-primary text-white rounded p-4">
        📸 講者照片 (高)
      </div>
    </div>
    <div class="col-12 col-md-8">
      <h4 class="fw-bold text-primary">陳教授 博士</h4>
      <p class="text-muted mb-0">人工智慧與未來高中生必修課特邀主講人</p>
    </div>
  </div>
</div>`,
      hints: [
        '在 row 加上 align-items-center，讓左右不論多高都能自動在垂直軸線上精準居中！',
        '左右欄分別設定 col-12 col-md-4 與 col-12 col-md-8！',
      ],
      rules: [
        {
          description: '父層 row 必須包含 align-items-center 垂直居中',
          test: (html) => html.includes('align-items-center'),
        },
        {
          description: '左右欄位必須具備 col-md-4 與 col-md-8 (或 col-4/col-8)',
          test: (html) =>
            (html.includes('col-md-4') || html.includes('col-4')) &&
            (html.includes('col-md-8') || html.includes('col-8')),
        },
        {
          description: '講者姓名必須包含 fw-bold 與 text-primary',
          test: (html) => html.includes('fw-bold') && html.includes('text-primary'),
        },
        {
          description: '必須包含 rounded 圓角',
          test: (html) => html.includes('rounded'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'layout-gutters',
    categoryId: 'layout',
    title: 'Gutters 間距系統',
    officialName: 'Gutters',
    level: '中階',
    summary: 'Gutters (間距) 用來精準調節格線欄位之間的縫隙寬度：g-*, gx-*, gy-*。',
    teacherDialogue: '卡片跟卡片之間黏得死死的很醜對吧？Gutters 就是欄位間的呼吸空間！g-0 代表無間隙，g-1 到 g-5 間距從小到大。如果只要水平間隙用 gx-*，只要垂直換行時的間隙就用 gy-*！',
    keyClasses: [
      { name: 'g-3', desc: '水平與垂直皆套用 1rem (16px) 的標準舒適間距' },
      { name: 'g-0', desc: '消除所有欄位間距（做無縫相簿或橫幅必備）' },
      { name: 'gx-4', desc: '僅控制水平 (X軸) 欄位縫隙' },
      { name: 'gy-3', desc: '僅控制垂直 (Y軸) 欄位縫隙' },
    ],
    teacherHtml: `<div class="container py-3">
  <p class="text-muted small">示範 g-4 舒適間距：</p>
  <div class="row g-4 text-center text-white">
    <div class="col-4"><div class="p-3 bg-primary rounded">方塊 A</div></div>
    <div class="col-4"><div class="p-3 bg-success rounded">方塊 B</div></div>
    <div class="col-4"><div class="p-3 bg-danger rounded">方塊 C</div></div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：幫社團照片牆加上寬敞的 g-4 間距與響應三欄',
      scenario: '攝影社想要展出三張外拍作品，但目前三張卡片貼在一起。請在外層 row 加上 g-4 間距，並設定手機 col-12、平板與桌機 col-md-4，內部卡片補上圓角與陰影！',
      instructions: [
        '步驟 1：在網格列容器 (row) 設定 4 級舒適欄距 (gutter 4)，為相片作品間拉開充足視野。',
        '步驟 2：將 3 個相片作品欄位設定為均分三欄比例（手機單欄滿版 col-12、電腦各佔 4 欄 col-md-4）。',
        '步驟 3：內部 3 個作品卡片皆加上圓角 (rounded) 與輕量陰影 (shadow-sm)。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="row text-center">
    <div class="col-4">
      <div class="p-4 bg-light border">📷 日落大橋</div>
    </div>
    <div class="col-4">
      <div class="p-4 bg-light border">🌸 春天櫻花</div>
    </div>
    <div class="col-4">
      <div class="p-4 bg-light border">☕ 校園角落</div>
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="row g-4 text-center">
    <div class="col-12 col-md-4">
      <div class="p-4 bg-light border rounded shadow-sm">📷 日落大橋</div>
    </div>
    <div class="col-12 col-md-4">
      <div class="p-4 bg-light border rounded shadow-sm">🌸 春天櫻花</div>
    </div>
    <div class="col-12 col-md-4">
      <div class="p-4 bg-light border rounded shadow-sm">☕ 校園角落</div>
    </div>
  </div>
</div>`,
      hints: [
        '在 row 加上 class="row g-4 text-center"！',
        '欄位寫成 col-12 col-md-4，內部卡片加上 rounded shadow-sm！',
      ],
      rules: [
        {
          description: '外層 row 必須包含 g-4 或 gx-4 網格間距',
          test: (html) => html.includes('g-4') || html.includes('gx-4'),
        },
        {
          description: '欄位必須具備 col-md-4 (或 col-4) 斷點設定',
          test: (html) => html.includes('col-md-4') || html.includes('col-4'),
        },
        {
          description: '卡片必須包含 rounded 圓角與 shadow-sm 陰影',
          test: (html) => html.includes('rounded') && html.includes('shadow-sm'),
        },
      ],
      xp: 80,
    },
  },
  {
    id: 'layout-utilities',
    categoryId: 'layout',
    title: 'Layout Utilities 佈局工具',
    officialName: 'Utilities',
    level: '中階',
    summary: '利用 display 輔助類別 (d-none, d-block, d-md-flex) 靈活控制不同設備上的元素顯隱與流動。',
    teacherDialogue: '想像你在做大明高中班刊，在電腦大螢幕有足夠空間顯示華麗的側邊小百科，但在手機上看畫面會被拉得太長！這時候可以用 d-none d-lg-block，意思就是「手機上藏起來 (d-none)，大螢幕 (lg) 才顯示」！',
    keyClasses: [
      { name: 'd-none', desc: '完全隱藏元素（display: none）' },
      { name: 'd-block', desc: '以區塊元素顯示（display: block）' },
      { name: 'd-none d-md-block', desc: '手機上隱藏，平板以上才顯現' },
      { name: 'd-flex justify-content-between', desc: '左右分散排列' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="p-3 bg-light border rounded text-center">
    <div class="alert alert-info d-none d-md-block">
      💻 <strong>電腦/平板專用小提示</strong>：你正在寬螢幕下閱讀這段詳細介紹！
    </div>
    <div class="alert alert-warning d-md-none">
      📱 <strong>手機版精簡通知</strong>：已為你自動隱藏冗長介紹以節省滑動時間！
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：在手機上隱藏繁瑣的側邊欄，桌機才顯示',
      scenario: '大明高中學生會官網的手機瀏覽者希望直接看新聞，請使用 `d-none d-lg-block` 讓側邊欄在手機自動收合隱藏，主文章區在手機滿版、桌機佔 8 欄！',
      instructions: [
        '步驟 1：右側邊欄設定為桌機 4 欄比例 (col-lg-4)，並設定手機/平板完全隱藏 (d-none)、大螢幕以上才顯現 (d-lg-block)。',
        '步驟 2：左側主內容區設定為手機滿版 (col-12)、桌機佔 8 欄 (col-lg-8)。',
        '步驟 3：主內容標題套用加粗字重 (fw-bold) 與主題主要色 (text-primary)。',
        '步驟 4：側邊欄內部卡片加上圓角 (rounded) 與輕量陰影 (shadow-sm)。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="row">
    <div class="col-12">
      <h3>📢 最新學生會提案投票開始</h3>
      <p>請全體同學於週五前參與課外活動中心改造公投。</p>
    </div>
    <!-- 請讓下方側邊欄在手機隱藏，lg 以上才顯示 -->
    <div class="col">
      <div class="p-3 bg-light border">
        <h6>歷屆常務幹部名錄</h6>
        <p class="small text-muted mb-0">第 1 屆至第 24 屆幹部完整名冊與會務年報...</p>
      </div>
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="row">
    <div class="col-12 col-lg-8">
      <h3 class="fw-bold text-primary">📢 最新學生會提案投票開始</h3>
      <p>請全體同學於週五前參與課外活動中心改造公投。</p>
    </div>
    <div class="col-lg-4 d-none d-lg-block">
      <div class="p-3 bg-light border rounded shadow-sm">
        <h6>歷屆常務幹部名錄</h6>
        <p class="small text-muted mb-0">第 1 屆至第 24 屆幹部完整名冊與會務年報...</p>
      </div>
    </div>
  </div>
</div>`,
      hints: [
        '右側側邊欄 class 設定為 "col-lg-4 d-none d-lg-block"！',
        '左側主欄設定為 "col-12 col-lg-8"！',
      ],
      rules: [
        {
          description: '側邊欄必須精準包含 d-none 與 d-lg-block',
          test: (html) => html.includes('d-none') && html.includes('d-lg-block'),
        },
        {
          description: '主區塊與側邊欄需符合 col-lg-8 與 col-lg-4 比例',
          test: (html) => html.includes('col-lg-8') && html.includes('col-lg-4'),
        },
        {
          description: '標題必須包含 fw-bold 與 text-primary',
          test: (html) => html.includes('fw-bold') && html.includes('text-primary'),
        },
        {
          description: '側邊欄內部卡片需包含 rounded 與 shadow-sm',
          test: (html) => html.includes('rounded') && html.includes('shadow-sm'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'layout-z-index',
    categoryId: 'layout',
    title: 'Z-index 圖層順序',
    officialName: 'Z-index',
    level: '高階',
    summary: '管理懸浮按鈕、導覽列與提示視窗在 Z 軸（視線前後深度）上的覆蓋層級。',
    teacherDialogue: '你有沒有遇過漂浮在右下角的「回到頂部」按鈕，結果滾動時竟然被後面的圖片蓋過去？這就是 z-index 圖層沒有設定好的緣故！Bootstrap 預設了 z-0 到 z-3 等便利類別，數字越大就在越上層！',
    keyClasses: [
      { name: 'z-0', desc: '一般平面層級 (z-index: 0)' },
      { name: 'z-1', desc: '略微浮起 (z-index: 1)' },
      { name: 'z-2', desc: '中度懸浮 (z-index: 2)' },
      { name: 'z-3', desc: '高懸浮層 (z-index: 3)' },
    ],
    teacherHtml: `<div class="container py-4 position-relative" style="height: 160px;">
  <!-- 底層卡片 -->
  <div class="position-absolute bg-secondary text-white p-3 rounded shadow" style="top: 20px; left: 20px; width: 200px; height: 100px;">
    底層方塊 (預設)
  </div>
  
  <!-- 高層卡片，疊在上面 -->
  <div class="position-absolute z-3 bg-primary text-white p-3 rounded shadow-lg" style="top: 50px; left: 80px; width: 220px;">
    <span class="badge bg-warning text-dark">z-3</span> 懸浮置頂卡片！
  </div>
</div>`,
    studentTask: {
      title: '挑戰：讓線上客服/社長諮詢懸浮按鈕永遠蓋在頂層',
      scenario: '請為右下角的聯絡社團按鈕加上 `z-3`，搭配 `position-absolute bottom-0 end-0` 錨定位置，並具備按鈕外距、陰影與主色！',
      instructions: [
        '步驟 1：外層容器確保具備相對定位 (position-relative)，作為懸浮子元素的定位錨點參考。',
        '步驟 2：懸浮諮詢按鈕套用絕對定位 (position-absolute)，並釘選於右下角座標點 (bottom-0 end-0)。',
        '步驟 3：懸浮按鈕套用最高深度層級 3 (z-3)，保證在任何背景元素滾動時均懸浮於最頂層不被遮蓋。',
        '步驟 4：設定 3 級邊界外距 (m-3) 與標準陰影 (shadow)。',
      ],
      starterHtml: `<div class="container py-4 position-relative">
  <div class="bg-light p-4 rounded border">
    <h4>🎓 大明高中科學研習社</h4>
    <p>歡迎所有對物理、化學、生物與天文有興趣的同學加入我們！每週三放學綜合大樓 302 教室見！</p>
  </div>
  <!-- 請在下方懸浮按鈕加上層級類別確保置頂 -->
  <button class="btn btn-primary">
    💬 線上諮詢社長
  </button>
</div>`,
      solutionHtml: `<div class="container py-4 position-relative">
  <div class="bg-light p-4 rounded border">
    <h4>🎓 大明高中科學研習社</h4>
    <p>歡迎所有對物理、化學、生物與天文有興趣的同學加入我們！每週三放學綜合大樓 302 教室見！</p>
  </div>
  <button class="btn btn-primary z-3 position-absolute bottom-0 end-0 m-3 shadow">
    💬 線上諮詢社長
  </button>
</div>`,
      hints: [
        '在 button 的 class 列表中加入 z-3 position-absolute bottom-0 end-0 m-3 shadow！',
      ],
      rules: [
        {
          description: '外層容器必須包含 position-relative',
          test: (html) => html.includes('position-relative'),
        },
        {
          description: '按鈕必須包含 position-absolute bottom-0 end-0 定位',
          test: (html) =>
            html.includes('position-absolute') &&
            html.includes('bottom-0') &&
            html.includes('end-0'),
        },
        {
          description: '按鈕層級必須精確指定為 z-3',
          test: (html) => html.includes('z-3'),
        },
        {
          description: '按鈕必須設定外距 m-3 與陰影 shadow',
          test: (html) => html.includes('m-3') && html.includes('shadow'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'layout-css-grid',
    categoryId: 'layout',
    title: 'CSS Grid 現代網格',
    officialName: 'CSS Grid',
    level: '高階',
    summary: '除了傳統 Flexbox row 之外，Bootstrap 5 也支援純粹的原生 CSS Grid 系統 (.grid, .g-col-*)。',
    teacherDialogue: '如果想要做像 Pinterest 那樣二維排列的相簿或海報展示牆，CSS Grid 更是超級殺手鐧！在外層使用 .grid，內層使用 .g-col-6 或 .g-col-4，就能輕鬆做出整齊劃一的二維卡片陣列！',
    keyClasses: [
      { name: '.grid', desc: '宣告使用 CSS Grid 容器（啟用 display: grid）' },
      { name: '.g-col-6', desc: 'CSS Grid 中的欄位寬度（佔 12 等分中的 6 等分）' },
      { name: '.g-col-4', desc: 'CSS Grid 中的欄位寬度（佔 12 等分中的 4 等分）' },
      { name: '.gap-3', desc: 'CSS Grid 專用的行列間隙' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="grid gap-3 text-center text-white">
    <div class="g-col-6 p-3 bg-primary rounded">Grid 欄 1 (g-col-6)</div>
    <div class="g-col-6 p-3 bg-primary rounded">Grid 欄 2 (g-col-6)</div>
    <div class="g-col-4 p-3 bg-success rounded">Grid 欄 3 (g-col-4)</div>
    <div class="g-col-4 p-3 bg-success rounded">Grid 欄 4 (g-col-4)</div>
    <div class="g-col-4 p-3 bg-success rounded">Grid 欄 5 (g-col-4)</div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：用 CSS Grid 打造校慶攤位平面圖',
      scenario: '班級要在校慶擺三個攤位，請使用 `.grid` 容器與 `g-col-4` 打造三個並排的攤位方塊，外層指定行列間隙 `gap-3`，內部補上圓角與陰影！',
      instructions: [
        '步驟 1：外層宣告啟用 CSS Grid 現代網格佈局 (grid)，並設定 3 級網格間距 (gap-3)。',
        '步驟 2：內部 3 個攤位方塊皆設定為跨 4 欄比例 (g-col-4)，在 12 等分中達成完美三等分並排。',
        '步驟 3：內部攤位方塊皆加上圓角 (rounded) 與小尺寸陰影 (shadow-sm)。',
        '步驟 4：內容文字維持水平置中 (text-center)。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將此處改為 CSS Grid 容器結構 -->
  <div>
    <!-- 請為每個攤位設定網格跨欄數 -->
    <div class="p-3 bg-light border">
      🥤 乾冰汽水攤
    </div>
    <div class="p-3 bg-light border">
      🌭 美式熱狗堡
    </div>
    <div class="p-3 bg-light border">
      🎯 射氣球挑戰賽
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="grid gap-3">
    <div class="g-col-4 p-3 bg-light border rounded text-center shadow-sm">
      🥤 乾冰汽水攤
    </div>
    <div class="g-col-4 p-3 bg-light border rounded text-center shadow-sm">
      🌭 美式熱狗堡
    </div>
    <div class="g-col-4 p-3 bg-light border rounded text-center shadow-sm">
      🎯 射氣球挑戰賽
    </div>
  </div>
</div>`,
      hints: [
        '外層 class="grid gap-3"，內部三個項目加上 class="g-col-4 p-3 bg-light border rounded text-center shadow-sm"！',
      ],
      rules: [
        {
          description: '外層容器必須包含 grid 與 gap 類別',
          test: (html) => html.includes('grid') && /gap-[234]/.test(html),
        },
        {
          description: '內部攤位必須配置 g-col-4 或 g-col-md-4',
          test: (html) => html.includes('g-col-4') || html.includes('g-col-md-4'),
        },
        {
          description: '攤位必須具備 rounded 圓角與 shadow-sm 陰影',
          test: (html) => html.includes('rounded') && html.includes('shadow-sm'),
        },
        {
          description: '內容需包含 text-center 水平置中',
          test: (html) => html.includes('text-center'),
        },
      ],
      xp: 90,
    },
  },
];
