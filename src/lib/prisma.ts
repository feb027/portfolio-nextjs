import { PrismaClient } from '@prisma/client';
import { neon, neonConfig } from '@neondatabase/serverless';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Configure neon to use WebSocket SSL
neonConfig.wsProxy = (host) => `${host}:5432/v1`;
neonConfig.useSecureWebSocket = false;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const sql = neon(process.env.DATABASE_URL!); 