import { Pool } from "pg";
// import dotenv from 'dotenv'; -For environment variables.

dotenv.config();

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "506264",
    database: "ERPS",
});

export default pool;