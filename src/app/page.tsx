// src/app/page.tsx
import React from 'react';
import Navbar from '../component/Navbar/Nav';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Include Navbar */}
      <Navbar showAuthButtons={true} />


      <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Brand</h1>
        <p className="text-lg text-gray-700">
          This is the home page. Explore more about us by navigating through the navbar.
        </p>
      </main>
    </>
  );
};

export default HomePage;
