import React from 'react';
import { Lesson, StudentProgress } from '../types/curriculum';
import { SandboxPreview } from './SandboxPreview';
import { CodeEditor } from './CodeEditor';

interface SplitViewProps {
  lesson: Lesson;
  progress: StudentProgress;
  onLessonComplete: (lessonId: string, earnedXp: number) => void;
}

export const SplitView: React.FC<SplitViewProps> = ({
  lesson,
}) => {
  const [studentCode, setStudentCode] = React.useState<string>(() => {
    return localStorage.getItem(`bs_draft_${lesson.id}`) || lesson.studentTask.starterHtml;
  });

  const handleCodeChange = (newCode: string) => {
    setStudentCode(newCode);
    localStorage.setItem(`bs_draft_${lesson.id}`, newCode);
  };

  const handleReset = () => {
    setStudentCode(lesson.studentTask.starterHtml);
    localStorage.removeItem(`bs_draft_${lesson.id}`);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-purple-400">⚡ 雙欄並行對照模式</span>
          <span>左側為老師標準示範，右側為你的即時編輯器與成果預覽！</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: Teacher Demo Reference */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
              👩‍🏫 老師教學範例與註解
            </h4>
            <p className="text-xs text-slate-300 mb-3">{lesson.teacherDialogue}</p>
            <div className="space-y-1">
              {lesson.keyClasses.map((item, idx) => (
                <div key={idx} className="text-xs bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="font-mono text-purple-300 font-bold">{item.name}</span>
                  <span className="text-slate-400 ml-2">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <SandboxPreview
            html={lesson.teacherHtml}
            title="老師標準示範"
            badgeLabel="👩‍🏫 老師成果"
            badgeColor="#0095ff"
          />
        </div>

        {/* Right: Student Hands-on Practice */}
        <div className="space-y-4">
          <CodeEditor
            code={studentCode}
            onChange={handleCodeChange}
            onReset={handleReset}
            solutionCode={lesson.studentTask.solutionHtml}
            hints={lesson.studentTask.hints}
            onApplySolution={() => setStudentCode(lesson.studentTask.solutionHtml)}
          />
          <SandboxPreview
            html={studentCode}
            title="學生實作預覽"
            badgeLabel="👨‍🎓 你的即時產出"
            badgeColor="#712cf9"
          />
        </div>
      </div>
    </div>
  );
};
