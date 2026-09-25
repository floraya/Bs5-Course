import { Lesson } from '../types/curriculum';

export const LESSONS_UTILITIES: Lesson[] = [
  {
    id: 'util-api',
    categoryId: 'utilities',
    title: 'Utility API 工具生成原理',
    officialName: 'API',
    level: '高階',
    summary: '了解 Bootstrap 底層 Sass Maps 如何透過 Utility API 大規模批次生成數千個原子類別。',
    teacherDialogue: '大家有沒有好奇過，為什麼寫 m-1 到 m-5、或者 text-primary 到 text-danger 這些類別時，Bootstrap 都能精準對應？底層其實就是靠超酷的 Utility API！它讀取 Sass 的設定表，一口氣批量編譯出所有響應式工具類別！',
    keyClasses: [
      { name: '$utilities map', desc: 'Sass 中定義所有原子工具的字典表' },
      { name: 'responsive: true', desc: '為該工具自動生成 sm, md, lg 斷點版本' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="card p-3 bg-light border-0 shadow-sm">
    <h6>💡 Bootstrap Utility API 的魔力：</h6>
    <p class="small text-muted mb-0">
      只要在 Sass 設定一行 <code>"opacity": (values: (0: 0, 25: .25, 50: .5, 75: .75, 100: 1))</code>，
      Bootstrap 就會自動替你產出 <code>opacity-0</code> 到 <code>opacity-100</code> 的完整類別！
    </p>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：體驗 Utility API 產出的原子類別組合',
      scenario: '請使用原子類別 `p-4 bg-primary text-white rounded shadow` 組合出一個精美的卡片！',
      instructions: [
        '步驟 1：在容器設定 4 級內距 (padding 4) 舒緩內部內容排版。',
        '步驟 2：套用主題主要色背景 (bg-primary) 與高對比純白文字 (text-white)。',
        '步驟 3：追加標準圓角 (rounded) 與外框陰影 (shadow)，打造懸浮科技質感卡片。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將下方容器組裝多個原子類別 -->
  <div>
    <h4>🚀 原子工具類別的極速體驗</h4>
    <p>完全不用手寫一針一線的 CSS，即可完成高質感排版！</p>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="p-4 bg-primary text-white rounded shadow">
    <h4>🚀 原子工具類別的極速體驗</h4>
    <p class="mb-0">完全不用手寫一針一線的 CSS，即可完成高質感排版！</p>
  </div>
</div>`,
      hints: ['在 div class 加入 "p-4 bg-primary text-white rounded shadow"！'],
      rules: [
        {
          description: '必須包含 bg-primary',
          test: (html) => html.includes('bg-primary'),
        },
        {
          description: '必須包含 rounded 類別',
          test: (html) => html.includes('rounded'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-background',
    categoryId: 'utilities',
    title: 'Background 背景工具',
    officialName: 'Background',
    level: '初階',
    summary: '色彩與漸層切換！bg-primary 藍、bg-success 綠、bg-gradient 柔和漸變背景。',
    teacherDialogue: '想幫社團公告換個心情？用 bg-* 類別就能秒變更背景色彩！想要高級感？再加上 bg-gradient，上方會自動注入一抹微光般的細緻漸層！',
    keyClasses: [
      { name: 'bg-primary / secondary', desc: '預設主題背景色' },
      { name: 'bg-gradient', desc: '套用平滑細膩的線性半透明漸層' },
      { name: 'bg-opacity-*', desc: '背景不透明度 (10%, 25%, 50%, 75%)' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="row g-2 text-white text-center fw-bold">
    <div class="col-6"><div class="p-3 bg-primary bg-gradient rounded">bg-primary + bg-gradient</div></div>
    <div class="col-6"><div class="p-3 bg-success bg-gradient rounded">bg-success + bg-gradient</div></div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為校刊活動封面套用 bg-gradient 漸層',
      scenario: '請在容器加上 `bg-primary bg-gradient text-white`！',
      instructions: [
        '步驟 1：為美展橫幅設定主題主要色彩背景 (bg-primary) 與純白文字 (text-white)。',
        '步驟 2：追加細緻線性光暈漸層效果 (bg-gradient)，提升色彩深度與質感。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="p-4 rounded">
    <h3>🎨 114 學年度高中美展</h3>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="p-4 bg-primary bg-gradient text-white rounded shadow">
    <h3>🎨 114 學年度高中美展</h3>
  </div>
</div>`,
      hints: ['加上 class="p-4 bg-primary bg-gradient text-white rounded"！'],
      rules: [
        {
          description: '必須包含 bg-gradient',
          test: (html) => html.includes('bg-gradient'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-borders',
    categoryId: 'utilities',
    title: 'Borders 邊框與圓角',
    officialName: 'Borders',
    level: '初階',
    summary: '控制邊框有無 (border-0, border-top)、邊框粗細 (border-1~5)、顏色與圓角弧度 (rounded-1~5, rounded-pill)。',
    teacherDialogue: '邊框能劃分視覺焦點！你可以只加左邊框（border-start border-4 border-primary）來做重點引言，也可以用 rounded-pill 做藥丸膠囊、rounded-circle 做頭像！',
    keyClasses: [
      { name: 'border border-primary', desc: '加上主題色彩邊框' },
      { name: 'border-start border-4', desc: '左側重點強調粗邊線' },
      { name: 'rounded-3 / rounded-pill', desc: '大圓角或藥丸圓角' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="border-start border-4 border-success bg-light p-3 rounded-end mb-2">
    <strong>重點提示：</strong> 只有左側有 4px 綠色強調邊線！
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為校園公告加上 border-start border-4 border-danger',
      scenario: '請為緊急通知加上左側紅色粗邊條！',
      instructions: [
        '步驟 1：在容器左側添加 4 級粗細的強調外框線 (border-start border-4)。',
        '步驟 2：將邊框色彩設定為危險紅色警示語意 (border-danger)，引導讀者第一時間辨識重要守則。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="bg-light p-3">
    ⚠️ 實驗室注意事項：請全程穿著實驗衣並配戴護目鏡！
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="bg-light p-3 border-start border-4 border-danger rounded-end">
    ⚠️ 實驗室注意事項：請全程穿著實驗衣並配戴護目鏡！
  </div>
</div>`,
      hints: ['加入 class="bg-light p-3 border-start border-4 border-danger"！'],
      rules: [
        {
          description: '必須包含 border-start 與 border-danger',
          test: (html) => html.includes('border-start') && html.includes('border-danger'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-colors',
    categoryId: 'utilities',
    title: 'Colors 文字色彩工具',
    officialName: 'Colors',
    level: '初階',
    summary: 'text-primary, text-success, text-danger, text-muted 與 text-opacity-* 不透明度。',
    teacherDialogue: '文字顏色是引導讀者情緒的催化劑！text-primary 給人專業信任感，text-success 代表過關與勝利，text-danger 代表警告。Bootstrap 5 還支援 text-opacity-50 等透明度調節！',
    keyClasses: [
      { name: 'text-primary / text-success / text-danger', desc: '主題文字色彩' },
      { name: 'text-muted', desc: '次要低對比灰色文字' },
      { name: 'text-opacity-50', desc: '設定 50% 文字透明度' },
    ],
    teacherHtml: `<div class="container py-3">
  <p class="text-primary fw-bold">text-primary：藍色精神</p>
  <p class="text-success fw-bold">text-success：成功錄取</p>
  <p class="text-danger fw-bold">text-danger：截止倒數</p>
  <p class="text-muted">text-muted：次要備註文字</p>
</div>`,
    studentTask: {
      title: '挑戰：將通知文字改為 text-success',
      scenario: '請將成功訊息改為 `text-success`！',
      instructions: [
        '步驟 1：為錄取榮譽段落套用成功綠色語意文字 (text-success)。',
        '步驟 2：文字套用粗體字重 (fw-bold) 加強恭賀與公告份量感。',
      ],
      starterHtml: `<div class="container py-3">
  <p>恭喜通過高二英文演講比賽初賽！</p>
</div>`,
      solutionHtml: `<div class="container py-3">
  <p class="text-success fw-bold">恭喜通過高二英文演講比賽初賽！</p>
</div>`,
      hints: ['為 <p> 加上 class="text-success fw-bold"！'],
      rules: [
        {
          description: '必須包含 text-success 類別',
          test: (html) => html.includes('text-success'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-display',
    categoryId: 'utilities',
    title: 'Display 顯示模式控制',
    officialName: 'Display',
    level: '初階',
    summary: 'd-inline, d-block, d-inline-block, d-none，掌握元素在畫面上的排列流向。',
    teacherDialogue: '為什麼普通的 `<span>` 沒辦法給予上下的 margin？因為它是 inline 行內元素！只要加上 d-inline-block 或 d-block，立刻就能自由設定寬高與內外距！',
    keyClasses: [
      { name: 'd-inline', desc: '行內元素（並排不換行）' },
      { name: 'd-block', desc: '區塊元素（獨占整行換行）' },
      { name: 'd-inline-block', desc: '行內區塊（並排但可設定寬高與 padding）' },
      { name: 'd-none', desc: '完全隱藏不佔任何空間' },
    ],
    teacherHtml: `<div class="container py-3">
  <span class="d-block bg-primary text-white p-2 rounded mb-2 text-center">
    原本是 span，加上 d-block 後獨占整行！
  </span>
  <div class="d-inline-block bg-success text-white p-2 rounded me-2">
    d-inline-block 1
  </div>
  <div class="d-inline-block bg-warning text-dark p-2 rounded">
    d-inline-block 2
  </div>
</div>`,
    studentTask: {
      title: '挑戰：使用 d-block 讓兩個 span 分行顯示',
      scenario: '請在第二個 span 加上 `d-block`，使其換行並獨立成行！',
      instructions: [
        '步驟 1：將原本行內顯示的第二個 span 標籤改造為區塊顯示模式 (d-block)。',
        '步驟 2：讓社課時間資訊自動獨占新行換行顯示，文字設定為淡化色彩 (text-muted)。',
      ],
      starterHtml: `<div class="container py-3">
  <span>大明高中資訊社</span>
  <span>每週四下午社課時間</span>
</div>`,
      solutionHtml: `<div class="container py-3">
  <span class="fw-bold">大明高中資訊社</span>
  <span class="d-block text-muted">每週四下午社課時間</span>
</div>`,
      hints: ['為第二個 <span> 加上 class="d-block"！'],
      rules: [
        {
          description: '必須包含 d-block 類別',
          test: (html) => html.includes('d-block'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-flex',
    categoryId: 'utilities',
    title: 'Flex 彈性盒模型神器',
    officialName: 'Flex',
    level: '中階',
    summary: '前端排版最神核心！d-flex, justify-content-between (左右分散), align-items-center (垂直居中)。',
    teacherDialogue: '以前要讓左邊放 Logo、右邊放登入按鈕，要算浮動清浮動算半天。在 Bootstrap 只要寫 d-flex justify-content-between align-items-center，一行類別瞬間完成垂直水平完美分佈，堪稱現代排版靈魂！',
    keyClasses: [
      { name: 'd-flex', desc: '啟動 Flexbox 佈局' },
      { name: 'justify-content-between', desc: '左右兩端貼齊分散對齊' },
      { name: 'justify-content-center', desc: '水平居中' },
      { name: 'align-items-center', desc: '垂直居中' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="d-flex justify-content-between align-items-center bg-light p-3 rounded border">
    <div class="fw-bold text-primary">🎸 熱音社 成果發表會</div>
    <button class="btn btn-primary btn-sm">立即索票</button>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：使用 d-flex 與 justify-content-between 打造頂部列',
      scenario: '請在容器加上 `d-flex justify-content-between align-items-center`！',
      instructions: [
        '步驟 1：外層父容器宣告啟用彈性盒模型佈局 (d-flex)。',
        '步驟 2：設定主軸為左右兩端分散對齊 (justify-content-between)，將滿分名單與查看更多按鈕分推至兩側。',
        '步驟 3：設定交叉軸垂直置中 (align-items-center)，確保文字與按鈕完美在同一水平中心線上。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在下方加上 d-flex 類別 -->
  <div class="bg-light p-3">
    <span>🏆 期中考滿分名單</span>
    <a href="#">查看更多</a>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="d-flex justify-content-between align-items-center bg-light p-3 rounded">
    <span class="fw-bold">🏆 期中考滿分名單</span>
    <a href="#" class="btn btn-outline-primary btn-sm">查看更多</a>
  </div>
</div>`,
      hints: ['為 div 加上 class="d-flex justify-content-between align-items-center bg-light p-3"！'],
      rules: [
        {
          description: '必須包含 d-flex 類別',
          test: (html) => html.includes('d-flex'),
        },
        {
          description: '必須包含 justify-content-between 類別',
          test: (html) => html.includes('justify-content-between'),
        },
      ],
      xp: 60,
    },
  },
  {
    id: 'util-float',
    categoryId: 'utilities',
    title: 'Float 浮動定位',
    officialName: 'Float',
    level: '初階',
    summary: '文字環繞必備！float-start 靠左浮動、float-end 靠右浮動、float-none 取消浮動。',
    teacherDialogue: '想做出報章雜誌那種照片靠在右上角、文章圍繞著照片流動的排版嗎？用 float-end 就能把照片貼在右上角，文字會自動在左側和下方優雅環繞！',
    keyClasses: [
      { name: 'float-start', desc: '靠左浮動（文字在右邊與下方環繞）' },
      { name: 'float-end', desc: '靠右浮動（文字在左邊與下方環繞）' },
      { name: 'float-none', desc: '取消浮動' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="p-3 bg-light border rounded clearfix">
    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=140" 
         class="float-end ms-3 rounded shadow-sm" style="width: 100px;" alt="同學">
    <p class="mb-0">
      <strong>校長致全校同學信：</strong> 新學期開始，願每一位同學在各學科的探索與社團活動的歷練中，找到自己終生熱愛的志向。我們已為大家更新了全校的網路與自習室設備！
    </p>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：將社團徽章靠右浮動 (float-end)',
      scenario: '請在徽章圖片加上 `float-end ms-3`！',
      instructions: [
        '步驟 1：為音樂節圖片設定向右側浮動 (float-end)，讓右側空間留給圖片。',
        '步驟 2：設定左側邊界外距 (ms-3)，為右側圖片與左側環繞文字推開舒適閱讀間距。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="clearfix">
    <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120" style="width: 80px;" alt="音樂節">
    <p>2026 全國高中搖滾音樂節將於 5 月盛大登場！</p>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="clearfix bg-light p-3 rounded">
    <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120" 
         class="float-end ms-3 rounded" style="width: 80px;" alt="音樂節">
    <p class="mb-0">2026 全國高中搖滾音樂節將於 5 月盛大登場！</p>
  </div>
</div>`,
      hints: ['為 <img> 加上 class="float-end ms-3"！'],
      rules: [
        {
          description: '必須包含 float-end 類別',
          test: (html) => html.includes('float-end'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-interactions',
    categoryId: 'utilities',
    title: 'Interactions 互動與文字選取',
    officialName: 'Interactions',
    level: '中階',
    summary: 'user-select-none 禁止複製選取、user-select-all 一鍵全選複製、pe-none 穿透禁用點擊。',
    teacherDialogue: '在做按鈕或手遊卡牌時，最討厭滑鼠點太快把文字藍底反白選取起來，這時候用 user-select-none 就能禁止選取！反過來說，如果是社團匯款帳號或 Discord 邀請碼，加上 user-select-all，同學點一下就會自動全選整串文字，超方便！',
    keyClasses: [
      { name: 'user-select-none', desc: '禁止使用者反白選取文字（做按鈕卡片超好用）' },
      { name: 'user-select-all', desc: '滑鼠點擊該文字時自動全選' },
      { name: 'pe-none', desc: '指針事件穿透（pointer-events: none）' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="card p-3 bg-light mb-2">
    <p class="user-select-all mb-0">
      📋 點我一下直接全選邀請碼：<strong class="text-primary">CTHS-GUITAR-2026</strong>
    </p>
  </div>
  <div class="card p-3 bg-light user-select-none">
    🚫 這段文字加了 <code>user-select-none</code>，怎麼拖拉都無法被反白複製喔！
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為社團繳費代碼加上 user-select-all 一鍵全選',
      scenario: '請在繳費帳號段落加上 `user-select-all` 類別！',
      instructions: [
        '步驟 1：在包含匯款代碼的標籤套用一鍵全選互動 (user-select-all)。',
        '步驟 2：使同學使用滑鼠點擊任意處時，自動圈選整串代碼方便快速複製。',
      ],
      starterHtml: `<div class="container py-3">
  <p>請點擊複製班級公費匯款代碼：012-34567890</p>
</div>`,
      solutionHtml: `<div class="container py-3">
  <p class="user-select-all bg-light p-2 rounded border">
    請點擊複製班級公費匯款代碼：<strong>012-34567890</strong>
  </p>
</div>`,
      hints: ['為標籤加上 class="user-select-all"！'],
      rules: [
        {
          description: '必須包含 user-select-all 類別',
          test: (html) => html.includes('user-select-all'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-link',
    categoryId: 'utilities',
    title: 'Link 連結進階樣式',
    officialName: 'Link',
    level: '初階',
    summary: 'link-underline-opacity-* 控制下劃線透明度、link-offset-* 控制底線與文字間隙。',
    teacherDialogue: '現代網頁設計討厭死板粗黑的下劃線！Bootstrap 5.3 提供了全新 Link 工具：用 link-offset-2 把底線稍微往下移一點點，或者用 link-underline-opacity-25 讓底線呈現若隱若現的半透明高級感！',
    keyClasses: [
      { name: 'link-offset-2', desc: '底線與文字基線保持 2px 優雅距離' },
      { name: 'link-underline-opacity-25', desc: '底線平時維持 25% 半透明' },
      { name: 'link-underline-opacity-100-hover', desc: '滑鼠懸停時底線恢復 100% 亮起' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fw-bold fs-5">
    ✨ 具有呼吸感底線的現代超連結（移過來試試）
  </a>
</div>`,
    studentTask: {
      title: '挑戰：為校慶官方連結套用 link-offset-2 與 link-underline-opacity-25',
      scenario: '請為 `<a>` 標籤套用 `link-offset-2 link-underline-opacity-25`！',
      instructions: [
        '步驟 1：為校慶時程超連結設定底線微幅下移 2px (link-offset-2)，營造現代排版呼吸感。',
        '步驟 2：設定底線透明度為 25% 半透明 (link-underline-opacity-25)，避免死板厚重底線干擾文字視線。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <a href="#">點此查看校慶時程表</a>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <a href="#" class="link-primary link-offset-2 link-underline-opacity-25">
    點此查看校慶時程表
  </a>
</div>`,
      hints: ['為 <a> 標籤加上 class="link-offset-2 link-underline-opacity-25"！'],
      rules: [
        {
          description: '必須包含 link-offset-2 類別',
          test: (html) => html.includes('link-offset-2'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-object-fit',
    categoryId: 'utilities',
    title: 'Object fit 圖片裁切適配',
    officialName: 'Object fit',
    level: '中階',
    summary: '解決圖片被壓扁拉長的終極救星！object-fit-cover (填滿裁切)、object-fit-contain (完整縮放)。',
    teacherDialogue: '當同學上傳不同長寬比的照片到社團成員名單時，如果強行給固定寬高，臉常常會被壓得像外星人一樣扁！加上 object-fit-cover，照片就會像桌布一樣智慧填滿整個方框並等比例裁切，絕不變形！',
    keyClasses: [
      { name: 'object-fit-cover', desc: '填滿容器並保持等比例裁切（最強大、最推薦）' },
      { name: 'object-fit-contain', desc: '完整保留整張照片不裁切' },
      { name: 'object-fit-scale', desc: '縮放至合適大小' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="row text-center">
    <div class="col-6">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" 
           class="object-fit-cover rounded shadow" style="width: 140px; height: 140px;" alt="正常裁切">
      <p class="small text-muted mt-2">object-fit-cover (臉部不變形)</p>
    </div>
    <div class="col-6">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" 
           class="object-fit-contain rounded border" style="width: 140px; height: 140px;" alt="完整保留">
      <p class="small text-muted mt-2">object-fit-contain (留白保留)</p>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為社員大頭貼加上 object-fit-cover 防止變形',
      scenario: '請為 `<img>` 加上 `object-fit-cover` 類別！',
      instructions: [
        '步驟 1：為大頭照圖片套用物件裁切適配 (object-fit-cover)，強制填滿固定寬高方框且保持等比例，防止臉部變形拉伸。',
        '步驟 2：追加圓形頭像裁切 (rounded-circle) 與輕量陰影 (shadow) 提升立體質感。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" 
       style="width: 120px; height: 120px;" alt="公關幹部">
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" 
       class="object-fit-cover rounded-circle shadow" 
       style="width: 120px; height: 120px;" alt="公關幹部">
</div>`,
      hints: ['為 <img> 加上 class="object-fit-cover"！'],
      rules: [
        {
          description: '必須包含 object-fit-cover 類別',
          test: (html) => html.includes('object-fit-cover'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-opacity',
    categoryId: 'utilities',
    title: 'Opacity 不透明度',
    officialName: 'Opacity',
    level: '初階',
    summary: '淡化效果！opacity-0 (完全隱形), opacity-25, opacity-50, opacity-75, opacity-100 (完全不透明)。',
    teacherDialogue: '想做出「不可選取的過期活動」、或者背景浮水印的淡雅效果？用 opacity-* 就能輕鬆控制透明度，從 0 到 100 隨你微調！',
    keyClasses: [
      { name: 'opacity-100', desc: '100% 完全實心' },
      { name: 'opacity-75', desc: '75% 輕微半透' },
      { name: 'opacity-50', desc: '50% 半透明' },
      { name: 'opacity-25', desc: '25% 顯著淡化' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="d-flex gap-2 text-white text-center fw-bold">
    <div class="p-3 bg-primary rounded opacity-100 flex-fill">100%</div>
    <div class="p-3 bg-primary rounded opacity-75 flex-fill">75%</div>
    <div class="p-3 bg-primary rounded opacity-50 flex-fill">50%</div>
    <div class="p-3 bg-primary rounded opacity-25 flex-fill">25%</div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：將已結束的活動項目設為 opacity-50',
      scenario: '請在過期的活動卡片加上 `opacity-50`！',
      instructions: [
        '步驟 1：在過期的社團選填卡片套用 50% 半透明度 (opacity-50)。',
        '步驟 2：透過視覺淡化明確告知同學此階段已截止且無法操作。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="p-3 bg-secondary text-white rounded">
    🔒 第一階段社團選填已截止
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="p-3 bg-secondary text-white rounded opacity-50">
    🔒 第一階段社團選填已截止
  </div>
</div>`,
      hints: ['為 div 加上 opacity-50！'],
      rules: [
        {
          description: '必須包含 opacity-50 類別',
          test: (html) => html.includes('opacity-50'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-overflow',
    categoryId: 'utilities',
    title: 'Overflow 溢位處理',
    officialName: 'Overflow',
    level: '中階',
    summary: 'overflow-hidden (切除多餘溢出內容)、overflow-auto (超出時自動產生滾動軸)、overflow-scroll。',
    teacherDialogue: '給卡片加了 rounded-4 大圓角，但裡面的照片角角卻凸出來刺破圓角？只要在卡片加上 overflow-hidden，任何超出邊界的照片就會被完美切齊圓角！',
    keyClasses: [
      { name: 'overflow-hidden', desc: '截斷任何溢出邊界的內容（保護圓角必備）' },
      { name: 'overflow-auto', desc: '僅在內容超出時才出現滾動軸' },
      { name: 'overflow-y-scroll', desc: '垂直強制啟用滾動條' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="border rounded p-3 overflow-auto bg-light" style="max-height: 90px;">
    <strong>校規守則第七條：</strong><br>
    上課期間請將手機放入教室置物櫃。此處內容很長很長，透過 overflow-auto 可以平滑上下滾動！
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為圓角容器加上 overflow-hidden',
      scenario: '請在外層容器加上 `overflow-hidden`！',
      instructions: [
        '步驟 1：在圓角外層容器設定溢出內容截斷隱藏 (overflow-hidden)。',
        '步驟 2：防止內部有色直角子區塊穿刺破壞父容器的圓角外觀輪廓。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="rounded shadow border" style="width: 200px;">
    <div class="p-3 bg-primary text-white">內容</div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="rounded shadow border overflow-hidden" style="width: 200px;">
    <div class="p-3 bg-primary text-white">內容</div>
  </div>
</div>`,
      hints: ['在 class 中加入 overflow-hidden！'],
      rules: [
        {
          description: '必須包含 overflow-hidden 類別',
          test: (html) => html.includes('overflow-hidden'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-position',
    categoryId: 'utilities',
    title: 'Position 快速定位工具',
    officialName: 'Position',
    level: '中階',
    summary: 'position-relative, position-absolute, top-0, start-0, translate-middle 快速釘選角落小徽章。',
    teacherDialogue: '要在卡片右上角釘一顆小紅點或「推薦」小緞帶，以往要算 top: -10px, right: -10px 算很久。在 Bootstrap 裡，只要 position-relative 搭配 position-absolute top-0 end-0 translate-middle，一秒精準釘在右上角！',
    keyClasses: [
      { name: 'position-relative', desc: '定位基準參考父層' },
      { name: 'position-absolute', desc: '絕對定位子元素' },
      { name: 'top-0 / bottom-0', desc: '貼頂或貼底' },
      { name: 'start-0 / end-0', desc: '貼左或貼右' },
      { name: 'translate-middle', desc: '向左上偏移 50% 達到精準中心點釘選' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <div class="position-relative d-inline-block p-4 bg-light border rounded">
    <span>吉他社入社名額</span>
    <span class="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
      最後 2 席
    </span>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：使用 position-absolute top-0 start-100 translate-middle 釘選徽章',
      scenario: '請在徽章加上定位類別，使其精確懸浮在按鈕右上角！',
      instructions: [
        '步驟 1：確保按鈕作為定位錨點具備相對定位 (position-relative)。',
        '步驟 2：在未讀數字徽章套用絕對定位 (position-absolute)，並指定右上角頂點座標 (top-0 start-100)。',
        '步驟 3：加入中心對齊偏移 (translate-middle)，精確將徽章中心點釘在按鈕右上角頂點。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <button class="btn btn-secondary position-relative">
    社團信箱
    <span class="badge bg-danger">3</span>
  </button>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <button class="btn btn-secondary position-relative">
    社團信箱
    <span class="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
      3
    </span>
  </button>
</div>`,
      hints: ['為 span 加上 class="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill"！'],
      rules: [
        {
          description: '必須包含 position-absolute 類別',
          test: (html) => html.includes('position-absolute'),
        },
        {
          description: '必須包含 translate-middle 類別',
          test: (html) => html.includes('translate-middle'),
        },
      ],
      xp: 60,
    },
  },
  {
    id: 'util-shadows',
    categoryId: 'utilities',
    title: 'Shadows 陰影層次',
    officialName: 'Shadows',
    level: '初階',
    summary: '打造立體感！shadow-none (扁平無陰影), shadow-sm (微立體), shadow (標準), shadow-lg (浮空感大陰影)。',
    teacherDialogue: '給卡片加上柔和的陰影，整個網頁會瞬間有前後立體空間感！卡片在平常可以用 shadow-sm，當滑鼠懸停或是重要彈窗時使用 shadow-lg，就像漂浮在空中一樣吸睛！',
    keyClasses: [
      { name: 'shadow-sm', desc: '微小自然陰影' },
      { name: 'shadow', desc: '經典標準陰影' },
      { name: 'shadow-lg', desc: '深邃大陰影（立體感最強）' },
      { name: 'shadow-none', desc: '去除任何陰影' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="row g-3 text-center">
    <div class="col-4"><div class="p-3 bg-white rounded shadow-sm">shadow-sm</div></div>
    <div class="col-4"><div class="p-3 bg-white rounded shadow">shadow</div></div>
    <div class="col-4"><div class="p-3 bg-white rounded shadow-lg">shadow-lg</div></div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為得獎獎狀卡片加上 shadow-lg 深邃大陰影',
      scenario: '請在卡片加上 `shadow-lg` 類別！',
      instructions: [
        '步驟 1：在全國科展獎狀卡片外層套用深邃大陰影 (shadow-lg)。',
        '步驟 2：營造彷彿浮空於頁面上方的最高層級立體榮譽感。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="p-4 bg-white rounded border text-center">
    🏆 全國科展特優第一名
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="p-4 bg-white rounded shadow-lg text-center">
    <h4 class="text-primary fw-bold">🏆 全國科展特優第一名</h4>
  </div>
</div>`,
      hints: ['為 div 加上 class="shadow-lg"！'],
      rules: [
        {
          description: '必須包含 shadow-lg 類別',
          test: (html) => html.includes('shadow-lg'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-sizing',
    categoryId: 'utilities',
    title: 'Sizing 尺寸寬高控制',
    officialName: 'Sizing',
    level: '初階',
    summary: 'w-25, w-50, w-75, w-100 控制寬度；h-25, h-50, h-75, h-100 控制高度；mw-100, mh-100 最大尺寸。',
    teacherDialogue: '想要讓「送出報名」按鈕橫向 100% 填滿整個手機寬度？只要在按鈕加上 w-100！想要讓圖片佔父層的一半寬？寫 w-50！數字對應 25%, 50%, 75%, 100%，直覺又好記！',
    keyClasses: [
      { name: 'w-100', desc: '寬度 100% (滿版)' },
      { name: 'w-50', desc: '寬度 50% (半幅)' },
      { name: 'h-100', desc: '高度 100%' },
      { name: 'mw-100', desc: 'max-width: 100%' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="bg-primary text-white p-2 rounded mb-2 w-25">w-25</div>
  <div class="bg-primary text-white p-2 rounded mb-2 w-50">w-50</div>
  <div class="bg-primary text-white p-2 rounded mb-2 w-75">w-75</div>
  <div class="bg-primary text-white p-2 rounded w-100">w-100 (滿版)</div>
</div>`,
    studentTask: {
      title: '挑戰：將提交按鈕設為滿版寬度 w-100',
      scenario: '請在按鈕加上 `w-100` 類別！',
      instructions: [
        '步驟 1：在報名按鈕套用 100% 滿版寬度控制 (w-100)。',
        '步驟 2：使按鈕橫向完整填滿表單邊界，強化行動裝置點擊體驗。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 350px;">
  <button class="btn btn-primary">
    立即報名
  </button>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 350px;">
  <button class="btn btn-primary w-100">
    立即報名
  </button>
</div>`,
      hints: ['為 button 加上 class="btn btn-primary w-100"！'],
      rules: [
        {
          description: '必須包含 w-100 類別',
          test: (html) => html.includes('w-100'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-spacing',
    categoryId: 'utilities',
    title: 'Spacing 外距與內距',
    officialName: 'Spacing',
    level: '初階',
    summary: '網頁排版使用頻率 No.1！m-* 外距、p-* 內距，搭配 t (上), b (下), s (左), e (右), x (水平), y (垂直)。',
    teacherDialogue: '這是大家每天都會寫 100 次的類別！m 代表 margin（外距，推開隔壁鄰居）；p 代表 padding（內距，盒子裡面的呼吸空間）。數字 0 到 5 代表距離大小。例如 py-3 代表上下內距 1rem，mb-4 代表下方留白外距 1.5rem！',
    keyClasses: [
      { name: 'm-* / p-*', desc: '四邊外距或內距 (0 ~ 5)' },
      { name: 'mx-auto', desc: '左右 margin 自動，經典水平置中！' },
      { name: 'my-3 / py-3', desc: '垂直上下外距或內距' },
      { name: 'mb-4', desc: 'margin-bottom 下方外距' },
    ],
    teacherHtml: `<div class="container py-4">
  <div class="p-4 bg-light border rounded text-center mb-3">
    <strong>p-4 內距：</strong> 裡面的字離邊框很舒適，不會貼在一起！
  </div>
  <div class="p-3 bg-primary text-white rounded w-50 mx-auto text-center">
    <strong>w-50 mx-auto：</strong> 水平自動置中！
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為卡片加上舒適內距 p-4 與下方留白 mb-3',
      scenario: '請在容器加上 `p-4 mb-3` 類別！',
      instructions: [
        '步驟 1：在卡片容器設定 4 級舒適內部留白 (p-4)，防止內容文字貼齊邊框。',
        '步驟 2：在容器底部設定 3 級下方外距 (mb-3)，與後續內容拉開呼吸空間。',
      ],
      starterHtml: `<div class="container">
  <div class="bg-light border rounded">
    <h4>班級讀書會時程</h4>
    <p>每週三放學圖書館自習室集合討論。</p>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="p-4 mb-3 bg-light border rounded">
    <h4>班級讀書會時程</h4>
    <p class="mb-0">每週三放學圖書館自習室集合討論。</p>
  </div>
</div>`,
      hints: ['為 div 加上 class="p-4 mb-3 bg-light border rounded"！'],
      rules: [
        {
          description: '必須包含 p-4 類別',
          test: (html) => html.includes('p-4'),
        },
        {
          description: '必須包含 mb-3 類別',
          test: (html) => html.includes('mb-3'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-text',
    categoryId: 'utilities',
    title: 'Text 文字對齊與樣式',
    officialName: 'Text',
    level: '初階',
    summary: 'text-start, text-center, text-end, text-uppercase, fw-bold (粗體), fst-italic (斜體)。',
    teacherDialogue: '想把校慶口號置中？寫 text-center！想讓標題字變粗？寫 fw-bold！想讓英文全部自動轉大寫？寫 text-uppercase！完全不用自己寫 font-weight: 700 或 text-align: center！',
    keyClasses: [
      { name: 'text-center', desc: '文字置中對齊' },
      { name: 'fw-bold', desc: '粗體字 (font-weight: 700)' },
      { name: 'text-uppercase', desc: '英文字母強制轉大寫' },
      { name: 'fs-1 ~ fs-6', desc: '自定義字級大小 (1 最大，6 最小)' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <p class="text-uppercase fw-bold text-primary mb-1">Youth and Passion</p>
  <h2 class="fw-bold">青春無悔，熱血向前</h2>
  <p class="text-muted fst-italic">—— 大明高中校訓</p>
</div>`,
    studentTask: {
      title: '挑戰：將活動口號設為 text-center 與 fw-bold',
      scenario: '請在口號標題加上 `text-center fw-bold`！',
      instructions: [
        '步驟 1：為校慶倒數標題套用水平居中對齊 (text-center)。',
        '步驟 2：文字設定加粗粗細 (fw-bold) 與主要品牌色 (text-primary)，強化口號視覺強度。',
      ],
      starterHtml: `<div class="container py-3">
  <h3>🎉 校慶倒數 30 天</h3>
</div>`,
      solutionHtml: `<div class="container py-3">
  <h3 class="text-center fw-bold text-primary">🎉 校慶倒數 30 天</h3>
</div>`,
      hints: ['為 <h3> 加上 class="text-center fw-bold"！'],
      rules: [
        {
          description: '必須包含 text-center 類別',
          test: (html) => html.includes('text-center'),
        },
        {
          description: '必須包含 fw-bold 類別',
          test: (html) => html.includes('fw-bold'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-vertical-align',
    categoryId: 'utilities',
    title: 'Vertical align 垂直對齊',
    officialName: 'Vertical align',
    level: '中階',
    summary: 'align-baseline, align-top, align-middle, align-bottom 處理文字與小圖示的垂直對齊。',
    teacherDialogue: '常常在文字旁邊放一個小圖示，結果圖示跟文字高低不一致，看起來很歪！加上 align-middle，圖示和文字就會精確在同一條水平中心線上對齊！',
    keyClasses: [
      { name: 'align-middle', desc: '垂直居中對齊' },
      { name: 'align-top', desc: '頂部對齊' },
      { name: 'align-bottom', desc: '底部對齊' },
    ],
    teacherHtml: `<div class="container py-3">
  <table class="table align-middle">
    <tbody>
      <tr>
        <td style="height: 60px;">
          <span class="badge bg-primary me-2 align-middle">通知</span>
          <span class="align-middle">這行文字與徽章在表格中垂直置中對齊</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>`,
    studentTask: {
      title: '挑戰：為表格儲存格內容套用 align-middle',
      scenario: '請在表格加上 `align-middle` 類別！',
      instructions: [
        '步驟 1：在表格標籤套用垂直居中對齊 (align-middle)。',
        '步驟 2：使表格內部所有單元格的文字與圖示徽章自動在同一水平軸線置中對齊。',
      ],
      starterHtml: `<div class="container py-3">
  <table class="table">
    <tr>
      <td>第 1 組</td>
    </tr>
  </table>
</div>`,
      solutionHtml: `<div class="container py-3">
  <table class="table align-middle">
    <tr>
      <td>第 1 組</td>
    </tr>
  </table>
</div>`,
      hints: ['為 <table> 加上 class="table align-middle"！'],
      rules: [
        {
          description: '必須包含 align-middle 類別',
          test: (html) => html.includes('align-middle'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-visibility',
    categoryId: 'utilities',
    title: 'Visibility 可見度控制',
    officialName: 'Visibility',
    level: '中階',
    summary: 'visible 與 invisible：與 d-none 不同，invisible 隱藏內容但保留原本的排版空間佔位！',
    teacherDialogue: '大家注意：d-none 會把東西徹底藏起來，讓隔壁的東西補上來；而 invisible 是像「隱形斗篷」一樣，東西看不見了，但是原本佔據的空間依然保留著，不會影響周圍卡片的排版位置！',
    keyClasses: [
      { name: 'visible', desc: '元素可見 (visibility: visible)' },
      { name: 'invisible', desc: '元素隱形但保留原本排版佔位 (visibility: hidden)' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="d-flex gap-2">
    <div class="p-3 bg-primary text-white rounded">方塊 A (visible)</div>
    <div class="p-3 bg-secondary text-white rounded invisible">方塊 B (invisible 佔位隱藏)</div>
    <div class="p-3 bg-success text-white rounded">方塊 C (位置不受影響)</div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：使用 invisible 讓方塊隱形並保留排版位置',
      scenario: '請在第二個方塊加上 `invisible`！',
      instructions: [
        '步驟 1：在第二個方塊套用隱藏但佔位可見度 (invisible)。',
        '步驟 2：確保元素內容在畫面上隱形，但原本佔據的排版空間完整保留，不讓後續元素位移。',
      ],
      starterHtml: `<div class="container py-3">
  <div class="d-flex gap-2">
    <div class="p-2 bg-light border">第 1 項</div>
    <div class="p-2 bg-light border">第 2 項 (請隱形)</div>
    <div class="p-2 bg-light border">第 3 項</div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="d-flex gap-2">
    <div class="p-2 bg-light border">第 1 項</div>
    <div class="p-2 bg-light border invisible">第 2 項 (請隱形)</div>
    <div class="p-2 bg-light border">第 3 項</div>
  </div>
</div>`,
      hints: ['為第二個 div 加上 class="invisible"！'],
      rules: [
        {
          description: '必須包含 invisible 類別',
          test: (html) => html.includes('invisible'),
        },
      ],
      xp: 50,
    },
  },
  {
    id: 'util-z-index',
    categoryId: 'utilities',
    title: 'Z-index 工具層級快速套用',
    officialName: 'Z-index',
    level: '高階',
    summary: 'z-0, z-1, z-2, z-3, z-n1 (負層級)，快速調節元素在視線深度上的堆疊層次。',
    teacherDialogue: '最後一招！有時候想做一個飄在卡片後方的半透明幾何背景圓形，就可以給它 z-n1（負 1 層），讓它乖乖退到所有文字後面當背景裝飾！',
    keyClasses: [
      { name: 'z-n1', desc: 'z-index: -1（退到背景後方）' },
      { name: 'z-0 ~ z-3', desc: '正向層級階梯' },
    ],
    teacherHtml: `<div class="container py-3 position-relative" style="height: 120px;">
  <div class="position-absolute z-n1 bg-warning rounded-circle opacity-50" 
       style="width: 80px; height: 80px; top: 10px; left: 30px;"></div>
  <div class="position-absolute z-1 bg-white p-3 rounded shadow" style="top: 25px; left: 50px;">
    <strong>z-1 前景文字：</strong> 黃色圓形乖乖待在我的 z-n1 後面當裝飾！
  </div>
</div>`,
    studentTask: {
      title: '挑戰：將背景裝飾圈設為 z-n1',
      scenario: '請在裝飾圓形上加上 `z-n1`！',
      instructions: [
        '步驟 1：在背景裝飾幾何圓形套用負向深度層級 (z-n1)。',
        '步驟 2：使圓形退居所有內容物後方，作為高質感的背景裝飾圖層。',
      ],
      starterHtml: `<div class="container py-3 position-relative">
  <div class="position-absolute bg-primary rounded-circle" style="width: 60px; height: 60px;"></div>
  <div class="p-3 bg-light border">前面主要內容</div>
</div>`,
      solutionHtml: `<div class="container py-3 position-relative">
  <div class="position-absolute z-n1 bg-primary rounded-circle" style="width: 60px; height: 60px;"></div>
  <div class="p-3 bg-light border rounded">前面主要內容</div>
</div>`,
      hints: ['為裝飾圓形加上 class="z-n1"！'],
      rules: [
        {
          description: '必須包含 z-n1 類別',
          test: (html) => html.includes('z-n1'),
        },
      ],
      xp: 60,
    },
  },
];
