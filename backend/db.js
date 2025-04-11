const mysql = require("mysql2/promise");

async function tempConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
}

async function pool() {
  return mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });
}

async function createConnection() {
  try {
    const tmpConnection = await tempConnection();
    const [createDatabase] = await tmpConnection.query(
      "CREATE DATABASE IF NOT EXISTS recipesapi"
    );
    if (createDatabase.affectedRows > 0) {
      return await pool();
    }
    tmpConnection.end();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { tempConnection, pool, createConnection };
