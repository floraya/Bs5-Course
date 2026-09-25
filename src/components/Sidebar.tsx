import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { ALL_LESSONS } from '../data/allLessons';
import { Lesson, StudentProgress } from '../types/curriculum';
import {
  Search,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Layers,
  PanelLeftClose,
  X,
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  progress: StudentProgress;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLessonId,
  onSelectLesson,
  progress,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  // Group lessons by category
  const lessonsByCategory = useMemo(() => {
    const map: Record<string, Lesson[]> = {};
    CATEGORIES.forEach((cat) => {
      map[cat.id] = ALL_LESSONS.filter((l) => l.categoryId === cat.id);
    });
    return map;
  }, []);

  // Filter lessons based on search query
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    return ALL_LESSONS.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.officialName.toLowerCase().includes(q) ||
        l.summary.toLowerCase().includes(q) ||
        l.keyClasses.some((k) => k.name.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const toggleCategory = (catId: string) => {
    soundManager.playClick();
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleLessonClick = (lessonId: string) => {
    soundManager.playClick();
    onSelectLesson(lessonId);
    // On mobile screens, auto-close the drawer when a lesson is picked
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar Container: Supports full collapse on both desktop & mobile */}
      <aside
        className={`
          fixed lg:relative top-0 bottom-0 left-0 z-40
          bg-slate-950 border-r border-slate-800/80 flex flex-col
          transition-all duration-300 ease-in-out shrink-0
          ${
            isOpen
              ? 'w-72 sm:w-80 translate-x-0 opacity-100 shadow-2xl lg:shadow-none'
              : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:pointer-events-none lg:border-r-0 overflow-hidden'
          }
        `}
        aria-hidden={!isOpen}
      >
        {/* Fixed-width inner container so contents do not squish during slide transition */}
        <div className="w-72 sm:w-80 flex flex-col h-full min-w-[18rem] sm:min-w-[20rem]">
          {/* Sidebar Header with Close/Collapse Button */}
          <div className="p-4 border-b border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-sm text-white">課程目錄大綱</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/40 font-bold">
                  共 77 堂課
                </span>
                {/* Close / Collapse button */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="收合課程大綱 (放大教學畫面)"
                >
                  <PanelLeftClose className="w-4 h-4 hidden lg:block" />
                  <X className="w-4 h-4 lg:hidden" />
                  <span className="sr-only">收合目錄</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋類別、元件或關鍵字..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 hover:text-slate-300"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        {/* Lessons List Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {/* If Search is Active */}
          {filteredLessons ? (
            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 font-semibold px-2 mb-2">
                搜尋結果 ({filteredLessons.length})：
              </div>
              {filteredLessons.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  找不到符合「{searchQuery}」的課程
                </div>
              ) : (
                filteredLessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLessonId;
                  const isDone = progress.completedLessons.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-gradient-to-r from-[#712cf9] to-indigo-600 text-white font-bold shadow-md shadow-purple-600/30'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] opacity-75 font-mono shrink-0 ml-2">
                        {lesson.level}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            <>
              {/* Category Accordion List (Ordered from simple to difficult) */}
              <div className="px-2 py-1.5 bg-purple-950/20 border border-purple-800/30 rounded-lg flex items-center justify-between text-[11px] text-purple-300">
                <span className="flex items-center gap-1 font-bold">
                  <span>📈 學習路徑</span>
                  <span className="text-[10px] text-purple-400">由簡單到困難</span>
                </span>
                <span className="text-[10px] font-mono text-purple-300/80">
                  初階 ➔ 中階 ➔ 高階
                </span>
              </div>

              {CATEGORIES.map((cat, catIdx) => {
              const lessons = lessonsByCategory[cat.id] || [];
              const isCollapsed = collapsedCategories[cat.id];
              const completedInCat = lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;
              const isAllDoneInCat = lessons.length > 0 && completedInCat === lessons.length;

              const difficultyColor =
                cat.difficulty === '初階'
                  ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40'
                  : cat.difficulty === '中階'
                  ? 'text-amber-400 bg-amber-950/50 border-amber-800/40'
                  : 'text-rose-400 bg-rose-950/50 border-rose-800/40';

              return (
                <div key={cat.id} className="rounded-xl overflow-hidden border border-slate-800/60 bg-slate-900/40">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between p-3 text-left bg-slate-900/80 hover:bg-slate-800/80 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-1.5 flex-wrap">
                          <span>{cat.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded border font-mono ${difficultyColor}`}>
                            {cat.difficulty || '初階'}
                          </span>
                          {isAllDoneInCat && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1 rounded border border-emerald-500/30">
                              ✓ 完結
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="text-purple-400 font-mono">階段 {catIdx + 1}</span>
                          <span>·</span>
                          <span>{cat.enName}</span>
                          <span>·</span>
                          <span>{completedInCat}/{lessons.length}</span>
                        </div>
                      </div>
                    </div>
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {/* Lessons Under This Category */}
                  {!isCollapsed && (
                    <div className="p-1 space-y-0.5 bg-slate-950/50">
                      {lessons.map((lesson) => {
                        const isCurrent = lesson.id === currentLessonId;
                        const isDone = progress.completedLessons.includes(lesson.id);

                        const levelBadgeClass =
                          lesson.level === '初階'
                            ? 'text-emerald-400 bg-emerald-950/50 border border-emerald-800/30'
                            : lesson.level === '中階'
                            ? 'text-amber-400 bg-amber-950/50 border border-amber-800/30'
                            : 'text-rose-400 bg-rose-950/50 border border-rose-800/30';

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson.id)}
                            className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center justify-between group ${
                              isCurrent
                                ? 'bg-gradient-to-r from-[#712cf9] to-indigo-600 text-white font-bold shadow-md shadow-purple-600/30'
                                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 shrink-0" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ml-1 ${
                                isCurrent
                                  ? 'text-white bg-white/20'
                                  : levelBadgeClass
                              }`}
                            >
                              {lesson.level}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            </>
          )}
        </div>

        {/* Sidebar Footer Link to Bootstrap Docs */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950">
          <a
            href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors border border-slate-800"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>查閱 Bootstrap 官方說明文件 ↗</span>
          </a>
        </div>
        </div>
      </aside>
    </>
  );
};
