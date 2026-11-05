import Image from 'next/image';
import type { RoleSlotData, RoleStatus } from './types';

// ============================================================
// RoleSlot — Party composition içindeki tek bir rol kartı
// ============================================================

interface RoleSlotProps {
  slot: RoleSlotData;
}

const STATUS_CONFIG: Record<
  RoleStatus,
  { label: string; dotColor: string; borderColor: string; glowColor: string; pulse: boolean }
> = {
  FILLED: {
    label: 'Dolu',
    dotColor: 'bg-emerald-400',
    borderColor: 'border-emerald-500/20',
    glowColor: '',
    pulse: false,
  },
  OPEN: {
    label: 'Açık',
    dotColor: 'bg-violet-400',
    borderColor: 'border-violet-500/30',
    glowColor: '',
    pulse: true,
  },
  CRITICAL_NEED: {
    label: 'Kritik!',
    dotColor: 'bg-amber-400',
    borderColor: 'border-amber-500/50',
    glowColor: 'shadow-[0_0_12px_rgba(245,158,11,0.25)]',
    pulse: true,
  },
};

function StatusDot({
  color,
  pulse,
}: {
  color: string;
  pulse: boolean;
}) {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {pulse && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${color}`}
        />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}

export function RoleSlot({ slot }: RoleSlotProps) {
  const cfg = STATUS_CONFIG[slot.status];

  return (
    <div
      className={`relative flex flex-col gap-2 rounded-xl border bg-white/[0.03] p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] ${cfg.borderColor} ${cfg.glowColor}`}
    >
      {/* Header: title + status */}
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[0.72rem] font-semibold text-white/80">
          {slot.title}
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <StatusDot color={cfg.dotColor} pulse={cfg.pulse} />
          <span
            className={`text-[0.6rem] font-bold uppercase tracking-widest ${
              slot.status === 'CRITICAL_NEED'
                ? 'text-amber-400'
                : slot.status === 'OPEN'
                ? 'text-violet-300'
                : 'text-emerald-400'
            }`}
          >
            {cfg.label}
          </span>
        </span>
      </div>

      {/* Assigned user or empty slot */}
      {slot.assignedUser ? (
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
            <Image
              src={slot.assignedUser.avatarUrl}
              alt={slot.assignedUser.username}
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <span className="truncate text-[0.68rem] text-white/50">
            @{slot.assignedUser.username}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-dashed border-white/15 bg-white/[0.02]">
            <span className="text-[10px] text-white/30">?</span>
          </div>
          <span className="text-[0.65rem] text-white/25 italic">Boş slot</span>
        </div>
      )}

      {/* Required skills */}
      {slot.requiredSkills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {slot.requiredSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[0.58rem] font-medium text-white/40 border border-white/[0.06]"
            >
              {skill}
            </span>
          ))}
          {slot.requiredSkills.length > 3 && (
            <span className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[0.58rem] text-white/25 border border-white/[0.06]">
              +{slot.requiredSkills.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
