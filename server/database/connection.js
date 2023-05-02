import mysql from "mysql2/promise";
import "dotenv/config";


const db = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
});

export default db;