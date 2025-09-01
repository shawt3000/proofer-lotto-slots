export const dynamic = 'force-static';

const HOSTED_MANIFEST_URL =
  'https://api.farcaster.xyz/miniapps/hosted-manifest/019903d3-5094-29ad-b589-71f0fb1a1e83';

export function GET() {
  return Response.redirect(HOSTED_MANIFEST_URL, 307);
}

export function HEAD() {
  return Response.redirect(HOSTED_MANIFEST_URL, 307);
}