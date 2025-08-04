import LoginForm from "@/components/auth/LoginForm";
import React from "react";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="w-[90vw] h-[100vh] grid grid-cols-2">
      <div className="">
        <Image
          src="/loginImage.jpg"
          alt="Login Image"
          width={400}
          height={400}
          className="w-full"
        />
      </div>
      <div className="flex flex-col justify-center pl-10">
        <h2 className="font-bold text-5xl select-none">Welcome 👋​</h2>          
        <p className="text-[#a4a1aa] mb-8 mt-5 select-none">Please login here</p>
          {/* Contenido de la página */}
          <LoginForm/>
      </div>
    </div>
  );
}
