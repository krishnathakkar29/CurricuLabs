import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter: adapter,
});
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      credits: {
        type: "number",
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
