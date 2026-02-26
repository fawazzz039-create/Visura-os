// Mock database for production builds without DATABASE_URL
// This allows the app to build and run even without a database connection
type MockQuery = {
  from: (table: any) => Promise<any[]>;
};

type MockInsert = {
  values: (obj: any) => { returning: () => Promise<any[]> };
};

type MockUpdate = {
  set: (obj: any) => { where: (fn: any) => { returning: () => Promise<any[]> } };
};

type MockDelete = {
  from: (table: any) => { where: (fn: any) => Promise<{ success: boolean }> };
};

type MockDb = {
  select: () => MockQuery;
  insert: (table: any) => MockInsert;
  update: (table: any) => MockUpdate;
  delete: (table: any) => MockDelete;
};

// Return a mock DB that returns empty results to prevent crashes
function createMockDb(): MockDb {
  return {
    select: () => ({ from: () => Promise.resolve([]) }),
    insert: () => ({ values: () => ({ returning: () => Promise.resolve([]) }) }),
    update: () => ({ set: () => ({ where: () => ({ returning: () => Promise.resolve([]) }) }) }),
    delete: () => ({ from: () => ({ where: () => Promise.resolve({ success: true }) }) }),
  };
}

// Lazy load the real database - only load when DATABASE_URL is available
let realDb: MockDb | null = null;

export function getDb(): MockDb {
  // If DATABASE_URL is set, try to load the real database
  if (process.env.DATABASE_URL) {
    if (!realDb) {
      try {
        // Dynamic import to avoid build-time errors
        const { createDatabase } = require("@kilocode/app-builder-db");
        const schema = require("./schema");
        realDb = createDatabase(schema);
      } catch (e) {
        console.warn("Failed to load database:", e);
        return createMockDb();
      }
    }
    return realDb!;
  }
  
  // No DATABASE_URL - return mock database
  return createMockDb();
}

export const database = getDb();
export { database as db };
