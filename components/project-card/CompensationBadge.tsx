import type { CompensationType } from './types';

// ============================================================
// CompensationBadge — Ücret tipi rozeti
// ============================================================

interface CompensationBadgeProps {
  type: CompensationType;
}

const CONFIG: Record<CompensationType, { label: string; icon: string; classes: string }> = {
  PAID: {
    label: 'Ücretli',
    icon: '💰',
    classes:
      'bg-emerald-950/60 border-emerald-500/30 text-emerald-400',
  },
  EQUITY: {
    label: 'Hisse',
    icon: '📈',
    classes:
      'bg-violet-950/60 border-violet-500/30 text-violet-300',
  },
  PORTFOLIO: {
    label: 'Portföy',
    icon: '🎨',
    classes:
      'bg-amber-950/60 border-amber-500/30 text-amber-400',
  },
};

export function CompensationBadge({ type }: CompensationBadgeProps) {
  const { label, icon, classes } = CONFIG[type];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[0.68rem] font-semibold tracking-wider uppercase ${classes}`}
    >
      <span>{icon}</span>
      {label}
    </span>
  );
}
