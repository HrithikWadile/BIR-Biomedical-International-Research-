
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  longDescription: string;
  benefits: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  problem: string;
  solution: string;
  outcome: string;
  tags: string[];
  link?: string;
}

export interface UpcomingPaper {
  id: string;
  title: string;
  domain: string;
  description: string;
  status: 'Recruiting' | 'Analysis Phase' | 'Manuscript Preparation';
  requiredBackground: string;
  spots: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  heroText: string;
  contactEmail: string;
  address: string;
  phone: string;
  socialLinks: {
    linkedin: string;
    instagram: string;
    whatsapp: string;
  };
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface EnrollmentSubmission {
  id: string;
  paperId: string;
  paperTitle: string;
  name: string;
  email: string;
  background: string;
  experience: string;
  timestamp: string;
}

export interface CMSData {
  services: Service[];
  caseStudies: CaseStudy[];
  upcomingPapers: UpcomingPaper[];
  team: TeamMember[];
  blogs: Blog[];
  settings: SiteSettings;
  submissions: ContactSubmission[];
  enrollments: EnrollmentSubmission[];
}