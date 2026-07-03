import type { SkillCategory } from '@/lib/types';

/**
 * Skills matrix - organized by category
 * Demonstrates breadth and depth of technical knowledge
 */
export const skills: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Blazor', 'HTML5', 'CSS', 'JavaScript'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'C#', 'ASP.NET', 'Python', 'PostgreSQL', 'REST APIs', 'Architecture'],
  },
  {
    name: 'Design',
    skills: ['UI/UX', 'Design Systems', 'Figma', 'Accessibility', 'Responsive Design', 'Typography'],
  },
  {
    name: 'DevOps & Tools',
    skills: ['Git', 'GitHub', 'Azure DevOps', 'CI/CD', 'Docker', 'Linux', 'Netlify'],
  },
  {
    name: 'Product & Process',
    skills: ['Product Thinking', 'Architecture Design', 'System Design', 'Agile/Scrum', 'Technical Writing'],
  },
  {
    name: 'Other',
    skills: ['Tauri', 'Rust', 'Qt Framework', 'C/C++', 'ASP.NET WebForms', 'Vis.js'],
  },
];
