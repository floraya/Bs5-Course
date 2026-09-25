import React, { useState } from 'react';
import { StudentProgress, Lesson } from '../types/curriculum';
import { getLevelInfo, BADGES } from '../utils/gamification';
import { Trophy, Volume2, VolumeX, Sparkles, Code2, CheckCircle2, X, Globe } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface GamificationBarProps {
  progress: StudentProgress;
  allLessons: Lesson[];
  onToggleSound: () => void;
  onOpenPlayground: () => void;
  onOpenGitHubPages?: () => void;
  onUpdateName?: (name: string) => void;
}

export const GamificationBar: React.FC<GamificationBarProps> = ({
  progress,
  allLessons,
  onToggleSound,
  onOpenPlayground,
  onOpenGitHubPages,
  onUpdateName,
}) => {
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(progress.studentName);

  const levelInfo = getLevelInfo(progress.xp);
  const completedCount = progress.completedLessons.length;
  const totalCount = allLessons.length;
  const progressPercent = Math.round((completedCount / (totalCount || 1)) * 100);

  // Compute unlocked badges dynamically
  const unlockedBadges = BADGES.filter((b) => b.condition(progress, allLessons));

  const handleSaveName = () => {
    if (onUpdateName && tempName.trim()) {
      onUpdateName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <>
      <div className="bg-slate-950/90 backdrop-blur border-b border-slate-800/80 px-4 py-2.5">
        <div className="max-w-[1800px] w-full mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Brand & Student Identity */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#712cf9] flex items-center justify-center font-black text-white text-lg shadow-md shadow-purple-600/30">
                B
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-white tracking-tight">
                    Bootstrap 5 高中生互動學院
                  </span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.5 rounded border border-purple-500/30">
                    v5.3
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  {isEditingName ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="bg-slate-800 text-white px-2 py-0.5 rounded text-xs border border-purple-500 focus:outline-none w-24"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveName}
                        className="text-xs text-emerald-400 hover:text-emerald-300"
                      >
                        儲存
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => setIsEditingName(true)}
                      className="cursor-pointer hover:text-purple-300 transition-colors flex items-center gap-1 font-medium"
                      title="點擊修改學生暱稱"
                    >
                      {levelInfo.icon} {progress.studentName} ·{' '}
                      <span className="text-purple-400 font-semibold">{levelInfo.title}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Center: XP Bar & Course Completion */}
          <div className="flex items-center gap-4 flex-1 max-w-md hidden md:flex">
            {/* Level XP Progress */}
            <div className="flex-1">
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  經驗值 (XP)
                </span>
                <span className="font-mono font-bold text-amber-300">
                  {progress.xp} XP
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div
                  className="bg-gradient-to-r from-amber-500 to-purple-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Total Course Progress */}
            <div className="w-36">
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  課程進度
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {completedCount}/{totalCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* GitHub Pages Deploy Guide Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                if (onOpenGitHubPages) onOpenGitHubPages();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 hover:from-purple-800/80 hover:to-indigo-800/80 text-purple-200 hover:text-white border border-purple-500/40 hover:border-purple-400 rounded-xl text-xs font-semibold transition-all shadow-sm shadow-purple-950/40"
              title="如何將本專案發布為免費 GitHub Pages 網站"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">發布到 GitHub Pages</span>
            </button>

            {/* Free Playground Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenPlayground();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-purple-500 rounded-xl text-xs font-semibold transition-all shadow-sm"
              title="自由創作沙盒：組裝自己的校園首頁並匯出 HTML"
            >
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">自由創作沙盒</span>
            </button>

            {/* Badges Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setShowBadgeModal(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>成就 ({unlockedBadges.length}/{BADGES.length})</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              title={progress.soundEnabled ? '靜音音效' : '開啟音效'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              {progress.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-purple-400" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Badges Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">學生榮譽成就徽章榜</h3>
              </div>
              <button
                onClick={() => setShowBadgeModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto p-1">
              {BADGES.map((badge) => {
                const isUnlocked = badge.condition(progress, allLessons);
                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-purple-950/40 to-slate-900 border-purple-500/50 shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="font-bold text-xs text-white mb-0.5">
                      {badge.title}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {badge.description}
                    </div>
                    {isUnlocked && (
                      <span className="mt-2 inline-block text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-500/40">
                        ✓ 已解鎖
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowBadgeModal(false)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-colors"
              >
                返回教室繼續學習
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
