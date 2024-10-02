// src/app/dashboard/page.tsx
"use client"; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import VoiceInput from "../../component/VoiceInput";
import Nav from "@/component/Navbar/Nav";

const DashboardPage: React.FC = () => {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (session) {
      setUserName(session.user?.name || "");
    }
  }, [session]);

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
