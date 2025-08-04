import React from 'react';
import { Product, useCart } from './CartContext';

interface CartItemProps {
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center space-x-4">
        {product.imageUrl && (
          <div className="w-20 h-20 bg-[#F1F1F3] overflow-hidden rounded">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-full object-contain" 
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-medium">{product.title}</h3>
          {product.description && <p className="text-gray-600 text-sm">{product.description}</p>}
          <div className="flex items-center gap-2 mt-1">
            {product.discountPrice && (
              <span className="text-neutral-950 font-normal">${product.discountPrice.toFixed(2)}</span>
            )}
            <span
              className={`font-normal ${product.discountPrice ? 'line-through text-[#B0ADB5]' : 'text-neutral-950'}`}
            >
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <select 
          value={product.quantity} 
          onChange={handleQuantityChange}
          className="border border-gray-300 rounded p-1"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <button 
          onClick={() => removeFromCart(product.id)}
          className="text-red-500 hover:text-red-700"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16M10 11V16M14 11V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;