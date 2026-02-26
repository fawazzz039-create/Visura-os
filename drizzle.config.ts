import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "./visura.db",
  },
});

// Note: For Vercel deployment, set DATABASE_URL environment variable in Vercel project settings.
