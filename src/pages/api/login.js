import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to open SQLite database
async function openDatabase() {
  return open({
    filename: './database.sqlite',  // Ensure this path points to your SQLite database
    driver: sqlite3.Database,
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: 'Please fill in all fields' });
  }

  try {
    // Open the SQLite database
    const db = await openDatabase();

    // Check if the user exists
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email and Password' });
    }

    // Compare the hashed password stored in SQLite with the input password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Email and Password' });
    }

    // Close the database connection
    await db.close();

    // Send successful response
    res.status(200).json({ message: 'Login successful', name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
}
