// src/app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from 'react';

import VoiceInput from "../../component/VoiceInput";
import Nav from "@/component/Navbar/Nav";

const DashboardPage: React.FC = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get the user's name from localStorage
    const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
  }}, []);

 

  return (
    <>
      <Nav showAuthButtons={false} userName={userName} />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Dashboard with Voice Input</h1>
        <VoiceInput />
      </div>
     
    </>
  );
};

export default DashboardPage;
