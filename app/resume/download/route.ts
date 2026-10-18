import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const file = await readFile(join(cwd(), 'public', 'resume', 'Jason-Tyler-Rodriguez-Resume-2026.pdf'));
    return new globalThis.Response(new Uint8Array(file), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Jason-Tyler-Rodriguez-Resume.pdf"',
        'Content-Length': String(file.byteLength),
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return new globalThis.Response('The PDF is unavailable. Please return to the resume page and use Print / save as PDF.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}
