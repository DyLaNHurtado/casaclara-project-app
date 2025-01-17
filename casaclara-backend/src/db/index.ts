import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

const config = {
  host: process.env.SUPABASE_HOST,
  port: Number(process.env.SUPABASE_PORT),
  database: process.env.SUPABASE_DATABASE,
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  ssl: { rejectUnauthorized: false }
};

const db = pgp(config);

export default db;