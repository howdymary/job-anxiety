import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let sqlClient: postgres.Sql | null = null;
let database: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function hasDatabaseConnection() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!sqlClient) {
    sqlClient = postgres(databaseUrl, {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false
    });
  }

  if (!database) {
    database = drizzle(sqlClient, { schema });
  }

  return database;
}

export async function closeDatabaseConnection() {
  if (sqlClient) {
    await sqlClient.end({ timeout: 5 });
    sqlClient = null;
    database = null;
  }
}
