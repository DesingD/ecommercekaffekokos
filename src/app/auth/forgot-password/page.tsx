"use client";

import ForgotForm from "@/components/auth/ForgotForm";
import React from "react";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="w-[90vw] h-[100vh] grid grid-cols-2">
      <div className="">
        <Image
          src="/forgot.jpg"
          alt="Login Image"
          width={400}
          height={400}
          className="w-full"
        />
      </div>
      <div className="flex flex-col justify-center pl-10">
        <div className="">
          <button className="flex gap-2 cursor-pointer mb-8" onClick={() => window.history.back()}>
            <Image
              src="/icons/arrow-left.svg"
              alt="Logo"
              width={25}
              height={25}
              className="w-6 h-6 mb-4"
            />
            <span>Back</span>
          </button>
        </div>
        <h2 className="font-bold text-5xl select-none">Forgot Password​</h2>          
        <p className="text-[#a4a1aa] mb-8 mt-5 select-none max-w-[450px]">Enter your registered email address. we’ll send you a code to reset your password.</p>
          {/* Contenido de la página */}
          <ForgotForm/>
      </div>
    </div>
  );
}
