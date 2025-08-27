"use client";
import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/authSlice';

const LoginForm = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remenberMe, setRememberMe] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await login(email, password);
    if (!error) {
      setModalMsg('¡Inicio de sesión exitoso!');
      setModalType('success');
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        router.push('/');
      }, 1200);
    } else {
      setModalMsg('Error al iniciar sesión: ' + error.message);
      setModalType('error');
      setModalOpen(true);
    }
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        title={modalType === 'success' ? '¡Bienvenido!' : 'Error'}
        description={modalMsg}
      />
      <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-1'>
        <label htmlFor="email" className='text-xs'>Correo</label>
        <input
          className='border border-[#9A8E5E] h-12 rounded-lg pl-3'
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Example@example.com'          
          required
        />
      </div>
      <div className='flex flex-col gap-1 mt-7 relative'>
        <label htmlFor="password" className='text-xs'>Contraseña</label>
        <input
          className='border border-[#9A8E5E] h-12 rounded-lg pl-3 relative'
          type={showPassword ? "text" : "password"}
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

      <div className="">
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center relative">
            <input 
              type="checkbox" 
              id="remember" 
              checked={remenberMe}
              onChange={() => setRememberMe(!remenberMe)}
              className="mr-2 appearance-none w-5 h-5 border-2 border-gray-700 rounded-sm bg-white checked:bg-[#9A8E5E] checked:border-0" 
            />
            <label htmlFor="remember" className="text-normal font-medium select-none">Remember me</label>
            {remenberMe && (
              <svg className="
                  absolute       
                  w-5
                  h-5        
                  peer-checked:block 
                  pointer-events-none" width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M5 13L9 17L19 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              
            )}
            
          </div>
          <a href="#" className="text-normal hover:underline text-[#9A8E5E] font-medium">Forgot password?</a>
        </div>
      </div>
      <button 
        type='submit'
        className='bg-[#9A8E5E] text-white w-full h-12 rounded-lg mt-7 cursor-pointer'
      >Login</button>

      <div className="mt-4">
        <p className='text-[#131118]'>Aun no tienes una cuenta? <a href="/auth/register" className='text-[#9A8E5E] hover:underline'>Registrate</a></p>
      </div>
      </form>
    </>
  );
};

export default LoginForm;
