import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="px-10 relative">
      <div className="bg-[#F3F3F3] grid grid-cols-2 gap-10">
        <div className="flex flex-col justify-center items-start pl-20">
          <p className="text-2xl">Classic Exclusive</p>
          <h2 className="text-4xl font-bold mt-3">Women's Collection</h2>
          <p className="text-xl mt-2 mb-8">UPTO 40% OFF</p>
          <a
            className="flex gap-2 w-fit px-6 py-3 bg-[#131118] text-sm text-white rounded-lg hover:scale-105 transition-all cursor-pointer"
          >
            Shop Now
            <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

          </a>
        </div>
        
        <div >
            <img className="object-cover w-xl" src="/BG/image1.png" alt="Header Image" />
        </div>

        <p className="text-white text-[200px] tracking-widest font-bold absolute bottom-0 left-44 select-none">BEST</p>
      </div>
    </header>
  );
};

export default Header;