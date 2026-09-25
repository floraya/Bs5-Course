import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Lesson, StudentProgress } from '../types/curriculum';
import { CodeEditor } from './CodeEditor';
import { SandboxPreview } from './SandboxPreview';
import { soundManager } from '../utils/sound';
import {
  validateHtmlSyntax,
  extractClassesFromHtml,
  findSimilarClassTypo,
} from '../utils/htmlValidator';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  ArrowRight,
  Sparkles,
  Award,
  Circle,
  Flame,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface StudentViewProps {
  lesson: Lesson;
  progress: StudentProgress;
  onLessonComplete: (lessonId: string, earnedXp: number) => void;
  onNextLesson?: () => void;
}

/**
 * Extract candidate CSS class tokens referenced in a rule description
 */
function extractExpectedClassesFromDescription(desc: string): string[] {
  const classes: string[] = [];
  // Match tokens like `focus-ring`, `btn-primary`, `ratio-16x9`, `table-hover`
  const classMatches = desc.match(/[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)+/g);
  if (classMatches) {
    for (const m of classMatches) {
      if (!['bootstrap-5', 'data-bs'].includes(m.toLowerCase())) {
        classes.push(m);
      }
    }
  }
  // Match single-word classes explicitly followed by 類別 / 容器 / 樣式
  const singleClassMatches = desc.match(
    /\b(clearfix|rounded|card|vr|ratio|row|col|lead|figure|table|hstack|vstack|container|shadow)\b\s*(?:類別|容器|樣式)/g
  );
  if (singleClassMatches) {
    for (const sm of singleClassMatches) {
      const word = sm.split(/\s+/)[0];
      if (word && !classes.includes(word)) {
        classes.push(word);
      }
    }
  }
  return classes;
}

export const StudentView: React.FC<StudentViewProps> = ({
  lesson,
  progress,
  onLessonComplete,
  onNextLesson,
}) => {
  const isAlreadyCompleted = progress.completedLessons.includes(lesson.id);

  // Storage key for student's draft per lesson
  const storageKey = `bs_draft_${lesson.id}`;
  const [code, setCode] = useState<string>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved || lesson.studentTask.starterHtml;
  });

  const [validationState, setValidationState] = useState<{
    success: boolean;
    message: string;
    details?: string[];
  } | null>(null);

  interface VerificationResult {
    evaluated: boolean;
    allPassed: boolean;
    passedCount: number;
    totalCount: number;
    ruleResults: {
      description: string;
      passed: boolean;
      failReason?: string;
    }[];
    isMasterBonusEligible?: boolean;
    syntaxErrors?: string[];
  }

  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Re-sync starter HTML if lesson changes
  useEffect(() => {
    const saved = localStorage.getItem(`bs_draft_${lesson.id}`);
    setCode(saved || lesson.studentTask.starterHtml);
    setValidationState(null);
    setVerificationResult(null);
  }, [lesson.id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(storageKey, newCode);
    if (validationState) setValidationState(null);
    if (verificationResult) setVerificationResult(null);
  };

  const handleReset = () => {
    soundManager.playClick();
    setCode(lesson.studentTask.starterHtml);
    localStorage.removeItem(storageKey);
    setValidationState(null);
    setVerificationResult(null);
  };

  const handleApplySolution = () => {
    setCode(lesson.studentTask.solutionHtml);
    localStorage.setItem(storageKey, lesson.studentTask.solutionHtml);
    setValidationState(null);
    setVerificationResult(null);
  };

  const handleVerify = () => {
    const cleanCode = code.replace(/<!--[\s\S]*?-->/g, '').trim();
    const starterClean = lesson.studentTask.starterHtml.replace(/<!--[\s\S]*?-->/g, '').trim();
    const isModified = cleanCode.length > 0 && cleanCode !== starterClean;

    // 1. Reject if the student hasn't modified the starter code
    if (!isModified) {
      soundManager.playError();
      const failResults = lesson.studentTask.rules.map((rule) => ({
        description: rule.description,
        passed: false,
        failReason: '尚未修改或加入任何實作內容',
      }));
      setVerificationResult({
        evaluated: true,
        allPassed: false,
        passedCount: 0,
        totalCount: lesson.studentTask.rules.length,
        ruleResults: failResults,
      });
      setValidationState({
        success: false,
        message: '✏️ 你還沒有修改或完成程式碼喔！',
        details: [
          '目前編輯器內的程式碼仍為初始題目範本，尚未加入實作內容。',
          '請先參考下方「任務實作步驟指南」與「規格檢核清單」，加入關鍵 Bootstrap 類別後再點擊驗證！',
          '💡 需要靈感嗎？可以點擊編輯器右上角的「提示」按鈕獲取步驟指引。',
        ],
      });
      return;
    }

    // 2. Strict HTML Syntax Verification
    const syntaxResult = validateHtmlSyntax(cleanCode);
    if (!syntaxResult.isValid) {
      soundManager.playError();
      const failResults = lesson.studentTask.rules.map((rule) => ({
        description: rule.description,
        passed: false,
        failReason: 'HTML 結構語法有誤，請先修復標籤與引號！',
      }));
      setVerificationResult({
        evaluated: true,
        allPassed: false,
        passedCount: 0,
        totalCount: lesson.studentTask.rules.length,
        ruleResults: failResults,
        syntaxErrors: syntaxResult.errors,
      });
      setValidationState({
        success: false,
        message: '⚠️ 程式碼含有 HTML 語法或標籤錯誤，請修正後再提交：',
        details: syntaxResult.errors,
      });
      return;
    }

    // 3. Test actual student code against all rules
    const actualClasses = extractClassesFromHtml(cleanCode);
    const ruleResults = lesson.studentTask.rules.map((rule) => {
      // Check if the rule mentions specific class names
      const expectedClasses = extractExpectedClassesFromDescription(rule.description);
      for (const expectedCls of expectedClasses) {
        if (!actualClasses.has(expectedCls)) {
          const typo = findSimilarClassTypo(cleanCode, expectedCls);
          const reason = typo
            ? `未找到類別「${expectedCls}」（偵測到拼寫可能有誤：你輸入了「${typo}」）`
            : `未找到指定類別「${expectedCls}」`;
          return {
            description: rule.description,
            passed: false,
            failReason: reason,
          };
        }
      }

      // Run the rule's programmatic test function
      let passed = false;
      try {
        passed = rule.test(cleanCode);
      } catch {
        passed = false;
      }

      return {
        description: rule.description,
        passed,
        failReason: passed ? undefined : '尚未完全符合規準要求',
      };
    });

    const totalRulesCount = lesson.studentTask.rules.length;
    const passedRulesCount = ruleResults.filter((r) => r.passed).length;
    const allRulesPassed = passedRulesCount === totalRulesCount;

    // Master bonus check: clean semantic code, no inline style="...", valid syntax, proper tags
    const isMasterBonusEligible =
      allRulesPassed &&
      !cleanCode.includes('style="') &&
      cleanCode.includes('>') &&
      cleanCode.length > 40;

    const failedRules = ruleResults
      .filter((r) => !r.passed)
      .map((r) => r.failReason ? `${r.description} ➔ ${r.failReason}` : r.description);

    setVerificationResult({
      evaluated: true,
      allPassed: allRulesPassed,
      passedCount: passedRulesCount,
      totalCount: totalRulesCount,
      ruleResults,
      isMasterBonusEligible,
    });

    if (allRulesPassed) {
      soundManager.playSuccess();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#712cf9', '#0d6efd', '#20c997', '#ffc107', '#d63384'],
      });

      const totalEarnedXp = lesson.studentTask.xp + (isMasterBonusEligible ? 25 : 0);

      setValidationState({
        success: true,
        message: isMasterBonusEligible
          ? `🏆 完美通關！已達標所有嚴格規準並獲【大師加分項】！共獲得 +${totalEarnedXp} XP！`
          : `🎉 太優秀了！成功通過「${lesson.title}」實作挑戰！獲得 +${totalEarnedXp} XP！`,
      });

      onLessonComplete(lesson.id, totalEarnedXp);
    } else {
      soundManager.playError();
      setValidationState({
        success: false,
        message: `挑戰尚未達標！已達成 ${passedRulesCount}/${totalRulesCount} 項條件，請修正以下項目：`,
        details: failedRules,
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Student Mission Briefing Card */}
      <div className="bg-[#0b101d] border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-5 relative z-10">
          <div className="space-y-3 flex-1">
            {/* Title & Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl">👨‍🎓</span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {lesson.studentTask.title}
              </h3>

              {/* Hardcore Difficulty Badge */}
              <span className="text-xs bg-rose-950/80 text-rose-300 border border-rose-700/60 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                金手特訓進階題
              </span>

              <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                +{lesson.studentTask.xp} XP
              </span>

              {isAlreadyCompleted && (
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  已通關
                </span>
              )}
            </div>

            {/* Scenario Story */}
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              {lesson.studentTask.scenario}
            </p>

            {/* Multi-step Instructions */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-purple-400 tracking-wide flex items-center gap-1">
                <span>📋 任務實作步驟指南：</span>
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {lesson.studentTask.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Split Workspace: Left = Live Code Editor + Acceptance Checklist, Right = Interactive Sandbox Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Code Editor + 驗收項目 */}
        <div className="space-y-4">
          {/* Code Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                學生實戰編輯器 (index.html)
              </span>
              <span className="text-[11px] text-slate-400">
                支援即時自動儲存
              </span>
            </div>

            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onReset={handleReset}
              onApplySolution={handleApplySolution}
              hints={lesson.studentTask.hints}
            />
          </div>

          {/* 驗收項目 Panel (Placed directly under CodeEditor) */}
          <div className="bg-[#0b1329]/95 border border-slate-800/90 rounded-2xl p-4 shadow-xl space-y-3.5">
            {/* Header: Title + Action Button */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  驗收項目 ({lesson.studentTask.rules.length} 項)
                </h4>
                {verificationResult && (
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                      verificationResult.allPassed
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {verificationResult.passedCount} / {verificationResult.totalCount} 通過
                  </span>
                )}
              </div>

              <button
                onClick={handleVerify}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>檢查成果</span>
              </button>
            </div>

            {/* Error / Warning Alert Banner */}
            {validationState && !validationState.success && (
              <div className="bg-rose-950/60 border border-rose-600/70 p-3 rounded-xl text-xs text-rose-200 flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-rose-300">{validationState.message}</div>
                  {validationState.details && (
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-300/90 font-mono">
                      {validationState.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Success Congratulation Banner */}
            {validationState && validationState.success && (
              <div className="bg-emerald-950/60 border border-emerald-500/70 p-3.5 rounded-xl text-xs text-emerald-200 flex items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-bold">{validationState.message}</span>
                </div>
                {onNextLesson && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onNextLesson();
                    }}
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-xs transition-all shadow"
                  >
                    <span>下一課</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Acceptance Checklist Items (Vertical stack of rows) */}
            <div className="space-y-2">
              {lesson.studentTask.rules.map((rule, idx) => {
                const verifiedItem = verificationResult?.ruleResults[idx];
                const isPassed = verifiedItem?.passed ?? false;
                const isEvaluated = !!verificationResult;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs transition-all ${
                      !isEvaluated
                        ? 'bg-[#0f172a]/70 border-slate-800 text-slate-300 hover:border-slate-700'
                        : isPassed
                        ? 'bg-emerald-950/30 border-emerald-600/40 text-emerald-200'
                        : 'bg-rose-950/25 border-rose-800/60 text-rose-200'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {!isEvaluated ? (
                        <Circle className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                      ) : isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </div>

                    <div className="flex-1 leading-relaxed font-mono">
                      <span>{rule.description}</span>
                      {isEvaluated && !isPassed && verifiedItem?.failReason && (
                        <span className="text-[11px] text-rose-300 ml-1 font-sans">
                          （{verifiedItem.failReason}）
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Master Bonus Option Indicator */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-300">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>金手獎大師加分約束：全純 Bootstrap 類別（無行內 style），語法完整規範</span>
              </span>
              <span className={`px-2 py-0.5 rounded font-bold transition-all ${
                verificationResult?.isMasterBonusEligible
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-amber-500/20 text-amber-300'
              }`}>
                +25 額外 XP
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="space-y-3 lg:sticky lg:top-20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              即時渲染沙盒預覽 (Bootstrap 5.3)
            </span>
            <span className="text-[11px] text-slate-400">
              沙盒隔離防干擾
            </span>
          </div>

          <SandboxPreview html={code} title={lesson.title} />
        </div>
      </div>
    </div>
  );
};
