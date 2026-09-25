import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { SandboxPreview } from './SandboxPreview';
import { X, Download, Copy, Check, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEMPLATES = [
  {
    id: 'club_fest',
    title: '🎸 熱音社成果發表會',
    code: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold text-warning" href="#">🎸 2026 大明高中熱音成發</a>
    <span class="badge text-bg-danger">5/20 盛大登場</span>
  </div>
</nav>

<div class="p-5 text-center bg-primary text-white bg-gradient shadow">
  <h1 class="display-4 fw-bold">《狂潮狂響》成果發表</h1>
  <p class="lead">青春不留白！全校最震撼的搖滾視聽盛宴！</p>
  <button class="btn btn-warning btn-lg fw-bold shadow">立即線上索票 →</button>
</div>

<div class="container py-5">
  <h3 class="fw-bold mb-4 text-center">🎪 精彩演出樂團陣容</h3>
  <div class="row g-4">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-0">
        <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500" class="card-img-top" alt="主唱">
        <div class="card-body">
          <h5 class="card-title fw-bold">微光之境 (Glimmer)</h5>
          <p class="card-text text-muted">以民謠金屬為靈魂，主打原創畢業創作曲《那年蟬鳴》。</p>
          <span class="badge bg-primary">18:30 開場</span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-0">
        <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500" class="card-img-top" alt="吉他">
        <div class="card-body">
          <h5 class="card-title fw-bold">零度沸騰 (Zero Boiling)</h5>
          <p class="card-text text-muted">狂放的重低音貝斯與雙踩鼓點，燃燒全場熱血小宇宙！</p>
          <span class="badge bg-danger">19:30 壓軸</span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-0">
        <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500" class="card-img-top" alt="電音">
        <div class="card-body">
          <h5 class="card-title fw-bold">電子極光 (Aurora DJ)</h5>
          <p class="card-text text-muted">融合合成器旋律與現代流行，全場互動大合跳！</p>
          <span class="badge bg-success">20:30 謝幕</span>
        </div>
      </div>
    </div>
  </div>
</div>

<footer class="bg-dark text-white text-center py-4">
  <p class="mb-0 text-muted">© 2026 大明高中熱門音樂社 · 使用 Bootstrap 5 全力打造</p>
</footer>`,
  },
  {
    id: 'school_fest',
    title: '🏫 校慶園遊會特色攤位',
    code: `<div class="container py-4">
  <div class="text-center mb-5">
    <span class="badge text-bg-primary fs-6 mb-2">🎉 114 學年度全校盛典</span>
    <h1 class="fw-bold">第 48 屆校慶園遊會攤位指南</h1>
    <p class="text-muted">本週六 09:00 - 15:30 全面開放外校同學與家長參觀！</p>
  </div>

  <div class="row g-3">
    <div class="col-sm-6 col-lg-3">
      <div class="p-3 border rounded text-center bg-light">
        <div class="display-6 mb-2">🧋</div>
        <h5>高二 1 班：波霸奶茶</h5>
        <span class="badge bg-success">第 1 棟穿堂</span>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3">
      <div class="p-3 border rounded text-center bg-light">
        <div class="display-6 mb-2">🎯</div>
        <h5>射箭社：精準神射手</h5>
        <span class="badge bg-info text-dark">操場草皮區</span>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3">
      <div class="p-3 border rounded text-center bg-light">
        <div class="display-6 mb-2">🍧</div>
        <h5>熱舞社：超大碗挫冰</h5>
        <span class="badge bg-warning text-dark">學生活動中心</span>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3">
      <div class="p-3 border rounded text-center bg-light">
        <div class="display-6 mb-2">🎸</div>
        <h5>吉他社：草地不插電</h5>
        <span class="badge bg-danger">至善樓前廣場</span>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: 'blank',
    title: '📄 乾淨空白畫布',
    code: `<div class="container py-5 text-center">
  <h1 class="text-primary fw-bold">開始打造你的專屬作品！</h1>
  <p class="lead text-muted">在左方編輯器輸入任何 Bootstrap 5 標籤與類別，右方將即時呈現！</p>
  <button class="btn btn-primary px-4 py-2">我的第一個 Bootstrap 按鈕</button>
</div>`,
  },
];

export const PlaygroundModal: React.FC<PlaygroundModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    soundManager.playClick();
    const fullHtml = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>我的校園專案 · Bootstrap 5</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
</head>
<body>
${code}
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bootstrap-campus-project.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full h-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎨</span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>自由創作沙盒 (Campus Sandbox)</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                  Bootstrap 5.3 Full Access
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                可自由組裝卡片、導覽列、表單，並一鍵匯出完整網頁！
              </p>
            </div>
          </div>

          {/* Quick Templates Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 hidden md:inline">快速套版：</span>
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => {
                  soundManager.playClick();
                  setCode(tmpl.code);
                }}
                className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700/60 transition-all"
              >
                {tmpl.title}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>複製</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>匯出 HTML</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Split between Editor and Live Preview */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 p-3 sm:p-4 gap-4 overflow-hidden">
          <div className="h-full flex flex-col min-h-[300px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onReset={() => setCode(TEMPLATES[0].code)}
            />
          </div>
          <div className="h-full flex flex-col min-h-[300px]">
            <SandboxPreview
              html={code}
              title="自由創作預覽"
              badgeLabel="✨ 你的校園專案"
              badgeColor="#712cf9"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
