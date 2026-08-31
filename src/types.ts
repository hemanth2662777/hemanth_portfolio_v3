export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  hasModal: boolean;
  modalType?: "rice" | "credit";
  stats?: {
    accuracy?: string;
    modelType?: string;
    dataset?: string;
  };
}

export interface SkillCategory {
  title: string;
  iconName: string;
  tags: string[];
  level: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  organization: string;
  meta: string[];
  period?: string;
  points: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  score: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  badge?: string;
}

export type ModalType = "rice" | "credit" | null;
