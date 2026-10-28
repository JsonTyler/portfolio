import { PrintResume } from '@/components/PrintResume';
import styles from '@/app/resume/page.module.css';
import { SITE_METADATA } from '@/lib/constants';

const skills = {
  languages: ['C#', 'TypeScript', 'JavaScript', 'HTML/CSS/SCSS', 'Python'],
  frameworks: ['.NET', 'Blazor', 'Bootstrap', 'Syncfusion'],
  architecture: ['Design systems', 'Component libraries', 'Accessibility practice', 'Design tokens', 'UX engineering'],
  devops: ['Azure DevOps', 'Git', 'CI/CD pipelines'],
  ai: ['Claude', 'GitHub Copilot', 'AI-assisted code review', 'Workflow automation'],
};

export function ResumeContent({ embedded = false }: { embedded?: boolean }) {
  return (
    <div className={`${styles.page} ${embedded ? styles.embedded : ''}`}>
      <section className={embedded ? styles.heading : "gradient-bg text-white hero-padding border-b"}>
        <div className="container-max max-w-4xl">
          <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4">Resume</h1>
          <p className="hero-subtitle text-base md:text-lg max-w-3xl">
            Senior Software Engineer · Front-end engineering · Design systems · AI workflow automation
          </p>
          <div className={`resume-actions ${styles.actions}`}>
            <a className={`focus-ring resume-download ${styles.download}`} href="/resume/download" download="Jason-Tyler-Rodriguez-Resume.pdf">Download résumé · PDF</a>
            <PrintResume />
          </div>
        </div>
      </section>

      <div className={`container-max ${styles.document}`}>
        <div className={styles.main}>
          <section>
            <h2 className="text-2xl font-bold mt-0 mb-3">Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed">
              Senior Software Engineer with eight years of professional experience across enterprise applications and aerospace software. Lead front-end delivery and UX design, maintain shared Blazor components, and build AI-assisted engineering workflows. Combine hands-on development with technical mentorship and cross-functional collaboration.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mt-0 mb-4">Experience</h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold mt-0 mb-1">Springbrook Software, Senior Front-End Software Engineer / Team Lead</h3>
                <p className="text-slate-600 text-sm mb-2">January 2022 to Present</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>Owned and maintained the shared Design Library for an enterprise ERP platform, building reusable Blazor components and documenting UI standards.</li>
                  <li>Led front-end delivery and UX design, partnering with product and engineering teams on interface patterns and mentoring engineers on component design.</li>
                  <li>Independently designed and built an AI-assisted pull-request review system in Azure DevOps that identifies code patterns, posts line-level change requests, and tracks and updates findings as code changes.</li>
                  <li>Delivered workshops and technical demos on AI-assisted development, prompt engineering, and context management; partnered with leadership on review principles and governance.</li>
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
                <p className="text-slate-600 text-sm mb-2">January 2018 to January 2020</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>Developed flight-subsystem simulation software using Python, C/C++, and Linux.</li>
                  <li>Built Qt-based internal automation tools for subsystem integration and testing.</li>
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
          </section>
        </div>
        <aside className={styles.supporting} aria-label="Skills and qualifications">
          <section>
            <h2>Skills</h2>
            <dl className={styles.skills}>
              {([['Languages', skills.languages], ['Frameworks', skills.frameworks], ['Architecture', skills.architecture], ['DevOps', skills.devops], ['AI & automation', skills.ai]] as const).map(([label, values]) => <div key={label}><dt>{label}</dt><dd>{values.join(' · ')}</dd></div>)}
            </dl>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-0 mb-3">Education</h2>
            <p className="text-slate-700 text-sm">
              B.S. in Computer Science, Jackson State University (2013 to 2017), Cum Laude (3.57 GPA), Presidential Scholarship, W.E.B. Du Bois Honors College.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mt-0 mb-3">Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 text-sm">
              <p><strong>Email:</strong> <a href={`mailto:${SITE_METADATA.email}`}>{SITE_METADATA.email}</a></p>
              <p><strong>GitHub:</strong> <a href={SITE_METADATA.github} target="_blank" rel="noopener noreferrer">{SITE_METADATA.github}</a></p>
              <p><strong>LinkedIn:</strong> <a href={SITE_METADATA.linkedin} target="_blank" rel="noopener noreferrer">{SITE_METADATA.linkedin}</a></p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
