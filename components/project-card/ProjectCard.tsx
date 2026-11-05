'use client';

import type { ProjectData } from './types';
import { CompensationBadge } from './CompensationBadge';
import { PartyCompositionGrid } from './PartyCompositionGrid';
import { SkillMatchBar } from './SkillMatchBar';

// ============================================================
// ProjectCard — Ana bileşen
// ============================================================

interface ProjectCardProps {
  project: ProjectData;
  /** Başvur butonuna tıklandığında çağrılır */
  onApply?: (projectId: string) => void;
  /** Kartı kaydet/yer imi butonuna tıklandığında çağrılır */
  onBookmark?: (projectId: string) => void;
}

// Toplam açık rol sayısı (OPEN + CRITICAL_NEED)
function countOpenSlots(project: ProjectData): number {
  return project.partyComposition.filter(
    (s) => s.status === 'OPEN' || s.status === 'CRITICAL_NEED',
  ).length;
}

// Proje aktiflik göstergesi
function ActiveSignal({ signal }: { signal: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="text-[0.62rem] text-white/35">{signal}</span>
    </div>
  );
}

// Divider
function Divider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
  );
}

export function ProjectCard({ project, onApply, onBookmark }: ProjectCardProps) {
  const openSlots = countOpenSlots(project);
  const hasCritical = project.partyComposition.some((s) => s.status === 'CRITICAL_NEED');

  return (
    <article
      className={[
        // Base
        'group relative flex flex-col overflow-hidden rounded-2xl',
        // Glass background
        'bg-[#0d0d12]/80 backdrop-blur-xl',
        // Border: critical = amber glow, otherwise subtle violet
        hasCritical
          ? 'border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.08),inset_0_0_0_0.5px_rgba(245,158,11,0.15)]'
          : 'border border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_0_0_0.5px_rgba(112,41,188,0.12)]',
        // Hover lift
        'transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(112,41,188,0.25)]',
      ].join(' ')}
    >
      {/* ── Ambient top glow ── */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* ── Corner accent (RPG rune corner) ── */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-16 w-16 opacity-20"
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 0 L64 64 L0 0 Z" fill="url(#corner-grad)" />
          <defs>
            <linearGradient id="corner-grad" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#7029bc" />
              <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ════════════════════════════════════════
          HEADER — Başlık, tagline, meta
      ════════════════════════════════════════ */}
      <div className="flex flex-col gap-3 p-5 pb-4">
        {/* Top row: badge + bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <CompensationBadge type={project.compensationType} />
            {hasCritical && (
              <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-950/50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-amber-400">
                ⚔ Kritik Açık
              </span>
            )}
          </div>
          <button
            onClick={() => onBookmark?.(project.id)}
            aria-label="Projeyi kaydet"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-white/30 transition-all duration-200 hover:border-violet-500/40 hover:text-violet-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M5 2a1 1 0 0 0-1 1v14l6-3 6 3V3a1 1 0 0 0-1-1H5Z" />
            </svg>
          </button>
        </div>

        {/* Project title */}
        <div>
          <h2 className="font-geist text-lg font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-violet-100">
            {project.title}
          </h2>
          <p className="mt-1 text-[0.78rem] leading-relaxed text-white/45">
            {project.tagline}
          </p>
        </div>

        {/* Meta chips row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Hours per week */}
          <div className="flex items-center gap-1.5 text-[0.65rem] text-white/35">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3 w-3 text-violet-400/70"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7-4.75a.75.75 0 0 0-.75.75v4.5c0 .2.08.392.22.53l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.75 8.69V4a.75.75 0 0 0-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{project.hoursPerWeek} saat/hafta</span>
          </div>

          {/* Open slots */}
          {openSlots > 0 && (
            <div className="flex items-center gap-1.5 text-[0.65rem] text-white/35">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-3 w-3 text-violet-400/70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <span>
                {openSlots} açık rol
              </span>
            </div>
          )}

          {/* Active signal */}
          <ActiveSignal signal={project.lastActiveSignal} />
        </div>
      </div>

      <Divider />

      {/* ════════════════════════════════════════
          PARTY COMPOSITION
      ════════════════════════════════════════ */}
      <div className="p-5 pb-4">
        <PartyCompositionGrid slots={project.partyComposition} />
      </div>

      <Divider />

      {/* ════════════════════════════════════════
          SKILL MATCH
      ════════════════════════════════════════ */}
      <div className="p-5 pb-4">
        <SkillMatchBar
          matchedSkills={project.userSkillMatch.matchedSkills}
          missingSkills={project.userSkillMatch.missingSkills}
        />
      </div>

      <Divider />

      {/* ════════════════════════════════════════
          ACTION FOOTER
      ════════════════════════════════════════ */}
      <div className="flex items-center gap-3 p-5 pt-4">
        {/* Primary: Apply */}
        <button
          onClick={() => onApply?.(project.id)}
          className="relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-2.5 text-[0.78rem] font-bold text-white shadow-[0_4px_16px_rgba(112,41,188,0.4)] transition-all duration-300 hover:shadow-[0_4px_24px_rgba(112,41,188,0.6)] hover:brightness-110 active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
            Partiye Katıl
          </span>
          {/* Shine sweep on hover */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>

        {/* Secondary: View details */}
        <button className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[0.78rem] font-semibold text-white/50 transition-all duration-200 hover:border-white/[0.15] hover:text-white/70">
          Detay
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3 w-3"
          >
            <path
              fillRule="evenodd"
              d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
