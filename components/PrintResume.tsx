'use client';

import { Button } from '@/components/ui/Button';

export function PrintResume() {
  return (
    <Button type="button" variant="secondary" onClick={() => globalThis.print()}>
      Print / save as PDF
    </Button>
  );
}
