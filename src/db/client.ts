import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Automatically load local .env if present and running in Node
if (typeof process.loadEnvFile === 'function') {
  const envPath = join(process.cwd(), '.env');
  if (existsSync(envPath)) {
    try {
      process.loadEnvFile(envPath);
    } catch {}
  }
}

const rawConnectionString = process.env['DATABASE_URL']?.trim() || '';

// Detect whether connection string is a PostgreSQL URI (postgres:// or postgresql://) or an HTTPS Supabase project URL
export const isPostgresUri = /^postgres(ql)?:\/\//i.test(rawConnectionString);
export const isSupabaseHttpsUrl = /^https:\/\/[^/]+\.supabase\.(co|com)/i.test(rawConnectionString);
export const hasDatabaseConnection = Boolean(rawConnectionString && isPostgresUri);

let poolInstance: pg.Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (isPostgresUri) {
  try {
    // Storage and resource-conscious connection configuration for Supabase (free tier friendly)
    poolInstance = new pg.Pool({
      connectionString: rawConnectionString,
      ssl: rawConnectionString.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 4, // Keep pool small to avoid exhausting Supabase connection quotas
      idleTimeoutMillis: 15000,
      connectionTimeoutMillis: 5000, // Timeout quickly if unreachable to avoid blocking requests
    });

    dbInstance = drizzle(poolInstance, { schema });
    console.log('[Database] PostgreSQL connection pool initialized with Drizzle ORM (SSL enabled)');
  } catch (err) {
    console.warn('[Database] Failed to initialize PostgreSQL pool:', err);
  }
} else if (isSupabaseHttpsUrl) {
  console.log('[Database] Detected Supabase project URL (' + rawConnectionString.substring(0, 30) + '...). For direct PostgreSQL access, provide connection string in format postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres');
} else {
  console.log('[Database] DATABASE_URL not set or not a postgres:// URI. Running with resilient in-memory linguistic catalog.');
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
  note?: string;
  supabaseProjectUrlDetected?: boolean;
}> {
  if (isSupabaseHttpsUrl) {
    return {
      connected: false,
      mode: 'in_memory_catalog',
      supabaseProjectUrlDetected: true,
      note: 'Detectamos sua URL de projeto do Supabase. Para conectar o banco relacional direto, use a Connection String (URI) disponível em Supabase Dashboard > Project Settings > Database > Connection String (URI no formato postgresql://postgres:SENHA@db.[ref].supabase.co:5432/postgres ou pooler porta 6543).',
    };
  }

  if (!poolInstance) {
    return {
      connected: false,
      mode: 'in_memory_catalog',
      error: 'DATABASE_URL não configurada ou inválida. Catálogo de linguística e histórias operando com alta fidelidade em memória.',
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
        note: 'Conexão ativa com PostgreSQL/Supabase com gerenciamento de conexões econômico.',
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
