import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to open SQLite database and create the 'users' table if it doesn't exist
async function openDatabase() {
  const db = await open({
    filename: './database.sqlite',  // Ensure this path points to your SQLite database
    driver: sqlite3.Database,
  });

  // Create the 'users' table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  return db;
}

export default openDatabase;
