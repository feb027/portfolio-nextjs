import { PrismaClient } from '@prisma/client';
import { neon } from '@neondatabase/serverless';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const sql = neon(process.env.DATABASE_URL!);
const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export { prisma, sql }; 