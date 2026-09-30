import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { config } from "@/lib/config";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = (): PrismaBetterSqlite3 =>
  new PrismaBetterSqlite3({ url: config.DATABASE_URL });

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: adapter(),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}