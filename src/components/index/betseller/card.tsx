import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import { useCart } from '@/components/cart/CartContext';
import Link from 'next/link';

interface CardProps {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    discount?: boolean;
    discountValue?: string;
    value?: string;
    stock: number;
}

const Card: React.FC<CardProps> = ({ id, title, description, imageUrl, discount, discountValue, value, stock }) => {
    const { addToCart } = useCart();
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault(); // Evita la navegación del Link
        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 700));
        const price = value ? parseFloat(value.replace('$', '')) : 0;
        const discountPrice = discount && discountValue ? parseFloat(discountValue.replace('$', '')) : undefined;
        addToCart({
            id,
            title,
            description,
            imageUrl,
            price,
            discountPrice,
        });
        setIsLoading(false);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1200);
    };

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                type="success"
                title="¡Producto agregado!"
                description={`El producto "${title}" se ha agregado al carrito.`}
            />
            <div className="relative group">
                <Link
                    href={`/product/${id}`}
                    className="block focus:outline-none"
                    tabIndex={0}
                >
                    <div className="grid grid-cols-1 grid-rows-[350px,auto,auto] gap-4 bg-white rounded-xl transition-all cursor-pointer">
                        <div className="relative w-full h-[350px] bg-[#F1F1F3] overflow-hidden">
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={title}
                                    className="w-full h-full object-contain transition-all duration-300 group-hover:opacity-50"
                                />
                            )}
                            {stock === 0 && (
                                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded z-10">
                                    Agotado
                                </span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">{title}</h3>
                            {description && <p className="text-gray-600 text-sm">{description}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            {discount && <span className="text-neutral-950 font-normal">{discountValue}</span>}
                            {value && (
                                <span
                                    className={`font-normal ${
                                        discount
                                            ? 'line-through text-[#B0ADB5]'
                                            : 'text-neutral-950'
                                    }`}
                                >
                                    {value}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
                {/* Botón Add to Cart superpuesto */}
                <div className="absolute bottom-33 left-4 right-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
                    <button
                        onClick={handleAddToCart}
                        disabled={stock === 0 || isLoading || isAdded}
                        className={`w-full py-4 cursor-pointer bg-white hover:bg-[#9A8E5E] hover:text-white transition-colors duration-200 text-sm font-medium rounded-lg flex items-center justify-center gap-2 pointer-events-auto
                            ${stock === 0 ? 'opacity-60 cursor-not-allowed' : ''}
                        `}
                    >
                        {stock === 0 ? (
                            "Agotado"
                        ) : isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        ) : isAdded ? (
                            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            "Add to Cart"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Card;