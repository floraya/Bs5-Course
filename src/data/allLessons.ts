import { Lesson } from '../types/curriculum';
import { LESSONS_CONTENT } from './lessonsContent';
import { LESSONS_UTILITIES } from './lessonsUtilities';
import { LESSONS_LAYOUT } from './lessonsLayout';
import { LESSONS_FORMS } from './lessonsForms';
import { LESSONS_COMPONENTS } from './lessonsComponents';
import { LESSONS_HELPERS } from './lessonsHelpers';

/**
 * 完整課程清單：依學習曲線「由簡單到困難」嚴格排序
 * 內容排版 (入門) ➔ 通用工具 (基礎) ➔ 佈局系統 (核心) ➔ 表單輸入 (互動) ➔ 常用元件 (複合) ➔ 輔助類別 (進階)
 */
export const ALL_LESSONS: Lesson[] = [
  ...LESSONS_CONTENT,
  ...LESSONS_UTILITIES,
  ...LESSONS_LAYOUT,
  ...LESSONS_FORMS,
  ...LESSONS_COMPONENTS,
  ...LESSONS_HELPERS,
];

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((lesson) => lesson.id === id);
}

export function getNextLessonId(currentId: string): string | null {
  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === currentId);
  if (currentIndex >= 0 && currentIndex < ALL_LESSONS.length - 1) {
    return ALL_LESSONS[currentIndex + 1].id;
  }
  return null;
}

export function getPrevLessonId(currentId: string): string | null {
  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === currentId);
  if (currentIndex > 0) {
    return ALL_LESSONS[currentIndex - 1].id;
  }
  return null;
}
