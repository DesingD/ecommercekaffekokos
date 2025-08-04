import React from 'react';
import { useCart } from './CartContext';

const CartSummary: React.FC = () => {
  const { getCartTotal, getCartCount, clearCart } = useCart();

  return (
    <div className="bg-[#F1F1F3] p-6 rounded-lg">
      <h3 className="text-xl font-medium mb-4">Resumen del Carrito</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Productos ({getCartCount()})</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span>Calculado en el checkout</span>
        </div>
      </div>
      
      <div className="border-t border-gray-300 pt-4 mb-4">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
      </div>
      
      <button 
        className="w-full py-3 bg-[#9A8E5E] text-white rounded-lg hover:bg-[#8a7f54] transition-colors duration-200"
        onClick={() => alert('Redirigiendo al checkout')}
      >
        Proceder al Checkout
      </button>
      
      <button 
        className="w-full py-2 mt-2 text-[#9A8E5E] hover:underline"
        onClick={clearCart}
      >
        Vaciar Carrito
      </button>
    </div>
  );
};

export default CartSummary;