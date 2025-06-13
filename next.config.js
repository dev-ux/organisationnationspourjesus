/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '127.0.0.1'],
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
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/image/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/image/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    serverActions: false,
  },
}

module.exports = nextConfig;
