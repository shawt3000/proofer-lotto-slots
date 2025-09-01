/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        // Only redirect when ?raw is NOT present, so you can view local JSON via .../farcaster.json?raw=1
        missing: [{ type: 'query', key: 'raw' }],
        destination:
          'https://api.farcaster.xyz/miniapps/hosted-manifest/019903d3-5094-29ad-b589-71f0fb1a1e83',
        // permanent false => 307 Temporary Redirect
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
