import React, { useState } from 'react';
import {
  Globe,
  Github,
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'actions' | 'command'>('actions');

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const gitCommands = `# 1. 加入所有更新檔案 (包含 .github/workflows/deploy.yml)
git add .
git commit -m "fix: 配置 GitHub Actions 自動編譯並發布至 Bs5-Course"

# 2. 推送到 GitHub main 分支
git push origin main`;

  const npmCommands = `# 一鍵編譯並自動推送至 GitHub Pages 分支 (gh-pages)
npm run deploy`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-5 my-8 text-slate-100 relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white">
                  發布到免費 GitHub Pages 網站
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  100% 免費永久架站
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                純靜態架構已就緒 · 無伺服器費用 · 免耗費任何 AI API 配額
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Feature Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3.5 bg-gradient-to-r from-purple-950/40 via-slate-950 to-indigo-950/40 border border-purple-500/30 rounded-xl text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">已配置相對路徑</div>
              <div className="text-[11px] text-slate-400">vite.config: base: './'</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">自動化 CI/CD</div>
              <div className="text-[11px] text-slate-400">.github/workflows 已建立</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <div className="font-bold text-white">純前端無配額限制</div>
              <div className="text-[11px] text-slate-400">全功能由瀏覽器本地運算</div>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('actions')}
            className={`flex items-center gap-1.5 px-4 py-2 font-bold border-b-2 transition-colors ${
              activeTab === 'actions'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>【推薦】GitHub Actions 自動發布 (最省力)</span>
          </button>
          <button
            onClick={() => setActiveTab('command')}
            className={`flex items-center gap-1.5 px-4 py-2 font-bold border-b-2 transition-colors ${
              activeTab === 'command'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>【指令】npm run deploy 發布</span>
          </button>
        </div>

        {/* Tab 1: Actions */}
        {activeTab === 'actions' && (
          <div className="space-y-3.5 text-xs text-slate-300">
            <ol className="list-decimal list-inside space-y-2 text-slate-200">
              <li>
                <span className="font-bold text-white">建立 GitHub 倉庫：</span>
                前往{' '}
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 underline inline-flex items-center gap-0.5 hover:text-purple-300"
                >
                  github.com/new <ExternalLink className="w-3 h-3" />
                </a>{' '}
                建立一個新的公開 (Public) Repository。
              </li>
              <li>
                <span className="font-bold text-white">將專案推送到 GitHub：</span>
                在終端機執行下列 Git 指令（已包含專案所有程式碼與設定）：
              </li>
            </ol>

            {/* Code Box */}
            <div className="relative bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-[11px] leading-relaxed overflow-x-auto text-purple-200">
              <button
                onClick={() => handleCopy(gitCommands, 'git')}
                className="absolute top-2.5 right-2.5 px-2 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white rounded-md text-[11px] font-sans font-semibold flex items-center gap-1 border border-purple-500/40 transition-all"
              >
                {copiedType === 'git' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">已複製！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製 Git 指令</span>
                  </>
                )}
              </button>
              <pre className="pr-24">{gitCommands}</pre>
            </div>

            <ol start={3} className="list-decimal list-inside space-y-2 text-slate-200">
              <li>
                <span className="font-bold text-white">開啟 GitHub Pages：</span>
                進入你的 GitHub 專案頁面 ➔ 點擊上方選單的{' '}
                <span className="bg-slate-800 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                  Settings
                </span>{' '}
                ➔ 左側欄點擊{' '}
                <span className="bg-slate-800 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                  Pages
                </span>
                。
              </li>
              <li>
                在 <strong>Build and deployment</strong> 區塊下的 <strong>Source</strong>，選擇{' '}
                <span className="bg-purple-900/60 text-purple-200 font-bold px-1.5 py-0.5 rounded border border-purple-500/40">
                  GitHub Actions
                </span>
                。
              </li>
              <li>
                <span className="font-bold text-emerald-400">大功告成！</span>
                系統會自動觸發已內建的{' '}
                <span className="font-mono text-purple-300">.github/workflows/deploy.yml</span>，約 1
                分鐘後，你的網站即可在{' '}
                <a
                  href="https://floraya.github.io/Bs5-Course/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 text-emerald-300 px-2 py-0.5 rounded font-mono underline inline-flex items-center gap-1 hover:text-emerald-200"
                >
                  https://floraya.github.io/Bs5-Course/ <ExternalLink className="w-3 h-3" />
                </a>{' '}
                永久免費上線！
              </li>
            </ol>
          </div>
        )}

        {/* Tab 2: Command line deploy */}
        {activeTab === 'command' && (
          <div className="space-y-3.5 text-xs text-slate-300">
            <p className="text-slate-300">
              如果你習慣在本機電腦或終端機一鍵發布，本專案已安裝好{' '}
              <code className="text-purple-300 font-mono">gh-pages</code> 工具，只需一行指令：
            </p>

            <div className="relative bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-[12px] leading-relaxed overflow-x-auto text-emerald-300">
              <button
                onClick={() => handleCopy(npmCommands, 'npm')}
                className="absolute top-2.5 right-2.5 px-2 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white rounded-md text-[11px] font-sans font-semibold flex items-center gap-1 border border-purple-500/40 transition-all"
              >
                {copiedType === 'npm' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">已複製！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製指令</span>
                  </>
                )}
              </button>
              <pre>{npmCommands}</pre>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-purple-400" />
                <span>運作原理：</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                執行 <code className="text-purple-300 font-mono">npm run deploy</code> 會先自動執行{' '}
                <code className="text-purple-300 font-mono">npm run build</code> 生成編譯後的 dist
                目錄，並自動將其提交推送到你 GitHub 倉庫的{' '}
                <code className="text-purple-300 font-mono">gh-pages</code> 分支，GitHub
                會在數十秒內完成靜態站點更新。
              </p>
            </div>
          </div>
        )}

        {/* Troubleshooting Card for Why It Showed Blank */}
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-200 leading-relaxed">
            <strong className="text-amber-100 font-bold">為什麼先前 https://floraya.github.io/Bs5-Course/ 沒有顯示網頁？</strong>
            <br />
            1. <strong>原因：</strong>GitHub 預設建立的 <code className="font-mono text-amber-300">static.yml</code> 僅上傳了尚未打包的原始碼（瀏覽器無法直接執行未編譯的 TypeScript），且被 Jekyll 攔截。<br />
            2. <strong>已修正：</strong>已為您移除衝突的 static.yml 與 jekyll-gh-pages.yml，並補上 <code className="font-mono text-amber-300">.nojekyll</code> 與斜線自動校正。<br />
            3. <strong>啟用方式：</strong>至 GitHub 專案 <strong>Settings ➔ Pages ➔ Source 選擇「GitHub Actions」</strong>，系統即會自動執行已配置好的 <code className="font-mono text-purple-300">deploy.yml</code> 構建 dist 並正常顯示！
          </div>
        </div>

        {/* Bottom Note on Quotas */}
        <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-purple-200 leading-relaxed">
            <strong className="text-white">關於「配額已用完」說明：</strong>
            AI Studio 對話模式有 session 互動次數限制，但
            <strong>本平台自身所有的 77 堂教學、程式碼編輯器、Bootstrap 5 即時預覽、規格驗收檢驗與音效</strong>
            ，全是由瀏覽器前端原生執行！發布至 GitHub Pages 後，任何人無論連線多少次，都<strong>完全免費、永久有效、零配額消耗</strong>！
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="text-[11px] text-slate-400">
            若需要自訂網域 (Custom Domain)，亦可在 GitHub Pages 設定中填入。
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-900/40"
          >
            了解並關閉
          </button>
        </div>
      </div>
    </div>
  );
};
