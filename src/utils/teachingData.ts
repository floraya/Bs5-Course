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
      return '小幫手解頑疾，層次結構清楚，排版代碼簡約優雅！';
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
        { id: '1', title: '1. col-12 滿版', subtitle: '手機單欄鋪滿' },
        { id: '2', title: '2. col-6 半版', subtitle: '左右雙欄並列' },
        { id: '3', title: '3. col-4 三等分', subtitle: '三欄卡片矩陣' },
        { id: '4', title: '4. col-3 四等分', subtitle: '密集數據展示' },
        { id: '5', title: '5. col-8 + col-4', subtitle: '主內容與側邊欄' },
        { id: '6', title: '6. col-auto 自適應', subtitle: '內容多長佔多長' },
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
          id: 'col-8-4',
          label: 'col-8 + col-4 (二比一黃金比)',
          codeSnippet: '<div class="row g-2"><div class="col-8 bg-purple-600 text-white p-3 rounded">主文章內容 (8/12)</div><div class="col-4 bg-secondary text-white p-3 rounded">側邊公告欄 (4/12)</div></div>',
          explanation: '經典主文（8 等份）配側邊選單（4 等份），部落格與新聞頁面必備結構。',
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
        { id: '1', title: '1. .container', subtitle: '響應式梯形階梯' },
        { id: '2', title: '2. .container-fluid', subtitle: '無邊際 100% 流式' },
        { id: '3', title: '3. .container-sm', subtitle: 'SM 以上才定寬' },
        { id: '4', title: '4. .container-md', subtitle: 'MD 以上才定寬' },
        { id: '5', title: '5. .container-lg', subtitle: 'LG 以上才定寬' },
        { id: '6', title: '6. .container-xl', subtitle: '大螢幕專屬收攏' },
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
      ],
    };
  }

  // Default dynamic lab for any lesson
  const dynamicSteps = [
    { id: '1', title: `1. ${keyClasses[0]?.name || '基礎型態'}`, subtitle: '核心基本語法' },
    { id: '2', title: `2. ${keyClasses[1]?.name || '排版變體'}`, subtitle: '進階衍生樣式' },
    { id: '3', title: `3. ${keyClasses[2]?.name || '響應斷點'}`, subtitle: '自適應各裝置' },
    { id: '4', title: '4. 盒模型與間距', subtitle: '外距內距配置' },
    { id: '5', title: '5. 避坑防爆原則', subtitle: '防止破版秘訣' },
    { id: '6', title: '6. 校園實戰整合', subtitle: '高質感成品' },
  ];

  const dynamicOptions: LabOption[] = keyClasses.length > 0
    ? keyClasses.map((kc, idx) => ({
        id: `opt-${idx}`,
        label: kc.name,
        codeSnippet: `<!-- 使用 ${kc.name} -->\n<div class="${kc.name} p-3 rounded border text-center">\n  示範：${kc.name}\n</div>`,
        explanation: kc.desc,
      }))
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
  const cat = lesson.categoryId;
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
