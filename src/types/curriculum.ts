export type CategoryId =
  | 'layout'
  | 'content'
  | 'forms'
  | 'components'
  | 'helpers'
  | 'utilities';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  enName: string;
  icon: string;
  color: string;
  description: string;
  stage?: string;
  difficulty?: '初階' | '中階' | '高階';
}

export interface InteractiveControl {
  id: string;
  label: string;
  type: 'select' | 'toggle';
  options?: { label: string; value: string }[];
  default: string;
}

export interface ValidationRule {
  description: string;
  test: (html: string) => boolean;
}

export interface StudentTask {
  title: string;
  scenario: string;
  instructions: string[];
  starterHtml: string;
  solutionHtml: string;
  hints: string[];
  rules: ValidationRule[];
  xp: number;
}

export interface Lesson {
  id: string;
  categoryId: CategoryId;
  title: string;
  officialName: string;
  level: '初階' | '中階' | '高階';
  summary: string;
  teacherDialogue: string;
  keyClasses: { name: string; desc: string }[];
  teacherHtml: string;
  interactiveControls?: InteractiveControl[];
  studentTask: StudentTask;
}

export interface StudentProgress {
  completedLessons: string[]; // lesson ids
  xp: number;
  level: number;
  unlockedBadges: string[];
  soundEnabled: boolean;
  studentName: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: StudentProgress, allLessons: Lesson[]) => boolean;
}
