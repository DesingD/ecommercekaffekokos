import React, { useEffect, useState } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  type?: "success" | "error" | "info";
  title: string;
  description: string;
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  type = "success",
  title,
  description,
}) => {
  const [show, setShow] = useState(open);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else if (show) {
      setAnimate(false);
      const timeout = setTimeout(() => setShow(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#13111833] backdrop-blur-sm transition-opacity duration-200 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white w-[90vw] max-w-md md:max-w-lg p-6 md:p-8 rounded-2xl shadow-2xl relative transition-all duration-300 transform ${
          animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-[#9A8E5E] text-2xl md:text-3xl hover:scale-110 transition-transform"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <div className="flex flex-col items-center gap-4 mb-4">
          {type === "success" ? (
            // Animated check
            <svg width="72" height="72" viewBox="0 0 72 72" className="block" fill="none">
              <circle cx="36" cy="36" r="36" fill="#9A8E5E" fillOpacity="0.12" />
              <circle cx="36" cy="36" r="28" fill="#9A8E5E" fillOpacity="0.18" />
              <circle cx="36" cy="36" r="20" fill="#9A8E5E" />
              <path
                d="M27 37.5L33.5 44L45 32.5"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 32,
                  strokeDashoffset: animate ? 0 : 32,
                  transition: "stroke-dashoffset 0.5s cubic-bezier(.4,2,.6,1)"
                }}
              />
            </svg>
          ) : (
            // Animated X
            <svg width="72" height="72" viewBox="0 0 72 72" className="block" fill="none">
              <circle cx="36" cy="36" r="36" fill="#D70000" fillOpacity="0.08" />
              <circle cx="36" cy="36" r="28" fill="#D70000" fillOpacity="0.16" />
              <circle cx="36" cy="36" r="20" fill="#D70000" />
              <path
                d="M30 30L42 42M42 30L30 42"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 34,
                  strokeDashoffset: animate ? 0 : 34,
                  transition: "stroke-dashoffset 0.5s cubic-bezier(.4,2,.6,1)"
                }}
              />
            </svg>
          )}
          <span
            className={`font-bold text-xl md:text-2xl text-center ${
              type === "success" ? "text-[#9A8E5E]" : "text-[#D70000]"
            }`}
          >
            {title}
          </span>
        </div>
        <p className="text-gray-700 font-medium text-center mb-6">{description}</p>
        <button
          className={`w-full py-3 rounded-xl font-semibold ${
            type === "success"
              ? "bg-[#9A8E5E] hover:bg-[#857a4b]"
              : "bg-[#D70000] hover:bg-[#a40e0e]"
          } text-white transition-colors`}
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;