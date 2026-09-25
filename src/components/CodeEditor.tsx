import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Lightbulb, Key, Copy, Check, Sparkles, Code2, Terminal } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { highlightHtml } from '../utils/codeHighlighter';
import { VSCodeBlock } from './VSCodeBlock';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onReset: () => void;
  solutionCode?: string;
  hints?: string[];
  onApplySolution?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onReset,
  solutionCode,
  hints = [],
  onApplySolution,
}) => {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Line numbers calculation
  const lines = code.split('\n');

  // Synchronize scrolling between textarea, highlighted pre, and line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = target.scrollTop;
      preRef.current.scrollLeft = target.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = target.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Support Tab key indentation inside textarea
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    soundManager.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleHints = () => {
    soundManager.playHint();
    setShowHints(!showHints);
  };

  // Generate VS Code highlighted HTML tokens
  const highlightedCode = highlightHtml(code);

  return (
    <div className="flex flex-col bg-[#1e1e1e] border border-[#2d2d2d] rounded-2xl overflow-hidden shadow-2xl h-full min-h-[420px]">
      {/* VS Code Title & Tab Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-1.5 bg-[#181818] border-b border-[#2d2d2d] gap-2 select-none">
        <div className="flex items-center gap-2">
          {/* Mac/VS Code window control dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] rounded-t text-slate-200 border-t-2 border-sky-500 font-mono text-xs font-semibold shadow-sm">
            <span className="text-orange-400 font-bold">&lt;&gt;</span>
            <span className="text-slate-100">index.html</span>
            <span className="text-[10px] text-sky-400 bg-sky-950/70 border border-sky-500/30 px-1 rounded ml-1 font-sans">
              VS Code Dark+
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {hints.length > 0 && (
            <button
              onClick={toggleHints}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                showHints
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-[#2a2d2e]'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>提示 ({hints.length})</span>
            </button>
          )}

          {solutionCode && (
            <button
              onClick={() => {
                soundManager.playClick();
                setShowSolution(!showSolution);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                showSolution
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-purple-300 hover:bg-[#2a2d2e]'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-purple-400" />
              <span>參考解答</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playClick();
              onReset();
            }}
            title="還原為初始任務題目"
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-400 hover:text-slate-200 hover:bg-[#2a2d2e] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重設</span>
          </button>

          <button
            onClick={handleCopy}
            title="複製程式碼"
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-400 hover:text-slate-200 hover:bg-[#2a2d2e] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* VS Code Breadcrumb Path */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-b border-[#2d2d2d] text-[11px] font-mono text-slate-400 select-none">
        <div className="flex items-center gap-1 overflow-hidden truncate">
          <span className="text-slate-500">大明高中實戰專案</span>
          <span className="text-slate-600">&gt;</span>
          <span className="text-slate-400">src</span>
          <span className="text-slate-600">&gt;</span>
          <span className="text-sky-400">index.html</span>
          <span className="text-slate-600">&gt;</span>
          <span className="text-purple-400">&lt;div.container&gt;</span>
        </div>
        <div className="text-[10px] text-slate-500 hidden sm:flex items-center gap-2">
          <span>UTF-8</span>
          <span>·</span>
          <span>HTML (Bootstrap 5)</span>
          <span>·</span>
          <span>2 空格縮排</span>
        </div>
      </div>

      {/* Hints Drawer */}
      {showHints && hints.length > 0 && (
        <div className="bg-[#241c10] border-b border-amber-600/40 p-3 text-xs text-amber-200 animate-fadeIn">
          <div className="font-bold flex items-center gap-1.5 mb-1.5 text-amber-400">
            <Lightbulb className="w-4 h-4" /> 艾莉絲老師的過關指引：
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1 text-amber-100/90 leading-relaxed">
            {hints.map((hint, idx) => (
              <li key={idx}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Solution Drawer with VS Code Syntax Highlighting */}
      {showSolution && solutionCode && (
        <div className="bg-[#1f162b] border-b border-purple-800/60 p-3 text-xs animate-fadeIn space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> 參考解答程式碼 (VS Code 高亮)：
            </span>
            {onApplySolution && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onApplySolution();
                  setShowSolution(false);
                }}
                className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded text-xs font-semibold transition-all shadow-md"
              >
                直接套用解答至編輯器
              </button>
            )}
          </div>
          <VSCodeBlock code={solutionCode} language="html" maxHeight="200px" />
        </div>
      )}

      {/* VS Code Code Textarea with Real-time Syntax Highlighting */}
      <div className="flex-1 flex overflow-hidden relative bg-[#1e1e1e]">
        {/* Line Numbers column */}
        <div
          ref={lineNumbersRef}
          className="select-none py-3 pl-3 pr-2 text-right bg-[#1e1e1e] border-r border-[#2d2d2d] text-[#858585] font-mono text-xs leading-6 min-w-[2.75rem] overflow-hidden"
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Dual-layer Synchronized Code Editor */}
        <div className="relative flex-1 overflow-hidden">
          {/* Layer 1: Syntax Highlighted Render (Behind) */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 p-3 m-0 bg-transparent text-[#d4d4d4] font-mono text-xs sm:text-sm leading-6 overflow-hidden pointer-events-none whitespace-pre select-none vscode-code"
            style={{
              fontFamily: '"Fira Code", Menlo, Monaco, Consolas, "Courier New", monospace',
              tabSize: 2,
            }}
          >
            <code
              dangerouslySetInnerHTML={{
                __html: highlightedCode + (code.endsWith('\n') ? ' ' : ''),
              }}
            />
          </pre>

          {/* Layer 2: Transparent Interactive Textarea (In Front) */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="absolute inset-0 p-3 m-0 bg-transparent text-transparent caret-[#569cd6] font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none focus:ring-0 selection:bg-[#264f78]/60 overflow-auto whitespace-pre custom-scrollbar"
            style={{
              fontFamily: '"Fira Code", Menlo, Monaco, Consolas, "Courier New", monospace',
              tabSize: 2,
            }}
            placeholder="請在此輸入你的 Bootstrap 5 HTML 代碼..."
          />
        </div>
      </div>

      {/* VS Code Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-[11px] font-mono select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold">
            <Terminal className="w-3 h-3" /> 大明高中終端機
          </span>
          <span className="hidden sm:inline">第 {lines.length} 行，{code.length} 字元</span>
        </div>
        <div className="flex items-center gap-3">
          <span>HTML</span>
          <span>Bootstrap 5.3</span>
          <span className="bg-sky-700/80 px-1.5 py-0.5 rounded text-[10px]">即時預覽同步</span>
        </div>
      </div>
    </div>
  );
};
