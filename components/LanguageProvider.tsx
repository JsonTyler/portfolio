'use client';

import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useState, type ReactNode } from 'react';
import { spanish } from '@/content/spanish';

export type Language = 'en' | 'es';
const LanguageContext = createContext<{ language: Language; choose: (language: Language) => void }>({ language: 'en', choose: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  useEffect(() => {
    try { if (globalThis.localStorage.getItem('portfolio-language') === 'es') setLanguage('es'); } catch { /* English remains available without storage. */ }
  }, []);
  useEffect(() => { globalThis.document.documentElement.lang = language; }, [language]);
  function choose(next: Language) {
    setLanguage(next);
    try { globalThis.localStorage.setItem('portfolio-language', next); } catch { /* The current page still switches without storage. */ }
  }
  return <LanguageContext.Provider value={{ language, choose }}>{children}</LanguageContext.Provider>;
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, choose } = useContext(LanguageContext);
  const next = language === 'en' ? 'es' : 'en';
  return <button type="button" className="language-switch" lang={next} title={next === 'es' ? 'Español' : 'English'} aria-label={next === 'es' ? 'Cambiar a español' : 'Switch to English'} onClick={() => choose(next)}>{compact ? next.toUpperCase() : next === 'es' ? 'Español' : 'English'}</button>;
}

export function translate(text: string): string {
  const normalized = text.trim().replace(/\s+/g, ' ');
  let value = spanish[normalized];
  if (value === undefined) {
    const cleanup = normalized.match(/^(\d+) sample messages moved to trash\. The 2 protected messages stayed\. Undo is available\.$/);
    const exported = normalized.match(/^(\d+) sample records exported as CSV\.$/);
    const added = normalized.match(/^(.+) added to the timeline and table\.$/);
    const extraOnly = normalized.match(/^· \+(\d+) in compact$/);
    const sampleRecords = normalized.match(/^(\d+) sample records$/);
    const inspected = normalized.match(/^Inspect (CASE-\d+)$/);
    const date = normalized.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d+)$/);
    const rows = normalized.match(/^(\d+) of (\d+)( rows in view)?$/);
    const records = normalized.match(/^(\d+) records · sample data$/);
    const employee = normalized.match(/^Employee #(\d+)$/);
    const motion = normalized.match(/^(Resume|Pause) (signals|snow|stars|night sky)$/);
    const extra = normalized.match(/^rows fully visible · \+(\d+) in compact$/);
    if (cleanup) value = `${cleanup[1]} mensajes de ejemplo enviados a la papelera. Se conservaron los 2 mensajes protegidos. Puedes deshacer el cambio.`;
    else if (exported) value = `${exported[1]} registros de ejemplo exportados como CSV.`;
    else if (added) value = `${added[1]} se añadió a la línea de tiempo y a la tabla.`;
    else if (extraOnly) value = `· +${extraOnly[1]} en modo compacto`;
    else if (sampleRecords) value = `${sampleRecords[1]} registros de ejemplo`;
    else if (inspected) value = `Examinar ${inspected[1]}`;
    else if (date) value = `${date[2]} ${(['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'])[['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(date[1])]}`;
    else if (motion) value = `${motion[1] === 'Resume' ? 'Reanudar' : 'Pausar'} ${spanish[motion[2]] ?? motion[2]}`;
    else if (rows) value = `${rows[1]} de ${rows[2]}${rows[3] ? ' filas visibles' : ''}`;
    else if (records) value = `${records[1]} registros · datos de ejemplo`;
    else if (employee) value = `Empleado n.º ${employee[1]}`;
    else if (extra) value = `filas completamente visibles · +${extra[1]} en modo compacto`;
  }
  return value === undefined ? text : text.replace(text.trim(), value);
}

// Translate rendered React text and accessible labels without touching URLs,
// event handlers, identifiers, form values, or the live DOM. Nested components
// localize their own output, including state changes in interactive previews.
function localize(node: ReactNode, language: Language): ReactNode {
  return Children.map(node, child => {
    if (typeof child === 'string') return language === 'es' ? translate(child) : child;
    if (!isValidElement<Record<string, unknown>>(child)) return child;
    if (child.type === LocalizedContent || child.type === LanguageSwitcher) return child;
    const props: Record<string, unknown> = {};
    if (language === 'es') {
      for (const key of ['aria-label', 'aria-description', 'alt', 'title', 'placeholder']) {
        if (typeof child.props[key] === 'string') props[key] = translate(child.props[key]);
      }
    }
    if (child.props.children !== undefined) props.children = localize(child.props.children as ReactNode, language);
    return cloneElement(child, props);
  });
}

export function LocalizedContent({ children }: { children: ReactNode }) {
  const { language } = useContext(LanguageContext);
  // Normalize keys in both languages so a language change preserves component state.
  return <>{localize(children, language)}</>;
}
