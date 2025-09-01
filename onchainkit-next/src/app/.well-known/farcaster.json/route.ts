export const dynamic = 'force-static';

import { promises as fs } from 'fs';
import { join } from 'path';

const manifestPath = join(process.cwd(), 'public', '.well-known', 'farcaster.json');

export async function GET() {
  try {
    const text = await fs.readFile(manifestPath, 'utf8');
    return new Response(text, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    return Response.json({ error: 'manifest_not_found', detail: String(err) }, { status: 500 });
  }
}

export async function HEAD() {
  return new Response(null, { status: 204 });
}