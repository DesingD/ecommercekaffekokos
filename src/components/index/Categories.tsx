"use client";
import React, { useRef, useEffect } from 'react';

const Categories: React.FC = () => {
    const [startIndex, setStartIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const categories = [
        {
            title: 'Casual Wear',
            image: '/categories/casual.png',
        },
        {
            title: 'Western Wear',
            image: '/categories/wester.png',
        },
        {
            title: 'Ethnic Wear',
            image: '/categories/ethic.png',
        },
        {
            title: 'Kids Wear',
            image: '/categories/kids.png',
        },
        {
            title: 'Formal Wear',
            image: '/categories/formal.png',
        },
        {
            title: 'Sportswear',
            image: '/categories/sport.png',
        },
        {
            title: 'Party Wear',
            image: '/categories/party.png',
        },
        {
            title: 'Sleepwear',
            image: '/categories/sleep.png',
        }
    ];

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
                
        setStartIndex((prevIndex) => 
            prevIndex + 4 >= categories.length ? 0 : prevIndex + 1
        );
        
        setTimeout(() => {
            setIsAnimating(false);
        }, 100);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        
        setTimeout(() => {
            setStartIndex((prevIndex) => 
                prevIndex === 0 ? categories.length - 4 : prevIndex - 1
            );
            setIsAnimating(false);
        }, 100);
    };

    const visibleCategories = [...categories.slice(startIndex), ...categories.slice(0, startIndex)]
        .slice(0, 4);
        
    // Aplicar la transformación al slider basado en el índice actual
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${startIndex * 25}%)`;
        }
    }, [startIndex]);

    return (
        <section className="px-40 py-16">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-regular">Shop by Categories</h2>
                <div className="flex gap-2">
                    <button 
                        onClick={handlePrev} 
                        className="w-10 h-10 rounded-md bg-[#f6f6f6] flex items-center justify-center hover:scale-105 transition-all"
                        disabled={isAnimating}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/></svg>
                    </button>
                    <button 
                        onClick={handleNext} 
                        className="w-10 h-10 rounded-md bg-[#131118] flex items-center justify-center text-white hover:scale-105 transition-all"
                        disabled={isAnimating}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>
                    </button>
                </div>
            </div>
            <div className="overflow-hidden">
                <div 
                    ref={sliderRef}
                    className="flex flex-nowrap gap-4 transition-transform duration-500 ease-in-out"
                >
                    {categories.map((category, index) => (
                        <div key={index} className="group relative">
                            <div className="relative overflow-hidden rounded-lg bg-[#f3f3f3] w-[243px]">
                                <img 
                                    src={category.image} 
                                    alt={category.title}
                                    className="w-full h-[360px] object-cover transition-transform duration-300"
                                />
                            
                            </div>
                            <a className="py-2 rounded-sm text-sm left-1/2 -translate-x-1/2 text-center mt-4 font-medium absolute bottom-4 bg-white w-10/12 m-auto hover:scale-105 transition-all" href='#'>{category.title}</a>
                        </div>
                    ))}
                </div>
            </div>    
        </section>
    );
};

export default Categories;