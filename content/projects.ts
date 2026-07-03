import type { Project } from '@/lib/types';

/**
 * Projects showcase - data structure for all portfolio projects
 * Each project can be expanded into a full case study page
 */
export const projects: Project[] = [
  {
    slug: 'datadustr',
    title: 'DataDustr',
    tagline: 'Company building and digital organization platform',
    description:
      'Founded DataDustr to help professionals and businesses reclaim digital space through intelligent cleanup and organization of email and files. Demonstrates full-stack product development from vision through market.',
    image: '/images/projects/datadustr.jpg',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Tauri', 'PostgreSQL'],
    status: 'active',
    featured: true,
  },
  {
    slug: 'datadustr-tools',
    title: 'DataDustrTools',
    tagline: 'Technical architecture case study in production software',
    description:
      'Commercial product built under the DataDustr brand. Dual-module architecture (File Dustr + Inbox Dustr) with sophisticated policy layer for feature entitlements. Multi-platform development with shared React codebase.',
    image: '/images/projects/datadustr-tools.jpg',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind', 'Tauri', 'Rust'],
    status: 'active',
    featured: true,
  },
  {
    slug: 'timely',
    title: 'Timely',
    tagline: 'Digital forensics data visualization tool',
    description:
      'Research project: Chain of Custody data visualizer for digital forensic investigators. Published at IEEE Southeast Con 2019. Demonstrates research rigor and data visualization expertise.',
    image: '/images/projects/timely.jpg',
    technologies: ['JavaScript', 'Vis.js', 'HTML5', 'CSS', 'Bootstrap', 'Git'],
    status: 'archived',
    featured: true,
  },
  {
    slug: 'design-library',
    title: 'Design Library',
    tagline: 'Design system for SaaS ERP platform',
    description:
      'Owner of design library powering Springbrook Software\'s Cirrus ERP application. Component library approach, design consistency, and UX best practices for 1000+ users.',
    technologies: ['Blazor', 'C#', 'SASS', 'Bootstrap', 'Design Systems'],
    status: 'active',
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getActiveProjects(): Project[] {
  return projects.filter((p) => p.status === 'active');
}
