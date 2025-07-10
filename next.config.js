/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['localhost', '127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
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
    ],
    unoptimized: true, // Désactive l'optimisation des images temporairement
  },
}

module.exports = nextConfig;
