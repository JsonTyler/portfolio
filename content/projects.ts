import type { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    slug: 'cirrus', title: 'Cirrus compact mode',
    tagline: 'One density control across the product',
    description: 'An independent compact-mode recreation based on publicly available product imagery. Uses fictional data; not affiliated with or endorsed by Springbrook.',
    technologies: ['Interaction design', 'HTML', 'CSS', 'JavaScript'],
    engineeringNote: 'One density state across navigation, panels, and table rows.',
    status: 'archived', statusLabel: 'Independent compact-mode recreation', collection: 'enterprise', featured: false,
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
    slug: 'threadkeep', title: 'Threadkeep',
    tagline: 'Pick up an AI-assisted project where you left off',
    description: 'A working local context-memory app for Codex and AI-assisted projects. Keep the stopping point, next move, decisions, and open questions together across sessions.',
    engineeringNote: 'One revisioned SQLite store shared by the browser and Codex adapter.',
    technologies: ['Python', 'SQLite', 'JavaScript', 'HTML', 'CSS'],
    contribution: 'Independent product design and engineering',
    status: 'active', statusLabel: 'Working local application · fictional-data screenshots', featured: true,
  },
  {
    slug: 'timely', title: 'Timely',
    tagline: 'Chain-of-custody research · IEEE SoutheastCon 2019',
    description: 'Undergraduate digital-forensics research connecting case records with an interactive timeline. Related research published at IEEE SoutheastCon 2019.',
    technologies: ['JavaScript', 'Vis.js', 'HTML', 'CSS'],
    engineeringNote: 'Questions, timeline, table and CSV export share the same case records.',
    status: 'archived', statusLabel: 'Published research · IEEE SoutheastCon 2019', collection: 'research', featured: false,
  },
  {
    slug: 'framed', title: 'Framed',
    tagline: 'Exploring a physical problem on a canvas',
    description: 'A canvas experiment in arranging frames through dimensions, drag interactions, and position feedback.',
    technologies: ['JavaScript', 'Konva', 'jQuery'],
    engineeringNote: 'Frame positions drive live hanging-point measurements.',
    status: 'archived', statusLabel: 'College project · archived', collection: 'archive', featured: false,
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

export function getSelectedProjects(): Project[] {
  return ['threadkeep', 'datadustr-tools'].map(slug => projects.find(project => project.slug === slug)!);
}
export function getResearchProjects(): Project[] { return projects.filter(project => project.collection === 'research'); }
export function getWorkspaceProjects(): Project[] {
  return [...getSelectedProjects(), ...getResearchProjects(), ...projects.filter(project => project.collection === 'enterprise')];
}
