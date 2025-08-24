"use client";
import React from "react";
import { useCart } from "@/components/cart/CartContext";
import { useAuth } from "@/store/authSlice";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { user, loading } = useAuth();

  return (
    <nav className="relative flex items-center justify-between py-2 bg-white text-[#131118] px-9 border-b-2 border-b-gray-200">
      <div className="font-bold text-2xl"><a href="/"><img className="w-24" src="/logos/logo.png" alt="Logo" /></a></div>
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:underline">
            Inicio
          </a>
        </li>
        
        <li>
          <a href="/" className="hover:underline transition-all">
            Tienda
          </a>
        </li>
        <li>
          <a href="/perfil" className="hover:underline transition-all">
            Sobre nosotros
          </a>
        </li>
        <li>
          <a href="/contacto" className="hover:underline transition-all">
            Contacto
          </a>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <button className="cursor-pointer hover:scale-110 transition-all">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M17 17L21 21"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <button className="cursor-pointer hover:scale-110 transition-all">
          <svg
            width="24px"
            height="24px"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <a href="/shop/cart" className="relative cursor-pointer hover:scale-110 transition-all">
          <svg
            width="24px"
            height="24px"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M19.2609 9.69589L20.6455 18.6959C20.8319 19.9074 19.8945 21 18.6688 21H5.33122C4.10545 21 3.16809 19.9074 3.35448 18.6959L4.73909 9.69589C4.8892 8.72022 5.7287 8 6.71584 8H17.2842C18.2713 8 19.1108 8.72022 19.2609 9.69589Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            ></path>
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#9A8E5E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </a>
        {loading ? null : user ? (
          <span className="font-semibold text-[#9A8E5E] px-4">{user.user_metadata?.displayName || user.email}</span>
        ) : (
          <a href="/auth/login" className="cursor-pointer bg-[#9A8E5E] hover:scale-105 transition-all text-white py-2 px-8 rounded">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;