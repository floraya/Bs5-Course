import React, { useState } from 'react';
import { Lesson } from '../types/curriculum';
import { SandboxPreview } from './SandboxPreview';
import { VSCodeBlock } from './VSCodeBlock';
import { CATEGORIES } from '../data/categories';
import { ALL_LESSONS } from '../data/allLessons';
import { getLessonMnemonic, getLessonLabConfig, getLessonVisualDiagram } from '../utils/teachingData';
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

type TabType = 'visual' | 'metaphor' | 'keypoints' | 'syntax' | 'lab';
type CodeTab = 'html' | 'css' | 'jquery';

export const TeacherView: React.FC<TeacherViewProps> = ({
  lesson,
  onSwitchToStudent,
  onPrevLesson,
  onNextLesson,
  prevLessonId,
  nextLessonId,
}) => {
  // Active feature tab (defaults to visual diagram)
  const [activeTab, setActiveTab] = useState<TabType>('visual');

  // Interactive Lab state
  const labConfig = getLessonLabConfig(lesson);
  const [activeStepId, setActiveStepId] = useState<string>(
    labConfig.steps[0]?.id || ''
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    labConfig.options[0]?.id || ''
  );

  // Automatically switch tab to visual diagram and reset lab options when lesson changes
  React.useEffect(() => {
    setActiveTab('visual');
    setActiveStepId(labConfig.steps[0]?.id || '');
    setSelectedOptionId(labConfig.options[0]?.id || '');
  }, [lesson.id]);

  // Check if lesson uses jQuery initialization
  const hasJQueryCode =
    lesson.id === 'comp-tooltips' ||
    lesson.id === 'comp-popovers' ||
    lesson.id === 'forms-validation' ||
    lesson.keyClasses.some((k) => k.name.toLowerCase().includes('jquery'));

  const getJQueryCode = () => {
    if (lesson.id === 'comp-tooltips') {
      return `// ⚡ 初始化 Tooltip（建議置於 </body> 結束標籤前）\n$('[data-bs-toggle="tooltip"]').each(function () {\n  new bootstrap.Tooltip(this);\n});`;
    }
    if (lesson.id === 'comp-popovers') {
      return `// ⚡ 初始化 Popover（建議置於 </body> 結束標籤前）\n$('[data-bs-toggle="popover"]').each(function () {\n  new bootstrap.Popover(this);\n});`;
    }
    if (lesson.id === 'forms-validation') {
      return `// ⚡ jQuery 表單點擊驗證與留言建立
$(".btn-send").on("click", function () {
  // 1. 取得輸入內容
  const name = $name.val().trim();
  const content = $content.val().trim();

  // 2. 表單驗證狀態變數
  let valid = true;

  // 暱稱欄位驗證
  if (!name) {
    $name.addClass("is-invalid").removeClass("is-valid");
    valid = false;
  } else {
    $name.removeClass("is-invalid").addClass("is-valid");
  }

  // 留言內容欄位驗證
  if (!content) {
    $content.addClass("is-invalid").removeClass("is-valid");
    valid = false;
  } else {
    $content.removeClass("is-invalid").addClass("is-valid");
  }

  // 驗證失敗：終止執行，畫面保留紅色錯誤提示
  if (!valid) return;

  // =========================
  // 驗證成功：建立並顯示新留言
  // =========================
  const newMessage = {
    name: name,
    text: content,
    time: "剛剛"
  };

  msgData.push(newMessage);
  createMessage(newMessage);
  updateCount();

  // 清空輸入框並還原狀態
  $name.val("");
  $content.val("");
  $name.removeClass("is-invalid is-valid");
  $content.removeClass("is-invalid is-valid");
  $name.focus();
});`;
    }
    const jqItem = lesson.keyClasses.find((k) => k.name.toLowerCase().includes('jquery'));
    return jqItem ? jqItem.desc : '';
  };

  // Active code inspector tab on bottom right
  const [codeTab, setCodeTab] = useState<CodeTab>('html');
  const [copiedCode, setCopiedCode] = useState(false);

  // Expanded full screen modal for right preview
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [modalCodeTab, setModalCodeTab] = useState<'preview' | 'html' | 'css' | 'jquery' | 'split'>('preview');
  const [modalSubCodeTab, setModalSubCodeTab] = useState<'html' | 'css' | 'jquery'>('html');
  const [copiedModalCode, setCopiedModalCode] = useState(false);

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
  const visualDiagram = getLessonVisualDiagram(lesson);

  const handleCopyCode = () => {
    let textToCopy = lesson.teacherHtml;
    if (codeTab === 'css') {
      textToCopy = lesson.keyClasses
        .filter((k) => !k.name.includes('jQuery') && !k.name.includes('data-bs'))
        .map((k) => `/* ${k.desc} */\n.${k.name} { /* Bootstrap 5 核心類別 */ }`)
        .join('\n\n');
    } else if (codeTab === 'jquery') {
      textToCopy = getJQueryCode();
    }

    navigator.clipboard.writeText(textToCopy);
    soundManager.playClick();
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyModalCode = (target: 'html' | 'css' | 'jquery') => {
    let textToCopy = lesson.teacherHtml;
    if (target === 'css') {
      textToCopy =
        `/* Bootstrap 5 核心樣式規則速查表 */\n/* 課程：${lesson.officialName} · ${lesson.title} */\n\n` +
        lesson.keyClasses
          .filter((k) => !k.name.includes('jQuery') && !k.name.includes('data-bs'))
          .map(
            (k) =>
              `/* ${k.desc} */\n.${k.name} {\n  box-sizing: border-box;\n  /* 自動響應與邊界計算規則 */\n}`
          )
          .join('\n\n');
    } else if (target === 'jquery') {
      textToCopy = getJQueryCode();
    }

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

                {/* Micro-step Buttons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {labConfig.steps.map((step, idx) => {
                    const isStepActive = activeStepId === step.id || (!activeStepId && idx === 0);
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          soundManager.playClick();
                          setActiveStepId(step.id);
                          const matchingOption = labConfig.options.find(opt => opt.id === step.id) || labConfig.options[idx];
                          if (matchingOption) {
                            setSelectedOptionId(matchingOption.id);
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

                {/* Visual Simulation Display Box */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                  <div className="text-xs text-sky-300 leading-relaxed font-sans">
                    {currentOption?.explanation}
                  </div>

                  <VSCodeBlock
                    code={currentOption?.codeSnippet || ''}
                    language="html"
                    filename="lab-preview.html"
                    maxHeight="240px"
                  />
                </div>
              </div>
            )}

            {/* Tab: 🎨 視覺圖解 */}
            {activeTab === 'visual' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{visualDiagram.title}</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 font-semibold">
                    {visualDiagram.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 -mt-1">
                  {visualDiagram.subtitle}
                </p>

                {/* Dynamic Diagram Visual Container */}
                <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                  {visualDiagram.layers.map((layer, idx) => (
                    <div
                      key={idx}
                      className={`border-2 border-dashed ${layer.borderColor || 'border-sky-500/40'} ${layer.bgColor || 'bg-slate-950/40'} rounded-lg p-3 text-center transition-all`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-xs font-mono font-bold block ${layer.textColor || 'text-sky-300'}`}>
                          {layer.label}
                        </span>
                        {layer.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {layer.badge}
                          </span>
                        )}
                      </div>
                      {layer.sublabel && (
                        <div className="text-[11px] text-slate-400 text-left mb-2">
                          {layer.sublabel}
                        </div>
                      )}

                      {/* Children / inner columns */}
                      {layer.children && layer.children.length > 0 && (
                        <div className="grid grid-cols-12 gap-1.5 mt-2 text-xs font-mono">
                          {layer.children.map((child, cIdx) => {
                            const spanClass = child.span === 12
                              ? 'col-span-12'
                              : child.span === 8
                              ? 'col-span-8'
                              : child.span === 6
                              ? 'col-span-6'
                              : child.span === 4
                              ? 'col-span-4'
                              : child.span === 3
                              ? 'col-span-3'
                              : 'col-span-12';
                            return (
                              <div
                                key={cIdx}
                                className={`${spanClass} ${child.bgColor || 'bg-sky-600/70'} ${child.textColor || 'text-white'} p-2 rounded flex flex-col justify-center items-center text-center shadow-sm`}
                              >
                                <span className="font-bold text-[11px] leading-tight">{child.label}</span>
                                {child.sublabel && (
                                  <span className="text-[9px] opacity-80 mt-0.5 leading-tight">{child.sublabel}</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                    💡 <strong>架構解析：</strong>{visualDiagram.explanation}
                  </div>
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
                      <div className="font-mono text-xs font-bold text-sky-300 mb-1 flex items-center gap-2">
                        <span>
                          {item.name.startsWith('data-') || item.name.includes('jQuery')
                            ? item.name
                            : `.${item.name}`}
                        </span>
                        {item.name.includes('jQuery') && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-sans">
                            JavaScript / jQuery
                          </span>
                        )}
                        {item.name.startsWith('data-') && (
                          <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-sans">
                            HTML 屬性
                          </span>
                        )}
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
                    標準完整程式碼模板
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
            {/* Tabs Header Row: [ HTML ] [ CSS ] [ jQuery ]   [ 📋 複製程式碼 ] */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto">
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
                  HTML
                </button>
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
                  CSS
                </button>
                {hasJQueryCode && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setCodeTab('jquery');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      codeTab === 'jquery'
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md shadow-amber-400/20'
                        : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 border border-amber-500/30'
                    }`}
                  >
                    <span>jQuery</span>
                  </button>
                )}
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors shrink-0"
                title="複製程式碼"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">已複製！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製程式碼</span>
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
              ) : codeTab === 'css' ? (
                <VSCodeBlock
                  code={
                    `/* Bootstrap 5 核心樣式規則速查 */\n\n` +
                    lesson.keyClasses
                      .filter((k) => !k.name.includes('jQuery') && !k.name.includes('data-bs'))
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
              ) : (
                <VSCodeBlock
                  code={getJQueryCode()}
                  language="javascript"
                  filename="init-jquery.js"
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
                  可任意在「🖥️ 網頁預覽」、「&lt;/&gt; HTML」與「🎨 CSS」之間流暢切換檢視
                </div>
              </div>
            </div>

            {/* Central Switcher: [ 🖥️ 即時預覽 ] [ </> HTML ] [ 🎨 CSS ] [ ⚡ 雙欄對照 ] */}
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
                <span>HTML</span>
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
                <span>CSS</span>
              </button>

              {hasJQueryCode && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setModalCodeTab('jquery');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    modalCodeTab === 'jquery'
                      ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md'
                      : 'text-amber-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>jQuery</span>
                </button>
              )}

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
              {(modalCodeTab === 'html' || modalCodeTab === 'css' || modalCodeTab === 'jquery') && (
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
                      <span>複製當前程式碼</span>
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
                      .filter((k) => !k.name.includes('jQuery') && !k.name.includes('data-bs'))
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

            {modalCodeTab === 'jquery' && (
              <div className="flex-1 h-full overflow-hidden p-3 bg-[#090d16]">
                <VSCodeBlock
                  code={getJQueryCode()}
                  language="javascript"
                  filename="init-jquery.js"
                  maxHeight="calc(100vh - 150px)"
                  showLineNumbers={true}
                />
              </div>
            )}

            {modalCodeTab === 'split' && (
              <div className="flex-1 h-full grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden">
                {/* Left: Code with HTML/CSS/jQuery Toggle */}
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
                        HTML
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
                        CSS
                      </button>
                      {hasJQueryCode && (
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setModalSubCodeTab('jquery');
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            modalSubCodeTab === 'jquery'
                              ? 'bg-amber-400 text-slate-950 font-bold shadow'
                              : 'text-amber-400 hover:text-amber-300 hover:bg-slate-900'
                          }`}
                        >
                          jQuery
                        </button>
                      )}
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
                    ) : modalSubCodeTab === 'css' ? (
                      <VSCodeBlock
                        code={
                          `/* Bootstrap 5 核心樣式規則 */\n\n` +
                          lesson.keyClasses
                            .filter((k) => !k.name.includes('jQuery') && !k.name.includes('data-bs'))
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
                    ) : (
                      <VSCodeBlock
                        code={getJQueryCode()}
                        language="javascript"
                        filename="init-jquery.js"
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
