import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const q = (text: string, params?: any[]) => pool.query(text, params);
