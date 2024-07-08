import { PrismaClient } from '@prisma/client';

// Extend the NodeJS.Global interface to include the __db property
declare global {
  var __db: PrismaClient | undefined;
}

/**
 * @type PrismaClient
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  prisma = global.__db;
}

export { prisma };
