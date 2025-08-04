"use client";
import React, { useState } from 'react';
import Modal from '../common/Modal';


const ForgotForm = ({}) => {
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalType("error");
      setModalTitle("Error Change Password");
      setModalDescription("Passwords do not match.");
      setModalOpen(true);
      return;
    }
    //simula exito
    setModalType("success");
    setModalTitle("Password Changed Successfully");
    setModalDescription("Your password has been updated successfully");
    setModalOpen(true);    
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-1 relative'>
        <label htmlFor="password" className='text-xs'>Password</label>
        <input
          className='border border-[#424146] h-12 rounded-lg pl-3 relative'
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='********'
          required
        />
        <button
          type="button"
          className="absolute right-3 top-11 transform -translate-y-1/2"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
        >
          {showPassword ? (
            // Ojo abierto
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5"><path d="M3 13C6.6 5 17.4 5 21 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          ) : (
            // Ojo cerrado
            <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19.5 16L17.0248 12.6038" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.5V14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.5 16L6.96895 12.6124" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 8C6.6 16 17.4 16 21 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          )}
        </button>
      </div>
      <div className='flex flex-col gap-1 mt-7 relative'>
        <label htmlFor="confirm-password" className='text-xs'>Confirm Password</label>
        <input
          className='border border-[#424146] h-12 rounded-lg pl-3 relative'
          type={showPasswordConfirm ? "text" : "password"}
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='********'
          required
        />
        <button
          type="button"
          className="absolute right-3 top-11 transform -translate-y-1/2"
          onClick={() => setShowPasswordConfirm((prev) => !prev)}
          tabIndex={-1}
        >
          {showPasswordConfirm ? (
            // Ojo abierto
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5"><path d="M3 13C6.6 5 17.4 5 21 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          ) : (
            // Ojo cerrado
            <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19.5 16L17.0248 12.6038" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.5V14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.5 16L6.96895 12.6124" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 8C6.6 16 17.4 16 21 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          )}
        </button>
      </div>

        <button 
          type='submit'
          className='bg-[#131118] text-white w-full h-12 rounded-lg mt-7 cursor-pointer'
        >Reset Pass</button>
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
