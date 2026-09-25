import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { highlightHtml, highlightCss } from '../utils/codeHighlighter';
import { soundManager } from '../utils/sound';

interface VSCodeBlockProps {
  code: string;
  language?: 'html' | 'css' | 'markup';
  filename?: string;
  maxHeight?: string;
  showLineNumbers?: boolean;
}

export const VSCodeBlock: React.FC<VSCodeBlockProps> = ({
  code,
  language = 'html',
  filename,
  maxHeight = '320px',
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const lines = code.trimEnd().split('\n');
  const highlighted =
    language === 'css' ? highlightCss(code.trimEnd()) : highlightHtml(code.trimEnd());

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    soundManager.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const defaultFileName = language === 'css' ? 'styles.css' : 'index.html';
  const displayFileName = filename || defaultFileName;

  return (
    <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
      {/* VS Code Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#181818] border-b border-[#2d2d2d] select-none">
        <div className="flex items-center gap-2">
          {/* Mac/VSCode Window Controls */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1e1e1e] rounded-t text-slate-200 border-t border-sky-500 font-mono text-[11px] font-semibold">
            {language === 'css' ? (
              <span className="text-sky-400 font-bold">#</span>
            ) : (
              <span className="text-orange-400 font-bold">&lt;&gt;</span>
            )}
            <span>{displayFileName}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 bg-[#252526] hover:bg-[#333333] px-2 py-1 rounded transition-colors"
          title="複製程式碼"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">已複製</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>複製</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div
        className="flex overflow-auto custom-scrollbar bg-[#1e1e1e]"
        style={{ maxHeight }}
      >
        {/* Line Numbers */}
        {showLineNumbers && (
          <div className="select-none py-3 pl-3 pr-2 text-right bg-[#1e1e1e] border-r border-[#2d2d2d] text-[#858585] font-mono text-xs leading-6 min-w-[2.5rem]">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}

        {/* Highlighted Code */}
        <pre className="p-3 m-0 bg-transparent text-[#d4d4d4] font-mono text-xs leading-6 overflow-visible vscode-code whitespace-pre flex-1">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
};
