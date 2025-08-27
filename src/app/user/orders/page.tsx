"use client";
import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/store/authSlice";
import { getOrdersByUserId } from "@/lib/orders";
import useSWR from "swr";

const OrdersPage = () => {
    type OrderItem = {
        name: string;
        quantity: number;
        product: {
            name: string;
        }
    };

    type OrderType = {
        id: string | number;
        order_id_paypal: string;
        date: string;
        status: string;
        total: number;
        created_at: string;
        total_amount: string;
        order_items: OrderItem[];
    };

    const { user } = useAuth();

    // SWR para cachear las órdenes
    const { data: orders = [], isLoading } = useSWR(
        user ? ["orders", user.id] : null,
        () => getOrdersByUserId(user.id).then(orders =>
            [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        ),
        { revalidateOnFocus: false }
    );

    if (!user) {
        return (
            <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Mis Órdenes</h1>
                <p>Por favor, inicia sesión para ver tus órdenes.</p>
            </div>
            <Footer />
            </>
        );
    }

    return (
        <>
        <Navbar />
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-[#9A8E5E]">Mis Órdenes</h1>
            {isLoading ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    Cargando órdenes...
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    No tienes órdenes aún.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-xl shadow-lg border border-[#eceaec] hover:shadow-xl transition-all p-6 flex flex-col gap-3"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-[#9A8E5E]">Orden #{order.order_id_paypal}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="mb-1">
                                <span className="text-sm text-gray-600">Estado: </span>
                                <span className={`font-medium ${order.status === "COMPLETADA" ? "text-green-600" : "text-[#9A8E5E]"}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="mb-1">
                                <span className="text-sm text-gray-600">Total: </span>
                                <span className="font-bold text-[#9A8E5E]">${order.total_amount}</span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Productos:</span>
                                <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-800">
                                    {(order.order_items ?? []).map((item: OrderItem, idx: number) => (
                                        <li key={idx}>
                                            {item.product.name} <span className="text-[#9A8E5E] font-semibold">x{item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer />
        </>
    );
};

export default OrdersPage;