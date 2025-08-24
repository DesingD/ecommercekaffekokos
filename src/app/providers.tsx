"use client";

import React, { ReactNode } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CartProvider } from "@/components/cart/CartContext";
import { AuthProvider } from "@/store/authSlice";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: "Adm8P167DmcUtAIR4xaLC1dr1qtgtX_TgA6HGraxACM8gKMY3o13uimTvEvs0nauDRZAjEUPBu37TioO",
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