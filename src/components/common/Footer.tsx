import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#9A8E5E] text-[#eceaec] pt-16 pb-5">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-medium text-white">Kafee kokos</h2>
            <div className="flex flex-col gap-4 items-center md:items-start">
              <p className="flex items-center gap-3 justify-center md:justify-start">
                {/* Teléfono */}
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" color="#D8D7D8">
                  <path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#D8D7D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                (704) 555-0127
              </p>
              <p className="flex items-center gap-3 justify-center md:justify-start">
                {/* Email */}
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" color="#D8D7D8">
                  <path d="M7 9L12 12.5L17 9" stroke="#D8D7D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="#D8D7D8" strokeWidth="1.5"></path>
                </svg>
                info@example.com
              </p>
              <p className="flex items-center gap-3 justify-center md:justify-start pr-0 md:pr-20">
                {/* Dirección */}
                <svg className="shrink-0" width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" color="#D8D7D8">
                  <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="#D8D7D8" strokeWidth="1.5"></path>
                  <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="#D8D7D8" stroke="#D8D7D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                3891 Ranchview Dr. Richardson, California 62639
              </p>
            </div>
          </div>

          {/* Information Links */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-32 text-center md:text-left">
            <div>
              <h3 className="font-bold mb-4 text-white">Information</h3>
              <ul className="flex flex-col gap-4">
                <li><a href="/about" className="hover:text-white">My Account</a></li>
                <li><a href="/auth/login" className="hover:text-white">Login</a></li>
                <li><a href="/delivery" className="hover:text-white">My Cart</a></li>
                <li><a href="/privacy" className="hover:text-white">My Wishlist</a></li>
                <li><a href="/terms" className="hover:text-white">Checkout</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">Service</h3>
              <ul className="flex flex-col gap-4">
                <li><a href="/account" className="hover:text-white">About us</a></li>
                <li><a href="/login" className="hover:text-white">Careers</a></li>
                <li><a href="/cart" className="hover:text-white">Delivery Information</a></li>
                <li><a href="/wishlist" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/checkout" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold mb-4 text-white">Subscribe</h3>
            <p className="mb-4 text-center md:text-left">
              Enter your email below to be the first to know about new collections and product launches.
            </p>
            <div className="flex gap-2 w-full justify-center md:justify-start">
              <div className="relative flex-grow max-w-xs">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent border-2 border-[#D8D7D8] rounded-md pl-12 pr-14 py-2"
                />
                {/* Icono del email */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" color="#D8D7D8">
                    <path d="M7 9L12 12.5L17 9" stroke="#D8D7D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="#D8D7D8" strokeWidth="1.5" />
                  </svg>
                </div>
                {/* Botón de envío */}
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded" type="button">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex gap-2 items-center justify-center md:justify-start">
            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 flex items-center justify-center">
                <Image className="rounded object-contain" src="/PaymentIcons/Paypal.jpg" alt="PayPal" width={35} height={20} style={{ width: "35px", height: "20px" }} />
              </div>
              <div className="w-10 h-6 flex items-center justify-center">
                <Image className="rounded object-contain" src="/PaymentIcons/Visa.jpg" alt="Visa" width={35} height={20} style={{ width: "35px", height: "20px" }} />
              </div>
              <div className="w-10 h-6 flex items-center justify-center">
                <Image className="rounded object-contain" src="/PaymentIcons/Mastercard.jpg" alt="Mastercard" width={35} height={20} style={{ width: "35px", height: "20px" }} />
              </div>
              <div className="w-10 h-6 flex items-center justify-center">
                <Image className="rounded object-contain" src="/PaymentIcons/Amex.jpg" alt="Amex" width={35} height={20} style={{ width: "35px", height: "20px" }} />
              </div>
            </div>
          </div>
          <p className="text-center">©2025 Kafee Koko All Rights are reserved</p>
          <div className="flex gap-4 justify-center md:justify-end">
            <a href="#" className="hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;