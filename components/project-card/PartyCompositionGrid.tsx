// ============================================================
// PartyCompositionGrid — Rol slotlarını grid halinde gösterir
// ============================================================

import type { RoleSlotData, RoleStatus } from './types';
import { RoleSlot } from './RoleSlot';

interface PartyCompositionGridProps {
  slots: RoleSlotData[];
}

// RPG-style party health summary
function PartySummary({ slots }: { slots: RoleSlotData[] }) {
  const counts: Record<RoleStatus, number> = {
    FILLED: 0,
    OPEN: 0,
    CRITICAL_NEED: 0,
  };
  slots.forEach((s) => counts[s.status]++);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/30">
        Parti
      </span>
      <div className="flex items-center gap-2">
        {counts.FILLED > 0 && (
          <span className="flex items-center gap-1 text-[0.65rem] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {counts.FILLED} dolu
          </span>
        )}
        {counts.OPEN > 0 && (
          <span className="flex items-center gap-1 text-[0.65rem] text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {counts.OPEN} açık
          </span>
        )}
        {counts.CRITICAL_NEED > 0 && (
          <span className="flex items-center gap-1 text-[0.65rem] text-amber-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            {counts.CRITICAL_NEED} kritik
          </span>
        )}
      </div>
    </div>
  );
}

export function PartyCompositionGrid({ slots }: PartyCompositionGridProps) {
  return (
    <div className="space-y-2.5">
      <PartySummary slots={slots} />
      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <RoleSlot key={slot.id} slot={slot} />
        ))}
      </div>
    </div>
  );
}
