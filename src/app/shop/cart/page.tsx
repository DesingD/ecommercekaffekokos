"use client";

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/components/cart/CartContext';

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Parece que aún no has agregado productos a tu carrito.</p>
            <a 
              href="/"
              className="inline-block py-3 px-6 bg-[#9A8E5E] text-white rounded-lg hover:bg-[#8a7f54] transition-colors duration-200"
            >
              Continuar Comprando
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map(product => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}