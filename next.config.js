/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour le rendu côté serveur
  output: 'standalone',
  
  // Variables d'environnement exposées côté client
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  
  // Activation du nouveau routeur App (Next.js 13+)
  experimental: {
    appDir: true,
    serverActions: true,
  },
  
  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configuration des redirections et réécritures
  async rewrites() {
    return [
      // Exemple de réécriture si nécessaire
      // {
      //   source: '/api/:path*',
      //   destination: 'https://api.votredomaine.com/:path*',
      // },
    ];
  },
  
  // Configuration des images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
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
    ],
    // Ajouter les domaines locaux pour les images statiques
    domains: ['localhost'],
    // Désactive l'optimisation des images en développement
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  
  // Configuration pour le chargement des modules
  modularizeImports: {
    // Exemple de configuration pour optimiser les imports
    // '@heroicons/react/outline': {
    //   transform: '@heroicons/react/outline/{{member}}',
    // },
  },
  
  // Configuration pour le rechargement à chaud en développement
  webpack: (config, { isServer }) => {
    // Important: retourner la configuration modifiée
    return config;
  },
};

module.exports = nextConfig;
