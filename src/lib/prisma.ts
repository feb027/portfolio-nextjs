import { PrismaClient } from '@prisma/client';
import { Pool, neon } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter: new PrismaNeon(pool)
});

export const sql = neon(process.env.DATABASE_URL!);
export { prisma }; 