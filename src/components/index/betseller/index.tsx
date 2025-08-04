"use client";
import React, { useState } from 'react';
import Card from './card';


const Betseller: React.FC = () => {
    // Example data for the bestseller section
    // This can be replaced with actual data fetched from an API or database
    const bestsellers = [
        {
            title: "Roadster Shirt",
            description: "Printed Casual Shirt",
            imageUrl: "/imgPruebaProductos/camisa.png",
            discount: true,
            discountValue: "$20.00",
            value: "$50.00"
        },
        {
            title: "Roadster Pants",
            description: "Comfortable Casual Pants",
            imageUrl: "/imgPruebaProductos/bolso.png",
            discount: false,
            discountValue: "",
            value: "$40.00"
        },
        {
            title: "US Polo Assn.",
            description: "Polo colar t-shirt",
            imageUrl: "/imgPruebaProductos/polo.png",
            discount: true,
            discountValue: "$40.00",
            value: "$50.00"
        },
        {
            title: "Adidas",
            description: "Men's Sports Shoes",
            imageUrl: "/imgPruebaProductos/zapatillas.png",
            discount: true,
            discountValue: "$60.00",
            value: "$75.00"
        },
        {
            title: "Trenyol",
            description: "Floral Embroidered Dress",
            imageUrl: "/imgPruebaProductos/vestido.png",
            discount: true,
            discountValue: "$35.00",
            value: "$45.00"
        },
        {
            title: "YK Disney",
            description: "Girls' Printed Dress",
            imageUrl: "/imgPruebaProductos/vestidoCorto.png",
            discount: false,
            discountValue: "$80.00",
            value: "$100.00"
        },
        {
            title: "Louis philippe Shirt",
            description: "Polo colar t-shirt",
            imageUrl: "/imgPruebaProductos/larga.png",
            discount: true,
            discountValue: "$50.00",
            value: "$55.00"
        },
        {
            title: "Sila",
            description: "Women Sandals",
            imageUrl: "/imgPruebaProductos/womenSho.png",
            discount: true,
            discountValue: "$80.00",
            value: "$100.00"
        },
        {
            title: "Roadster Shirt",
            description: "Printed Casual Shirt",
            imageUrl: "/imgPruebaProductos/camisa.png",
            discount: true,
            discountValue: "$20.00",
            value: "$50.00"
        },
        {
            title: "Roadster Pants",
            description: "Comfortable Casual Pants",
            imageUrl: "/imgPruebaProductos/bolso.png",
            discount: false,
            discountValue: "",
            value: "$40.00"
        },
        {
            title: "US Polo Assn.",
            description: "Polo colar t-shirt",
            imageUrl: "/imgPruebaProductos/polo.png",
            discount: true,
            discountValue: "$40.00",
            value: "$50.00"
        },
        {
            title: "Adidas",
            description: "Men's Sports Shoes",
            imageUrl: "/imgPruebaProductos/zapatillas.png",
            discount: true,
            discountValue: "$60.00",
            value: "$75.00"
        },
        {
            title: "Trenyol",
            description: "Floral Embroidered Dress",
            imageUrl: "/imgPruebaProductos/vestido.png",
            discount: true,
            discountValue: "$35.00",
            value: "$45.00"
        },
        {
            title: "YK Disney",
            description: "Girls' Printed Dress",
            imageUrl: "/imgPruebaProductos/vestidoCorto.png",
            discount: false,
            discountValue: "$80.00",
            value: "$100.00"
        },
        {
            title: "Louis philippe Shirt",
            description: "Polo colar t-shirt",
            imageUrl: "/imgPruebaProductos/larga.png",
            discount: true,
            discountValue: "$50.00",
            value: "$55.00"
        },
        {
            title: "Agua de carton",
            description: "Agua para tomar obvio da",
            imageUrl: "/imgPruebaProductos/womenSho.png",
            discount: false,
            discountValue: "$80.00",
            value: "$100.00"
        }
    ]
        // Add more products as needed

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
            <div className="grid grid-cols-4 gap-4 mt-8 px-40">
                {currentProducts.map((product, index) => (
                    <Card
                        key={startIndex + index}
                        title={product.title}
                        description={product.description}
                        imageUrl={product.imageUrl}
                        discount={product.discount}
                        discountValue={product.discountValue}
                        value={product.value}
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
        </div>
    );
};

export default Betseller;