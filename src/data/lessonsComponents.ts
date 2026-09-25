import { Lesson } from '../types/curriculum';

export const LESSONS_COMPONENTS: Lesson[] = [
  {
    id: 'comp-accordion',
    categoryId: 'components',
    title: 'Accordion 手風琴折疊',
    officialName: 'Accordion',
    level: '中階',
    summary: 'FAQ 常見問答首選！點擊標題即可優雅展開或收合對應內容，節省寶貴的頁面空間。',
    teacherDialogue: '大明高中網站常見問題（比如「如何請假」、「校服購買地點」），如果全部攤開會超長超難滑！Accordion 手風琴元件可以讓同學點擊標題時，內容像手風琴一樣平滑滑出展開！',
    keyClasses: [
      { name: 'accordion', desc: '手風琴外層主容器' },
      { name: 'accordion-item', desc: '單一問答項目' },
      { name: 'accordion-button', desc: '可點選的折疊按鈕' },
      { name: 'accordion-collapse collapse', desc: '折疊收納的內文主體' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 500px;">
  <div class="accordion shadow-sm" id="faqAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne">
          ❓ 社團成發需要購票嗎？
        </button>
      </h2>
      <div id="faqOne" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          全校師生免費入場！請於當天下午 18:00 前至活動中心排隊憑學生證換取入場手環。
        </div>
      </div>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：打造迎新茶會常見問答雙層手風琴',
      scenario: '為迎新活動網頁加入標準 Bootstrap 手風琴，包含至少 2 個問答折疊項目，正確綁定 data-bs-toggle="collapse"、accordion-header、accordion-button、accordion-collapse 與 accordion-body！',
      instructions: [
        '步驟 1：建立手風琴主容器 (accordion)，設定輕量陰影 (shadow-sm) 與指定容器識別碼 (id="welcomeAccordion")。',
        '步驟 2：內部建立至少 2 個手風琴項目單元 (accordion-item)。',
        '步驟 3：標題按鈕設定為手風琴按鈕 (accordion-button)，並宣告折疊切換互動屬性 (data-bs-toggle="collapse")。',
        '步驟 4：問答內文區塊設定為折疊收納容器 (accordion-collapse collapse) 與手風琴主體內距 (accordion-body)。',
        '步驟 5：第一個問答項目的收納容器加入展開狀態 (show)，預設為開啟閱讀。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 500px;">
  <!-- 請將下方結構重構為具備 2 個問答項目的 accordion -->
  <div>
    <div>
      <button>迎新茶會地點在哪裡？</button>
      <p>活動中心 4 樓大禮堂，門口有熱情幹部引導！</p>
    </div>
    <div>
      <button>需要準備任何表演嗎？</button>
      <p>完全不用！只要帶一顆熱情期待的心即可！</p>
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 500px;">
  <div class="accordion shadow-sm" id="welcomeAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#welOne">
          ❓ 迎新茶會地點在哪裡？
        </button>
      </h2>
      <div id="welOne" class="accordion-collapse collapse show" data-bs-parent="#welcomeAccordion">
        <div class="accordion-body">
          活動中心 4 樓大禮堂，門口有熱情幹部引導！
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#welTwo">
          ❓ 需要準備任何表演嗎？
        </button>
      </h2>
      <div id="welTwo" class="accordion-collapse collapse" data-bs-parent="#welcomeAccordion">
        <div class="accordion-body">
          完全不用！只要帶一顆熱情期待的心即可！
        </div>
      </div>
    </div>
  </div>
</div>`,
      hints: [
        '外層使用 class="accordion shadow-sm"，裡面包含兩個 class="accordion-item"！',
        '按鈕必須加上 class="accordion-button" data-bs-toggle="collapse"！',
      ],
      rules: [
        {
          description: '必須包含 accordion 主容器與 shadow-sm 陰影',
          test: (html) => html.includes('accordion') && html.includes('shadow-sm'),
        },
        {
          description: '必須包含至少 2 個 accordion-item 項目',
          test: (html) => (html.match(/accordion-item/g) || []).length >= 2,
        },
        {
          description: '按鈕必須包含 accordion-button 與 data-bs-toggle="collapse"',
          test: (html) =>
            html.includes('accordion-button') &&
            html.includes('data-bs-toggle="collapse"'),
        },
        {
          description: '內文必須包含 accordion-collapse 與 accordion-body',
          test: (html) =>
            html.includes('accordion-collapse') && html.includes('accordion-body'),
        },
        {
          description: '第一項必須包含 show 預設展開',
          test: (html) => html.includes('show'),
        },
      ],
      xp: 90,
    },
  },
  {
    id: 'comp-alerts',
    categoryId: 'components',
    title: 'Alerts 訊息提示框',
    officialName: 'Alerts',
    level: '初階',
    summary: '醒目的彩色通知框！alert-success 成功綠、alert-warning 警告黃、alert-danger 錯誤紅。',
    teacherDialogue: '不管是「恭喜報名成功！」還是「提醒：請假截止時間只剩 2 小時」，Alert 提示框都是最佳選擇！只要寫 class="alert alert-success"，就能立即產出帶有柔和底色、邊框與文字的漂亮提示框。',
    keyClasses: [
      { name: 'alert alert-primary', desc: '主要資訊藍框' },
      { name: 'alert alert-success', desc: '成功/通過綠框' },
      { name: 'alert alert-warning', desc: '警示注意黃框' },
      { name: 'alert alert-danger', desc: '錯誤/警告紅框' },
      { name: 'alert-dismissible', desc: '右側附帶關閉叉叉按鈕' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="alert alert-success d-flex align-items-center mb-2" role="alert">
    🎉 <strong>恭喜！</strong>&nbsp;你已成功錄取高二熱門選修課「Python 實戰與網頁開發」！
  </div>
  <div class="alert alert-warning mb-0" role="alert">
    ⚠️ <strong>注意：</strong> 明日早自習將實施全校防災演練，請勿遲到。
  </div>
</div>`,
    studentTask: {
      title: '挑戰：打造可關閉的模考成績發布互動提示框 (Dismissible Alert)',
      scenario: '請製作一個帶有關閉叉叉按鈕的提示框：包含 `alert alert-info alert-dismissible fade show`，並加入加粗標題與右側關閉按鈕 `<button class="btn-close" data-bs-dismiss="alert">`！',
      instructions: [
        '步驟 1：建立提示框容器 (alert)，指定資訊情境色彩 (alert-info)、可關閉功能 (alert-dismissible)、淡入淡出動畫 (fade show) 與輕陰影 (shadow-sm)。',
        '步驟 2：提示框內使用粗體語意標籤 (strong) 強調「成績公告：」等關鍵主題文字。',
        '步驟 3：加入標準關閉叉叉按鈕 (btn-close)，並正確綁定關閉動作屬性 (data-bs-dismiss="alert")。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將下方文字包裝為可關閉的 alert-dismissible 提示框 -->
  <div>
    📊 114 學年度第一次學測模擬考全校五標已公佈，請登入校務系統查詢成績單。
    <button>X</button>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="alert alert-info alert-dismissible fade show shadow-sm" role="alert">
    📊 <strong>成績公告：</strong> 114 學年度第一次學測模擬考全校五標已公佈，請登入校務系統查詢成績單。
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</div>`,
      hints: [
        '外層加上 class="alert alert-info alert-dismissible fade show shadow-sm"！',
        '關閉按鈕使用 <button type="button" class="btn-close" data-bs-dismiss="alert"></button>！',
      ],
      rules: [
        {
          description: '必須包含 alert 與 alert-dismissible 可關閉類別',
          test: (html) => html.includes('alert') && html.includes('alert-dismissible'),
        },
        {
          description: '必須使用 alert-info 色彩情境',
          test: (html) => html.includes('alert-info'),
        },
        {
          description: '必須包含 fade 與 show 關閉動畫類別',
          test: (html) => html.includes('fade') && html.includes('show'),
        },
        {
          description: '必須包含 btn-close 關閉按鈕與 data-bs-dismiss="alert"',
          test: (html) =>
            html.includes('btn-close') && html.includes('data-bs-dismiss="alert"'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'comp-badge',
    categoryId: 'components',
    title: 'Badge 標籤與未讀徽章',
    officialName: 'Badge',
    level: '初階',
    summary: '緊湊的小徽章！可用於熱門標籤、未讀訊息數量 (如「99+」)、或重要性狀態指示。',
    teacherDialogue: '大家手機 App 上常看到的「未讀通知 3 則」紅色小紅點，就是 Badge！在 Bootstrap 中只要在 span 加上 class="badge bg-danger"，就能瞬間變成小巧精緻的膠囊徽章！配合 rounded-pill 還能做出圓潤膠囊外觀喔！',
    keyClasses: [
      { name: 'badge', desc: '徽章核心類別（自動適應父級字級）' },
      { name: 'bg-primary / danger', desc: '徽章背景顏色' },
      { name: 'rounded-pill', desc: '圓角藥丸造型膠囊徽章' },
    ],
    teacherHtml: `<div class="container py-3">
  <h4 class="mb-3">
    校園論壇熱門話題 <span class="badge bg-danger">HOT 爆</span>
  </h4>
  <button type="button" class="btn btn-primary position-relative">
    📥 社團私訊收件匣
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      9+
    </span>
  </button>
</div>`,
    studentTask: {
      title: '挑戰：打造右上角精準懸浮定位的「未讀訊息」膠囊小紅點徽章',
      scenario: '請製作一個社團收件匣按鈕，右上角帶有「9+」的紅色圓膠囊徽章，並透過 `position-relative`、`position-absolute`、`top-0`、`start-100`、`translate-middle` 達到完美錨定！',
      instructions: [
        '步驟 1：按鈕設定主要主題色彩外觀 (btn-primary)，並宣告相對定位 (position-relative) 作為角標錨點。',
        '步驟 2：未讀數字元素套用絕對定位 (position-absolute)，並指定釘選於右上頂點座標 (top-0 start-100)。',
        '步驟 3：徽章加入中心對齊偏移 (translate-middle)，精確居中跨越於按鈕邊角。',
        '步驟 4：徽章設定為標準標籤樣式 (badge)、圓形藥丸膠囊外觀 (rounded-pill) 與危險紅色背景 (bg-danger)。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將下方按鈕與徽章完成精準懸浮定位 -->
  <div>
    <button>
      📬 社團未讀信箱
      <span>9+</span>
    </button>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <button type="button" class="btn btn-primary position-relative">
    📬 社團未讀信箱
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      9+
    </span>
  </button>
</div>`,
      hints: [
        '按鈕 class="btn btn-primary position-relative"！',
        '徽章 span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"！',
      ],
      rules: [
        {
          description: '按鈕必須包含 position-relative 定位錨點',
          test: (html) => html.includes('position-relative'),
        },
        {
          description: '徽章必須包含 position-absolute 與 translate-middle 定位類別',
          test: (html) =>
            html.includes('position-absolute') && html.includes('translate-middle'),
        },
        {
          description: '徽章必須錨定在 top-0 與 start-100',
          test: (html) => html.includes('top-0') && html.includes('start-100'),
        },
        {
          description: '徽章必須包含 badge、rounded-pill 與 bg-danger',
          test: (html) =>
            html.includes('badge') &&
            html.includes('rounded-pill') &&
            html.includes('bg-danger'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'comp-breadcrumb',
    categoryId: 'components',
    title: 'Breadcrumb 麵包屑導航',
    officialName: 'Breadcrumb',
    level: '初階',
    summary: '告訴使用者「你現在在哪裡」！如：首頁 > 社團專區 > 熱舞社 > 114成發。',
    teacherDialogue: '童話故事中，漢賽爾和葛麗特沿路丟麵包屑來找回家的路，這就是「麵包屑導航（Breadcrumb）」的由來！在大明高中官網中，讓學生清楚知道自己目前身在哪個目錄層級，而且隨時可以點前面的字回到首頁！',
    keyClasses: [
      { name: 'breadcrumb', desc: '麵包屑列表容器' },
      { name: 'breadcrumb-item', desc: '每一層階層路徑' },
      { name: 'active', desc: '當前所在頁面（灰色不可點擊）' },
    ],
    teacherHtml: `<div class="container py-3">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-light p-2 rounded">
      <li class="breadcrumb-item"><a href="#" class="text-decoration-none">🏫 大明高中首頁</a></li>
      <li class="breadcrumb-item"><a href="#" class="text-decoration-none">學務處</a></li>
      <li class="breadcrumb-item"><a href="#" class="text-decoration-none">課外活動組</a></li>
      <li class="breadcrumb-item active" aria-current="page">社團評鑑名單</li>
    </ol>
  </nav>
</div>`,
    studentTask: {
      title: '挑戰：為大明高中程式研習社設計無障礙三層麵包屑導航',
      scenario: '路徑為：大明高中首頁 > 學生社團專區 > 程式研習社（當前 active）。要求使用語意化 `<nav aria-label="breadcrumb">`、背景淺灰圓角、以及無底線連結！',
      instructions: [
        '步驟 1：外層使用無障礙語意導航標籤 (nav)，並標記麵包屑說明屬性 (aria-label="breadcrumb")。',
        '步驟 2：導航清單使用有序列表 (ol)，套用麵包屑清單樣式 (breadcrumb)、淺色背景 (bg-light)、3 級內距 (p-3)、圓角與陰影。',
        '步驟 3：前兩層階層路徑設定為麵包屑項目 (breadcrumb-item)，並移除超連結預設底線 (text-decoration-none)。',
        '步驟 4：最後一層當前所在位置加上當前項目樣式 (breadcrumb-item active)，並註明無障礙屬性 (aria-current="page")。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將下方重構為高規格無障礙麵包屑導航 -->
  <nav>
    <ol>
      <li><a href="#">大明高中首頁</a></li>
      <li><a href="#">學生社團專區</a></li>
      <li>程式研習社</li>
    </ol>
  </nav>
</div>`,
      solutionHtml: `<div class="container py-3">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-light p-3 rounded shadow-sm">
      <li class="breadcrumb-item"><a href="#" class="text-decoration-none">大明高中首頁</a></li>
      <li class="breadcrumb-item"><a href="#" class="text-decoration-none">學生社團專區</a></li>
      <li class="breadcrumb-item active" aria-current="page">程式研習社</li>
    </ol>
  </nav>
</div>`,
      hints: [
        'ol 加上 class="breadcrumb bg-light p-3 rounded shadow-sm"！',
        '每個 li 加上 class="breadcrumb-item"，最後一個加上 active aria-current="page"！',
      ],
      rules: [
        {
          description: 'nav 必須包含 aria-label="breadcrumb"',
          test: (html) => html.includes('aria-label="breadcrumb"'),
        },
        {
          description: 'ol 必須包含 breadcrumb 與 rounded 類別',
          test: (html) => html.includes('breadcrumb') && html.includes('rounded'),
        },
        {
          description: '必須包含至少 3 個 breadcrumb-item',
          test: (html) => (html.match(/breadcrumb-item/g) || []).length >= 3,
        },
        {
          description: '最後一項必須包含 active 與 aria-current="page"',
          test: (html) => html.includes('active') && html.includes('aria-current="page"'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'comp-buttons',
    categoryId: 'components',
    title: 'Buttons 按鈕百變樣式',
    officialName: 'Buttons',
    level: '初階',
    summary: '網頁靈魂！btn-primary 藍、btn-outline 外框透明、btn-lg 大按鈕、rounded-pill 圓角按鈕。',
    teacherDialogue: '點擊按鈕是網頁最核心的轉換動作！原生 `<button>` 又灰又呆板，但在 Bootstrap 中，只要加上 btn 和 btn-primary，立刻擁有細膩陰影與滑鼠懸停回饋。想要時髦的空心按鈕？改用 btn-outline-primary！想要像手機 App 一樣的膠囊圓鈕？加上 rounded-pill！',
    keyClasses: [
      { name: 'btn btn-primary', desc: '主動作按鈕（藍色實心）' },
      { name: 'btn-outline-secondary', desc: '次要外框透明按鈕' },
      { name: 'btn-lg / btn-sm', desc: '大尺寸或小尺寸按鈕' },
      { name: 'rounded-pill', desc: '兩端完全圓弧的膠囊造型按鈕' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="d-flex flex-wrap gap-2">
    <button class="btn btn-primary">Primary 報名</button>
    <button class="btn btn-outline-success">Outline 綠外框</button>
    <button class="btn btn-warning text-dark">Warning 警示</button>
    <button class="btn btn-danger rounded-pill px-4">圓膠囊按鈕</button>
    <button class="btn btn-info btn-lg">加大按鈕 btn-lg</button>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為運動會設計「立即報名 (膠囊大按鈕)」與「規章 (外框按鈕)」組合',
      scenario: '請使用 `d-flex gap-3` 排列兩個按鈕：主按鈕為 `btn btn-primary btn-lg rounded-pill shadow-sm`，次按鈕為 `btn btn-outline-secondary btn-lg rounded-pill`！',
      instructions: [
        '步驟 1：外層容器設定為彈性盒模型 (d-flex)，允許自動折行 (flex-wrap) 並設定 3 級元素間隔 (gap-3)。',
        '步驟 2：主行動報名按鈕套用主題主要色 (btn-primary)、大尺寸 (btn-lg)、膠囊圓角 (rounded-pill) 與輕陰影 (shadow-sm)。',
        '步驟 3：次要規程按鈕套用次要色彩輪廓型外觀 (btn-outline-secondary)、大尺寸 (btn-lg) 與膠囊圓角 (rounded-pill)。',
      ],
      starterHtml: `<div class="container py-3">
  <div>
    <button>🏃‍♂️ 立即報名大隊接力</button>
    <button>📄 查看競賽規程</button>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="d-flex flex-wrap gap-3">
    <button class="btn btn-primary btn-lg rounded-pill shadow-sm fw-bold">🏃‍♂️ 立即報名大隊接力</button>
    <button class="btn btn-outline-secondary btn-lg rounded-pill">📄 查看競賽規程</button>
  </div>
</div>`,
      hints: [
        '為外層加上 class="d-flex flex-wrap gap-3"！',
        '主按鈕加上 class="btn btn-primary btn-lg rounded-pill shadow-sm"，次按鈕加上 class="btn btn-outline-secondary btn-lg rounded-pill"！',
      ],
      rules: [
        {
          description: '主按鈕必須包含 btn-primary 與 btn-lg',
          test: (html) => html.includes('btn-primary') && html.includes('btn-lg'),
        },
        {
          description: '主按鈕必須套用 rounded-pill 膠囊圓角與 shadow-sm',
          test: (html) => html.includes('rounded-pill') && html.includes('shadow-sm'),
        },
        {
          description: '次按鈕必須包含 btn-outline-secondary 類別',
          test: (html) => html.includes('btn-outline-secondary'),
        },
        {
          description: '容器必須使用 d-flex 與 gap 間距排列',
          test: (html) => html.includes('d-flex') && /gap-[234]/.test(html),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'comp-button-group',
    categoryId: 'components',
    title: 'Button group 整合式按鈕群組',
    officialName: 'Button group',
    level: '初階',
    summary: '將多個按鈕無縫黏合為一體！如分頁切換「日 / 週 / 月」或社團分類篩選器。',
    teacherDialogue: '當你有連續幾個相關選項（例如「高一 / 高二 / 高三」），如果分開排會很散。用 btn-group 可以把這幾個按鈕左右無縫吸附在一起，中間共用邊界，外圍保留圓角，看起來像高科技遙控器一樣整齊！',
    keyClasses: [
      { name: 'btn-group', desc: '水平按鈕群組容器' },
      { name: 'btn-group-vertical', desc: '垂直排列的按鈕群組' },
      { name: 'btn-group-lg / sm', desc: '整體群組尺寸控制' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <p class="text-muted small mb-2">年級切換按鈕群組：</p>
  <div class="btn-group shadow-sm" role="group">
    <button type="button" class="btn btn-primary active">高一新生</button>
    <button type="button" class="btn btn-outline-primary">高二幹部</button>
    <button type="button" class="btn btn-outline-primary">高三學長姐</button>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：製作社團文章檢視切換器 (全部 / 影音 / 文章)',
      scenario: '請使用 `<div class="btn-group shadow-sm" role="group">` 將 3 個按鈕無縫整合成群組，第一項設為當前啟用 `active`！',
      instructions: [
        '步驟 1：外層建立按鈕群組容器 (btn-group)，設定輕量陰影 (shadow-sm) 與群組語意角色 (role="group")。',
        '步驟 2：內部 3 個切換按鈕均套用主題主要色外框樣式 (btn-outline-primary)，無縫拼接為一體。',
        '步驟 3：第一個切換按鈕加上選中啟用狀態 (active)，表示當前預設選取分類。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <!-- 請將下方三個按鈕包裝進 btn-group -->
  <div>
    <button>全部</button>
    <button>影音精華</button>
    <button>活動回顧</button>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <div class="btn-group shadow-sm" role="group">
    <button type="button" class="btn btn-outline-primary active">全部</button>
    <button type="button" class="btn btn-outline-primary">影音精華</button>
    <button type="button" class="btn btn-outline-primary">活動回顧</button>
  </div>
</div>`,
      hints: [
        '外層使用 <div class="btn-group shadow-sm" role="group">！',
        '三個按鈕皆套用 class="btn btn-outline-primary"，第一個額外加上 active！',
      ],
      rules: [
        {
          description: '外層必須包含 btn-group 類別與 shadow-sm',
          test: (html) => html.includes('btn-group') && html.includes('shadow-sm'),
        },
        {
          description: '必須設定 role="group" 語意無障礙屬性',
          test: (html) => html.includes('role="group"'),
        },
        {
          description: '按鈕必須套用 btn-outline-primary 樣式',
          test: (html) => html.includes('btn-outline-primary'),
        },
        {
          description: '第一項按鈕必須包含 active 選中類別',
          test: (html) => html.includes('active'),
        },
      ],
      xp: 80,
    },
  },
  {
    id: 'comp-card',
    categoryId: 'components',
    title: 'Card 萬能卡片元件',
    officialName: 'Card',
    level: '初階',
    summary: '網頁最受歡迎的元件！整合頂部封面圖 card-img-top、card-body、card-title 與 card-text。',
    teacherDialogue: '如果你去逛 Instagram、Dcard 或是電商網站，幾乎所有內容都是一張一張的「卡片」！在 Bootstrap 裡，Card 元件有乾淨的白底、柔和邊框和圓角。只要在 card 裡面放 card-img-top 和 card-body，一張專業的幹部介紹或商品卡片就完成了！',
    keyClasses: [
      { name: 'card', desc: '卡片主容器' },
      { name: 'card-img-top', desc: '卡片頂部貼頂圖片' },
      { name: 'card-body', desc: '卡片內距內容包裹區' },
      { name: 'card-title', desc: '卡片標題' },
      { name: 'card-text', desc: '卡片描述內文' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 320px;">
  <div class="card shadow-sm border-0">
    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400" 
         class="card-img-top" alt="木吉他">
    <div class="card-body">
      <span class="badge bg-primary mb-2">社團之星</span>
      <h5 class="card-title fw-bold">熱音社木吉他組</h5>
      <p class="card-text text-muted small">
        從零基礎彈奏流行和弦，到創作屬於自己的第一首自創曲！
      </p>
      <a href="#" class="btn btn-primary w-100">查看課程大綱</a>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為大明高中模範生設計一張高質感表揚卡片',
      scenario: '請製作包含頂部封面照片 `card-img-top`、`card-body`、`card-title fw-bold text-primary`、`card-text` 以及底部按鈕的完整模範生卡片！',
      instructions: [
        '步驟 1：外層建立卡片容器 (card)，去除外框邊線 (border-0)，設定立體外陰影 (shadow) 與溢出裁切隱藏 (overflow-hidden)。',
        '步驟 2：頂部模範生照片設定為卡片貼頂相片 (card-img-top)。',
        '步驟 3：照片下方文字內容包裹於標準卡片主體 (card-body)。',
        '步驟 4：標題設定為卡片標題 (card-title)，套用粗體字重 (fw-bold) 與主要品牌色 (text-primary)。',
        '步驟 5：事蹟描述設定為卡片內文 (card-text) 並套用淡化次要色彩 (text-muted)。',
        '步驟 6：底部置入主要色彩 (btn-primary) 且滿版 (w-100) 的加粗祝賀按鈕。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 340px;">
  <!-- 請完成標準 Card 結構，包含 card-img-top, card-body, card-title 與 card-text -->
  <div>
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" alt="模範生照片">
    <div>
      <h5>🌟 114 學年度全校模範生</h5>
      <p>高二 5 班 王小明同學，熱心班級公共事務、榮獲全中運跳高金牌！</p>
      <button>送出祝賀</button>
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 340px;">
  <div class="card shadow border-0 overflow-hidden">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" 
         class="card-img-top" alt="模範生照片">
    <div class="card-body">
      <h5 class="card-title fw-bold text-primary">🌟 114 學年度全校模範生</h5>
      <p class="card-text text-muted">高二 5 班 王小明同學，熱心班級公共事務、榮獲全中運跳高金牌！</p>
      <button class="btn btn-primary w-100 fw-bold">送出祝賀</button>
    </div>
  </div>
</div>`,
      hints: [
        '外層使用 class="card shadow border-0 overflow-hidden"！',
        '圖片加上 class="card-img-top"，內容包在 class="card-body"，標題加 class="card-title fw-bold text-primary"！',
      ],
      rules: [
        {
          description: '外層容器必須包含 card 與 shadow 類別',
          test: (html) => html.includes('card') && html.includes('shadow'),
        },
        {
          description: '圖片必須包含 card-img-top 類別',
          test: (html) => html.includes('card-img-top'),
        },
        {
          description: '內容必須包裹於 card-body',
          test: (html) => html.includes('card-body'),
        },
        {
          description: '標題必須包含 card-title 與 fw-bold',
          test: (html) => html.includes('card-title') && html.includes('fw-bold'),
        },
        {
          description: '描述必須包含 card-text',
          test: (html) => html.includes('card-text'),
        },
        {
          description: '底部必須包含按鈕 btn-primary',
          test: (html) => html.includes('btn-primary'),
        },
      ],
      xp: 90,
    },
  },
  {
    id: 'comp-carousel',
    categoryId: 'components',
    title: 'Carousel 輪播投影片',
    officialName: 'Carousel',
    level: '中階',
    summary: '大明高中首頁必備！多張精選照片自動左右滑動切換，支援下方小圓點指示器與左右切換箭頭。',
    teacherDialogue: '在大明高中的首頁最上方，一定都有一塊大輪播圖（Carousel），放校慶宣傳、得獎捷報和美麗校園風景！Bootstrap 內建了完整的輪播 JavaScript，只要加上 data-bs-ride="carousel"，照片就會像幻燈片一樣自動流暢翻頁！',
    keyClasses: [
      { name: 'carousel slide', desc: '輪播容器與滑動平移動畫' },
      { name: 'carousel-inner', desc: '所有幻燈片的包裹容器' },
      { name: 'carousel-item active', desc: '單一投影片（active 代表當前第一張顯示）' },
      { name: 'carousel-control-prev / next', desc: '左右切換箭頭' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 600px;">
  <div id="schoolCarousel" class="carousel slide rounded overflow-hidden shadow" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600" class="d-block w-100" style="height: 220px; object-fit: cover;" alt="畢業典禮">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-1">
          <h6>🎓 2026 大明高中 畢典盛會</h6>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600" class="d-block w-100" style="height: 220px; object-fit: cover;" alt="校園綠地">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-1">
          <h6>🌳 春季綠色校園漫步</h6>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#schoolCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#schoolCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為校慶成果展搭建輪播基礎架構',
      scenario: '請建立包含 `carousel`、`carousel-inner` 與帶有 `active` 的 `carousel-item`！',
      instructions: [
        '步驟 1：外層建立輪播主容器 (carousel slide)，設定自動循環輪播屬性 (data-bs-ride="carousel") 與專屬識別碼。',
        '步驟 2：內部建立幻燈片包裹區塊 (carousel-inner) 與圓角邊界。',
        '步驟 3：建立至少 2 個投影片項目 (carousel-item)，並在第一張加入作用中啟用狀態 (active)。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請建立 carousel 基礎結構 -->
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 500px;">
  <div id="demoCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner rounded">
      <div class="carousel-item active">
        <div class="p-5 bg-primary text-white text-center">
          <h3>第 1 張輪播投影片</h3>
        </div>
      </div>
      <div class="carousel-item">
        <div class="p-5 bg-success text-white text-center">
          <h3>第 2 張輪播投影片</h3>
        </div>
      </div>
    </div>
  </div>
</div>`,
      hints: ['外層包 <div class="carousel slide">，裡面包 <div class="carousel-inner">，再包 <div class="carousel-item active">！'],
      rules: [
        {
          description: '必須包含 carousel 類別',
          test: (html) => html.includes('carousel'),
        },
        {
          description: '必須包含 carousel-inner 類別',
          test: (html) => html.includes('carousel-inner'),
        },
        {
          description: '必須包含 carousel-item 與 active',
          test: (html) => html.includes('carousel-item') && html.includes('active'),
        },
      ],
      xp: 70,
    },
  },
  {
    id: 'comp-close-button',
    categoryId: 'components',
    title: 'Close button 關閉按鈕',
    officialName: 'Close button',
    level: '初階',
    summary: '通用的小叉叉 (X)！btn-close 自動支援無障礙標籤，可用於彈窗、抽屜與提示框關閉。',
    teacherDialogue: '彈窗右上角那個灰灰的「X」關閉按鈕，不要再用鍵盤打大寫英文字母「X」啦！Bootstrap 提供了專門的 class="btn-close"，它是高解析向量 SVG 圖示，還自帶點擊 hover 深色回饋與無障礙 aria-label 支援！',
    keyClasses: [
      { name: 'btn-close', desc: '關閉叉叉按鈕' },
      { name: 'btn-close-white', desc: '深色背景專用的白色叉叉按鈕' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="p-3 bg-light border rounded d-flex justify-content-between align-items-center">
    <span>💡 點選右邊的標準叉叉關閉本提示：</span>
    <button type="button" class="btn-close" aria-label="Close"></button>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為自訂公告浮層加入標準 btn-close',
      scenario: '請在卡片右上角加入 `<button type="button" class="btn-close" aria-label="Close"></button>`！',
      instructions: [
        '步驟 1：在公告卡片右側建立專用的無障礙關閉叉叉按鈕 (btn-close)。',
        '步驟 2：宣告按鈕型態 (type="button") 並補齊無障礙關閉語意標籤 (aria-label="Close")。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="card p-3 d-flex flex-row justify-content-between">
    <span>📢 廣播：今日放學社團聯席幹部會議暫停一次！</span>
    <!-- 請在此處加入 btn-close -->
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="card p-3 d-flex flex-row justify-content-between align-items-center">
    <span>📢 廣播：今日放學社團聯席幹部會議暫停一次！</span>
    <button type="button" class="btn-close" aria-label="Close"></button>
  </div>
</div>`,
      hints: ['加入 <button type="button" class="btn-close" aria-label="Close"></button>！'],
      rules: [
        {
          description: '必須包含 btn-close 類別',
          test: (html) => html.includes('btn-close'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'comp-collapse',
    categoryId: 'components',
    title: 'Collapse 折疊收合',
    officialName: 'Collapse',
    level: '中階',
    summary: '點擊按鈕展開/收攏隱藏區塊！無需撰寫任何 JS，透過 data-bs-toggle="collapse" 即可實現。',
    teacherDialogue: '如果你想要在點擊「查看更多詳細說明」時，下方平滑展開一段隱藏文字，用 Collapse 就對了！它完全不需要寫半行 JavaScript，只要在按鈕設定 data-bs-toggle="collapse" 與 data-bs-target="#目標ID"，Bootstrap 就會自動處理高度動畫！',
    keyClasses: [
      { name: 'data-bs-toggle="collapse"', desc: '按鈕觸發開關' },
      { name: 'data-bs-target="#id"', desc: '指定要收合展開的目標元素' },
      { name: 'collapse', desc: '預設隱藏收合的內容本體' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#secretDetails">
    👇 點擊展開：熱舞社甄選評分標準
  </button>
  <div class="collapse mt-3" id="secretDetails">
    <div class="card card-body text-start">
      <strong>評分三大項目：</strong><br>
      1. 節奏律動感 (40%)<br>
      2. 肢體協調與展現力 (30%)<br>
      3. 個人熱情與自信笑容 (30%)
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：製作「班服設計票選名冊」展開按鈕',
      scenario: '請製作一個按鈕，點擊後能展開包含 `collapse` 類別的隱藏班服細節說明卡片！',
      instructions: [
        '步驟 1：按鈕設定折疊切換觸發屬性 (data-bs-toggle="collapse")，並指向目標識別碼 (data-bs-target="#shirtDetail")。',
        '步驟 2：收納內容外層設定折疊收合類別 (collapse)，並賦予對應的唯一識別碼 (id="shirtDetail")。',
        '步驟 3：內部容器設定 3 級內距 (p-3)、淺灰背景 (bg-light)、外框與圓角，提供舒適的閱讀襯底。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請設定按鈕的 data-bs-toggle 與 data-bs-target -->
  <button class="btn btn-outline-primary">
    👕 查看班服材質規格
  </button>
  <!-- 請設定收合區塊的 class 與 id -->
  <div>
    <div class="p-3 bg-light border mt-2">
      100% 頂級精梳純棉，吸汗透氣，適合校慶大隊接力運動穿著！
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#shirtDetail">
    👕 查看班服材質規格
  </button>
  <div class="collapse mt-2" id="shirtDetail">
    <div class="p-3 bg-light border rounded">
      100% 頂級精梳純棉，吸汗透氣，適合校慶大隊接力運動穿著！
    </div>
  </div>
</div>`,
      hints: ['按鈕加上 data-bs-toggle="collapse" data-bs-target="#shirtDetail"，下方的 div 加上 class="collapse" id="shirtDetail"！'],
      rules: [
        {
          description: '必須包含 data-bs-toggle="collapse"',
          test: (html) => html.includes('data-bs-toggle="collapse"'),
        },
        {
          description: '必須包含 collapse 類別',
          test: (html) => html.includes('collapse'),
        },
      ],
      xp: 60,
    },
  },
  {
    id: 'comp-dropdowns',
    categoryId: 'components',
    title: 'Dropdowns 下拉功能選單',
    officialName: 'Dropdowns',
    level: '中階',
    summary: '點擊按鈕彈出選單！支援下拉 dropdown、上拉 dropup、分割按鈕與分界線 dropdown-divider。',
    teacherDialogue: '右上角點頭像會彈出「個人資料 / 修改密碼 / 登出」的選單，這就是 Dropdowns 下拉選單！在按鈕加上 data-bs-toggle="dropdown"，下方配一個 ul.dropdown-menu，Bootstrap 就會自動計算彈出位置，點旁邊空白處還會自動收合！',
    keyClasses: [
      { name: 'dropdown', desc: '下拉選單包裹外層' },
      { name: 'dropdown-toggle', desc: '自帶向下小箭頭圖示的觸發按鈕' },
      { name: 'dropdown-menu', desc: '彈出的選單清單' },
      { name: 'dropdown-item', desc: '單一選單項目' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
      👤 學生個人中心
    </button>
    <ul class="dropdown-menu shadow">
      <li><a class="dropdown-item" href="#">📋 查看選課紀錄</a></li>
      <li><a class="dropdown-item" href="#">🏆 社團經歷認證</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item text-danger" href="#">🚪 登出校園 Portal</a></li>
    </ul>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：製作「下載格式」下拉按鈕選單 (PDF / Word / Excel)',
      scenario: '請使用 `dropdown`、`dropdown-toggle` 與 `dropdown-menu` 製作一個檔案下載選單！',
      instructions: [
        '步驟 1：外層建立下拉選單定位容器 (dropdown)。',
        '步驟 2：觸發按鈕套用下拉開關樣式 (dropdown-toggle)，並宣告下拉切換行為 (data-bs-toggle="dropdown")。',
        '步驟 3：選單列表使用無序列表 (ul)，套用下拉功能表樣式 (dropdown-menu)。',
        '步驟 4：各匯出格式選項使用標準選單項目連結 (dropdown-item)。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <!-- 請在此建立下拉選單結構 -->
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <div class="dropdown">
    <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
      📥 匯出社團成果報表
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">匯出為 PDF 檔案</a></li>
      <li><a class="dropdown-item" href="#">匯出為 Word 文件</a></li>
      <li><a class="dropdown-item" href="#">匯出為 Excel 試算表</a></li>
    </ul>
  </div>
</div>`,
      hints: ['外層 class="dropdown"，按鈕加 class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"，後面接 <ul class="dropdown-menu">！'],
      rules: [
        {
          description: '必須包含 dropdown 類別',
          test: (html) => html.includes('dropdown'),
        },
        {
          description: '必須包含 dropdown-toggle 類別',
          test: (html) => html.includes('dropdown-toggle'),
        },
        {
          description: '必須包含 dropdown-menu 類別',
          test: (html) => html.includes('dropdown-menu'),
        },
      ],
      xp: 60,
    },
  },
  {
    id: 'comp-list-group',
    categoryId: 'components',
    title: 'List group 列表群組',
    officialName: 'List group',
    level: '初階',
    summary: '優雅條列式排版！list-group-item 支援 active 選中、disabled 禁用、與右側徽章數字。',
    teacherDialogue: '做待辦清單、今日作業清單或幹部成員名單時，原生 `<ul>` 的小黑點很不好看。用 list-group 可以讓每一列都擁有圓角、底線和點擊回饋，再搭配 d-flex 與 badge，就能把完成狀況整齊排列在最右側！',
    keyClasses: [
      { name: 'list-group', desc: '列表容器' },
      { name: 'list-group-item', desc: '單一條列項目' },
      { name: 'active', desc: '高亮反藍選取項目' },
      { name: 'list-group-flush', desc: '去除外圍邊框，專門嵌入卡片中' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 420px;">
  <ul class="list-group shadow-sm">
    <li class="list-group-item active d-flex justify-content-between align-items-center">
      📌 今日必交大明高中作業清單
      <span class="badge bg-light text-primary rounded-pill">3項</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      數學課本習題 Ch3
      <span class="badge bg-danger rounded-pill">今日截止</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      英文單字例句 20 題
      <span class="badge bg-secondary rounded-pill">已繳交</span>
    </li>
  </ul>
</div>`,
    studentTask: {
      title: '挑戰：為校慶大隊接力棒次製作 list-group 隊名錄',
      scenario: '請建立包含 `list-group` 與 4 個 `list-group-item` 的棒次名單，第一棒設為 `active`！',
      instructions: [
        '步驟 1：建立列表群組主容器 (list-group)。',
        '步驟 2：內部依序置入 4 個條列清單項目 (list-group-item)。',
        '步驟 3：將第 1 棒項目設定為高亮作用中狀態 (active)。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在此建立接力棒次 list-group -->
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 400px;">
  <ul class="list-group">
    <li class="list-group-item active">第 1 棒：起跑先鋒 林同學</li>
    <li class="list-group-item">第 2 棒：直線加速 王同學</li>
    <li class="list-group-item">第 3 棒：彎道高手 張同學</li>
    <li class="list-group-item">第 4 棒：壓軸衝刺 陳同學</li>
  </ul>
</div>`,
      hints: ['使用 <ul class="list-group">，裡面放 <li class="list-group-item active"> 與其他項目！'],
      rules: [
        {
          description: '必須包含 list-group 類別',
          test: (html) => html.includes('list-group'),
        },
        {
          description: '必須包含 list-group-item 類別',
          test: (html) => html.includes('list-group-item'),
        },
        {
          description: '第一項必須包含 active 類別',
          test: (html) => html.includes('active'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'comp-modal',
    categoryId: 'components',
    title: 'Modal 彈跳對話框',
    officialName: 'Modal',
    level: '高階',
    summary: '點擊彈出遮罩對話視窗！包含 modal-header 標題列、modal-body 內文與 modal-footer 按鈕群。',
    teacherDialogue: '需要同學確認「確定要送出退社申請嗎？」或「點擊查看志工招募簡章」時，Modal 彈窗是最具沉浸感的設計！背後會自動遮上一層半透明黑幕（backdrop），並帶有平滑淡入滑落的動畫！',
    keyClasses: [
      { name: 'modal fade', desc: '彈窗外層與淡入淡出動畫' },
      { name: 'modal-dialog modal-dialog-centered', desc: '對話框主體與垂直置中' },
      { name: 'modal-content', desc: '包含 header, body, footer 的白色卡片' },
      { name: 'data-bs-toggle="modal"', desc: '按鈕觸發開啟彈窗' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <!-- 觸發按鈕 -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#examModal">
    🚀 點我開啟模考確認彈窗 (Modal)
  </button>

  <!-- Modal 本體 -->
  <div class="modal fade" id="examModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold">🎓 學測倒數破百誓師確認</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-start">
          距離 115 年學科能力測驗僅剩 120 天！你準備好今日的複習進度了嗎？保持節奏，頂尖志願就在眼前！
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">再想想</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">立刻全力衝刺！</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為校慶摸彩製作「領獎確認 Modal 彈窗」',
      scenario: '請製作一個按鈕，點擊後會彈出帶有 `modal`、`modal-dialog` 與 `modal-content` 的領獎視窗！',
      instructions: [
        '步驟 1：按鈕設定開啟對話框屬性 (data-bs-toggle="modal") 與目標指向 (data-bs-target="#prizeModal")。',
        '步驟 2：彈窗外層宣告對話框元件 (modal fade)，並匹配對應的識別碼 (id="prizeModal")。',
        '步驟 3：彈窗內部依序嵌套對話框位置控制 (modal-dialog) 與白色卡片主體 (modal-content)。',
        '步驟 4：主體內建立標題列 (modal-header) 附帶關閉按鈕 (btn-close)、內容區 (modal-body) 與確認按鈕列 (modal-footer)。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <button class="btn btn-success">🎁 點此兌換校慶特獎</button>
  <!-- 請在此建立完整的 Modal 結構 -->
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#prizeModal">
    🎁 點此兌換校慶特獎
  </button>

  <div class="modal fade" id="prizeModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">🎉 恭喜中獎！</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          請於校慶當天下午 16:00 前攜帶學生證至學務處領取拍立得相機乙台！
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">我知道了</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
      hints: ['按鈕加上 data-bs-toggle="modal" data-bs-target="#prizeModal"，彈窗容器設定 id="prizeModal" class="modal fade"！'],
      rules: [
        {
          description: '必須包含 data-bs-toggle="modal"',
          test: (html) => html.includes('data-bs-toggle="modal"'),
        },
        {
          description: '必須包含 modal 類別',
          test: (html) => html.includes('modal ') || html.includes('modal"'),
        },
        {
          description: '必須包含 modal-dialog 類別',
          test: (html) => html.includes('modal-dialog'),
        },
      ],
      xp: 75,
    },
  },
  {
    id: 'comp-navbar',
    categoryId: 'components',
    title: 'Navbar 響應式導覽列',
    officialName: 'Navbar',
    level: '高階',
    summary: '網站門面天花板！電腦版橫向整齊連結，手機版自動縮成三條線漢堡選單 (hamburger)。',
    teacherDialogue: '每個完整網站頂部都有 Navbar！最神奇的是：在電腦寬螢幕時，Logo 在左邊，所有選單橫向展開；但一到了手機直向窄螢幕，選單會自動縮成右上角的三條線漢堡按鈕，點擊後平滑向下滑出，這是所有前端工程師必備的絕技！',
    keyClasses: [
      { name: 'navbar navbar-expand-lg', desc: '導覽列在 lg (992px) 以上橫向展開，小螢幕自動折疊' },
      { name: 'navbar-brand', desc: '左側 Logo 校名或社域名稱' },
      { name: 'navbar-toggler', desc: '手機版漢堡選單切換開關' },
      { name: 'collapse navbar-collapse', desc: '可折疊的導覽清單本體' },
    ],
    teacherHtml: `<div class="container-fluid p-0">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 rounded shadow">
    <a class="navbar-brand fw-bold text-info" href="#">🏫 大明高中</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#schoolNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="schoolNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">首頁公告</a></li>
        <li class="nav-item"><a class="nav-link" href="#">社團博覽會</a></li>
        <li class="nav-item"><a class="nav-link" href="#">校園行事曆</a></li>
      </ul>
      <button class="btn btn-outline-info btn-sm">學生登入</button>
    </div>
  </nav>
</div>`,
    studentTask: {
      title: '挑戰：為「大明高中資訊研究社」打造專屬 Navbar 導覽列',
      scenario: '請建立包含 `navbar`、`navbar-expand-lg`、`navbar-brand` 與 `navbar-nav` 的頂部導覽列！',
      instructions: [
        '步驟 1：外層導航標籤設定為響應式導覽列 (navbar navbar-expand-lg)，套用淺色主題 (navbar-light bg-light) 與內距。',
        '步驟 2：品牌 Logo 設定為導覽列商標樣式 (navbar-brand)，套用粗體字重 (fw-bold) 與主題色彩。',
        '步驟 3：連結清單外層包裹折疊容器 (collapse navbar-collapse)，清單標籤套用導覽列清單樣式 (navbar-nav)。',
        '步驟 4：各分頁項目設定為導覽項目 (nav-item)，超連結設定為導覽連結 (nav-link)。',
      ],
      starterHtml: `<div class="container py-2">
  <!-- 請將下方結構包裝為 Navbar -->
  <nav>
    <a href="#">💻 資研社</a>
    <div>
      <ul>
        <li><a href="#">活動營隊</a></li>
        <li><a href="#">競賽培訓</a></li>
      </ul>
    </div>
  </nav>
</div>`,
      solutionHtml: `<div class="container-fluid p-0">
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 rounded">
    <a class="navbar-brand fw-bold text-primary" href="#">💻 資研社</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link active" href="#">活動營隊</a></li>
        <li class="nav-item"><a class="nav-link" href="#">競賽培訓</a></li>
      </ul>
    </div>
  </nav>
</div>`,
      hints: ['為 <nav> 加上 class="navbar navbar-expand-lg navbar-light bg-light"，Logo 加 class="navbar-brand"，清單加 class="navbar-nav"！'],
      rules: [
        {
          description: '必須包含 navbar 類別',
          test: (html) => html.includes('navbar'),
        },
        {
          description: '必須包含 navbar-brand 類別',
          test: (html) => html.includes('navbar-brand'),
        },
        {
          description: '必須包含 navbar-nav 類別',
          test: (html) => html.includes('navbar-nav'),
        },
      ],
      xp: 75,
    },
  },
  {
    id: 'comp-navs-tabs',
    categoryId: 'components',
    title: 'Navs & tabs 分頁切換籤',
    officialName: 'Navs & tabs',
    level: '中階',
    summary: '在同一個卡片內無刷新切換多個主題！nav-tabs 分頁標籤與 tab-pane 內容面板。',
    teacherDialogue: '想像在個人檔案頁面，想看「個人簡介」、「歷年幹部經歷」和「榮譽得獎紀錄」，如果都寫在一起很雜亂。使用 nav-tabs，點到哪個分頁籤，底下內容就秒速切換到對應資訊，乾淨又俐落！',
    keyClasses: [
      { name: 'nav nav-tabs', desc: '分頁標籤外觀風格' },
      { name: 'nav-pills', desc: '膠囊按鈕風格的分頁切換' },
      { name: 'data-bs-toggle="tab"', desc: '啟用分頁切換互動邏輯' },
      { name: 'tab-content tab-pane', desc: '切換時對應顯示的內容區塊' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 500px;">
  <!-- 分頁導航列 -->
  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
    <li class="nav-item">
      <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-about">🙋 自我介紹</button>
    </li>
    <li class="nav-item">
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-club">🎸 社團幹部</button>
    </li>
  </ul>
  <!-- 分頁內容 -->
  <div class="tab-content p-3 bg-light rounded border">
    <div class="tab-pane fade show active" id="tab-about">
      我是高二 2 班的陳同學，興趣是吉他自彈自唱與網頁程式設計！
    </div>
    <div class="tab-pane fade" id="tab-club">
      現任吉他社副社長、校慶總召組活動部幹事。
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為社團成發節目表打造「上半場 / 下半場」切換分頁',
      scenario: '請使用 `nav nav-tabs` 與 `nav-link` 製作上半場與下半場的切換籤！',
      instructions: [
        '步驟 1：外層列表容器套用導航分頁籤樣式 (nav nav-tabs)。',
        '步驟 2：每個標籤項目設定為導航單元 (nav-item)。',
        '步驟 3：各切換按鈕套用導航連結樣式 (nav-link)，並在第一項加入選中狀態 (active)。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將下方 ul 改造為 nav nav-tabs -->
  <ul>
    <li><button>上半場演出 (18:30)</button></li>
    <li><button>下半場演出 (20:00)</button></li>
  </ul>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 480px;">
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <button class="nav-link active">上半場演出 (18:30)</button>
    </li>
    <li class="nav-item">
      <button class="nav-link">下半場演出 (20:00)</button>
    </li>
  </ul>
</div>`,
      hints: ['為 <ul> 加上 class="nav nav-tabs"，按鈕加上 class="nav-link active"！'],
      rules: [
        {
          description: '必須包含 nav nav-tabs',
          test: (html) => html.includes('nav-tabs'),
        },
        {
          description: '必須包含 nav-link 類別',
          test: (html) => html.includes('nav-link'),
        },
      ],
      xp: 60,
    },
  },
  {
    id: 'comp-offcanvas',
    categoryId: 'components',
    title: 'Offcanvas 側邊滑出抽屜',
    officialName: 'Offcanvas',
    level: '高階',
    summary: '如現代 App 一般從左側或右側平滑滑出的側邊欄，適合購物車、個人選單或手機篩選器。',
    teacherDialogue: '點一下右上角的選單按鈕，整個選單從螢幕左邊或右邊像抽屜一樣滑出來，背景還會變暗，這就是 Offcanvas！現在很多知名手遊官網與購物網站都愛用這款設計！',
    keyClasses: [
      { name: 'offcanvas offcanvas-start', desc: '從左側滑出' },
      { name: 'offcanvas offcanvas-end', desc: '從右側滑出' },
      { name: 'data-bs-toggle="offcanvas"', desc: '觸發按鈕屬性' },
      { name: 'offcanvas-header / body', desc: '抽屜內部結構' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideMenu">
    📱 點擊滑出校園側邊抽屜選單
  </button>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="sideMenu">
    <div class="offcanvas-header bg-light">
      <h5 class="offcanvas-title fw-bold">🏫 大明高中快速通關</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body text-start">
      <ul class="list-unstyled">
        <li class="py-2 border-bottom"><a href="#" class="text-decoration-none text-dark">🍽️ 本週營養午餐菜單</a></li>
        <li class="py-2 border-bottom"><a href="#" class="text-decoration-none text-dark">🚌 專車通勤發車時刻表</a></li>
        <li class="py-2 border-bottom"><a href="#" class="text-decoration-none text-dark">📚 圖書館館藏查詢</a></li>
      </ul>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：打造從右邊滑出的「社團購物車/周邊商品抽屜」',
      scenario: '請製作一個使用 `offcanvas offcanvas-end` 的右側抽屜元件！',
      instructions: [
        '步驟 1：開啟按鈕宣告側邊抽屜觸發屬性 (data-bs-toggle="offcanvas") 並指定目標 (data-bs-target="#cart")。',
        '步驟 2：抽屜容器設定為自右側滑出之側欄 (offcanvas offcanvas-end)，並匹配對應識別碼 (id="cart")。',
        '步驟 3：抽屜內部依序建立頂部標題列 (offcanvas-header) 附帶關閉按鈕 (btn-close)，以及主體內容區 (offcanvas-body)。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <button class="btn btn-warning">🛒 打開周邊商品抽屜</button>
  <!-- 請在此建立 offcanvas-end 結構 -->
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <button class="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#cart">
    🛒 打開周邊商品抽屜
  </button>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="cart">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">成發周邊購物清單</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      目前周邊紀念 T-shirt 1 件（$350）
    </div>
  </div>
</div>`,
      hints: ['外層加上 class="offcanvas offcanvas-end" id="cart"，按鈕加上 data-bs-toggle="offcanvas" data-bs-target="#cart"！'],
      rules: [
        {
          description: '必須包含 offcanvas 類別',
          test: (html) => html.includes('offcanvas'),
        },
        {
          description: '必須包含 offcanvas-end 類別',
          test: (html) => html.includes('offcanvas-end'),
        },
      ],
      xp: 75,
    },
  },
  {
    id: 'comp-pagination',
    categoryId: 'components',
    title: 'Pagination 頁碼分頁切換',
    officialName: 'Pagination',
    level: '初階',
    summary: '文章或相簿太多時的好幫手！pagination、page-item 與 page-link 打造清晰頁數導覽。',
    teacherDialogue: '校園論壇有上百篇精華文章，不可能一次全塞在同一個畫面！Pagination 就是底部「上一頁 [1] [2] [3] 下一頁」的翻頁器，搭配 active 類別標記目前第幾頁，還可以加 pagination-sm 做小巧版！',
    keyClasses: [
      { name: 'pagination', desc: '分頁主容器' },
      { name: 'page-item', desc: '每一頁按鈕外框' },
      { name: 'page-link', desc: '點擊連結' },
      { name: 'active / disabled', desc: '當前所在頁碼與不可點擊狀態' },
    ],
    teacherHtml: `<div class="container py-3 d-flex justify-content-center">
  <nav aria-label="Page navigation">
    <ul class="pagination shadow-sm">
      <li class="page-item disabled"><a class="page-link" href="#">上一頁</a></li>
      <li class="page-item active"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">下一頁</a></li>
    </ul>
  </nav>
</div>`,
    studentTask: {
      title: '挑戰：為攝影社社團相簿製作第 2 頁分頁條',
      scenario: '請建立包含 `pagination`、`page-item` 與 `page-link` 的分頁列，並將第 2 頁設為 `active`！',
      instructions: [
        '步驟 1：建立分頁導航清單容器 (pagination)。',
        '步驟 2：每個頁碼外框設定為分頁單元 (page-item)，超連結設定為分頁按鈕 (page-link)。',
        '步驟 3：將第 2 頁的單元標記為當前頁面高亮狀態 (active)。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <!-- 請建立 pagination 分頁列 -->
</div>`,
      solutionHtml: `<div class="container py-3 d-flex justify-content-center">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
  </ul>
</div>`,
      hints: ['建立 <ul class="pagination">，裡面放 <li class="page-item active"><a class="page-link" href="#">2</a></li>！'],
      rules: [
        {
          description: '必須包含 pagination 類別',
          test: (html) => html.includes('pagination'),
        },
        {
          description: '必須包含 page-item 類別',
          test: (html) => html.includes('page-item'),
        },
        {
          description: '必須包含 page-link 類別',
          test: (html) => html.includes('page-link'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'comp-placeholders',
    categoryId: 'components',
    title: 'Placeholders 骨架屏載入動畫',
    officialName: 'Placeholders',
    level: '中階',
    summary: '像 YouTube 和 FB 在網路慢時顯示的灰色閃爍佔位條！大幅提升使用者等待時的流暢體驗。',
    teacherDialogue: '網頁在等伺服器抓資料時，如果畫面一片空白，同學會以為網站壞掉了！Placeholders（骨架屏）就是先用灰色閃爍的色塊假裝是標題和圖片，等資料載入完畢再替換，科技感直接拉滿！',
    keyClasses: [
      { name: 'placeholder', desc: '骨架色塊本體' },
      { name: 'placeholder-glow', desc: '柔和漸變閃爍動畫效果' },
      { name: 'placeholder-wave', desc: '波浪流動動畫效果' },
      { name: 'col-*', desc: '控制骨架條的寬度' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 320px;">
  <div class="card p-3 shadow-sm" aria-hidden="true">
    <div class="placeholder-glow">
      <div class="bg-secondary rounded mb-2" style="height: 120px;"></div>
      <h5 class="card-title">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
        <span class="placeholder col-8"></span>
      </p>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為社團榮譽榜卡片製作 placeholder-glow 骨架屏',
      scenario: '請製作一個帶有 `placeholder-glow` 與多條 `placeholder` 骨架條的等待載入卡片！',
      instructions: [
        '步驟 1：在卡片內容外層建立骨架屏柔和發光閃爍容器 (placeholder-glow)。',
        '步驟 2：建立標題骨架條 (placeholder)，透過網格欄寬控制寬度為 8 欄 (col-8)。',
        '步驟 3：建立內文骨架條 (placeholder)，分別設定滿版寬度 (col-12) 與半寬度 (col-6)。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 300px;">
  <div class="card p-3">
    <!-- 請在此處建立 placeholder-glow 骨架 -->
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 300px;">
  <div class="card p-3">
    <div class="placeholder-glow">
      <h5 class="placeholder col-8 mb-2"></h5>
      <p class="placeholder col-12 mb-1"></p>
      <p class="placeholder col-6"></p>
    </div>
  </div>
</div>`,
      hints: ['使用 class="placeholder-glow" 包裹 class="placeholder col-8"！'],
      rules: [
        {
          description: '必須包含 placeholder 類別',
          test: (html) => html.includes('placeholder'),
        },
        {
          description: '必須包含 placeholder-glow 類別',
          test: (html) => html.includes('placeholder-glow'),
        },
      ],
      xp: 60,
    },
  },
  {
    id: 'comp-popovers',
    categoryId: 'components',
    title: 'Popovers 彈出資訊泡泡',
    officialName: 'Popovers',
    level: '高階',
    summary: '類似 iOS 的彈出小氣泡！點選按鈕時跳出帶有標題與詳細說明的資訊框。',
    teacherDialogue: '遇到像「學測級分換算公式」這種專有名詞時，如果寫在本文會太長。用 Popovers 彈窗泡泡，學生點一下「詳細說明」，旁邊就會冒出一個小氣泡解說，再點一下就關閉！',
    keyClasses: [
      { name: 'data-bs-toggle="popover"', desc: '啟用 Popover 觸發' },
      { name: 'data-bs-title="標題"', desc: '泡泡頂部標題' },
      { name: 'data-bs-content="內容"', desc: '泡泡詳細內文' },
      { name: 'data-bs-placement="top/right"', desc: '彈出方向控制' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <button type="button" class="btn btn-danger" 
          data-bs-toggle="popover" 
          data-bs-title="💡 什麼是 APX 高中數理能力檢定？" 
          data-bs-content="由清華大學主辦的高中數理化生能力測驗，是大學申請入學時極具公信力的加分證明！">
    點我查看檢定簡介 (Popover)
  </button>
</div>`,
    studentTask: {
      title: '挑戰：為課綱核心素養名詞加入 Popover 提示',
      scenario: '請在按鈕加入 `data-bs-toggle="popover"` 與 `data-bs-title`、`data-bs-content`！',
      instructions: [
        '步驟 1：在說明按鈕設定氣泡彈出屬性 (data-bs-toggle="popover")。',
        '步驟 2：透過資料屬性指定氣泡頂部標題 (data-bs-title="高中自主學習")。',
        '步驟 3：透過資料屬性指定氣泡內文詳解 (data-bs-content="每週 2 節自主時間，同學可自行探索程式設計、外語或專題研究！")。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <!-- 請在 button 加上 popover 相關屬性 -->
  <button class="btn btn-info">
    自主學習計畫說明
  </button>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <button type="button" class="btn btn-info" 
          data-bs-toggle="popover" 
          data-bs-title="高中自主學習" 
          data-bs-content="每週 2 節自主時間，同學可自行探索程式設計、外語或專題研究！">
    自主學習計畫說明
  </button>
</div>`,
      hints: ['為按鈕加上 data-bs-toggle="popover" data-bs-title="..." data-bs-content="..."！'],
      rules: [
        {
          description: '必須包含 data-bs-toggle="popover"',
          test: (html) => html.includes('data-bs-toggle="popover"'),
        },
      ],
      xp: 60,
    },
  },
  {
    id: 'comp-progress',
    categoryId: 'components',
    title: 'Progress 活力進度條',
    officialName: 'Progress',
    level: '初階',
    summary: '遊戲化經驗值必備！展示期末複習進度、募資進度、或測驗完成趴數。',
    teacherDialogue: '就像你玩手遊看經驗值長條一樣，看到進度條慢慢填滿就超有成就感！在 Bootstrap 裡，外層是 class="progress"，內層是 class="progress-bar"，透過 style="width: 75%;" 就能輕鬆精確控制百分比！加上 progress-bar-striped 還會變成帥氣斑馬條紋！',
    keyClasses: [
      { name: 'progress', desc: '進度條軌道底槽' },
      { name: 'progress-bar', desc: '填充進度條本體' },
      { name: 'progress-bar-striped', desc: '斜紋斑馬線特效' },
      { name: 'progress-bar-animated', desc: '讓斑馬線持續流動跑動' },
      { name: 'bg-success / bg-info', desc: '進度條主題色彩' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 480px;">
  <div class="d-flex justify-content-between mb-1 small fw-bold">
    <span>期中考全科複習進度</span>
    <span class="text-primary">75% 完成</span>
  </div>
  <div class="progress mb-3" style="height: 18px;">
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
         style="width: 75%;">75%</div>
  </div>

  <div class="d-flex justify-content-between mb-1 small fw-bold">
    <span>社團成發募資進度 ($15,000 / $15,000)</span>
    <span class="text-success">100% 達標！</span>
  </div>
  <div class="progress" style="height: 18px;">
    <div class="progress-bar bg-success" style="width: 100%;">達標 🎉</div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為高三學測倒數製作 60% 進度條',
      scenario: '請製作一個包含 `progress` 與 `progress-bar`，寬度為 `60%` 的進度條！',
      instructions: [
        '步驟 1：建立進度條軌道底槽容器 (progress)，設定固定高度 (style="height: 20px;")。',
        '步驟 2：內部建立進度填充條 (progress-bar)，設定資訊色背景 (bg-info)。',
        '步驟 3：透過行內樣式寬度精準控制進度百分比 (style="width: 60%;")，並在條內標記文字。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在此建立 60% 進度條 -->
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 450px;">
  <div class="progress" style="height: 20px;">
    <div class="progress-bar bg-info" style="width: 60%;">60% 複習完畢</div>
  </div>
</div>`,
      hints: ['外層包 <div class="progress">，內層寫 <div class="progress-bar" style="width: 60%;">！'],
      rules: [
        {
          description: '必須包含 progress 類別',
          test: (html) => html.includes('progress ') || html.includes('progress"'),
        },
        {
          description: '必須包含 progress-bar 類別',
          test: (html) => html.includes('progress-bar'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'comp-scrollspy',
    categoryId: 'components',
    title: 'Scrollspy 滾動監聽導航',
    officialName: 'Scrollspy',
    level: '高階',
    summary: '做單頁式網站 (One-page landing) 的必殺技！當使用者滾動到某個章節時，頂部選單自動對應高亮。',
    teacherDialogue: '當你在看一頁式成發介紹時，往下滾動到「活動嘉賓」，導覽列上的「活動嘉賓」就會自動發光反藍！這在原生 JS 要算一大堆 scroll offset，但在 Bootstrap 裡只要加上 data-bs-spy="scroll"，它就會自動幫你監聽畫面位置！',
    keyClasses: [
      { name: 'data-bs-spy="scroll"', desc: '宣告滾動監聽行為' },
      { name: 'data-bs-target="#navId"', desc: '連結的高亮目標選單' },
      { name: 'overflow-y: scroll', desc: '可滾動容器' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 500px;">
  <nav id="scrollNavbar" class="navbar navbar-light bg-light px-3 mb-2 rounded">
    <a class="navbar-brand small fw-bold" href="#">章節目錄</a>
    <ul class="nav nav-pills">
      <li class="nav-item"><a class="nav-link" href="#sec1">第一章</a></li>
      <li class="nav-item"><a class="nav-link" href="#sec2">第二章</a></li>
    </ul>
  </nav>
  <div data-bs-spy="scroll" data-bs-target="#scrollNavbar" data-bs-offset="0" 
       class="bg-white p-3 border rounded" style="height: 120px; overflow-y: scroll;">
    <h5 id="sec1">第一章：社團創立歷史</h5>
    <p>自民國 92 年成立至今，歷經 23 屆熱血學長姐的傳承與努力...</p>
    <h5 id="sec2">第二章：歷年得獎紀錄</h5>
    <p>連續五年榮獲全國高中社團評鑑特優獎，代表大明高中出征各項大賽！</p>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為迎新手冊加入 data-bs-spy 滾動監聽屬性',
      scenario: '請在滾動容器加上 `data-bs-spy="scroll"` 與 `data-bs-target="#myNav"`！',
      instructions: [
        '步驟 1：在可滾動內容容器宣告滾動監聽行為 (data-bs-spy="scroll")。',
        '步驟 2：指定高亮關聯之導航選單目標 (data-bs-target="#myNav")。',
        '步驟 3：確保容器具備滾動高度限制與垂直軸滾動機制 (style="height: 100px; overflow-y: scroll;")。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在滾動 div 加入 data-bs-spy="scroll" 與 data-bs-target -->
  <div style="height: 100px; overflow-y: scroll;" class="p-3 border">
    <h5>活動須知</h5>
    <p>請記得攜帶水壺與防曬用品...</p>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div data-bs-spy="scroll" data-bs-target="#myNav" style="height: 100px; overflow-y: scroll;" class="p-3 border rounded">
    <h5>活動須知</h5>
    <p>請記得攜帶水壺與防曬用品...</p>
  </div>
</div>`,
      hints: ['在 div 標籤加入 data-bs-spy="scroll" data-bs-target="#myNav"！'],
      rules: [
        {
          description: '必須包含 data-bs-spy="scroll"',
          test: (html) => html.includes('data-bs-spy="scroll"'),
        },
      ],
      xp: 70,
    },
  },
  {
    id: 'comp-spinners',
    categoryId: 'components',
    title: 'Spinners 載入旋轉圖示',
    officialName: 'Spinners',
    level: '初階',
    summary: '等待資料載入時的旋轉圈圈！spinner-border 旋轉圓環、spinner-grow 呼吸脈衝。',
    teacherDialogue: '按了「送出報名表」之後，為了防止同學以為沒反應而狂按十幾次，按鈕裡面會出現一個旋轉的小圈圈！加上 class="spinner-border text-primary"，輕輕鬆鬆就能做出純 CSS 打造的流暢轉圈動畫！',
    keyClasses: [
      { name: 'spinner-border', desc: '旋轉外圈邊框動畫' },
      { name: 'spinner-grow', desc: '呼吸漸變縮放脈衝動畫' },
      { name: 'spinner-border-sm', desc: '微型尺寸（特別適合塞在按鈕裡面）' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <div class="spinner-border text-primary me-3" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-success me-3" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <!-- 整合進按鈕 -->
  <button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status"></span>
    正在上傳備審資料中...
  </button>
</div>`,
    studentTask: {
      title: '挑戰：打造「正在計算全校排名中...」的按鈕載入圈',
      scenario: '請在按鈕內置入一個 `spinner-border spinner-border-sm` 旋轉小圈！',
      instructions: [
        '步驟 1：在深色按鈕文字前方置入旋轉圓環載入圖示 (spinner-border)。',
        '步驟 2：圖示套用微型小尺寸 (spinner-border-sm)，並補上右側外距 (me-1) 與無障礙角色 (role="status")。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <button class="btn btn-dark">
    <!-- 請在此處加入 spinner-border spinner-border-sm -->
    計算排名中...
  </button>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <button class="btn btn-dark" disabled>
    <span class="spinner-border spinner-border-sm me-1" role="status"></span>
    計算排名中...
  </button>
</div>`,
      hints: ['在文字前加入 <span class="spinner-border spinner-border-sm"></span>！'],
      rules: [
        {
          description: '必須包含 spinner-border 類別',
          test: (html) => html.includes('spinner-border'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'comp-toasts',
    categoryId: 'components',
    title: 'Toasts 輕量吐司通知',
    officialName: 'Toasts',
    level: '高階',
    summary: '像吐司機烤好吐司跳出來一樣！在螢幕右下角彈出輕巧的通知卡片，幾秒後自動淡出消失。',
    teacherDialogue: '大家在用手機或電腦時，右下角常常會跳出一個小小的通知「已成功加入購物車」或「新訊息通知」，這在前端就叫做 Toast（吐司）！它比 Alert 更低調、比 Modal 更不打擾，非常適合即時提醒！',
    keyClasses: [
      { name: 'toast', desc: '吐司卡片主體' },
      { name: 'toast-header', desc: '吐司標題與關閉按鈕' },
      { name: 'toast-body', desc: '吐司通知內容' },
      { name: 'toast-container', desc: '多個吐司疊加時的定位容器' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="toast show shadow" role="alert">
    <div class="toast-header bg-primary text-white">
      <strong class="me-auto">🔔 班級小幫手通知</strong>
      <small>剛剛</small>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">
      班長提醒：明天要考數學向量小考，請同學們記得帶直尺與圓規！
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：製作「報名已受理」的 Toast 吐司通知',
      scenario: '請建立包含 `toast show`、`toast-header` 與 `toast-body` 的提示卡片！',
      instructions: [
        '步驟 1：建立吐司通知外層容器 (toast)，設定顯示狀態 (show) 與外陰影 (shadow)。',
        '步驟 2：建立吐司標題列 (toast-header)，內部包含系統訊息標題與關閉叉叉 (btn-close)。',
        '步驟 3：建立吐司內容區塊 (toast-body)，呈現志工報名受理結果。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在此建立 Toast 結構 -->
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="toast show shadow">
    <div class="toast-header">
      <strong class="me-auto">🎉 系統訊息</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">
      您的志工報名已成功送出！
    </div>
  </div>
</div>`,
      hints: ['外層使用 <div class="toast show">，裡面包 <div class="toast-header"> 與 <div class="toast-body">！'],
      rules: [
        {
          description: '必須包含 toast 類別',
          test: (html) => html.includes('toast ') || html.includes('toast"'),
        },
        {
          description: '必須包含 toast-header 類別',
          test: (html) => html.includes('toast-header'),
        },
        {
          description: '必須包含 toast-body 類別',
          test: (html) => html.includes('toast-body'),
        },
      ],
      xp: 65,
    },
  },
  {
    id: 'comp-tooltips',
    categoryId: 'components',
    title: 'Tooltips 滑鼠懸停提示',
    officialName: 'Tooltips',
    level: '中階',
    summary: '滑鼠懸停在圖示或文字上方時，浮現出黑色小標籤提示詳細含義。',
    teacherDialogue: '網頁上有時候會放很多小圖示（例如一個愛心、一個垃圾桶），有些新同學可能不知道垃圾桶按鈕代表什麼意思。加上 data-bs-toggle="tooltip" 與 data-bs-title="刪除本項目"，滑鼠移過去就會跳出可愛的黑色小標籤！',
    keyClasses: [
      { name: 'data-bs-toggle="tooltip"', desc: '宣告使用 Tooltip' },
      { name: 'data-bs-title="提示文字"', desc: '懸停顯示的提示文字' },
      { name: 'data-bs-placement="top/bottom"', desc: '提示浮現方向' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <button type="button" class="btn btn-secondary" 
          data-bs-toggle="tooltip" data-bs-placement="top" 
          data-bs-title="點擊下載完整 114 學年度行事曆 PDF">
    📅 2026 校曆下載 (滑鼠移過來看看)
  </button>
</div>`,
    studentTask: {
      title: '挑戰：為社團官網的讚賞愛心按鈕加上 Tooltip',
      scenario: '請在按鈕加上 `data-bs-toggle="tooltip"` 與 `data-bs-title="為熱音社點贊！"`！',
      instructions: [
        '步驟 1：在愛心讚賞按鈕宣告工具提示觸發屬性 (data-bs-toggle="tooltip")。',
        '步驟 2：透過資料屬性設定滑鼠懸停時顯示的提示文字 (data-bs-title="為熱音社點贊！")。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <button class="btn btn-outline-danger">
    ❤️ 愛心
  </button>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <button type="button" class="btn btn-outline-danger" 
          data-bs-toggle="tooltip" 
          data-bs-title="為熱音社點贊！">
    ❤️ 愛心
  </button>
</div>`,
      hints: ['為按鈕加上 data-bs-toggle="tooltip" data-bs-title="為熱音社點贊！"！'],
      rules: [
        {
          description: '必須包含 data-bs-toggle="tooltip"',
          test: (html) => html.includes('data-bs-toggle="tooltip"'),
        },
      ],
      xp: 50,
    },
  },
];
