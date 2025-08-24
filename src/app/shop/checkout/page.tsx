"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ShippingForm from '@/components/checkout/ShippingForm';
import { useCart } from '@/components/cart/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, getCartTotal, isCartLoaded } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (isCartLoaded && cart.length === 0) {
      router.push('/shop/cart');
    }
  }, [cart, router, isCartLoaded]);

  if (!isCartLoaded) {
    return null; // O un loader si prefieres
  }
  if (cart.length === 0) {
    return null;
  }

  return (
  
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ShippingForm />
            </div>
            <div className="bg-[#F1F1F3] p-6 rounded-lg h-fit">
              <h3 className="text-xl font-medium mb-4">Resumen del Pedido</h3>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.title} x {item.quantity}</span>
                    <span>${((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 mt-4 pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <Footer />
      </div>
    
  );
}