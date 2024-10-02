// src/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import openDatabase from '../../../lib/sqlite'; // Adjust the path based on your structure

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const db = await openDatabase();
      const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [user.email]);

      if (!existingUser) {
        // Save new user to the database
        await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [
          user.name,
          user.email,
        ]);
      }

      // Close the database connection
      await db.close();

      return true;
    },
    async session({ session, user }) {
      // Include user information in the session
      session.user.id = user.id; // Assuming you have user.id from the database
      return session;
    },
  },
  pages: {
    signIn: '/login', // Redirect to your login page
  },
});
