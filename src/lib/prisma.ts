import { PrismaClient } from '@prisma/client';
import { neon } from '@neondatabase/serverless';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = new PrismaClient();

export const sql = neon(process.env.DATABASE_URL!);
export { prisma }; 