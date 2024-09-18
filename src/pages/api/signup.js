import bcrypt from 'bcryptjs';
import connectToDatabase from '../../lib/mongodb';
import mongoose from 'mongoose';

// Define the schema for your User model
const userSchema = new mongoose.Schema({
  name:{type:String,required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name,email, password } = req.body;

  try {
    // Add a console log before the connection
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Database connected');

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created!' });
  } catch (error) {
    // Add a detailed error log
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
