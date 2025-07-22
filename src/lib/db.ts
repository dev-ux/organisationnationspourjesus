import { PrismaClient } from '@prisma/client/edge';

// This ensures we reuse the same Prisma client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Create a new Prisma client with minimal configuration
const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['error'],
});

// In development, use a global variable to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Export the Prisma client instance
export { prisma };
export default prisma;
