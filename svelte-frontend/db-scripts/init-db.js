import pool from "./db.js";
import create_tables from "./create-tables.js";

// create the database and tables
pool.query(create_tables);
