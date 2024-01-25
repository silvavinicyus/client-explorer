import { Pool } from "pg";
import dotnev from 'dotenv'

dotnev.config()
const db = new Pool({
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: +process.env.PG_PORT
});

export { db };
