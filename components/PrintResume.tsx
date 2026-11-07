'use client';
import { LocalizedContent } from '@/components/LanguageProvider';


import { Button } from '@/components/ui/Button';

export function PrintResume() {
  return <LocalizedContent>{(
    <Button type="button" variant="secondary" onClick={() => globalThis.print()}>
      Print / save as PDF
    </Button>
  )}</LocalizedContent>;
}
