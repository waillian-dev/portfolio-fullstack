export interface IProfileStats {
  yearsExperience: number;
  completedProjects: number;
  totalClients: number;
  technologiesMastered: number;
}

export interface IProfile {
  _id: string;
  fullName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  availabilityStatus: string;
  resumeUrl: string;
  stats: IProfileStats;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'DevOps & Tools';

export interface ISkill {
  _id: string;
  name: string;
  icon: string;
  category: SkillCategory;
  percentage: number;
  years: number;
  displayOrder: number;
}

export interface IExperience {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  employmentType: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  displayOrder: number;
}

export interface IService {
  _id: string;
  title: string;
  icon: string;
  shortDescription: string;
  features: string[];
  priceRange?: string;
  ctaText: string;
  displayOrder: number;
}

export type ProjectCategory = 'Web' | 'Mobile' | 'Backend' | 'Dashboard' | 'UI/UX' | 'Other';

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  thumbnailUrl: string;
  gallery: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  completionDate?: string;
  problemStatement?: string;
  solutionStatement?: string;
  keyFeatures?: string[];
  viewsCount: number;
  displayOrder: number;
}

export interface ITestimonial {
  _id: string;
  clientName: string;
  jobTitle: string;
  company: string;
  avatarUrl: string;
  rating: number;
  content: string;
  isApproved: boolean;
  displayOrder: number;
}

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  isPublished: boolean;
  readingTimeMinutes: number;
  viewsCount: number;
  publishedAt?: string;
  createdAt: string;
}

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
}

export interface ISiteSetting {
  _id: string;
  siteTitle: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

export interface IAdmin {
  _id: string;
  username: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}
