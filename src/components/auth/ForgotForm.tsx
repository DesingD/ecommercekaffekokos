"use client";
import React, { useState } from 'react';
import Modal from '../common/Modal';


const ForgotForm = ({}) => {
  const [email, setEmail] = useState(''); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //simula exito
    setModalType("success");
    setModalTitle("Email Sent");
    setModalDescription("We have sent a code to your email address to reset your password.");
    setModalOpen(true);    
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='text-xs'>Email Address</label>
          <input
            className='border border-[#424146] h-12 rounded-lg pl-3'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Example@example.com'
            required
          />
        </div>

        <button 
          type='submit'
          className='bg-[#131118] text-white w-full h-12 rounded-lg mt-7 cursor-pointer'
        >Send OTP</button>
      </form>
      
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        title={modalTitle}
        description={modalDescription}
      />
    </>
  );
};

export default ForgotForm;
