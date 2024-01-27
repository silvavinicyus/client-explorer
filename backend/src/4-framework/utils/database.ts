import dotnev from 'dotenv';
import { Pool } from "pg";

dotnev.config()
const db = new Pool({
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: +process.env.PG_PORT,  
  max : 5,
  connectionTimeoutMillis : 5000,
  idleTimeoutMillis : 30000
});

export { db };
