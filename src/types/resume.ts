export interface PersonalData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  liveSite: string;
  client: string;
  server: string;
  shortDesc: string;
  features: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: string;
}

export interface ResumeData {
  personal: PersonalData;
  objective: string;
  skills: Skill[];
  projects: Project[];
  education: Education[];
  languages: Language[];
}
