import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  // 1. Create a native Postgres connection pool using your env variable
  const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
  
  // 2. Wrap the pool in Prisma's adapter
  const adapter = new PrismaPg(pool);
  
  // 3. Pass the adapter into the Prisma Client constructor
  return new PrismaClient({ adapter });
};

export const db = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;