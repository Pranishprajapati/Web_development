import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "futsal_db",
  password: "postgres",
  port: 5432,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected ✅");
});

export default pool;
