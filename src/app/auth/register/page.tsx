import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9fb]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl px-8 py-10 flex flex-col items-center">        
        <div className="mb-6">
          <Image src="/logos/logo.png" alt="Logo" width={120} height={120} />
        </div>        
        <h2 className="text-2xl font-semibold mb-2">Registro de usuario</h2>      
        <div className="w-full mt-4">
          <RegisterForm />
        </div>        
        
      </div>
    </div>
  );
}
