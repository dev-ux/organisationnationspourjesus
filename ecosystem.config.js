module.exports = {
  apps: [
    {
      name: 'organisationnationspourjesus',
      script: 'npm',
      args: 'start',
      interpreter: 'none',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
