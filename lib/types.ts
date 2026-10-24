/**
 * Core types for the portfolio application
 * These define the shape of data throughout the application
 */

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image?: string;
  technologies: string[];
  status: 'active' | 'archived' | 'in-development';
  featured: boolean;
  comingSoon?: boolean;
  collection?: 'college';
  statusLabel?: string;
  contribution?: string;
  engineeringNote?: string;
  content?: string; // Markdown or HTML for detail pages
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  period: {
    start: string;
    end: string | 'present';
  };
  description: string;
  technologies?: string[];
  highlights?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  email: string;
  github: string;
  linkedin: string;
  siteName: string;
  siteUrl: string;
}
