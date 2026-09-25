import React, { useState } from 'react';
import { Lesson } from '../types/curriculum';
import { SandboxPreview } from './SandboxPreview';
import { VSCodeBlock } from './VSCodeBlock';
import { CATEGORIES } from '../data/categories';
import { ALL_LESSONS } from '../data/allLessons';
import { getLessonMnemonic, getLessonLabConfig, getLessonPitfallVsMaster } from '../utils/teachingData';
import { soundManager } from '../utils/sound';
import {
  ArrowRight,
  Maximize2,
  Copy,
  Check,
  Sparkles,
  Trophy,
  Layers,
  Code2,
  Play,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';

interface TeacherViewProps {
  lesson: Lesson;
  onSwitchToStudent: () => void;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  prevLessonId?: string | null;
  nextLessonId?: string | null;
}

type TabType = 'visual' | 'metaphor' | 'pitfall' | 'keypoints' | 'syntax' | 'lab';
type CodeTab = 'css' | 'html';

export const TeacherView: React.FC<TeacherViewProps> = ({
  lesson,
  onSwitchToStudent,
  onPrevLesson,
  onNextLesson,
  prevLessonId,
  nextLessonId,
}) => {
  // Active feature tab (defaults to 排版實驗室 to match screenshot)
  const [activeTab, setActiveTab] = useState<TabType>('lab');

  // Active code inspector tab on bottom right
  const [codeTab, setCodeTab] = useState<CodeTab>('html');
  const [copiedCode, setCopiedCode] = useState(false);

  // Expanded full screen modal for right preview
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [modalCodeTab, setModalCodeTab] = useState<'preview' | 'html' | 'css' | 'split'>('preview');
  const [modalSubCodeTab, setModalSubCodeTab] = useState<'html' | 'css'>('html');
  const [copiedModalCode, setCopiedModalCode] = useState(false);

  // Interactive Lab state
  const labConfig = getLessonLabConfig(lesson);
  const [activeStepId, setActiveStepId] = useState<string>('1');
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    labConfig.options[0]?.id || ''
  );

  // Selected option data
  const currentOption =
    labConfig.options.find((o) => o.id === selectedOptionId) ||
    labConfig.options[0];

  // Metadata calculations
  const lessonIndex = ALL_LESSONS.findIndex((l) => l.id === lesson.id);
  const currentUnit = lessonIndex >= 0 ? lessonIndex + 1 : 1;
  const totalUnits = ALL_LESSONS.length;
  const category = CATEGORIES.find((c) => c.id === lesson.categoryId) || CATEGORIES[0];
  const mnemonic = getLessonMnemonic(lesson);
  const pitfallData = getLessonPitfallVsMaster(lesson);

  const handleCopyCode = () => {
    const textToCopy =
      codeTab === 'html'
        ? lesson.teacherHtml
        : lesson.keyClasses.map((k) => `/* ${k.desc} */\n.${k.name} { /* Bootstrap 5 核心類別 */ }`).join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    soundManager.playClick();
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyModalCode = (target: 'html' | 'css') => {
    const textToCopy =
      target === 'html'
        ? lesson.teacherHtml
        : `/* Bootstrap 5 核心樣式規則速查表 */\n/* 課程：${lesson.officialName} · ${lesson.title} */\n\n` +
          lesson.keyClasses
            .map(
              (k) =>
                `/* ${k.desc} */\n.${k.name} {\n  box-sizing: border-box;\n  /* 自動響應與邊界計算規則 */\n}`
            )
            .join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    soundManager.playClick();
    setCopiedModalCode(true);
    setTimeout(() => setCopiedModalCode(false), 2000);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* ============================================================ */}
      {/* 1. TOP HERO BANNER: Exactly matching uploaded screenshot layout */}
      {/* ============================================================ */}
      <div className="bg-[#0b101d] border border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          {/* Left: Unit Index, Big Title & Summary */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-sky-400 tracking-wide">
                單元 {currentUnit} / {totalUnits} · {category.name}：{lesson.officialName}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {lesson.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              {lesson.summary}
            </p>
          </div>

          {/* Right: Prev / Next Buttons & Vibrant CTA "讓學生動手做 →" */}
          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
            {/* Prev lesson button */}
            {prevLessonId && onPrevLesson && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onPrevLesson();
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-1 transition-all"
                title="上一堂課"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">上一課</span>
              </button>
            )}

            {/* Next lesson button */}
            {nextLessonId && onNextLesson && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onNextLesson();
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-1 transition-all"
                title="下一堂課"
              >
                <span>下一課</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Primary Action Button: 讓學生動手做 → */}
            <button
              onClick={() => {
                soundManager.playClick();
                onSwitchToStudent();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>讓學生動手做</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN 2-COLUMN GRID (Left: Knowledge & Lab, Right: Preview & Code) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ---------------------------------------------------------- */}
        {/* LEFT COLUMN: Feature Tabs + Golden Mnemonic + Interactive Lab */}
        {/* ---------------------------------------------------------- */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-4">
          <div className="bg-[#090d16] border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
            {/* Card Header row: Badge + Subtitle */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center text-sm">
                👘
              </div>
              <span className="font-bold text-sm text-white">本課重點趣味解析</span>
              <span className="text-[11px] bg-sky-950/80 text-sky-300 border border-sky-800/40 px-2 py-0.5 rounded-full font-bold">
                金手獎特訓講義
              </span>
            </div>

            {/* Horizontal Feature Pills Row: Exactly matching uploaded image */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('visual');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  activeTab === 'visual'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>🎨 視覺圖解</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('metaphor');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  activeTab === 'metaphor'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>🎭 生動比喻</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('pitfall');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  activeTab === 'pitfall'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>⚔️ 翻車 vs 大師</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('keypoints');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  activeTab === 'keypoints'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>📌 核心要點</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('syntax');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  activeTab === 'syntax'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>📋 語法庫</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('lab');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  activeTab === 'lab'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>📐 排版實驗室</span>
              </button>
            </div>

            {/* Golden Mnemonic Banner: Exact match to image */}
            <div className="bg-[#1a150b]/80 border border-amber-600/30 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 shadow-inner">
              <span className="text-base leading-none">🏆</span>
              <div className="text-xs sm:text-sm leading-relaxed">
                <span className="text-amber-400 font-bold mr-1.5">【金手口訣】</span>
                <span className="text-amber-200/95 font-medium">{mnemonic}</span>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* SUB-MODULE CARD: LearnLayout 排版互動實驗室 / 各分頁內容 */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'lab' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
                {/* Lab Title Header */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-lg shrink-0">
                    {labConfig.categoryIcon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{labConfig.title}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {labConfig.subtitle}
                    </p>
                  </div>
                </div>

                {/* 6 Micro-step Buttons Grid (Matching the 6 cards in screenshot) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {labConfig.steps.map((step, idx) => {
                    const isStepActive = activeStepId === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          soundManager.playClick();
                          setActiveStepId(step.id);
                          if (labConfig.options[idx]) {
                            setSelectedOptionId(labConfig.options[idx].id);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isStepActive
                            ? 'bg-sky-500/20 border-sky-400/80 shadow-md shadow-sky-500/10 ring-1 ring-sky-400/40'
                            : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`text-xs font-bold truncate ${
                            isStepActive ? 'text-sky-300' : 'text-slate-200'
                          }`}
                        >
                          {step.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {step.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-options selector pills (like [ display: block ] in screenshot) */}
                <div className="pt-2 border-t border-slate-800/80 space-y-3">
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 font-semibold">
                    <span>💡 核心狀態即時切換比對：</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {labConfig.options.map((opt) => {
                      const isOptionActive = selectedOptionId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedOptionId(opt.id);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                            isOptionActive
                              ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/20'
                              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Visual Simulation Display Box */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                    <div className="text-xs text-sky-300 leading-relaxed font-sans">
                      {currentOption?.explanation}
                    </div>

                    <VSCodeBlock
                      code={currentOption?.codeSnippet || ''}
                      language="html"
                      filename="lab-preview.html"
                      maxHeight="160px"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab: 🎨 視覺圖解 */}
            {activeTab === 'visual' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  視覺骨架架構示意
                </h4>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <div className="border-2 border-dashed border-sky-500/40 rounded-lg p-3 text-center">
                    <span className="text-xs font-mono text-sky-300 font-bold block mb-1">
                      .container (最外層邊界容器)
                    </span>
                    <div className="border-2 border-dashed border-purple-500/40 rounded p-2 text-center my-2">
                      <span className="text-xs font-mono text-purple-300 font-bold block mb-1">
                        .row (水平列排版軌道)
                      </span>
                      <div className="grid grid-cols-12 gap-1 mt-2 text-[10px] text-white">
                        <div className="col-span-4 bg-purple-600/70 p-1.5 rounded">.col-4</div>
                        <div className="col-span-4 bg-blue-600/70 p-1.5 rounded">.col-4</div>
                        <div className="col-span-4 bg-emerald-600/70 p-1.5 rounded">.col-4</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    如同建築工程的鋼筋結構：由外而內固定比例，任何裝置螢幕都能精準等比自動調適。
                  </p>
                </div>
              </div>
            )}

            {/* Tab: 🎭 生動比喻 */}
            {activeTab === 'metaphor' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center text-xl">
                    👩‍🏫
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white">艾莉絲老師 (Alice) 的高中生活化比喻</span>
                    <p className="text-[11px] text-slate-400">高中前端金牌教練親身解讀</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                  {lesson.teacherDialogue}
                </div>
              </div>
            )}

            {/* Tab: ⚔️ 翻車 vs 大師 */}
            {activeTab === 'pitfall' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="space-y-3">
                  {/* Pitfall Card */}
                  <div className="p-3.5 bg-rose-950/20 border border-rose-800/40 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-rose-300">
                      {pitfallData.pitfallTitle}
                    </div>
                    <VSCodeBlock
                      code={pitfallData.pitfallCode}
                      language="html"
                      filename="wrong-syntax.html"
                      maxHeight="140px"
                    />
                    <p className="text-xs text-slate-400">
                      {pitfallData.pitfallDesc}
                    </p>
                  </div>

                  {/* Master Card */}
                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-emerald-300">
                      {pitfallData.masterTitle}
                    </div>
                    <VSCodeBlock
                      code={pitfallData.masterCode}
                      language="html"
                      filename="master-solution.html"
                      maxHeight="140px"
                    />
                    <p className="text-xs text-slate-300">
                      {pitfallData.masterDesc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: 📌 核心要點 */}
            {activeTab === 'keypoints' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                  本課核心 Bootstrap 類別手冊
                </h4>
                <div className="space-y-2">
                  {lesson.keyClasses.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-sky-500/40 transition-colors"
                    >
                      <div className="font-mono text-xs font-bold text-sky-300 mb-1">
                        .{item.name}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: 📋 語法庫 */}
            {activeTab === 'syntax' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    標準完整代碼模板
                  </h4>
                </div>
                <VSCodeBlock
                  code={lesson.teacherHtml}
                  language="html"
                  filename="template.html"
                  maxHeight="280px"
                />
              </div>
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* RIGHT COLUMN: Live Result (Top) + Code Inspector (Bottom)  */}
        {/* ---------------------------------------------------------- */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-4 flex flex-col">
          {/* Top Bar above live preview: Play icon + 展開看整體頁面 button */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>老師示範即時成果</span>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setShowFullPreview(true);
              }}
              className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 bg-sky-950/40 hover:bg-sky-950/80 border border-sky-500/30 px-3 py-1.5 rounded-xl transition-all shadow-sm"
              title="全螢幕檢視成果"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>展開看整體頁面</span>
            </button>
          </div>

          {/* Live Interactive Sandbox Preview */}
          <div className="flex-1 min-h-[380px] rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <SandboxPreview
              html={lesson.teacherHtml}
              title={`示範效果 · ${lesson.title}`}
              badgeLabel="👩‍🏫 老師成果"
              badgeColor="#0095ff"
            />
          </div>

          {/* Code Inspector Card: Exactly matching bottom of screenshot */}
          <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            {/* Tabs Header Row: [ CSS 樣式 ] [ HTML 骨架 ]   [ 📋 複製代碼 ] */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setCodeTab('css');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    codeTab === 'css'
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  CSS 樣式 / 類別
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setCodeTab('html');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    codeTab === 'html'
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  HTML 骨架
                </button>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                title="複製代碼"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">已複製！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製代碼</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block with VS Code Syntax Highlighting */}
            <div className="rounded-xl overflow-hidden shadow-inner">
              {codeTab === 'html' ? (
                <VSCodeBlock
                  code={lesson.teacherHtml}
                  language="html"
                  filename="index.html"
                  maxHeight="220px"
                  showLineNumbers={true}
                />
              ) : (
                <VSCodeBlock
                  code={
                    `/* Bootstrap 5 核心樣式規則速查 */\n\n` +
                    lesson.keyClasses
                      .map(
                        (k) =>
                          `/* ${k.desc} */\n.${k.name} {\n  box-sizing: border-box;\n  /* 自動響應與邊界計算 */\n}`
                      )
                      .join('\n\n')
                  }
                  language="css"
                  filename="bootstrap.css"
                  maxHeight="220px"
                  showLineNumbers={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. FULL SCREEN PREVIEW MODAL ("展開看整體頁面")                */}
      {/* ============================================================ */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-3 sm:p-5 animate-fadeIn">
          {/* Top Bar with Title, HTML/CSS/Preview Switcher, and Close button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-white">
                    全螢幕整體頁面 · {lesson.title}
                  </span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-bold">
                    {lesson.officialName}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  可任意在「🖥️ 網頁預覽」、「&lt;/&gt; HTML 骨架」與「🎨 CSS 樣式」之間流暢切換檢視
                </div>
              </div>
            </div>

            {/* Central Switcher: [ 🖥️ 即時預覽 ] [ </> HTML 骨架 ] [ 🎨 CSS 樣式 ] [ ⚡ 雙欄對照 ] */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 shadow-inner">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setModalCodeTab('preview');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  modalCodeTab === 'preview'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>即時預覽</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setModalCodeTab('html');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  modalCodeTab === 'html'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>HTML 骨架</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setModalCodeTab('css');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  modalCodeTab === 'css'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>CSS 樣式</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setModalCodeTab('split');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  modalCodeTab === 'split'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>雙欄對照</span>
              </button>
            </div>

            {/* Right: Copy & Close */}
            <div className="flex items-center gap-2">
              {(modalCodeTab === 'html' || modalCodeTab === 'css') && (
                <button
                  onClick={() => handleCopyModalCode(modalCodeTab)}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
                >
                  {copiedModalCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">已複製！</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>複製當前代碼</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={() => setShowFullPreview(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="關閉展開視窗"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 mt-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col">
            {modalCodeTab === 'preview' && (
              <div className="flex-1 h-full">
                <SandboxPreview
                  html={lesson.teacherHtml}
                  title={`全螢幕示範 · ${lesson.title}`}
                  badgeLabel="👩‍🏫 完整視野"
                  badgeColor="#0095ff"
                />
              </div>
            )}

            {modalCodeTab === 'html' && (
              <div className="flex-1 h-full overflow-hidden p-3 bg-[#090d16]">
                <VSCodeBlock
                  code={lesson.teacherHtml}
                  language="html"
                  filename="index.html"
                  maxHeight="calc(100vh - 150px)"
                  showLineNumbers={true}
                />
              </div>
            )}

            {modalCodeTab === 'css' && (
              <div className="flex-1 h-full overflow-hidden p-3 bg-[#090d16]">
                <VSCodeBlock
                  code={
                    `/* ============================================================ */\n` +
                    `/* Bootstrap 5 核心樣式規則速查表                                */\n` +
                    `/* 課程：${lesson.officialName} · ${lesson.title}                */\n` +
                    `/* ============================================================ */\n\n` +
                    lesson.keyClasses
                      .map(
                        (k) =>
                          `/* ${k.desc} */\n.${k.name} {\n  box-sizing: border-box;\n  /* 自動響應與邊界計算規則 */\n}`
                      )
                      .join('\n\n')
                  }
                  language="css"
                  filename="custom-bootstrap.css"
                  maxHeight="calc(100vh - 150px)"
                  showLineNumbers={true}
                />
              </div>
            )}

            {modalCodeTab === 'split' && (
              <div className="flex-1 h-full grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden">
                {/* Left: Code with HTML/CSS Toggle */}
                <div className="flex flex-col h-full bg-[#090d16] p-3 space-y-2 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setModalSubCodeTab('html');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          modalSubCodeTab === 'html'
                            ? 'bg-sky-500 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        HTML 骨架
                      </button>
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setModalSubCodeTab('css');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          modalSubCodeTab === 'css'
                            ? 'bg-purple-600 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        CSS 樣式
                      </button>
                    </div>

                    <button
                      onClick={() => handleCopyModalCode(modalSubCodeTab)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedModalCode ? (
                        <span className="text-emerald-400 font-bold">已複製！</span>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>複製</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    {modalSubCodeTab === 'html' ? (
                      <VSCodeBlock
                        code={lesson.teacherHtml}
                        language="html"
                        filename="index.html"
                        maxHeight="calc(100vh - 200px)"
                        showLineNumbers={true}
                      />
                    ) : (
                      <VSCodeBlock
                        code={
                          `/* Bootstrap 5 核心樣式規則 */\n\n` +
                          lesson.keyClasses
                            .map(
                              (k) =>
                                `/* ${k.desc} */\n.${k.name} {\n  box-sizing: border-box;\n}`
                            )
                            .join('\n\n')
                        }
                        language="css"
                        filename="bootstrap.css"
                        maxHeight="calc(100vh - 200px)"
                        showLineNumbers={true}
                      />
                    )}
                  </div>
                </div>

                {/* Right: Live Preview */}
                <div className="h-full">
                  <SandboxPreview
                    html={lesson.teacherHtml}
                    title={`對照示範 · ${lesson.title}`}
                    badgeLabel="👩‍🏫 即時渲染"
                    badgeColor="#0095ff"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
