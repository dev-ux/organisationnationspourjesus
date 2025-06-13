/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.material-tailwind.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.organisationnationspourjesus.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: false,
  },
}

module.exports = nextConfig;
