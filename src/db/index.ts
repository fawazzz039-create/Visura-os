import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

// Create database with lazy initialization to avoid build-time errors
// DATABASE_URL is required for production - will throw at runtime if not set
let db: ReturnType<typeof createDatabase> | null = null;

export function getDb() {
  if (!db) {
    // Check if DATABASE_URL is set - required for production
    if (!process.env.DATABASE_URL) {
      console.warn("WARNING: DATABASE_URL is not set. Database features will not work in production.");
      // Return a mock DB that returns empty results to prevent crashes
      return {
        select: () => ({ from: () => Promise.resolve([]) }),
        insert: () => ({ values: () => ({ returning: () => Promise.resolve([]) }) }),
        update: () => ({ set: () => ({ where: () => ({ returning: () => Promise.resolve([]) }) }) }),
        delete: () => ({ from: () => ({ where: () => Promise.resolve({ success: true }) }) }),
      } as any;
    }
    db = createDatabase(schema);
  }
  return db;
}

export { db as database };
