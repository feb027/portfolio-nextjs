import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const prisma = globalThis.prisma ?? 
  new PrismaClient({
    adapter: new PrismaNeon(pool),
    log: process.env.NODE_ENV === 'development' ? ['query'] : []
  });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export { prisma }; 