import React, { useState } from 'react';
import { useCart } from '../cart/CartContext';
import PayPalButton from './PaypalButton';
import { useAuth } from '@/store/authSlice';
import Modal from '@/components/common/Modal';
import createOrder from '@/lib/orders';
import createOrderItem from '@/lib/order_items';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

const ShippingForm: React.FC = () => {
  const { getCartTotal, cart, clearCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { user, loading } = useAuth();
  const handleSubmit = async (data: any) => {
    if (!user) {
      alert('Debes iniciar sesión para completar la compra.');
      return;
    }

    const user_id = user.id;
    const form = {
      user_id,
      order_id_paypal: data.orderID,
      payment_source: data.paymentSource,
      payment_id: data.paymentID,
      payer_id: data.payerID,
      status: "Processing",
      total_amount: getCartTotal()
    }

    try {
    // 1. Crear la orden y obtener el id
    const id_order = await createOrder(form);

    // 2. Guardar los items del carrito en orders_items
    for (const item of cart) {
      await createOrderItem({
        id_order,
        id_product: item.id,
        quantity: item.quantity,
        price: item.price
      });
    }

    setModalMsg('¡Pago realizado con éxito! Gracias por tu compra.');
    setModalOpen(true);
  } catch (error) {
    console.error('Error creating order:', error);
    setModalMsg('Error al procesar el pago. Por favor, inténtalo de nuevo.');
    setModalOpen(true);
  }

    
    
  };

    
  const handleModalClose = () => {
    setModalOpen(false);
    clearCart();
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        type="success"
        title="¡Pago exitoso!"
        description={modalMsg}
      />
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A8E5E] focus:ring-[#9A8E5E]"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A8E5E] focus:ring-[#9A8E5E]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A8E5E] focus:ring-[#9A8E5E]"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A8E5E] focus:ring-[#9A8E5E]"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A8E5E] focus:ring-[#9A8E5E]"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A8E5E] focus:ring-[#9A8E5E]"
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Código Postal</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A8E5E] focus:ring-[#9A8E5E]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A8E5E] focus:ring-[#9A8E5E]"
        />
      </div>

      <div className="mt-6">
        {!user && !loading && (
          <div className="text-red-600 font-semibold mb-2">Debes iniciar sesión para pagar.</div>
        )}
        <PayPalButton onSuccess={(data) => handleSubmit(data)} />
      </div>
    </form>
  </>
  );
};

export default ShippingForm;