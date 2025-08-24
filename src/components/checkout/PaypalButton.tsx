import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from '../cart/CartContext';

interface PayPalButtonProps {
  onSuccess: (data: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ onSuccess }) => {
  const { getCartTotal, clearCart } = useCart();

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: getCartTotal().toFixed(2),
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order!.capture().then(() => {
          onSuccess(data);
          // clearCart(); // Ahora se limpia el carrito al cerrar el modal en ShippingForm
        });
      }}
    />
  );
};

export default PayPalButton;