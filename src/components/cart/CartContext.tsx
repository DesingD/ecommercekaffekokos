"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Definir el tipo de producto
export interface Product {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  discountPrice?: number;
  quantity: number;
}

// Definir el tipo del contexto del carrito
interface CartContextType {
  cart: Product[];
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Clave para almacenar el carrito en localStorage
const CART_STORAGE_KEY = 'kaffekokos_cart';

// Función para cargar el carrito desde localStorage
const loadCartFromStorage = (): Product[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error al cargar el carrito desde localStorage:', error);
    return [];
  }
};

// Función para guardar el carrito en localStorage
const saveCartToStorage = (cart: Product[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error al guardar el carrito en localStorage:', error);
  }
};

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar el estado con los datos de localStorage
  const [cart, setCart] = useState<Product[]>([]);
  
  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const storedCart = loadCartFromStorage();
    if (storedCart.length > 0) {
      setCart(storedCart);
    }
  }, []);
  
  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // Agregar un producto al carrito
  const addToCart = (product: Omit<Product, 'quantity'>) => {
    setCart(prevCart => {
      // Verificar si el producto ya está en el carrito
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex !== -1) {
        // Si el producto ya existe, incrementar la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // Si el producto no existe, agregarlo con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Eliminar un producto del carrito
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Actualizar la cantidad de un producto
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // Limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Obtener el total del carrito
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Obtener la cantidad total de productos en el carrito
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};