import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const connectionString = process.env['DATABASE_URL'];

export const hasDatabaseConnection = Boolean(connectionString);

let poolInstance: pg.Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (connectionString) {
  try {
    poolInstance = new pg.Pool({
      connectionString,
      ssl: process.env['NODE_ENV'] === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
    });

    dbInstance = drizzle(poolInstance, { schema });
    console.log('[Database] PostgreSQL connection pool initialized with Drizzle ORM');
  } catch (err) {
    console.warn('[Database] Failed to initialize PostgreSQL pool:', err);
  }
} else {
  console.log('[Database] DATABASE_URL not set. Running in resilient mock/in-memory knowledge base mode.');
}

export const pool = poolInstance;
export const db = dbInstance;

/**
 * Health check helper to verify database connectivity.
 */
export async function checkDatabaseHealth(): Promise<{
  connected: boolean;
  version?: string;
  error?: string;
  mode: 'postgresql' | 'in_memory_catalog';
}> {
  if (!poolInstance) {
    return {
      connected: false,
      mode: 'in_memory_catalog',
      error: 'DATABASE_URL not configured. Using pre-seeded linguistic datasets.',
    };
  }

  try {
    const client = await poolInstance.connect();
    try {
      const res = await client.query('SELECT version()');
      return {
        connected: true,
        version: res.rows[0]?.version,
        mode: 'postgresql',
      };
    } finally {
      client.release();
    }
  } catch (err: unknown) {
    return {
      connected: false,
      mode: 'in_memory_catalog',
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
