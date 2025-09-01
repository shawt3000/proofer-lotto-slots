/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019903f5-df32-1e8b-0270-95934f2cdc1b',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
