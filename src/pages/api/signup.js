import bcrypt from 'bcryptjs';
import openDatabase from '../../lib/sqlite';  // Adjust the path based on your folder structure

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: 'Please fill in all fields' });
  }

  try {
    // Open the SQLite database
    const db = await openDatabase();

    // Check if the user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert the new user into the 'users' table
    await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword,
    ]);

    // Close the database connection
    await db.close();

    res.status(201).json({ message: 'User created!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
