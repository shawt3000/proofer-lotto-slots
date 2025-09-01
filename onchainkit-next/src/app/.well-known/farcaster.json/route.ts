export const dynamic = 'force-static';

function csvToArray(input: string | undefined): string[] {
  if (!input) return [];
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function buildLocalManifest() {
  const {
    NEXT_PUBLIC_ACCOUNT_ASSOCIATION_HEADER,
    NEXT_PUBLIC_ACCOUNT_ASSOCIATION_PAYLOAD,
    NEXT_PUBLIC_ACCOUNT_ASSOCIATION_SIGNATURE,

    NEXT_PUBLIC_BASE_BUILDER_ALLOWED_ADDRESSES,

    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    NEXT_PUBLIC_URL,
    NEXT_PUBLIC_ICON_URL,
    NEXT_PUBLIC_SPLASH_IMAGE,
    NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
    NEXT_PUBLIC_WEBHOOK_URL,
    NEXT_PUBLIC_SUBTITLE,
    NEXT_PUBLIC_DESCRIPTION,
    NEXT_PUBLIC_SCREENSHOT_URLS,
    NEXT_PUBLIC_PRIMARY_CATEGORY,
    NEXT_PUBLIC_TAGS,
    NEXT_PUBLIC_HERO_IMAGE_URL,
    NEXT_PUBLIC_APP_HERO_IMAGE,
    NEXT_PUBLIC_TAGLINE,
    NEXT_PUBLIC_OG_TITLE,
    NEXT_PUBLIC_OG_DESCRIPTION,
    NEXT_PUBLIC_OG_IMAGE_URL,
    NEXT_PUBLIC_MINIAPP_NOINDEX,
  } = process.env as Record<string, string | undefined>;

  const allowedAddresses =
    csvToArray(NEXT_PUBLIC_BASE_BUILDER_ALLOWED_ADDRESSES).length > 0
      ? csvToArray(NEXT_PUBLIC_BASE_BUILDER_ALLOWED_ADDRESSES)
      : ['0x9C053E44DDB483689cC70f63D5e0d7dE9be90d71'];

  const name = NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Proofer Slots';
  const homeUrl = NEXT_PUBLIC_URL || '';
  const iconUrl = NEXT_PUBLIC_ICON_URL || NEXT_PUBLIC_APP_HERO_IMAGE || '';
  const splashImageUrl = NEXT_PUBLIC_SPLASH_IMAGE || '';
  const splashBackgroundColor = NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || '#000000';
  const webhookUrl = NEXT_PUBLIC_WEBHOOK_URL;
  const subtitle = NEXT_PUBLIC_SUBTITLE;
  const description = NEXT_PUBLIC_DESCRIPTION || 'Proofer Slots Learn & Mint';
  const screenshotUrls = csvToArray(NEXT_PUBLIC_SCREENSHOT_URLS);
  const primaryCategory = NEXT_PUBLIC_PRIMARY_CATEGORY || 'games';
  const tags = csvToArray(NEXT_PUBLIC_TAGS || 'slots,game,baseapp,miniapp');
  const heroImageUrl = NEXT_PUBLIC_HERO_IMAGE_URL || NEXT_PUBLIC_APP_HERO_IMAGE || '';
  const tagline = NEXT_PUBLIC_TAGLINE || 'Spin to win';
  const ogTitle = NEXT_PUBLIC_OG_TITLE || name;
  const ogDescription = NEXT_PUBLIC_OG_DESCRIPTION || 'Spin the reels and mint rewards.';
  const ogImageUrl = NEXT_PUBLIC_OG_IMAGE_URL || heroImageUrl || iconUrl;
  const noindex = (NEXT_PUBLIC_MINIAPP_NOINDEX || 'false').toLowerCase() === 'true';

  return {
    accountAssociation: {
      header: NEXT_PUBLIC_ACCOUNT_ASSOCIATION_HEADER || '',
      payload: NEXT_PUBLIC_ACCOUNT_ASSOCIATION_PAYLOAD || '',
      signature: NEXT_PUBLIC_ACCOUNT_ASSOCIATION_SIGNATURE || '',
    },
    baseBuilder: {
      allowedAddresses,
    },
    frame: {
      version: '1',
      name,
      homeUrl,
      iconUrl,
      splashImageUrl,
      splashBackgroundColor,
      webhookUrl,
      subtitle,
      description,
      screenshotUrls,
      primaryCategory,
      tags,
      heroImageUrl,
      tagline,
      ogTitle,
      ogDescription,
      ogImageUrl,
      noindex,
    },
  };
}

export function GET() {
  return Response.json(buildLocalManifest(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    },
  });
}

export function HEAD() {
  return new Response(null, { status: 204 });
}