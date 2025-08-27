import LoginForm from "@/components/auth/LoginForm";
import React from "react";
import Image from "next/image";

export default function LoginPage() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9fb]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm px-8 py-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <Image src="/logos/logo.png" alt="Logo" width={120} height={120} />
        </div>
        {/* Título */}
        <h2 className="text-2xl font-semibold mb-2">Inicio de sesion</h2>
        {/* LoginForm */}
        <div className="w-full mt-4">
          <LoginForm />
        </div>        
        
      </div>
    </div>
  );
}