"use client";
import React from "react";
import { useCart } from "@/components/cart/CartContext";
import { useAuth } from "@/store/authSlice";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  // Links para reutilizar en desktop y móvil
  const navLinks = (
  <>
    <li>
      <Link href="/" className="hover:underline" onClick={() => setIsMenuOpen(false)}>
        Inicio
      </Link>
    </li>
    <li>
      <Link href="/" className="hover:underline transition-all" onClick={() => setIsMenuOpen(false)}>
        Tienda
      </Link>
    </li>
    {user && (
      <li>
        <Link href="/user/orders" className="hover:underline transition-all" onClick={() => setIsMenuOpen(false)}>
          Ordenes
        </Link>
      </li>
    )}
    {user && (
      <li>
        <button
          onClick={handleLogout}
          className="hover:underline transition-all bg-transparent border-none cursor-pointer"
          type="button"
        >
          Salir
        </button>
      </li>
    )}
  </>
);

  return (
    <nav className="relative flex items-center justify-between py-2 bg-white text-[#131118] px-9 border-b-2 border-b-gray-200">
      {/* Logo */}
      <div className="font-bold text-2xl z-20">
        <a href="/">
          <img className="w-24" src="/logos/logo.png" alt="Logo" />
        </a>
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-4">{navLinks}</ul>

      {/* Carrito y login */}
      <div className="flex items-center space-x-4 z-20">
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
          <span className="font-semibold text-[#9A8E5E] px-4 hidden md:block">{user.user_metadata?.displayName || user.email}</span>
        ) : (
          <a href="/auth/login" className="cursor-pointer bg-[#9A8E5E] hover:scale-105 transition-all text-white py-2 px-8 rounded hidden md:block">Iniciar sesión</a>
        )}

        {/* Botón hamburguesa solo en móvil */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-[#9A8E5E] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#9A8E5E] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#9A8E5E]"></span>
        </button>
      </div>

      {/* Menú móvil tipo drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[1000] flex flex-col items-center justify-center transition-all">
          {/* Botón cerrar */}
          <button
            className="absolute top-6 right-6 text-[#9A8E5E] text-3xl"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            &times;
          </button>
          <ul className="flex flex-col space-y-8 text-2xl font-semibold text-[#131118]">
            {navLinks}        
            {loading ? null : user ? (
              <span className="font-semibold text-[#9A8E5E] px-4">{user.user_metadata?.displayName || user.email}</span>
            ) : (
              <a href="/auth/login" className="cursor-pointer bg-[#9A8E5E] hover:scale-105 transition-all text-white py-2 px-8 rounded">Iniciar sesión</a>
            )}

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;