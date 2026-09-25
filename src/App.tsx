import React, { useState, useEffect } from 'react';
import { ALL_LESSONS, getLessonById, getNextLessonId, getPrevLessonId } from './data/allLessons';
import { StudentProgress } from './types/curriculum';
import { INITIAL_PROGRESS, getLevelInfo, BADGES } from './utils/gamification';
import { soundManager } from './utils/sound';
import { GamificationBar } from './components/GamificationBar';
import { Sidebar } from './components/Sidebar';
import { ModeToggle, LearningMode } from './components/ModeToggle';
import { TeacherView } from './components/TeacherView';
import { StudentView } from './components/StudentView';
import { SplitView } from './components/SplitView';
import { PlaygroundModal } from './components/PlaygroundModal';
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PROGRESS_STORAGE_KEY = 'bs_academy_student_progress';
const LAST_LESSON_KEY = 'bs_academy_last_lesson_id';
const SIDEBAR_OPEN_KEY = 'bs_academy_sidebar_open';

export default function App() {
  // Load progress from localStorage
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROGRESS;
  });

  // Current active lesson
  const [currentLessonId, setCurrentLessonId] = useState<string>(() => {
    const saved = localStorage.getItem(LAST_LESSON_KEY);
    return saved && getLessonById(saved) ? saved : ALL_LESSONS[0].id;
  });

  // Mode: 'teacher' | 'student' | 'split'
  const [mode, setMode] = useState<LearningMode>('teacher');

  // Sidebar toggle state (persisted to localStorage; defaults to open on desktop)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_OPEN_KEY);
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  });

  // Free playground modal state
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  // Active toast banner for level up or badges
  const [toastNotification, setToastNotification] = useState<{
    title: string;
    description: string;
    icon: string;
  } | null>(null);

  // Sync sound settings with SoundManager
  useEffect(() => {
    soundManager.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Save progress
  const saveProgress = (updated: StudentProgress) => {
    setProgress(updated);
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
  };

  // Toggle sidebar and persist
  const handleToggleSidebar = () => {
    soundManager.playClick();
    setIsSidebarOpen((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_OPEN_KEY, JSON.stringify(next));
      return next;
    });
  };

  // Switch lesson
  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    localStorage.setItem(LAST_LESSON_KEY, lessonId);
  };

  const currentLesson = getLessonById(currentLessonId) || ALL_LESSONS[0];
  const prevLessonId = getPrevLessonId(currentLesson.id);
  const nextLessonId = getNextLessonId(currentLesson.id);

  // Lesson completion callback
  const handleLessonComplete = (lessonId: string, earnedXp: number) => {
    const oldLevel = getLevelInfo(progress.xp).currentLevel;
    const isNewCompletion = !progress.completedLessons.includes(lessonId);

    const newCompleted = isNewCompletion
      ? [...progress.completedLessons, lessonId]
      : progress.completedLessons;

    const newXp = isNewCompletion ? progress.xp + earnedXp : progress.xp;
    const newLevelInfo = getLevelInfo(newXp);

    const updatedProgress: StudentProgress = {
      ...progress,
      completedLessons: newCompleted,
      xp: newXp,
      level: newLevelInfo.currentLevel,
    };

    saveProgress(updatedProgress);

    // Check Level Up
    if (newLevelInfo.currentLevel > oldLevel) {
      setTimeout(() => {
        soundManager.playLevelUp();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ffd700', '#712cf9', '#00e5ff'],
        });
        setToastNotification({
          title: `🎊 恭喜升級！榮升至 ${newLevelInfo.title}！`,
          description: '解鎖更高階校園網頁排版權限！繼續加油！',
          icon: '👑',
        });
        setTimeout(() => setToastNotification(null), 5000);
      }, 500);
    }
  };

  const handleToggleSound = () => {
    const nextVal = !progress.soundEnabled;
    soundManager.setEnabled(nextVal);
    saveProgress({ ...progress, soundEnabled: nextVal });
    if (nextVal) soundManager.playClick();
  };

  const handleUpdateStudentName = (name: string) => {
    saveProgress({ ...progress, studentName: name });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-[#712cf9]/40 selection:text-white">
      {/* 1. Global Gamification Header */}
      <GamificationBar
        progress={progress}
        allLessons={ALL_LESSONS}
        onToggleSound={handleToggleSound}
        onOpenPlayground={() => setIsPlaygroundOpen(true)}
        onUpdateName={handleUpdateStudentName}
      />

      {/* 2. Sub-Header: Lesson Context & Dual-Role Mode Switcher */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 sticky top-0 z-20 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-[1800px] w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Sidebar Collapse/Expand Toggle & Lesson Title */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Collapse / Expand Button */}
            <button
              onClick={handleToggleSidebar}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all shrink-0 ${
                isSidebarOpen
                  ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700 shadow-sm'
                  : 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border-purple-500/50 shadow-md shadow-purple-950/40 ring-1 ring-purple-500/30'
              }`}
              title={isSidebarOpen ? '收合課程目錄（放大教學畫面）' : '展開課程目錄大綱'}
            >
              {isSidebarOpen ? (
                <>
                  <PanelLeftClose className="w-4 h-4 text-purple-400" />
                  <span className="hidden sm:inline">收合目錄</span>
                </>
              ) : (
                <>
                  <PanelLeftOpen className="w-4 h-4 text-purple-400" />
                  <span>展開目錄</span>
                  <span className="text-[10px] bg-purple-500/30 px-1.5 py-0.2 rounded-full font-mono text-purple-200 font-bold">
                    77 課
                  </span>
                </>
              )}
            </button>

            <div className="truncate flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                  {currentLesson.officialName}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {currentLesson.level}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white truncate">
                {currentLesson.title}
              </h2>
            </div>
          </div>

          {/* Center / Right: The Exact Mode Toggle as in User's Screenshot */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <ModeToggle mode={mode} onChange={setMode} />

            {/* Prev / Next Lesson quick buttons */}
            <div className="flex items-center gap-1">
              <button
                disabled={!prevLessonId}
                onClick={() => {
                  if (prevLessonId) handleSelectLesson(prevLessonId);
                }}
                title="上一堂課"
                className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-700/60"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={!nextLessonId}
                onClick={() => {
                  if (nextLessonId) handleSelectLesson(nextLessonId);
                }}
                title="下一堂課"
                className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-700/60"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Toast Level-Up / Badge Celebration Banner */}
      {toastNotification && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-gradient-to-r from-purple-900 to-indigo-900 border-2 border-purple-400/80 p-4 rounded-2xl shadow-2xl animate-bounce">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{toastNotification.icon}</span>
            <div>
              <div className="font-extrabold text-sm text-white">
                {toastNotification.title}
              </div>
              <div className="text-xs text-purple-200">
                {toastNotification.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Main Body: Sidebar + Dynamic Workspace View */}
      <div className="flex-1 flex max-w-[1800px] w-full mx-auto overflow-hidden">
        {/* Course Catalog Sidebar */}
        <Sidebar
          currentLessonId={currentLesson.id}
          onSelectLesson={handleSelectLesson}
          progress={progress}
          isOpen={isSidebarOpen}
          onClose={() => {
            setIsSidebarOpen(false);
            localStorage.setItem(SIDEBAR_OPEN_KEY, JSON.stringify(false));
          }}
        />

        {/* Dynamic Center Stage */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto custom-scrollbar transition-all">
          {/* Notice & Quick Expand button when sidebar is collapsed */}
          {!isSidebarOpen && (
            <div className="hidden lg:flex items-center justify-between mb-4 px-4 py-2.5 bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-slate-950/40 border border-purple-500/30 rounded-xl backdrop-blur shadow-sm animate-fadeIn">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-purple-300 font-bold">已進入超寬大畫面教學模式</span>
                <span className="text-slate-400">（目錄已收合，提供最寬敞的代碼編寫與即時預覽空間）</span>
              </div>
              <button
                onClick={handleToggleSidebar}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 hover:text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
              >
                <PanelLeftOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>展開目錄大綱 (77堂)</span>
              </button>
            </div>
          )}

          {mode === 'teacher' && (
            <TeacherView
              lesson={currentLesson}
              onSwitchToStudent={() => setMode('student')}
              prevLessonId={prevLessonId}
              nextLessonId={nextLessonId}
              onPrevLesson={() => prevLessonId && handleSelectLesson(prevLessonId)}
              onNextLesson={() => nextLessonId && handleSelectLesson(nextLessonId)}
            />
          )}

          {mode === 'student' && (
            <StudentView
              lesson={currentLesson}
              progress={progress}
              onLessonComplete={handleLessonComplete}
              onNextLesson={() => {
                if (nextLessonId) handleSelectLesson(nextLessonId);
              }}
            />
          )}

          {mode === 'split' && (
            <SplitView
              lesson={currentLesson}
              progress={progress}
              onLessonComplete={handleLessonComplete}
            />
          )}
        </main>
      </div>

      {/* 5. Free Campus Creation Sandbox Modal */}
      <PlaygroundModal
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
      />
    </div>
  );
}
