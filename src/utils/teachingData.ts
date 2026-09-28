import { Lesson } from '../types/curriculum';

export interface LabOption {
  id: string;
  label: string;
  sublabel?: string;
  codeSnippet: string;
  explanation: string;
}

export interface LabConfig {
  title: string;
  subtitle: string;
  categoryIcon: string;
  steps: { id: string; title: string; subtitle: string }[];
  options: LabOption[];
}

// Generate high-school-friendly golden mnemonics for every lesson
export function getLessonMnemonic(lesson: Lesson): string {
  const id = lesson.id;
  const cat = lesson.categoryId;

  // Specific high school rhymes
  if (id === 'layout-breakpoints') {
    return '手機直向 col-12 鋪滿滿，平板 col-md-6 雙欄站，筆電 col-lg-4 三劍客齊聚首！';
  }
  if (id === 'layout-containers') {
    return '頁面四周留呼吸，container 自動來置中；若要震撼滿版圖，container-fluid 最管用！';
  }
  if (id === 'layout-grid') {
    return 'container 蓋地基，row 築大梁，col 分十二份，任憑天馬行空隨心裝！';
  }
  if (id === 'layout-columns') {
    return 'col-* 數字定跨欄，col-auto 字多字少自己調，不帶數字平分秋色最省心！';
  }
  if (id === 'layout-gutters') {
    return 'g-* 掌控鄰里好間距，gx 左右 gy 上下走，row 裡設定子項通通齊刷刷！';
  }
  if (id === 'layout-z-index') {
    return 'z-0 至 z-3 定乾坤，懸浮按鈕加彈窗，搭配 position 絕對定位層層明！';
  }
  if (id === 'layout-css-grid') {
    return '開啟 grid 加 gap 間距，g-col-4 原生跨欄帥氣定，現代排版雙軸自由行！';
  }
  if (id === 'comp-tooltips') {
    return '【必考觀念】Tooltip 提示只寫 HTML 不會動！切記頁尾必加 jQuery 初始化：$("[data-bs-toggle=\'tooltip\']").each(function () { new bootstrap.Tooltip(this); });！';
  }
  if (id === 'comp-popovers') {
    return '【必考觀念】Popover 氣泡只寫 HTML 不會動！切記頁尾必加 jQuery 初始化：$("[data-bs-toggle=\'popover\']").each(function () { new bootstrap.Popover(this); });！';
  }
  if (id.startsWith('content-')) {
    return 'display-1 霸氣大標題，lead 引言讓讀者一目了然，table-striped 條紋表格條理分明！';
  }
  if (id.startsWith('forms-')) {
    return 'form-control 圓角邊框好氣質，form-select 下拉清爽好挑選，form-floating 浮動標籤科技感！';
  }
  if (id.startsWith('comp-')) {
    return 'card 萬能圖文包，modal 聚焦彈窗沉穩大器，navbar 導覽列在手機自動折疊超優雅！';
  }
  if (id.startsWith('helpers-')) {
    return 'vstack 垂直排、hstack 水平聚，stretched-link 讓整張卡片一鍵皆可點！';
  }
  if (id.startsWith('util-')) {
    return 'd-flex 彈性盒最快，justify 置中 align 齊；m-* 外距 p-* 內距，顏色 bg-* 隨心提！';
  }

  // Fallback category mnemonic
  switch (cat) {
    case 'layout':
      return '網格地基打得穩，響應排版不翻車；container 包 row，row 裡塞 col！';
    case 'content':
      return '文字重設免跑版，圖片 fluid 自適應，排版精緻閱讀好心情！';
    case 'forms':
      return '輸入驗證防呆好，標籤互動最貼心，校園報名投票零失誤！';
    case 'components':
      return '元件模組化組裝，UI 質感秒升級，開箱即用快速交付！';
    case 'helpers':
      return '小幫手解頑疾，層次結構清楚，排版程式碼簡約優雅！';
    case 'utilities':
      return '原子化 class 靈活調，免寫冗長 CSS，微調間距顏色效率飆！';
    default:
      return '結構在門口點名，class 是外衣，響應式排版最可靠！';
  }
}

// Generate interactive lab configuration for the lesson
export function getLessonLabConfig(lesson: Lesson): LabConfig {
  const keyClasses = lesson.keyClasses || [];
  const primaryClass = keyClasses[0]?.name || 'd-block';

  // Specific lab profiles for popular topics
  if (lesson.id === 'layout-breakpoints' || lesson.id === 'layout-grid') {
    return {
      title: 'Grid & 響應式斷點互動實驗室',
      subtitle: '直觀體驗 Bootstrap 12 等份網格在不同欄位比例下的動態伸展！',
      categoryIcon: '📐',
      steps: [
        { id: 'col-12', title: '1. col-12 滿版', subtitle: '手機單欄鋪滿' },
        { id: 'col-6', title: '2. col-6 半版', subtitle: '左右雙欄並列' },
        { id: 'col-md-4', title: '3. col-4 三等分', subtitle: '三欄卡片矩陣' },
        { id: 'col-3', title: '4. col-3 四等分', subtitle: '密集數據展示' },
        { id: 'col-8-4', title: '5. col-8 + col-4', subtitle: '主內容與側邊欄' },
        { id: 'col-auto', title: '6. col-auto 自適應', subtitle: '內容多長佔多長' },
      ],
      options: [
        {
          id: 'col-12',
          label: 'col-12 (100% 滿版)',
          codeSnippet: '<div class="col-12 bg-primary text-white p-3 rounded">單欄滿版 (12/12)</div>',
          explanation: '佔滿整整 12 等份，在手機直向螢幕（XS）或重點主視覺中最常使用。',
        },
        {
          id: 'col-6',
          label: 'col-6 (50% 雙欄)',
          codeSnippet: '<div class="row g-2"><div class="col-6 bg-info text-dark p-3 rounded">左半邊 (6/12)</div><div class="col-6 bg-warning text-dark p-3 rounded">右半邊 (6/12)</div></div>',
          explanation: '兩欄平分畫面（6+6=12），非常適合手機橫向或並列比較卡片。',
        },
        {
          id: 'col-md-4',
          label: 'col-md-4 (33.3% 三欄)',
          codeSnippet: '<div class="row g-2"><div class="col-4 bg-primary text-white p-2 rounded text-center">欄 1</div><div class="col-4 bg-success text-white p-2 rounded text-center">欄 2</div><div class="col-4 bg-danger text-white p-2 rounded text-center">欄 3</div></div>',
          explanation: '三欄並列（4+4+4=12），校園三大特色社團、推薦活動排版黃金比例！',
        },
        {
          id: 'col-3',
          label: 'col-3 (25% 四等分)',
          codeSnippet: '<div class="row g-2"><div class="col-3 bg-primary text-white p-2 rounded text-center">1/4</div><div class="col-3 bg-secondary text-white p-2 rounded text-center">2/4</div><div class="col-3 bg-success text-white p-2 rounded text-center">3/4</div><div class="col-3 bg-danger text-white p-2 rounded text-center">4/4</div></div>',
          explanation: '四等分均勻分配（3×4=12），非常適合指標數據卡片（KPI）、相片畫廊縮圖。',
        },
        {
          id: 'col-8-4',
          label: 'col-8 + col-4 (二比一黃金比)',
          codeSnippet: '<div class="row g-2"><div class="col-8 bg-purple-600 text-white p-3 rounded">主文章內容 (8/12)</div><div class="col-4 bg-secondary text-white p-3 rounded">側邊公告欄 (4/12)</div></div>',
          explanation: '經典主文（8 等份）配側邊選單（4 等份），部落格與新聞頁面必備結構。',
        },
        {
          id: 'col-auto',
          label: 'col-auto (內容寬度自適應)',
          codeSnippet: '<div class="row g-2 align-items-center"><div class="col-auto bg-dark text-white p-2 rounded">自動依內容定寬</div><div class="col bg-light text-dark p-2 rounded border">自動平分填滿其餘空間</div></div>',
          explanation: '依據子元件內容長度自適應寬度，配合不帶數字的 col 自動吸附填滿剩餘空間！',
        },
      ],
    };
  }

  if (lesson.id === 'layout-containers') {
    return {
      title: 'Container 容器寬度限制實驗室',
      subtitle: '觀察固定寬度與全螢幕流式容器在螢幕上的邊界變化！',
      categoryIcon: '📦',
      steps: [
        { id: 'container', title: '1. .container', subtitle: '響應式梯形階梯' },
        { id: 'container-fluid', title: '2. .container-fluid', subtitle: '無邊際 100% 流式' },
        { id: 'container-sm', title: '3. .container-sm', subtitle: 'SM 以上才定寬 (576px)' },
        { id: 'container-md', title: '4. .container-md', subtitle: 'MD 以上才定寬 (768px)' },
        { id: 'container-lg', title: '5. .container-lg', subtitle: 'LG 以上才定寬 (992px)' },
        { id: 'container-xl', title: '6. .container-xl', subtitle: 'XL 以上才定寬 (1200px)' },
      ],
      options: [
        {
          id: 'container',
          label: '.container (標準階梯式居中)',
          codeSnippet: '<div class="container bg-primary text-white p-3 rounded text-center">.container 水平置中，兩側保留呼吸邊界</div>',
          explanation: '根據各螢幕斷點自動切換最佳閱讀寬度（例如桌機固定為 960px 或 1140px），文字閱讀最舒適。',
        },
        {
          id: 'container-fluid',
          label: '.container-fluid (100% 滿版流式)',
          codeSnippet: '<div class="container-fluid bg-indigo text-white p-3 rounded text-center">.container-fluid 永遠 100% 貼合視窗兩側</div>',
          explanation: '不論螢幕多大多小，寬度恆為 100%，最適合全版背景輪播圖、滿版頂部導航列。',
        },
        {
          id: 'container-sm',
          label: '.container-sm (≥576px 定寬)',
          codeSnippet: '<div class="container-sm bg-success text-white p-3 rounded text-center">.container-sm (手機 100%，平板以上階梯定寬)</div>',
          explanation: '在小螢幕（<576px）呈現 100% 滿版，到了 576px（SM 斷點）以上才開始水平居中收攏。',
        },
        {
          id: 'container-md',
          label: '.container-md (≥768px 定寬)',
          codeSnippet: '<div class="container-md bg-warning text-dark p-3 rounded text-center">.container-md (平板直向以下 100%)</div>',
          explanation: '在直向平板以下皆為滿版，在 768px（MD 斷點）以上才居中鎖定寬度。',
        },
        {
          id: 'container-lg',
          label: '.container-lg (≥992px 定寬)',
          codeSnippet: '<div class="container-lg bg-danger text-white p-3 rounded text-center">.container-lg (筆電大螢幕以上才定寬)</div>',
          explanation: '992px 筆電或桌機以上才限縮寬度，讓行動版能擁有最自由的滿版空間。',
        },
        {
          id: 'container-xl',
          label: '.container-xl (≥1200px 定寬)',
          codeSnippet: '<div class="container-xl bg-dark text-white p-3 rounded text-center">.container-xl (寬螢幕超大視窗專屬)</div>',
          explanation: '針對 1200px 寬螢幕設計，大螢幕維持 1140px 定寬避免橫向過長影響閱讀。',
        },
      ],
    };
  }

  if (lesson.id === 'comp-tooltips') {
    return {
      title: 'Tooltips 滑鼠懸停提示實驗室',
      subtitle: '直觀體驗 Bootstrap 5 Tooltip 屬性宣告與 jQuery 初始化的搭配！',
      categoryIcon: '💬',
      steps: [
        { id: 'tooltip-top', title: '1. 上方提示 (top)', subtitle: '預設往上浮現提示' },
        { id: 'tooltip-bottom', title: '2. 下方提示 (bottom)', subtitle: '按鈕上方空間不足時往下' },
        { id: 'tooltip-right', title: '3. 左右側提示 (right/left)', subtitle: '配合側欄或圖示定位' },
        { id: 'tooltip-jquery', title: '4. jQuery 初始化程式碼', subtitle: '實務必備！手動啟用核心' },
      ],
      options: [
        {
          id: 'tooltip-top',
          label: 'data-bs-placement="top"',
          codeSnippet: `<button type="button" class="btn btn-primary"
        data-bs-toggle="tooltip" 
        data-bs-placement="top" 
        data-bs-title="這是上方浮現的提示文字！">
  滑鼠移過來 (Top)
</button>

<!-- ⚡ 必備：jQuery 初始化程式碼（寫在 </body> 前） -->
<script>
  $('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this);
  });
</script>`,
          explanation: '【上方提示】設定 data-bs-placement="top"，滑鼠移上按鈕時在正上方浮現黑色小提示。必須搭配下方 jQuery 初始化腳本！',
        },
        {
          id: 'tooltip-bottom',
          label: 'data-bs-placement="bottom"',
          codeSnippet: `<button type="button" class="btn btn-success"
        data-bs-toggle="tooltip" 
        data-bs-placement="bottom" 
        data-bs-title="這是下方浮現的提示文字！">
  滑鼠移過來 (Bottom)
</button>

<!-- ⚡ 必備：jQuery 初始化程式碼（寫在 </body> 前） -->
<script>
  $('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this);
  });
</script>`,
          explanation: '【下方提示】設定 data-bs-placement="bottom"，適用於頂部導航列或上方貼齊視窗邊界的按鈕。',
        },
        {
          id: 'tooltip-right',
          label: 'data-bs-placement="right/left"',
          codeSnippet: `<div class="d-flex gap-3 justify-content-center">
  <button type="button" class="btn btn-info text-white"
          data-bs-toggle="tooltip" data-bs-placement="left"
          data-bs-title="靠左提示">
    ← 靠左 (Left)
  </button>
  <button type="button" class="btn btn-warning text-dark"
          data-bs-toggle="tooltip" data-bs-placement="right"
          data-bs-title="靠右提示">
    靠右 (Right) →
  </button>
</div>

<!-- ⚡ 必備：jQuery 初始化程式碼（寫在 </body> 前） -->
<script>
  $('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this);
  });
</script>`,
          explanation: '【左右提示】透過 data-bs-placement="left" 或 "right" 讓提示從左右兩側滑出。',
        },
        {
          id: 'tooltip-jquery',
          label: 'jQuery 初始化程式碼',
          codeSnippet: `<script>
  // ⚡ 實務必備：jQuery 初始化 Tooltips（寫在 </body> 標籤前）
  $('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this);
  });
</script>`,
          explanation: '【實務必備】Bootstrap 5 採 Opt-in 機制，只寫 HTML 屬性不會動！必須在 </body> 標籤前加入這段 jQuery 初始化程式碼，遍歷所有 data-bs-toggle="tooltip" 並實例化 new bootstrap.Tooltip(this)。',
        },
      ],
    };
  }

  if (lesson.id === 'comp-popovers') {
    return {
      title: 'Popovers 彈出資訊泡泡實驗室',
      subtitle: '直觀體驗 Bootstrap 5 Popover 標題、內文與 jQuery 初始化的搭配！',
      categoryIcon: '💡',
      steps: [
        { id: 'popover-basic', title: '1. 標題與內文', subtitle: 'data-bs-title & content' },
        { id: 'popover-top', title: '2. 向上彈出 (top)', subtitle: '控制氣泡顯示方位' },
        { id: 'popover-right', title: '3. 橫向彈出 (right)', subtitle: '在按鈕右側展開氣泡' },
        { id: 'popover-jquery', title: '4. jQuery 初始化程式碼', subtitle: '實務必備！手動啟用核心' },
      ],
      options: [
        {
          id: 'popover-basic',
          label: '基本 Popover (點擊觸發)',
          codeSnippet: `<button type="button" class="btn btn-danger"
        data-bs-toggle="popover" 
        data-bs-title="💡 什麼是 APX 檢定？" 
        data-bs-content="由清華大學主辦的高中數理能力測驗，是大學申請入學時極具公信力的加分證明！">
  點我查看簡介 (Popover)
</button>

<!-- ⚡ 必備：jQuery 初始化程式碼（寫在 </body> 前） -->
<script>
  $('[data-bs-toggle="popover"]').each(function () {
    new bootstrap.Popover(this);
  });
</script>`,
          explanation: '【基本 Popover】包含 data-bs-title（氣泡標題）與 data-bs-content（氣泡內文），點選按鈕時跳出。必須搭配下方 jQuery 初始化腳本！',
        },
        {
          id: 'popover-top',
          label: 'data-bs-placement="top"',
          codeSnippet: `<button type="button" class="btn btn-warning text-dark"
        data-bs-toggle="popover" 
        data-bs-placement="top"
        data-bs-title="📌 報名提醒" 
        data-bs-content="報名截止日期為下週五中午 12:00，逾期不予受理。">
  向上展開泡泡 (Top)
</button>

<!-- ⚡ 必備：jQuery 初始化程式碼（寫在 </body> 前） -->
<script>
  $('[data-bs-toggle="popover"]').each(function () {
    new bootstrap.Popover(this);
  });
</script>`,
          explanation: '【上方彈出】設定 data-bs-placement="top"，氣泡會在按鈕正上方彈出。',
        },
        {
          id: 'popover-right',
          label: 'data-bs-placement="right"',
          codeSnippet: `<button type="button" class="btn btn-info text-dark"
        data-bs-toggle="popover" 
        data-bs-placement="right"
        data-bs-title="📊 成績級分規則" 
        data-bs-content="前標為全體到考考生成績計算之第 75 百分位數。">
  向右展開泡泡 (Right)
</button>

<!-- ⚡ 必備：jQuery 初始化程式碼（寫在 </body> 前） -->
<script>
  $('[data-bs-toggle="popover"]').each(function () {
    new bootstrap.Popover(this);
  });
</script>`,
          explanation: '【右側彈出】設定 data-bs-placement="right"，非常適合表格或側邊欄的操作說明。',
        },
        {
          id: 'popover-jquery',
          label: 'jQuery 初始化程式碼',
          codeSnippet: `<script>
  // ⚡ 實務必備：jQuery 初始化 Popovers（寫在 </body> 標籤前）
  $('[data-bs-toggle="popover"]').each(function () {
    new bootstrap.Popover(this);
  });
</script>`,
          explanation: '【實務必備】Bootstrap 5 採 Opt-in 機制，只寫 HTML 屬性不會動！必須在 </body> 標籤前加入這段 jQuery 初始化程式碼，遍歷所有 data-bs-toggle="popover" 並實例化 new bootstrap.Popover(this)。',
        },
      ],
    };
  }

  // Default dynamic lab for any lesson: strictly generate steps that match actual options so every button is 100% functional
  const dynamicSteps = keyClasses.length > 0
    ? keyClasses.map((kc, idx) => ({
        id: `opt-${idx}`,
        title: `${idx + 1}. ${kc.name.split(' ')[0]}`,
        subtitle: kc.desc.length > 16 ? kc.desc.slice(0, 16) + '...' : kc.desc,
      }))
    : [
        { id: 'opt-default', title: `1. ${primaryClass}`, subtitle: '核心基本語法' },
      ];

  const dynamicOptions: LabOption[] = keyClasses.length > 0
    ? keyClasses.map((kc, idx) => {
        const isDataAttr = kc.name.startsWith('data-');
        const isJQuery = kc.name.includes('jQuery');
        let snippet = '';
        if (isJQuery) {
          snippet = `<!-- jQuery 初始化程式碼 -->\n<script>\n  ${kc.desc}\n</script>`;
        } else if (isDataAttr) {
          snippet = `<button type="button" class="btn btn-primary" ${kc.name}>\n  示範按鈕\n</button>`;
        } else {
          snippet = `<!-- 範例：${kc.name} -->\n<div class="${kc.name.replace(/["'=]/g, '').trim()} p-3 rounded border text-center">\n  示範：${kc.name}\n</div>`;
        }
        return {
          id: `opt-${idx}`,
          label: kc.name,
          codeSnippet: snippet,
          explanation: kc.desc,
        };
      })
    : [
        {
          id: 'opt-default',
          label: primaryClass,
          codeSnippet: `<div class="${primaryClass}">示範內容</div>`,
          explanation: '此為本課程推薦之標準類別語法。',
        },
      ];

  return {
    title: `${lesson.officialName} 互動實驗室`,
    subtitle: `用最直觀的視覺實驗，搞懂 ${lesson.officialName} 的底層排版心智模型`,
    categoryIcon: '📐',
    steps: dynamicSteps,
    options: dynamicOptions,
  };
}

// Generate Pitfall vs Master Comparison
export function getLessonPitfallVsMaster(lesson: Lesson): {
  pitfallTitle: string;
  pitfallCode: string;
  pitfallDesc: string;
  masterTitle: string;
  masterCode: string;
  masterDesc: string;
} {
  const id = lesson.id;
  const cat = lesson.categoryId;

  if (id === 'comp-tooltips' || id === 'comp-popovers') {
    const isTooltip = id === 'comp-tooltips';
    const compName = isTooltip ? 'Tooltip' : 'Popover';
    const toggleAttr = isTooltip ? 'tooltip' : 'popover';
    const constructorName = isTooltip ? 'Tooltip' : 'Popover';
    return {
      pitfallTitle: `❌ 新手翻車：以為只寫 data-bs-toggle="${toggleAttr}" 就會動，漏寫 JS`,
      pitfallCode: `<!-- ⚠️ 只有 HTML，在外部真實網頁中完全不會彈出！ -->\n<button type="button" class="btn btn-primary"\n        data-bs-toggle="${toggleAttr}"\n        data-bs-title="這是提示內容">\n  滑鼠移過來 / 點我\n</button>`,
      pitfallDesc: `【核心致命傷】Bootstrap 5 官方基於載入效能考量，${compName} 採 Opt-in 機制。沒有在 <script> 寫 JavaScript 初始化，瀏覽器根本不會去監聽它！`,
      masterTitle: `✅ 大師寫法：HTML 宣告屬性 + 頁尾 jQuery 初始化（兩者缺一不可）`,
      masterCode: `<!-- 1. HTML 元件結構 -->\n<button type="button" class="btn btn-primary"\n        data-bs-toggle="${toggleAttr}"\n        data-bs-title="這是提示內容">\n  滑鼠移過來 / 點我\n</button>\n\n<!-- 2. </body> 前必須加入 jQuery 初始化程式碼！ -->\n<script>\n  $('[data-bs-toggle="${toggleAttr}"]').each(function () {\n    new bootstrap.${constructorName}(this);\n  });\n</script>`,
      masterDesc: `使用 jQuery 選擇器 $('[data-bs-toggle="${toggleAttr}"]').each(...) 遍歷所有元素，再以 new bootstrap.${constructorName}(this) 完成啟用！`,
    };
  }
  if (cat === 'layout') {
    return {
      pitfallTitle: '❌ 新手翻車：直接在 row 裡面丟雜物沒包 col',
      pitfallCode: '<div class="row">\n  <p>直接寫文字或是加自訂 margin...</p>\n</div>',
      pitfallDesc: 'row 自帶負邊距（negative margin），如果子元素不是 col，邊界會直接外溢破版，在手機上出現橫向捲軸！',
      masterTitle: '✅ 大師寫法：container -> row -> col 鐵三角',
      masterCode: '<div class="container">\n  <div class="row">\n    <div class="col-12 col-md-6">\n      <p>所有內容都安全包在 col 內</p>\n    </div>\n  </div>\n</div>',
      masterDesc: '嚴格遵守三層鐵三角結構，利用 col 的左右 padding 完美抵消 row 的負邊距，百分之百穩定！',
    };
  }

  if (cat === 'utilities') {
    return {
      pitfallTitle: '❌ 新手翻車：亂寫 inline style 破壞系統比例',
      pitfallCode: '<div style="margin-left: 23px; padding-top: 17px;">...</div>',
      pitfallDesc: '手動魔術數字讓整個團隊的設計節奏失調，在不同裝置切換時難以維護！',
      masterTitle: '✅ 大師寫法：使用標準工具類別 m-*, p-*, gap-*',
      masterCode: '<div class="ms-3 pt-3 gap-2 d-flex">...</div>',
      masterDesc: '使用 Bootstrap 基於 0.25rem ~ 3rem 的標準間距階梯，視覺一致又支援響應式前後綴！',
    };
  }

  return {
    pitfallTitle: '❌ 新手翻車：手動硬幹 CSS 重造輪子',
    pitfallCode: '<button style="background: red; border-radius: 8px;">按鈕</button>',
    pitfallDesc: '缺少無障礙 focus-ring、缺少 hover 與 active 反饋狀態，在各瀏覽器上呈現不一。',
    masterTitle: '✅ 大師寫法：善用 Bootstrap 原生模組化類別',
    masterCode: `<button class="btn btn-danger shadow-sm">\n  <i class="bi bi-star"></i> 專業按鈕\n</button>`,
    masterDesc: '內建流暢過渡動畫、鍵盤焦點無障礙無縫支援，且自動享有深淺色主題適配！',
  };
}
