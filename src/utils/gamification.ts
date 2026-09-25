import { AchievementBadge, Lesson, StudentProgress } from '../types/curriculum';

export const INITIAL_PROGRESS: StudentProgress = {
  completedLessons: [],
  xp: 0,
  level: 1,
  unlockedBadges: [],
  soundEnabled: true,
  studentName: '高中新星',
};

export const LEVEL_TITLES = [
  { minXp: 0, level: 1, title: 'Lv.1 網頁初心者', icon: '🌱' },
  { minXp: 150, level: 2, title: 'Lv.2 社團小小網管', icon: '💻' },
  { minXp: 350, level: 3, title: 'Lv.3 班級資訊股長', icon: '⚡' },
  { minXp: 700, level: 4, title: 'Lv.4 校園前端學徒', icon: '🔥' },
  { minXp: 1200, level: 5, title: 'Lv.5 社團公關部長', icon: '🎨' },
  { minXp: 1900, level: 6, title: 'Lv.6 校慶專案策展人', icon: '🎪' },
  { minXp: 2800, level: 7, title: 'Lv.7 校刊排版技術總監', icon: '📰' },
  { minXp: 3800, level: 8, title: 'Lv.8 全國黑客松新星', icon: '🚀' },
  { minXp: 5000, level: 9, title: 'Lv.9 前端架構實戰極客', icon: '💎' },
  { minXp: 6500, level: 10, title: 'Lv.10 Bootstrap 傳奇宗師', icon: '👑' },
];

export function getLevelInfo(xp: number) {
  let current = LEVEL_TITLES[0];
  let next = LEVEL_TITLES[1] || null;

  for (let i = 0; i < LEVEL_TITLES.length; i++) {
    if (xp >= LEVEL_TITLES[i].minXp) {
      current = LEVEL_TITLES[i];
      next = LEVEL_TITLES[i + 1] || null;
    } else {
      break;
    }
  }

  const currentLevelMin = current.minXp;
  const nextLevelMin = next ? next.minXp : current.minXp + 2000;
  const progressPercent = Math.min(
    100,
    Math.round(((xp - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100)
  );

  return {
    currentLevel: current.level,
    title: current.title,
    icon: current.icon,
    progressPercent,
    currentXp: xp,
    nextLevelXp: nextLevelMin,
  };
}

export const BADGES: AchievementBadge[] = [
  {
    id: 'first_lesson',
    title: '初試啼聲',
    description: '完成人生第 1 堂 Bootstrap 互動實作課程！',
    icon: '🎯',
    condition: (progress) => progress.completedLessons.length >= 1,
  },
  {
    id: 'layout_master',
    title: '空間幾何學霸',
    description: '全數攻克 Layout 佈局系統（8 課全通關）！',
    icon: '📐',
    condition: (progress, allLessons) => {
      const layoutLessons = allLessons.filter((l) => l.categoryId === 'layout').map((l) => l.id);
      return layoutLessons.every((id) => progress.completedLessons.includes(id));
    },
  },
  {
    id: 'content_master',
    title: '文青排版大師',
    description: '通關 Content 內容文字與表格系統！',
    icon: '📖',
    condition: (progress, allLessons) => {
      const contentLessons = allLessons.filter((l) => l.categoryId === 'content').map((l) => l.id);
      return contentLessons.every((id) => progress.completedLessons.includes(id));
    },
  },
  {
    id: 'forms_expert',
    title: '表單互動專家',
    description: '成功掌握 Forms 全系列 9 大表單驗證輸入技巧！',
    icon: '📝',
    condition: (progress, allLessons) => {
      const formsLessons = allLessons.filter((l) => l.categoryId === 'forms').map((l) => l.id);
      return formsLessons.every((id) => progress.completedLessons.includes(id));
    },
  },
  {
    id: 'components_enthusiast',
    title: '元件收藏大亨',
    description: '解鎖超過 15 個 Bootstrap 常用 UI 元件！',
    icon: '🧩',
    condition: (progress, allLessons) => {
      const compLessons = allLessons.filter((l) => l.categoryId === 'components').map((l) => l.id);
      const doneCount = compLessons.filter((id) => progress.completedLessons.includes(id)).length;
      return doneCount >= 15;
    },
  },
  {
    id: 'helpers_wizard',
    title: '排版瑞士刀',
    description: '完成 Helpers 輔助類別全系列挑戰！',
    icon: '🛠️',
    condition: (progress, allLessons) => {
      const helperLessons = allLessons.filter((l) => l.categoryId === 'helpers').map((l) => l.id);
      return helperLessons.every((id) => progress.completedLessons.includes(id));
    },
  },
  {
    id: 'xp_1000',
    title: '破千經驗之光',
    description: '累計累積突破 1,000 XP 點數！',
    icon: '⭐',
    condition: (progress) => progress.xp >= 1000,
  },
  {
    id: 'grand_master',
    title: '全域大滿貫',
    description: '完成全部 77 堂課程，榮登全校最強 Bootstrap 大師！',
    icon: '🏆',
    condition: (progress, allLessons) => {
      return allLessons.length > 0 && progress.completedLessons.length >= allLessons.length;
    },
  },
];
