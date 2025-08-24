import React, { useEffect, useState } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  type?: "success" | "error" | "info";
  title: string;
  description: string;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, type = "success", title, description }) => {
    const [show, setShow] = useState(open);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      if (open) {
        setShow(true);
        setTimeout(() => setAnimate(true), 10); // trigger animation
      } else if (show) {
        setAnimate(false);
        const timeout = setTimeout(() => setShow(false), 250); // match animation duration
        return () => clearTimeout(timeout);
      }
    }, [open]);

    if (!show) return null;
    return (
      <div className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#a4a1aa42] backdrop-blur-md bg-opacity-40 transition-opacity duration-200 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white p-6 min-w-[500px] shadow-lg relative transition-all duration-300 transform ${animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        <div className="flex items-center gap-2 mb-4 flex-col">
          {type === "success" ? (
            <svg width="108" height="108" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="54" cy="54" r="54" fill="#131118" fillOpacity=".05"/><circle cx="54" cy="54" r="43" fill="#131118" fillOpacity=".1"/><circle cx="54" cy="54" r="32" fill="#131118"/><path fillRule="evenodd" clipRule="evenodd" d="M54 64c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm4.592-12.54a.75.75 0 00-1.184-.92l-4.007 5.151a.25.25 0 01-.365.033l-2.534-2.281a.75.75 0 10-1.004 1.114l2.535 2.282a1.75 1.75 0 002.552-.227l4.007-5.151z" fill="#fff"/></svg>
          ) : (
            <svg width="108" height="108" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="54" cy="54" r="54" fill="#D70000" fill-opacity=".05"/><circle cx="54" cy="54" r="43" fill="#F20303" fill-opacity=".1"/><circle cx="54" cy="54" r="32" fill="#A40E0E"/><path fill-rule="evenodd" clip-rule="evenodd" d="M54 43.25c-5.937 0-10.75 4.813-10.75 10.75S48.063 64.75 54 64.75 64.75 59.937 64.75 54 59.937 43.25 54 43.25zm-2.298 7.391a.75.75 0 00-1.061 1.06L52.939 54l-2.298 2.298a.75.75 0 001.06 1.06L54 55.062l2.298 2.298a.75.75 0 001.06-1.06L55.06 54l2.298-2.298a.75.75 0 00-1.06-1.06L54 52.938l-2.298-2.298z" fill="#fff"/></svg>
          )}
          <span className={`font-bold text-2xl ${type === "success" ? "text-[#131118]" : "text-[#A40E0E]"}`}>{title}</span>
        </div>
        <p className="text-gray-700 font-medium text-center max-w-[600px]">{description}</p>
        <button
          className={`mt-6 w-full py-4 rounded-xl font-normal  ${type === "success" ? "bg-[#131118]" : "bg-[#A40E0E]"} text-white`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
    );
};

export default Modal;