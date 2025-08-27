"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import Card from './card';
import { supabase } from '@/lib/supabase';

const fetchProducts = async () => {
    const { data: products, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return products || [];
};

const Betseller: React.FC = () => {
    // Example data for the bestseller section
    // This can be replaced with actual data fetched from an API or database
    type Product = {
        id: string;
        name: string;
        description: string;
        shortDescription: string;
        price: number;
        stock: number;
        is_active: boolean;
        image_url: string;
        discount: boolean;
        price_discount: number;
    };
    
    const { data: bestsellers = [], isLoading } = useSWR("main-products", fetchProducts, {
        revalidateOnFocus: false,
    });
    

    // Pagination logic
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(bestsellers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = bestsellers.slice(startIndex, endIndex);

    const handlePrev = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    return (
        <div className='my-10'>
            <h3 className='text-center text-4xl font-normal'>Nuestros productos</h3>
            {isLoading ? (
                <div className="text-center py-10">Cargando productos...</div>
            ) : bestsellers.length === 0 ? (
                <div className="text-center py-10 text-red-500">No hay productos para mostrar.</div>
            ) : (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-10 lg:px-40">
                    {currentProducts.map((product, index) => (
                        <Card
                            key={product.id}
                            id={product.id}
                            title={product.name}
                            description={product.shortDescription || product.description}
                            imageUrl={product.image_url}
                            discount={product.discount}
                            discountValue={product.price_discount ? `$${product.price_discount}` : ''}
                            value={`$${product.price}`}
                            stock={product.stock}
                        />
                    ))}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded border ${currentPage === 1 ? 'bg-[#9A8E5E] text-white cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'}`}
                        >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </button>
                        <span className="mx-2">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded border ${currentPage === totalPages ? 'bg-[#9A8E5E] text-white cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'}`}
                        >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </button>
                    </div>
                )}
                </>
            )}
        </div>
    );
};

export default Betseller;