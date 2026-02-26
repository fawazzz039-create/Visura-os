// Dynamic import to prevent build-time crashes when DATABASE_URL is missing
export async function runMigrationsIfNeeded() {
  if (!process.env.DATABASE_URL) {
    console.log("DATABASE_URL not set, skipping migrations");
    return;
  }

  const { runMigrations } = await import("@kilocode/app-builder-db");
  const { getDb } = await import("./index");

  await runMigrations(getDb(), {}, { migrationsFolder: "./src/db/migrations" });
}
