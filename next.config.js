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
    ],
  },
  output: 'standalone',
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig;
