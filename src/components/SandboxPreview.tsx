import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Smartphone, Tablet, Monitor, Maximize2, Check, Copy } from 'lucide-react';

interface SandboxPreviewProps {
  html: string;
  title?: string;
  badgeLabel?: string;
  badgeColor?: string;
}

type DeviceMode = 'mobile' | 'tablet' | 'laptop' | 'desktop';

const DEVICE_WIDTHS: Record<DeviceMode, string> = {
  mobile: '375px',
  tablet: '768px',
  laptop: '992px',
  desktop: '100%',
};

export const SandboxPreview: React.FC<SandboxPreviewProps> = ({
  html,
  title = '即時預覽畫布',
  badgeLabel,
  badgeColor = '#712cf9',
}) => {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Measure container width for responsive breakpoint calculation
  useEffect(() => {
    const updateWidth = () => {
      if (iframeRef.current) {
        setCurrentWidth(iframeRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }
    return () => observer.disconnect();
  }, [device, refreshKey]);

  // Determine current active Bootstrap breakpoint
  const getBreakpointLabel = (w: number) => {
    if (w < 576) return { code: 'xs', label: '< 576px (極小手機直向)', color: 'bg-slate-700 text-slate-200' };
    if (w < 768) return { code: 'sm', label: '≥ 576px (小型手機橫向)', color: 'bg-emerald-800 text-emerald-100' };
    if (w < 992) return { code: 'md', label: '≥ 768px (平板 iPad)', color: 'bg-amber-800 text-amber-100' };
    if (w < 1200) return { code: 'lg', label: '≥ 992px (筆記型電腦)', color: 'bg-blue-800 text-blue-100' };
    if (w < 1400) return { code: 'xl', label: '≥ 1200px (桌上型螢幕)', color: 'bg-purple-800 text-purple-100' };
    return { code: 'xxl', label: '≥ 1400px (超大螢幕)', color: 'bg-rose-800 text-rose-100' };
  };

  const breakpoint = getBreakpointLabel(currentWidth);

  const fullHtml = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap 5.3.3 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #ffffff;
      padding: 1rem;
      min-height: 100vh;
      color: #212529;
      font-family: system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body>
  ${html}
  <!-- Bootstrap 5.3.3 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    // Auto initialize tooltips and popovers
    try {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      [...popoverTriggerList].map(el => new bootstrap.Popover(el));
    } catch(e) {}
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl ring-2 ring-purple-500' : 'h-full min-h-[420px]'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-950/80 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-semibold text-slate-300 ml-1">{title}</span>
          {badgeLabel && (
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: badgeColor }}
            >
              {badgeLabel}
            </span>
          )}
        </div>

        {/* Device Switcher & Breakpoint Indicator */}
        <div className="flex items-center gap-2">
          {/* Active Breakpoint Indicator */}
          <div
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-all ${breakpoint.color}`}
            title="當前視窗像素寬度與所屬 Bootstrap 斷點"
          >
            {breakpoint.code.toUpperCase()} · {currentWidth}px
          </div>

          {/* Device Buttons */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
            <button
              onClick={() => setDevice('mobile')}
              title="手機直向 (375px)"
              className={`p-1.5 rounded text-xs transition-colors ${
                device === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              title="平板 iPad (768px)"
              className={`p-1.5 rounded text-xs transition-colors ${
                device === 'tablet' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('desktop')}
              title="自適應寬螢幕 (100%)"
              className={`p-1.5 rounded text-xs transition-colors ${
                device === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action buttons */}
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            title="重新渲染預覽"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            title="複製預覽 HTML 程式碼"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? '退出全螢幕' : '全螢幕預覽'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Viewport Frame */}
      <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-auto min-h-[300px]">
        <div
          style={{ width: DEVICE_WIDTHS[device], maxWidth: '100%' }}
          className={`h-full transition-all duration-300 rounded-lg overflow-hidden border border-slate-700/80 shadow-2xl bg-white ${
            device !== 'desktop' ? 'my-auto' : 'w-full'
          }`}
        >
          <iframe
            key={refreshKey}
            ref={iframeRef}
            srcDoc={fullHtml}
            title={title}
            sandbox="allow-scripts allow-modals allow-same-origin"
            className="w-full h-full min-h-[350px] border-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
};
