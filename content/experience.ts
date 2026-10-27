import type { ExperienceItem } from '@/lib/types';

/**
 * Career experience timeline
 * Shows progression and growth across roles and companies
 */
export const experience: ExperienceItem[] = [
  {
    id: 'springbrook-2022',
    company: 'Springbrook Software',
    title: 'Senior Front-End Software Engineer / Lead UX Designer',
    period: {
      start: '2022-01',
      end: 'present',
    },
    description: 'Maintained the existing Design Library component library and worked on UX consistency, documented standards, and interface patterns for an ERP platform.',
    technologies: ['Blazor', 'C#', 'SASS', 'TypeScript', 'Azure DevOps', 'Git'],
    highlights: [
      'Served as team lead, guiding frontend implementation and coordinating delivery',
      'Owned and maintained Design Library',
      'Led UX design efforts across product',
      'Established design consistency and best practices',
      'Collaborated with product and engineering teams',
    ],
  },
  {
    id: 'mli-2020',
    company: 'Moses Lake Industries',
    title: 'Front-End Web Developer / UX Designer',
    period: {
      start: '2020-03',
      end: '2022-01',
    },
    description: 'Designed and developed UI for various internal web applications. Focused on user experience, iterating with clients to understand needs and deliver intuitive interfaces.',
    technologies: ['ASP.NET WebForms', 'Blazor', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
    highlights: [
      'Led design of multiple internal applications',
      'Collaborated with stakeholders on UX improvements',
      'Maintained and updated existing web applications',
      'Learned Blazor and modern web practices',
    ],
  },
  {
    id: 'lockheed-2018',
    company: 'Lockheed Martin (Aeronautics)',
    title: 'Software Engineer',
    period: {
      start: '2018-01',
      end: '2020-01',
    },
    description: 'Worked on F-22 aeronautics research and development. Led research, design, coding, testing, and integration of flight subsystems in simulation environment. Received Excellence rating on 2018 performance review.',
    technologies: ['Python', 'C/C++', 'Qt Framework', 'Git', 'Jira', 'Confluence', 'Jenkins', 'Linux'],
    highlights: [
      'Led flight subsystem research and implementation',
      'Created internal Qt GUI-based automation plugins',
      'Participated in agile sprints and scrum processes',
      'Excellence rating on performance review',
    ],
  },
  {
    id: 'jsums-2015',
    company: 'Jackson State University',
    title: 'Undergraduate Student Researcher',
    period: {
      start: '2015-06',
      end: '2017-12',
    },
    description: 'Led research on digital forensics data visualization. Created Timely, a chain of custody data visualization tool. Work resulted in publication at IEEE SoutheastCon 2019.',
    technologies: ['JavaScript', 'Vis.js', 'HTML5', 'CSS', 'Bootstrap', 'Git', 'Linux'],
    highlights: [
      'Published research at IEEE SoutheastCon 2019',
      'Developed Timely data visualization tool',
      'Worked on funded research project',
      'Explored domain-specific data visualization',
    ],
  },
  {
    id: 'jsums-education',
    company: 'Jackson State University',
    title: 'Bachelor of Science in Computer Science',
    period: {
      start: '2013-08',
      end: '2017-12',
    },
    description: 'Graduated with honors from Full Ride Presidential Academic Scholarship. Member of Honors College.',
    technologies: [],
    highlights: [
      'Full Ride Presidential Academic Scholarship',
      'Graduated with honors',
      'Member of Honors College',
    ],
  },
];
