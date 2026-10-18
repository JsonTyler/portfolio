'use client';

import { useEffect, useState } from 'react';
import { SignalField } from './SignalField';
import { Snowfall } from './Snowfall';
import { Starfield } from './Starfield';

// The header owns the theme attribute. Mount only its matching decoration so
// inactive effects cannot leak into the page, even if a stylesheet is stale.
export function ThemeEffects() {
  const [theme, setTheme] = useState('hacker');

  useEffect(() => {
    const root = globalThis.document.documentElement;
    const syncTheme = () => setTheme(root.dataset.theme ?? 'hacker');
    const observer = new globalThis.MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    syncTheme();
    return () => observer.disconnect();
  }, []);

  if (theme === 'midnight') return <Starfield />;
  if (theme === 'hacker') return <SignalField />;
  return <Snowfall />;
}
