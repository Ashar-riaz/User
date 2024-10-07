// src/app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import VoiceProcessor from "../../component/VoiceBot"; // Import the VoiceProcessor component
import Nav from "@/component/Navbar/Nav"; // Import your Nav component
import { useSession } from 'next-auth/react'; // Import useSession hook for authentication

const DashboardPage: React.FC = () => {
  const { data: session } = useSession(); // Get the session data
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      setUserName(session.user.name || ""); // Set the username from session data
    }
  }, [session]);

  return (
    <>
      <Nav showAuthButtons={false} userName={userName} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Welcome, {userName || "User"}!</h1>
        
        {/* Add the VoiceProcessor component to the dashboard */}
        <VoiceProcessor />

        {/* You can add more components or sections to your dashboard here */}
      </div>
    </>
  );
};

export default DashboardPage;
