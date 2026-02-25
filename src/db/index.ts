import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

// Create database with lazy initialization to avoid build-time errors
let db: ReturnType<typeof createDatabase> | null = null;

export function getDb() {
  if (!db) {
    db = createDatabase(schema);
  }
  return db;
}

export { db as database };
