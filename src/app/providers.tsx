"use client";

import React, { ReactNode } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CartProvider } from "@/components/cart/CartContext";
import { AuthProvider } from "@/store/authSlice";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",

      }}
    >
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}