import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const PSG_HOST = 'localhost';
const { PSG_DB, PSG_USER } = process.env;
const PSG_PSS = process.env.PSG_PSS;
const DB_TO_CONN: string = (PSG_DB as string).concat(process.env.ENV as string);
const client = new Pool({
  host: PSG_HOST,
  database: DB_TO_CONN,
  user: PSG_USER,
  password: PSG_PSS
});

export default client;
