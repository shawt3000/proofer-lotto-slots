export const dynamic = 'force-static';

export function GET() {
  const body = {
    version: 1,
    baseBuilder: {
      allowedAddresses: ['0x9C053E44DDB483689cC70f63D5e0d7dE9be90d71'],
    },
  };

  return Response.json(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Cache at the edge but allow fast updates
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    },
  });
}