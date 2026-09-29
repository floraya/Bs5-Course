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

export interface VisualLayerChild {
  label: string;
  sublabel?: string;
  span?: number;
  bgColor?: string;
  textColor?: string;
  badge?: string;
}

export interface VisualLayer {
  label: string;
  sublabel?: string;
  borderStyle?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  badge?: string;
  children?: VisualLayerChild[];
}

export interface VisualDiagramConfig {
  title: string;
  subtitle: string;
  badge: string;
  explanation: string;
  layers: VisualLayer[];
}

// Generate topic-specific architectural visual diagrams matching each lesson's theme
export function getLessonVisualDiagram(lesson: Lesson): VisualDiagramConfig {
  const id = lesson.id;
  const cat = lesson.categoryId;

  // 1. Grid & Breakpoints
  if (id === 'layout-breakpoints' || id === 'layout-grid') {
    return {
      title: 'Grid 網格 12 等分軌道架構',
      subtitle: '外層限制寬度，中層提供水平軌道，內層依 12 等分自由分配欄寬',
      badge: '📐 網格鐵三角',
      explanation: 'Bootstrap 網格系統由 container（限制兩側邊界）、row（水平軌道並提供負外距）與 col（依據 12 等分分割欄位寬度）三層鐵三角組成，手機直向為 col-12，平板為 col-md-6，筆電為 col-lg-4。',
      layers: [
        {
          label: '.container / .container-fluid (最外層定寬或滿版容器)',
          sublabel: '限制螢幕最大閱讀寬度，並於兩側提供自適應邊界 padding',
          borderColor: 'border-sky-500/50',
          bgColor: 'bg-sky-950/20',
          textColor: 'text-sky-300',
          badge: '外層',
          children: [
            {
              label: '.row (水平網格軌道，消除外溢)',
              sublabel: '內部具有負外距 (negative margins) 以抵消欄位左右內距',
              span: 12,
              bgColor: 'bg-purple-900/40',
              textColor: 'text-purple-300',
              badge: '中層軌道',
            },
          ],
        },
        {
          label: '12 等分欄位分配範例 (總和等於 12)',
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-emerald-950/20',
          textColor: 'text-emerald-300',
          children: [
            { label: '.col-4 (33.3%)', sublabel: '左側主要欄', span: 4, bgColor: 'bg-sky-600/80', textColor: 'text-white' },
            { label: '.col-4 (33.3%)', sublabel: '中央推薦欄', span: 4, bgColor: 'bg-indigo-600/80', textColor: 'text-white' },
            { label: '.col-4 (33.3%)', sublabel: '右側資訊欄', span: 4, bgColor: 'bg-emerald-600/80', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 2. Containers
  if (id === 'layout-containers') {
    return {
      title: 'Container 容器邊界與滿版對比',
      subtitle: '比較階梯定寬容器與 100% 全螢幕流式容器在視窗中的展現',
      badge: '📦 容器模型',
      explanation: '標準 .container 依據螢幕斷點（576px, 768px, 992px, 1200px, 1400px）階梯式鎖定最大閱讀寬度並自動水平居中；而 .container-fluid 則永遠貼齊螢幕兩側 100% 滿版無邊際。',
      layers: [
        {
          label: '.container-fluid (100% 永遠貼齊兩側螢幕無邊界)',
          sublabel: '寬螢幕與滿版輪播首頁最常使用，永遠維持 100% 視窗寬度',
          borderColor: 'border-blue-500/50',
          bgColor: 'bg-blue-950/20',
          textColor: 'text-blue-300',
          badge: '滿版流式',
          children: [
            {
              label: '.container (階梯響應式居中定寬：例如 960px 或 1140px，兩側保留呼吸留白)',
              sublabel: 'SM ≥ 540px · MD ≥ 720px · LG ≥ 960px · XL ≥ 1140px',
              span: 12,
              bgColor: 'bg-sky-600/70',
              textColor: 'text-white',
              badge: '置中閱讀',
            },
          ],
        },
      ],
    };
  }

  // 3. Columns
  if (id === 'layout-columns') {
    return {
      title: 'Columns 垂直居中與 offset-* 推移架構',
      subtitle: '利用 align-items-center 達成垂直居中，搭配 offset-* 達成水平推移',
      badge: '📐 欄位對齊',
      explanation: '父層 .row 宣告 align-items-center 可消除左右高度差異帶來的突兀感；內部子元素搭配 offset-md-2 或 offset-lg-3 即可向右推移指定格數，達成不需空欄位的優雅居中。',
      layers: [
        {
          label: '.row.align-items-center (垂直對齊軸線)',
          sublabel: '以同一水平中心線為基準，使高矮內容垂直居中',
          borderColor: 'border-amber-500/50',
          bgColor: 'bg-amber-950/20',
          textColor: 'text-amber-300',
          children: [
            { label: '.col-md-8.offset-md-2 (佔8欄向右推2欄，達成居中)', span: 8, bgColor: 'bg-amber-600/80', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 4. Gutters
  if (id === 'layout-gutters') {
    return {
      title: 'Gutters 網格間距排水溝機制',
      subtitle: '負外距與內距完美相抵，消除邊界溢出',
      badge: '🌊 間距機制',
      explanation: 'Bootstrap 5 的網格間距透過 row 的負外距（-margin）與 col 的內距（padding）相抵消，g-0 到 g-5 精準控制欄位與欄位間隔，且外緣永不溢出破版。',
      layers: [
        {
          label: '.row.g-3 (負邊距 -0.5rem)',
          borderColor: 'border-cyan-500/50',
          bgColor: 'bg-cyan-950/20',
          textColor: 'text-cyan-300',
          children: [
            { label: 'col (p-2 內距)', span: 6, bgColor: 'bg-cyan-700/80', textColor: 'text-white' },
            { label: 'col (p-2 內距)', span: 6, bgColor: 'bg-cyan-700/80', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 5. CSS Grid
  if (id === 'layout-css-grid') {
    return {
      title: 'CSS Grid 原生二維現代網格架構',
      subtitle: '原生 display: grid 與 .g-col-* 跨欄寬度',
      badge: '⚡ 原生網格',
      explanation: '原生 CSS Grid 容器直接提供 12 等分欄位與原生 gap 間距，子元素透過 .g-col-6 或 .g-col-4 指定跨越欄數，完全不依賴傳統 Flexbox float 或 row 負外距！',
      layers: [
        {
          label: '.grid.gap-3 (display: grid; grid-template-columns: repeat(12, 1fr))',
          borderColor: 'border-violet-500/50',
          bgColor: 'bg-violet-950/20',
          textColor: 'text-violet-300',
          children: [
            { label: '.g-col-6 (跨 6 欄)', span: 6, bgColor: 'bg-violet-600/80', textColor: 'text-white' },
            { label: '.g-col-6 (跨 6 欄)', span: 6, bgColor: 'bg-violet-600/80', textColor: 'text-white' },
            { label: '.g-col-4 (跨 4 欄)', span: 4, bgColor: 'bg-indigo-600/80', textColor: 'text-white' },
            { label: '.g-col-4 (跨 4 欄)', span: 4, bgColor: 'bg-indigo-600/80', textColor: 'text-white' },
            { label: '.g-col-4 (跨 4 欄)', span: 4, bgColor: 'bg-indigo-600/80', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 6. Accordion
  if (id === 'comp-accordion') {
    return {
      title: 'Accordion 手風琴摺疊三層架構',
      subtitle: '主容器 -> 項目單元 -> [標題按鈕] 與 [折疊內文]',
      badge: '📑 手風琴',
      explanation: '手風琴外層由 .accordion 統整，每個問答單元由 .accordion-item 包裹；點擊 .accordion-button 透過 data-bs-target 控制下方 .accordion-collapse 折疊面板的 show 狀態。',
      layers: [
        {
          label: '.accordion#faqAccordion (主容器，提供 data-bs-parent 互斥作用域)',
          borderColor: 'border-sky-500/50',
          bgColor: 'bg-slate-900/60',
          textColor: 'text-sky-300',
          children: [
            { label: '.accordion-header > .accordion-button (可點擊標題)', span: 12, bgColor: 'bg-sky-600/80', textColor: 'text-white' },
            { label: '.accordion-collapse.show > .accordion-body (展開之說明內文)', span: 12, bgColor: 'bg-slate-800', textColor: 'text-slate-200' },
          ],
        },
      ],
    };
  }

  // 7. Modal
  if (id === 'comp-modal') {
    return {
      title: 'Modal 彈跳對話框多層次遮罩架構',
      subtitle: '半透明背景黑幕 -> 居中視窗主體 -> [Header / Body / Footer]',
      badge: '🪟 彈跳視窗',
      explanation: 'Modal 彈窗由全螢幕半透明遮罩 .modal、定位與寬度控制 .modal-dialog、白色內容卡片 .modal-content，以及內部的三段式結構（modal-header 標題列、modal-body 內文區、modal-footer 操作按鈕列）組成。',
      layers: [
        {
          label: '.modal (全螢幕黑幕遮罩 backdrop)',
          borderColor: 'border-purple-500/50',
          bgColor: 'bg-black/60',
          textColor: 'text-purple-300',
          children: [
            {
              label: '.modal-dialog.modal-dialog-centered (置中對話框外框)',
              span: 12,
              bgColor: 'bg-slate-900/90',
              textColor: 'text-purple-200',
              badge: 'dialog',
            },
            {
              label: '.modal-content (白色/深色卡片主體)',
              span: 12,
              bgColor: 'bg-slate-800',
              textColor: 'text-white',
              badge: 'header · body · footer',
            },
          ],
        },
      ],
    };
  }

  // 8. Carousel
  if (id === 'comp-carousel') {
    return {
      title: 'Carousel 輪播投影片架構',
      subtitle: '幻燈片包裹層 + 底部指示器 + 左右切換控制箭頭',
      badge: '🎠 輪播圖',
      explanation: '輪播外層包含 .carousel slide，內部由 .carousel-inner 容納多張 .carousel-item，並由 .carousel-indicators 提供底部指示條與 .carousel-control-prev/next 實現上一張/下一張操控。',
      layers: [
        {
          label: '.carousel.slide (輪播總容器，宣告 data-bs-ride="carousel")',
          borderColor: 'border-amber-500/50',
          bgColor: 'bg-amber-950/20',
          textColor: 'text-amber-300',
          children: [
            { label: '.carousel-indicators (底部指示點導覽列)', span: 12, bgColor: 'bg-amber-700/60', textColor: 'text-amber-100' },
            { label: '.carousel-inner > .carousel-item.active (當前正在呈現的幻燈片畫面)', span: 12, bgColor: 'bg-blue-600/80', textColor: 'text-white' },
            { label: '左右切換箭頭 (.carousel-control-prev / next)', span: 12, bgColor: 'bg-slate-800', textColor: 'text-slate-300' },
          ],
        },
      ],
    };
  }

  // 9. Navs & Tabs
  if (id === 'comp-navs-tabs') {
    return {
      title: 'Navs & Tabs 分頁切換連動架構',
      subtitle: '上方導航分頁列點選，下方 tab-pane 內容即時切換',
      badge: '📑 分頁籤',
      explanation: '分頁籤由導航籤列表（.nav.nav-tabs 內含各個 .nav-link）與內容容器（.tab-content 內含各個 .tab-pane）形成資料對應，點擊特定分頁標籤即會切換顯示對應的內容面板。',
      layers: [
        {
          label: '.nav.nav-tabs (分頁標籤導航列)',
          borderColor: 'border-sky-500/50',
          bgColor: 'bg-sky-950/20',
          textColor: 'text-sky-300',
          children: [
            { label: '.nav-link.active (已選中分頁)', span: 4, bgColor: 'bg-sky-500', textColor: 'text-slate-950' },
            { label: '.nav-link (未選中分頁)', span: 4, bgColor: 'bg-slate-800', textColor: 'text-slate-400' },
            { label: '.nav-link (未選中分頁)', span: 4, bgColor: 'bg-slate-800', textColor: 'text-slate-400' },
          ],
        },
        {
          label: '.tab-content (分頁面板主容器)',
          borderColor: 'border-slate-700',
          bgColor: 'bg-slate-900',
          textColor: 'text-slate-300',
          children: [
            { label: '.tab-pane.fade.show.active (當前顯示之內容資訊區塊)', span: 12, bgColor: 'bg-slate-800/90', textColor: 'text-sky-200' },
          ],
        },
      ],
    };
  }

  // 10. Navbar
  if (id === 'comp-navbar') {
    return {
      title: 'Navbar 響應式導覽列架構',
      subtitle: '品牌標誌 + 手機漢堡切換按鈕 + 折疊選單連結',
      badge: '🧭 導覽列',
      explanation: 'Navbar 包含品牌 Logo (.navbar-brand)、手機端折疊開關 (.navbar-toggler) 以及在桌機水平展開、在手機端向下折疊的選單主體 (.collapse.navbar-collapse)。',
      layers: [
        {
          label: '.navbar.navbar-expand-lg (導覽列最外層容器)',
          borderColor: 'border-emerald-500/50',
          bgColor: 'bg-emerald-950/20',
          textColor: 'text-emerald-300',
          children: [
            { label: '.navbar-brand (校名/Logo)', span: 3, bgColor: 'bg-emerald-600', textColor: 'text-white' },
            { label: '.navbar-toggler (手機漢堡按鈕)', span: 3, bgColor: 'bg-slate-800', textColor: 'text-emerald-300' },
            { label: '.navbar-collapse (各項導航選單連結 .nav-link)', span: 6, bgColor: 'bg-slate-700', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 11. Cards
  if (id === 'comp-card') {
    return {
      title: 'Card 萬能圖文包架構',
      subtitle: '頂部圖片 + 內容卡身 + 底部操作區塊',
      badge: '🃏 卡片',
      explanation: 'Card 元件將資訊打包為一體，依序嵌套頂部圖片（.card-img-top）、核心內容主體（.card-body，包含 card-title 與 card-text）以及附帶按鈕的底部區域（.card-footer）。',
      layers: [
        {
          label: '.card.shadow-sm (卡片外框主容器，附帶圓角與細緻外框)',
          borderColor: 'border-slate-600',
          bgColor: 'bg-slate-900/60',
          textColor: 'text-slate-200',
          children: [
            { label: '.card-img-top (頂部圖片區塊)', span: 12, bgColor: 'bg-blue-700/80', textColor: 'text-white' },
            { label: '.card-body (包含 .card-title 標題與 .card-text 說明)', span: 12, bgColor: 'bg-slate-800', textColor: 'text-slate-200' },
            { label: '.card-footer (卡片底部操作按鈕或補充資訊)', span: 12, bgColor: 'bg-slate-950', textColor: 'text-slate-400' },
          ],
        },
      ],
    };
  }

  // 12. Forms & Validation
  if (id === 'forms-validation') {
    return {
      title: 'Form Validation 表單驗證回饋架構',
      subtitle: '輸入欄位 -> 點擊「確認送出報名表」觸發 jQuery 檢核 -> 顯示紅/綠狀態反饋',
      badge: '📝 表單驗證',
      explanation: '表單驗證架構由輸入控制項（.form-control）、驗證狀態類別（.is-invalid 紅色錯誤驚嘆號、.is-valid 綠色正確打勾），以及下方的狀態提示訊息（.invalid-feedback 與 .valid-feedback）組成。點擊確認送出時，透過 jQuery 判斷欄位內容，空白立即呈現紅色錯誤提醒！',
      layers: [
        {
          label: 'form#signupForm (報名表單容器)',
          borderColor: 'border-amber-500/50',
          bgColor: 'bg-amber-950/20',
          textColor: 'text-amber-300',
          children: [
            { label: '未填寫欄位: .form-control.is-invalid (紅色邊框)', sublabel: '.invalid-feedback: ❌ 欄位不可為空白，請填寫！', span: 12, bgColor: 'bg-rose-700/80', textColor: 'text-white' },
            { label: '已填寫欄位: .form-control.is-valid (綠色邊框)', sublabel: '.valid-feedback: ✅ 格式正確無誤！', span: 12, bgColor: 'bg-emerald-700/80', textColor: 'text-white' },
            { label: '操作按鈕: .btn.btn-primary.btn-send', sublabel: '點擊觸發 jQuery 驗證邏輯，判斷欄位有效性', span: 12, bgColor: 'bg-sky-600', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  if (id.startsWith('forms-')) {
    return {
      title: 'Form 表單元件與驗證反饋架構',
      subtitle: '表單標籤 + 輸入控制項 + 即時狀態提示 (is-valid / is-invalid)',
      badge: '📝 表單模型',
      explanation: 'Bootstrap 表單由表單標籤（.form-label）、控制輸入框（.form-control / .form-select）以及驗證反饋文字（.valid-feedback 與 .invalid-feedback）組成，結構層次清晰易懂。',
      layers: [
        {
          label: 'form.needs-validation (外層表單容器，支援 was-validated 激活動態樣式)',
          borderColor: 'border-amber-500/50',
          bgColor: 'bg-amber-950/20',
          textColor: 'text-amber-300',
          children: [
            { label: '.form-label (欄位中文標題說明)', span: 12, bgColor: 'bg-slate-800', textColor: 'text-slate-200' },
            { label: '.form-control.is-valid / .is-invalid (輸入框本體，自動帶綠勾或紅驚嘆號)', span: 12, bgColor: 'bg-emerald-700/80', textColor: 'text-white' },
            { label: '.valid-feedback / .invalid-feedback (狀態說明提示文字)', span: 12, bgColor: 'bg-slate-900', textColor: 'text-emerald-300' },
          ],
        },
      ],
    };
  }

  // 13. Stacks
  if (id === 'helpers-stacks') {
    return {
      title: 'Stacks 水平與垂直堆疊架構',
      subtitle: '比寫 Flexbox 更簡潔！hstack 水平堆疊 + ms-auto 自動分推',
      badge: '📚 堆疊工具',
      explanation: 'Stacks 提供 hstack（水平橫向排列）與 vstack（垂直直向排列），並利用 gap-* 控制項目間距；搭配 ms-auto 可以輕易將特定子元素自動推移至最右側。',
      layers: [
        {
          label: '.hstack.gap-3 (水平堆疊容器)',
          borderColor: 'border-teal-500/50',
          bgColor: 'bg-teal-950/20',
          textColor: 'text-teal-300',
          children: [
            { label: '項目 1', span: 3, bgColor: 'bg-teal-600', textColor: 'text-white' },
            { label: '項目 2', span: 3, bgColor: 'bg-teal-600', textColor: 'text-white' },
            { label: '項目 3 (.ms-auto 自動推至右側)', span: 6, bgColor: 'bg-indigo-600', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 14. Colored Links
  if (id === 'helpers-colored-links') {
    return {
      title: 'Colored links 彩色超連結與 link-offset 間距架構',
      subtitle: '色彩主題連結 + link-offset-* 微調下劃線垂直下移',
      badge: '🔗 超連結美學',
      explanation: 'Colored links 提供 link-primary, link-success, link-danger 等主題彩色超連結；透過 link-offset-1 ~ link-offset-3 可以精確控制底線與文字下邊緣的距離，使字母不會被底線生硬切斷。',
      layers: [
        {
          label: '.link-primary.link-offset-2 (藍色超連結 + 垂直下移 2px)',
          borderColor: 'border-blue-500/50',
          bgColor: 'bg-blue-950/20',
          textColor: 'text-blue-300',
          children: [
            { label: '文字內容 (Hover 自動明暗微調)', span: 6, bgColor: 'bg-blue-600', textColor: 'text-white' },
            { label: '下劃線 (link-offset-2 微調留白)', span: 6, bgColor: 'bg-sky-500', textColor: 'text-slate-950' },
          ],
        },
      ],
    };
  }

  // 15. Link 連結進階
  if (id === 'util-link') {
    return {
      title: 'Link 連結進階樣式與底線控制架構',
      subtitle: 'link-underline-* 自訂底線色彩與 link-underline-opacity-* 透明度控制',
      badge: '🎨 底線大師',
      explanation: 'Bootstrap 5.3 全新 Link 工具能將文字色彩與底線色彩完全脫鉤！例如使用 link-dark 黑色文字搭配 link-underline-danger 紅色底線，並透過 link-underline-opacity-0 預設隱藏底線、hover 時才平滑浮現。',
      layers: [
        {
          label: 'a.link-dark.link-offset-2.link-underline-danger (黑字紅線結構)',
          borderColor: 'border-rose-500/50',
          bgColor: 'bg-rose-950/20',
          textColor: 'text-rose-300',
          children: [
            { label: '黑色文字本體 (link-dark)', span: 6, bgColor: 'bg-slate-800', textColor: 'text-white' },
            { label: '紅色底線 (link-underline-danger)', span: 6, bgColor: 'bg-rose-600', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 16. Position 工具
  if (id === 'util-position') {
    return {
      title: 'Position 快速定位與貼附吸附架構',
      subtitle: '父層 relative + 子層 absolute 釘選徽章，搭配 sticky-bottom 貼底操作列',
      badge: '📍 定位系統',
      explanation: '定位工具包含兩個重要場景：第一是以 position-relative 為父層基準，搭配 position-absolute top-0 end-0 translate-middle 精準釘選右上角徽章；第二是 sticky-bottom / sticky-top，在網頁滾動時自動黏著吸附於視窗邊緣！',
      layers: [
        {
          label: '.position-relative (相對定位基準容器)',
          borderColor: 'border-purple-500/50',
          bgColor: 'bg-purple-950/20',
          textColor: 'text-purple-300',
          children: [
            { label: '主內容區塊', span: 8, bgColor: 'bg-slate-800', textColor: 'text-white' },
            { label: '.position-absolute.top-0.start-100.translate-middle (右上角徽章)', span: 4, bgColor: 'bg-rose-600', textColor: 'text-white' },
          ],
        },
        {
          label: '.sticky-bottom (隨滾動吸附黏於視窗底部之操作列)',
          borderColor: 'border-amber-500/50',
          bgColor: 'bg-amber-950/20',
          textColor: 'text-amber-300',
          children: [
            { label: '固定貼底操作功能列 (sticky-bottom)', span: 12, bgColor: 'bg-amber-600', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 17. Utilities: Text
  if (id === 'util-text') {
    return {
      title: 'Text 文字對齊與響應式斷點架構',
      subtitle: 'text-{sm,md,lg,xl,xxl}-{start,center,end} 跨尺寸對齊調適',
      badge: '✍️ 文字排版',
      explanation: '文字對齊工具支援完整的響應式斷點語法，例如 text-start text-md-center text-lg-end，能讓標題或口號在手機直向靠左、平板置中、在寬螢幕桌機優雅靠右！',
      layers: [
        {
          label: '.text-start.text-md-center.text-lg-end (響應式自適應文字)',
          borderColor: 'border-indigo-500/50',
          bgColor: 'bg-indigo-950/20',
          textColor: 'text-indigo-300',
          children: [
            { label: '手機 (<768px): 靠左對齊 (text-start)', span: 4, bgColor: 'bg-sky-600', textColor: 'text-white' },
            { label: '平板 (≥768px): 水平置中 (text-md-center)', span: 4, bgColor: 'bg-purple-600', textColor: 'text-white' },
            { label: '桌機 (≥992px): 靠右對齊 (text-lg-end)', span: 4, bgColor: 'bg-emerald-600', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 14. Utilities: Flex
  if (id === 'util-flex') {
    return {
      title: 'Flex 彈性盒模型主軸與交叉軸架構',
      subtitle: '主軸 (justify-content) 控制水平分佈，交叉軸 (align-items) 控制垂直置中',
      badge: '🤸 彈性盒',
      explanation: 'd-flex 激活彈性盒佈局，主軸透過 justify-content（start, center, end, between, around）排布，交叉軸透過 align-items（start, center, end）對齊，並能透過 flex-column / flex-md-row 在不同螢幕切換排列方向。',
      layers: [
        {
          label: '.d-flex.justify-content-between.align-items-center (Flexbox 彈性盒容器)',
          borderColor: 'border-sky-500/50',
          bgColor: 'bg-sky-950/20',
          textColor: 'text-sky-300',
          children: [
            { label: '子元件 A (左側貼齊)', span: 4, bgColor: 'bg-sky-600', textColor: 'text-white' },
            { label: '中心水平主軸空間 (自動分配)', span: 4, bgColor: 'bg-slate-800/60', textColor: 'text-slate-400' },
            { label: '子元件 B (右側貼齊)', span: 4, bgColor: 'bg-indigo-600', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 15. Utilities: Display
  if (id === 'util-display') {
    return {
      title: 'Display 顯示模式與流向架構',
      subtitle: 'block (獨占換行) vs inline (行內流動) vs inline-block (自訂寬高並排)',
      badge: '🖥️ 顯示流向',
      explanation: 'd-block 使元素獨占一行並支援自訂寬高；d-inline-block 既能與相鄰元素並排，又能自由設定寬高與 padding；d-none 則完全隱藏且不佔用任何版面空間。',
      layers: [
        {
          label: '.d-block (區塊模式：100% 獨占整行)',
          borderColor: 'border-blue-500/50',
          bgColor: 'bg-blue-950/20',
          textColor: 'text-blue-300',
          children: [
            { label: '獨占整行區塊 (d-block)', span: 12, bgColor: 'bg-blue-600', textColor: 'text-white' },
          ],
        },
        {
          label: '.d-inline-block (行內區塊模式：並排同行且可設定寬度高度)',
          borderColor: 'border-emerald-500/50',
          bgColor: 'bg-emerald-950/20',
          textColor: 'text-emerald-300',
          children: [
            { label: '方塊 1 (d-inline-block)', span: 6, bgColor: 'bg-emerald-600', textColor: 'text-white' },
            { label: '方塊 2 (d-inline-block)', span: 6, bgColor: 'bg-emerald-600', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // 16. Utilities: Spacing
  if (id === 'util-spacing') {
    return {
      title: 'Spacing 盒模型外距與內距架構',
      subtitle: 'Margin (推開鄰居外距) -> Border (邊框) -> Padding (呼吸內距) -> Content (內容)',
      badge: '📦 盒模型',
      explanation: 'CSS 盒模型由外而內包含：Margin（外距，負責推開隔壁鄰居元素）、Border（邊框邊界）、Padding（內距，盒子內容與邊框之間的呼吸留白空間），以及最核心的 Content（文字與內容實體）。',
      layers: [
        {
          label: 'Margin (m-* 外距，推開周圍元素)',
          borderColor: 'border-amber-500/60',
          bgColor: 'bg-amber-950/30',
          textColor: 'text-amber-300',
          children: [
            {
              label: 'Border (邊框邊界) + Padding (p-* 內距呼吸空間)',
              span: 12,
              bgColor: 'bg-emerald-800/70',
              textColor: 'text-emerald-100',
              badge: '內距層',
            },
            {
              label: 'Content (文字與圖片內容核心)',
              span: 12,
              bgColor: 'bg-sky-600',
              textColor: 'text-white',
              badge: '內容核心',
            },
          ],
        },
      ],
    };
  }

  // 17. Utilities: Sizing
  if (id === 'util-sizing') {
    return {
      title: 'Sizing 尺寸百分比與視窗高寬架構',
      subtitle: 'w-* / h-* 百分比控制，搭配 vw-100 / vh-100 滿版視窗',
      badge: '📏 尺寸規格',
      explanation: 'Bootstrap 提供 25%、50%、75%、100% 的百分比寬度與高度類別（w-*, h-*）；同時支援 vw-100、vh-100 與 min-vh-100 等視窗可視區專用單位，輕鬆打造全螢幕沉浸式頁面。',
      layers: [
        {
          label: '視窗滿版高度 (min-vh-100 / vh-100) 與寬度 (vw-100)',
          borderColor: 'border-cyan-500/50',
          bgColor: 'bg-cyan-950/20',
          textColor: 'text-cyan-300',
          children: [
            { label: 'w-25 (25%)', span: 3, bgColor: 'bg-cyan-700', textColor: 'text-white' },
            { label: 'w-50 (50%)', span: 6, bgColor: 'bg-blue-600', textColor: 'text-white' },
            { label: 'w-100 (100% 滿幅寬度)', span: 12, bgColor: 'bg-indigo-600', textColor: 'text-white' },
          ],
        },
      ],
    };
  }

  // Default dynamic visual diagram
  return {
    title: `${lesson.officialName} 視覺架構示意`,
    subtitle: `解構 ${lesson.officialName} 的 DOM 階層與視覺排版關聯`,
    badge: '🎨 視覺結構',
    explanation: `本元件遵循 Bootstrap 5 模組化規範，外層容器建立作用範圍與定位，內部子元素依照功能階層清晰拆分，具備絕佳的響應式自適應能力。`,
    layers: [
      {
        label: `${lesson.officialName} 主架構容器`,
        sublabel: lesson.summary,
        borderColor: 'border-sky-500/50',
        bgColor: 'bg-sky-950/20',
        textColor: 'text-sky-300',
        children: lesson.keyClasses.slice(0, 4).map((kc, idx) => ({
          label: kc.name,
          sublabel: kc.desc,
          span: 12,
          bgColor: idx % 2 === 0 ? 'bg-sky-700/70' : 'bg-indigo-700/70',
          textColor: 'text-white',
        })),
      },
    ],
  };
}
