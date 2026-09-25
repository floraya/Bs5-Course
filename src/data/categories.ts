import { CategoryInfo } from '../types/curriculum';

/**
 * 課程目錄大綱：由簡單到困難（初階入門 ➔ 核心佈局 ➔ 實戰元件 ➔ 進階輔助）
 */
export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'content',
    name: '內容排版 (Content)',
    enName: 'Content',
    icon: 'FileText',
    color: '#0d6efd',
    stage: '第 1 階段・入門基礎',
    difficulty: '初階',
    description: '從最基礎的文字、圖片與表格開始！學會 Reboot 樣式重設、Typography 標題美學、自適應防破版圖片與斑馬紋課表。',
  },
  {
    id: 'utilities',
    name: '通用工具 (Utilities)',
    enName: 'Utilities',
    icon: 'Sliders',
    color: '#d63384',
    stage: '第 2 階段・樣式原子',
    difficulty: '初階',
    description: '零 CSS 快速微調！邊框、內外間距 margin/padding、陰影、文字對齊與 Flex 彈性盒對齊助手。',
  },
  {
    id: 'layout',
    name: '佈局系統 (Layout)',
    enName: 'Layout',
    icon: 'LayoutGrid',
    color: '#712cf9',
    stage: '第 3 階段・空間架構',
    difficulty: '中階',
    description: '網頁骨架建造！掌握容器、12 欄網格與響應式斷點，讓網頁在手機與電腦都完美排版。',
  },
  {
    id: 'forms',
    name: '表單輸入 (Forms)',
    enName: 'Forms',
    icon: 'CheckSquare',
    color: '#00d26a',
    stage: '第 4 階段・互動表單',
    difficulty: '中階',
    description: '打造社團報名表、班級幹部投票箱！輸入框、下拉選單、滑動開關、浮動標籤與即時驗證回饋。',
  },
  {
    id: 'components',
    name: '常用元件 (Components)',
    enName: 'Components',
    icon: 'Component',
    color: '#fd7e14',
    stage: '第 5 階段・複合元件',
    difficulty: '中階',
    description: 'Bootstrap 最強大的 UI 元件庫：導覽列 Navbar、彈窗 Modal、輪播圖 Carousel、卡片 Card、手風琴 Accordion 等。',
  },
  {
    id: 'helpers',
    name: '輔助類別 (Helpers)',
    enName: 'Helpers',
    icon: 'Wrench',
    color: '#20c997',
    stage: '第 6 階段・進階專家',
    difficulty: '高階',
    description: '高階排版特效與無障礙強化：垂直堆疊 Stacks、全區可點連結、劇院比例縮放、無障礙焦點環與文字截斷。',
  },
];
