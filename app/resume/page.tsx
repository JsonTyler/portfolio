import { Metadata } from 'next';
import { PrintResume } from '@/components/PrintResume';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume and professional summary for Jason Tyler Rodriguez.',
};

const skills = {
  languages: ['C#', 'JavaScript', 'HTML', 'CSS', 'SCSS', 'Python'],
  frameworks: ['.NET', 'Blazor', 'Bootstrap', 'Syncfusion'],
  architecture: ['Design systems', 'Component libraries', 'Accessibility practice', 'Design tokens', 'UX engineering'],
  devops: ['Azure DevOps', 'Git', 'CI/CD pipelines'],
  ai: ['AI-assisted development'],
};

export default function ResumePage() {
  return (
    <>
      <section className="gradient-bg text-white hero-padding border-b">
        <div className="container-max max-w-4xl">
          <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4">Resume</h1>
          <p className="hero-subtitle text-base md:text-lg max-w-3xl">
            Senior Software Engineer with eight years of experience in professional front-end development and a strong UX focus.
          </p>
          <div className="resume-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
            <a className="focus-ring resume-download" href="/resume/download" download="Jason-Tyler-Rodriguez-Resume.pdf" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '.65rem 1rem', borderRadius: '.4rem', background: '#ceeaa0', color: '#101819', fontWeight: 700 }}>Download résumé · PDF</a>
            <PrintResume />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max max-w-4xl space-y-8 resume-sections">
          <Card variant="outlined">
            <h2 className="text-2xl font-bold mt-0 mb-3">Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed">
              Senior Software Engineer with eight years building front-end applications, reusable components, and design systems, with a strong UX focus. I work across architecture, implementation, UX standards, and delivery quality.
            </p>
          </Card>

          <Card variant="outlined">
            <h2 className="text-2xl font-bold mt-0 mb-4">Key Qualifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-base font-bold mt-0 mb-2">Architecture and design systems</h3>
                <p className="text-slate-700 text-sm mb-0">Led enterprise component architecture, design tokens, and UI standards across multi-team products.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-base font-bold mt-0 mb-2">Product-minded implementation</h3>
                <p className="text-slate-700 text-sm mb-0">Translate ambiguous requirements into maintainable software with clear tradeoffs, iterative delivery, and measurable quality gates.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-base font-bold mt-0 mb-2">Exploring AI-assisted workflows</h3>
                <p className="text-slate-700 text-sm mb-0">Interested in AI-assisted planning, implementation, and review, with responsibility for validating the result.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-base font-bold mt-0 mb-2">Enterprise delivery</h3>
                <p className="text-slate-700 text-sm mb-0">Experience in regulated and high-stakes environments, including aerospace and ERP software serving large organizations.</p>
              </div>
            </div>
          </Card>

          <Card variant="outlined">
            <h2 className="text-2xl font-bold mt-0 mb-4">Experience</h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold mt-0 mb-1">Springbrook Software, Senior Front-End Software Engineer / Team Lead</h3>
                <p className="text-slate-600 text-sm mb-2">2022 to Present</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>Led development of an enterprise design system used across multiple ERP applications.</li>
                  <li>Built reusable Blazor components, design tokens, and frontend architecture for consistency and scalability.</li>
                  <li>Partnered with product and engineering leadership to modernize UX and UI standards.</li>
                  <li>Served as team lead and mentored engineers on frontend architecture and component design practices.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mt-0 mb-1">Moses Lake Industries, Front-End Web Developer / UX Designer</h3>
                <p className="text-slate-600 text-sm mb-2">March 2020 to December 2021</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>Built enterprise web applications using Blazor, ASP.NET, and C#.</li>
                  <li>Led redesign of 8 applications and development of 8 new applications.</li>
                  <li>Established UI standards and technical documentation across 16 projects.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mt-0 mb-1">Lockheed Martin (Aeronautics), Software Engineer</h3>
                <p className="text-slate-600 text-sm mb-2">2018 to 2020</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>Developed software in Python and Linux-based environments.</li>
                  <li>Built internal automation tools for subsystem integration and testing.</li>
                  <li>Contributed to mission-critical aerospace software in structured engineering teams.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mt-0 mb-1">Jackson State University, Undergraduate Student Researcher</h3>
                <p className="text-slate-600 text-sm mb-2">2015 to 2017</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>Built Timely, a chain-of-custody visualization tool for digital forensics.</li>
                  <li>Published research at IEEE SoutheastCon 2019.</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card variant="outlined">
            <h2 className="text-2xl font-bold mt-0 mb-4">Skills</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">{skills.languages.map((s) => <Badge key={s} variant="accent" size="sm">{s}</Badge>)}</div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">Frameworks</p>
                <div className="flex flex-wrap gap-2">{skills.frameworks.map((s) => <Badge key={s} variant="accent" size="sm">{s}</Badge>)}</div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">Architecture</p>
                <div className="flex flex-wrap gap-2">{skills.architecture.map((s) => <Badge key={s} variant="accent" size="sm">{s}</Badge>)}</div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">DevOps</p>
                <div className="flex flex-wrap gap-2">{skills.devops.map((s) => <Badge key={s} variant="accent" size="sm">{s}</Badge>)}</div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">AI tools I’m exploring</p>
                <div className="flex flex-wrap gap-2">{skills.ai.map((s) => <Badge key={s} variant="accent" size="sm">{s}</Badge>)}</div>
              </div>
            </div>
          </Card>

          <Card variant="outlined">
            <h2 className="text-2xl font-bold mt-0 mb-3">Education</h2>
            <p className="text-slate-700 text-sm">
              B.S. in Computer Science, Jackson State University (2013 to 2017), Cum Laude (3.57 GPA), Presidential Scholarship, W.E.B. Du Bois Honors College.
            </p>
          </Card>

          <Card variant="outlined">
            <h2 className="text-2xl font-bold mt-0 mb-3">Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 text-sm">
              <p><strong>Name:</strong> Jason Tyler Rodriguez</p>
              <p><strong>GitHub:</strong> <a href={SITE_METADATA.github} target="_blank" rel="noopener noreferrer">{SITE_METADATA.github}</a></p>
              <p><strong>LinkedIn:</strong> <a href={SITE_METADATA.linkedin} target="_blank" rel="noopener noreferrer">{SITE_METADATA.linkedin}</a></p>
            </div>
          </Card>

          <div className="resume-actions flex flex-col sm:flex-row gap-3">
            <PrintResume />
          </div>
        </div>
      </section>
    </>
  );
}
