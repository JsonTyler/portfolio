import type { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    slug: 'cirrus', title: 'Cirrus compact mode',
    tagline: 'One density control across the product',
    description: 'A shared compact mode for data-dense screens, using consistent type, spacing, rows, and controls.',
    technologies: ['Interaction design', 'HTML', 'CSS', 'JavaScript'],
    status: 'archived', statusLabel: 'Professional compact-mode concept', featured: true,
  },
  {
    slug: 'datadustr-tools', title: 'DataDustr',
    tagline: 'Designing a more deliberate cleanup workflow',
    description: 'File and inbox cleanup built around reviewable suggestions and explicit web/desktop boundaries.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tauri', 'Rust'],
    status: 'in-development', featured: true,
  },
  {
    slug: 'timely', title: 'Timely',
    tagline: 'Making custody records visible over time',
    description: 'A research prototype connecting custody-record details with the time between removal and return.',
    technologies: ['JavaScript', 'Vis.js', 'HTML', 'CSS'],
    status: 'archived', featured: false,
  },
  {
    slug: 'framed', title: 'Framed',
    tagline: 'Exploring a physical problem on a canvas',
    description: 'A canvas experiment in arranging frames through dimensions, drag interactions, and position feedback.',
    technologies: ['JavaScript', 'Konva', 'jQuery'],
    status: 'archived', featured: false,
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
