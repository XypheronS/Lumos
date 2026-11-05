// ============================================================
// SkillMatchBar — Kullanıcı beceri uyum göstergesi
// ============================================================

interface SkillMatchBarProps {
  matchedSkills: string[];
  missingSkills: string[];
}

export function SkillMatchBar({ matchedSkills, missingSkills }: SkillMatchBarProps) {
  const total = matchedSkills.length + missingSkills.length;
  const matchPercent = total === 0 ? 0 : Math.round((matchedSkills.length / total) * 100);

  // Color thresholds
  const barColor =
    matchPercent >= 75
      ? 'from-emerald-500 to-emerald-400'
      : matchPercent >= 40
      ? 'from-violet-500 to-violet-400'
      : 'from-amber-500 to-amber-400';

  const textColor =
    matchPercent >= 75
      ? 'text-emerald-400'
      : matchPercent >= 40
      ? 'text-violet-300'
      : 'text-amber-400';

  return (
    <div className="space-y-2.5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/30">
          Beceri Uyumu
        </span>
        <span className={`text-[0.72rem] font-bold tabular-nums ${textColor}`}>
          {matchPercent}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${matchPercent}%` }}
        />
      </div>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-1">
        {matchedSkills.map((skill) => (
          <span
            key={`match-${skill}`}
            className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-950/40 px-2 py-0.5 text-[0.6rem] font-medium text-emerald-400"
          >
            <span className="text-[8px]">✓</span>
            {skill}
          </span>
        ))}
        {missingSkills.map((skill) => (
          <span
            key={`miss-${skill}`}
            className="inline-flex items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 text-[0.6rem] font-medium text-white/25"
          >
            <span className="text-[8px]">○</span>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
