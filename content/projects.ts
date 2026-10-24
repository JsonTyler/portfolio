import type { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    slug: 'cirrus', title: 'Cirrus compact mode',
    tagline: 'One density control across the product',
    description: 'A shared compact mode for data-dense screens, using consistent type, spacing, rows, and controls.',
    technologies: ['Interaction design', 'HTML', 'CSS', 'JavaScript'],
    engineeringNote: 'One density state across navigation, panels, and table rows.',
    status: 'archived', statusLabel: 'Professional compact-mode concept', featured: true,
  },
  {
    slug: 'datadustr-tools', title: 'Inbox Dustr & File Dustr',
    tagline: 'Designing a more deliberate cleanup workflow',
    description: 'Two interactive product concepts for making digital clutter easier to review. Explore inbox and file workflows with mock data.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tauri', 'Rust'],
    contribution: 'Independent product design and engineering',
    engineeringNote: 'Shared workflows with separate web and desktop adapters.',
    status: 'in-development', statusLabel: 'Product concepts · interactive mock-data demos', featured: true,
  },
  {
    slug: 'as-i-left-it', title: 'As I Left It',
    tagline: 'Coming soon',
    description: 'Coming soon.',
    technologies: ['Python', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    status: 'in-development', statusLabel: 'Coming soon', featured: false, comingSoon: true,
  },
  {
    slug: 'timely', title: 'Timely',
    tagline: 'Making custody records visible over time',
    description: 'A research prototype connecting custody-record details with the time between removal and return.',
    technologies: ['JavaScript', 'Vis.js', 'HTML', 'CSS'],
    engineeringNote: 'One custody record drives both table and timeline views.',
    status: 'archived', statusLabel: 'College project · archived', collection: 'college', featured: false,
  },
  {
    slug: 'framed', title: 'Framed',
    tagline: 'Exploring a physical problem on a canvas',
    description: 'A canvas experiment in arranging frames through dimensions, drag interactions, and position feedback.',
    technologies: ['JavaScript', 'Konva', 'jQuery'],
    engineeringNote: 'Frame positions drive live hanging-point measurements.',
    status: 'archived', statusLabel: 'College project · archived', collection: 'college', featured: false,
  },
];

export const projectStatusLabels: Record<Project['status'], string> = {
  active: 'Active', 'in-development': 'Independent project · not launched', archived: 'Historical prototype',
};
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
export function getFeaturedProjects(): Project[] { return projects.filter((project) => project.featured); }
export function getActiveProjects(): Project[] { return projects.filter((project) => project.status === 'active'); }

export function getSelectedProjects(): Project[] { return projects.filter(project => project.collection !== 'college').sort((a, b) => Number(b.slug === 'datadustr-tools') - Number(a.slug === 'datadustr-tools')); }
export function getCollegeProjects(): Project[] { return projects.filter(project => project.collection === 'college'); }
