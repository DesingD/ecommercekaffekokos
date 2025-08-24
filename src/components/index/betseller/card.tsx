import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import { useCart } from '@/components/cart/CartContext';

interface CardProps {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    discount?: boolean;
    discountValue?: string;
    value?: string;
}

const Card: React.FC<CardProps> = ({ id,title, description, imageUrl, discount, discountValue, value }) => {
    const { addToCart } = useCart();
    
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddToCart = () => {
        // Extraer el valor numérico del precio (quitar el símbolo $ y convertir a número)
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
        setModalOpen(true);
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
        <div className="grid grid-cols-1 grid-rows-[350px,auto,auto] gap-4">
            <div className="relative w-full h-[350px] bg-[#F1F1F3] overflow-hidden group">
                {imageUrl && (
                    <>
                        <img 
                            src={imageUrl} 
                            alt={title} 
                            className="w-full h-full object-contain transition-all duration-300 group-hover:opacity-50" 
                        />
                        {/* Overlay con botones */}
                        <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="w-10 h-10 cursor-pointer bg-white rounded-full hover:bg-[#9A8E5E] hover:text-white transition-colors duration-200 flex items-center justify-center">                                
                                <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                                    <path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                        {/* Botón Add to Cart */}
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                                onClick={handleAddToCart}
                                className="w-full py-4 cursor-pointer bg-white hover:bg-[#9A8E5E] hover:text-white transition-colors duration-200 text-sm font-medium rounded-lg"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="">
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
        </>
    );
};

export default Card;