// ============================================================
// Lumos Platform — ProjectCard Veri Modeli
// Dosya: components/project-card/types.ts
// ============================================================

export type RoleStatus = 'FILLED' | 'OPEN' | 'CRITICAL_NEED';

export type CompensationType = 'PAID' | 'EQUITY' | 'PORTFOLIO';

export interface RoleSlotData {
  id: string;
  title: string;           // Örn: "Frontend Developer"
  status: RoleStatus;
  requiredSkills: string[];
  assignedUser?: {
    username: string;
    avatarUrl: string;
  };
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;                    // Tek cümlelik vizyon
  compensationType: CompensationType;
  hoursPerWeek: number;
  lastActiveSignal: string;           // Örn: "2 gün önce commit atıldı"
  partyComposition: RoleSlotData[];
  userSkillMatch: {
    matchedSkills: string[];
    missingSkills: string[];
  };
}
