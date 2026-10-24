'use client';

import { useEffect, useState } from 'react';

type Theme = 'winter' | 'midnight' | 'hacker';
const themes: Theme[] = ['winter', 'midnight', 'hacker'];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('hacker');
  useEffect(() => {
    const root = globalThis.document.documentElement;
    const sync = () => {
      const value = root.dataset.theme;
      if (value === 'winter' || value === 'midnight' || value === 'hacker') setTheme(value);
    };
    sync();
    const observer = new globalThis.MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  function choose(next: Theme) {
    globalThis.document.documentElement.dataset.theme = next;
    setTheme(next);
    try { globalThis.localStorage.setItem('portfolio-theme-v2', next); } catch { /* Selection works without storage. */ }
  }

  return <div className="theme-controls flex items-center border rounded-full p-1" role="group" aria-label="Appearance">
    {themes.map(value => <button key={value} type="button" className="theme-toggle-btn focus-ring" aria-label={`Switch to ${value} theme`} aria-pressed={theme === value} title={value.charAt(0).toUpperCase() + value.slice(1)} onClick={() => choose(value)}>
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        {value === 'winter' ? <path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18M3 12h18" /> : value === 'midnight' ? <path d="M21 12.8A8.8 8.8 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" /> : <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>}
      </svg>
    </button>)}
  </div>;
}
