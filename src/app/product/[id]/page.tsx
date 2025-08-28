"use client";
import React, {useEffect} from 'react';
import { useParams } from 'next/navigation';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { getProductById } from '@/lib/product';
import { useCart } from '@/components/cart/CartContext';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ProductPage = () => {
  const params = useParams();
  const { addToCart } = useCart();
  const id = params?.id;

  if (typeof id !== 'string') {
    return <div>Producto no encontrado</div>;
  }

  const [product, setProduct] = React.useState<any>(null);
  const [loading, setIsLoading] = React.useState(true);
  const [isLoadingBtn, setIsLoadingBtn] = React.useState(false);
  const [isAdded, setIsAdded] = React.useState(false);
  const isProcessing = React.useRef(false);

  useEffect(() => {
    let isMounted = true;
    getProductById(id).then((data) => {
      if (isMounted) {
        setProduct(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = async () => {
  if (isProcessing.current) return;
  isProcessing.current = true;
  setIsLoadingBtn(true);
  await new Promise((res) => setTimeout(res, 700));
  const price = typeof product.price === "number"
    ? product.price
    : parseFloat(product.price || "0");
  const discountPrice =
    product.discount && product.discountValue
      ? (typeof product.discountValue === "number"
          ? product.discountValue
          : parseFloat(product.discountValue))
      : undefined;
  addToCart({
    id: product.id,
    title: product.name,
    description: product.description,
    imageUrl: product.image_url[0],
    price,
    discountPrice,
  });
  setIsLoadingBtn(false);
  setIsAdded(true);
  setTimeout(() => {
    setIsAdded(false);
    isProcessing.current = false;
  }, 1200);
};

  if (loading) return <div>Cargando...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex items-center justify-center bg-[#F1F1F3] rounded-lg p-6">
            <div className="relative w-full">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                emulateTouch
                className="rounded-lg"
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#9A8E5E] text-white rounded-full p-2 z-10 shadow-lg hover:bg-[#857a4b] transition-colors"
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9A8E5E] text-white rounded-full p-2 z-10 shadow-lg hover:bg-[#857a4b] transition-colors"
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )
                }
                renderIndicator={(onClickHandler, isSelected, index, label) => (
                  <li
                    key={index}
                    className={`inline-block mx-1 w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                      isSelected ? 'bg-[#9A8E5E]' : 'bg-gray-300'
                    }`}
                    onClick={onClickHandler}
                    aria-label={label}
                    role="button"
                    tabIndex={0}
                  />
                )}
              >
                {(Array.isArray(product.image_url) && product.image_url.length > 0
                  ? product.image_url
                  : [product.image_url]
                ).map((img: string, idx: number) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt={product.name}
                      className="object-contain w-full h-96 rounded-lg bg-white"
                    />
                    {product.stock === 0 && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded z-10 shadow">
                        Agotado
                      </span>
                    )}
                  </div>
                ))}
              </Carousel>
            </div>
            
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex items-center gap-3 mb-6">
                {product.discount && (
                  <span className="text-2xl font-semibold text-[#9A8E5E]">
                    {product.discountValue}
                  </span>
                )}
                <span
                  className={`text-xl font-normal ${
                    product.discount
                      ? 'line-through text-[#B0ADB5]'
                      : 'text-neutral-950'
                  }`}
                >
                  ${product.price}
                </span>
              </div>
            </div>
            <button
              className={`w-full py-4 bg-[#9A8E5E] text-white rounded-lg font-medium text-lg hover:bg-[#7c724a] transition-colors flex items-center justify-center gap-2
                ${product.stock === 0 ? 'opacity-60 cursor-not-allowed' : ''}
              `}
              onClick={handleAddToCart}
              disabled={isLoadingBtn || isAdded || product.stock === 0}
            >
              {product.stock === 0 ? (
                "Agotado"
              ) : isLoadingBtn ? (
                // Spinner
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : isAdded ? (
                // Check
                <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                "Agregar al carrito"
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;