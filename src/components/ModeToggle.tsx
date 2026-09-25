import React from 'react';
import { soundManager } from '../utils/sound';

export type LearningMode = 'teacher' | 'student' | 'split';

interface ModeToggleProps {
  mode: LearningMode;
  onChange: (newMode: LearningMode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onChange }) => {
  const handleSelect = (newMode: LearningMode) => {
    soundManager.playClick();
    onChange(newMode);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Primary Pill Toggle Switch - Matching screenshot style exactly */}
      <div className="inline-flex items-center bg-[#070b14] border border-slate-700/80 rounded-full p-1 shadow-inner">
        {/* 老師教學 Mode */}
        <button
          onClick={() => handleSelect('teacher')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
            mode === 'teacher'
              ? 'bg-[#0095ff] text-white shadow-md shadow-blue-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span className="text-base leading-none">📖</span>
          <span className="text-base leading-none">👩‍🏫</span>
          <span>老師教學</span>
        </button>

        {/* 學生學習 Mode */}
        <button
          onClick={() => handleSelect('student')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
            mode === 'student'
              ? 'bg-[#712cf9] text-white shadow-md shadow-purple-500/25'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span className="font-mono text-xs text-purple-300 font-bold">&lt;/&gt;</span>
          <span className="text-base leading-none">👨‍🎓</span>
          <span>學生學習</span>
        </button>
      </div>

      {/* Split Mode Toggle Button */}
      <button
        onClick={() => handleSelect(mode === 'split' ? 'student' : 'split')}
        title="同時查看老師範例與學生實作區"
        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 flex items-center gap-1.5 ${
          mode === 'split'
            ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-sm'
            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
        }`}
      >
        <span>⚡ 雙欄比對</span>
      </button>
    </div>
  );
};
