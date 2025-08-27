"use client";
import React, { createContext, useContext, ReactNode, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Cookies from 'js-cookie';
import useSWR from 'swr';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fetcher para SWR
const fetchUser = async () => {
  const token = Cookies.get('sb-access-token');
  if (token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return data.user;
  }
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user, isLoading, mutate } = useSWR('user-session', fetchUser, {
    revalidateOnFocus: false,
  });

  // Login y logout actualizan el cache SWR
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      Cookies.set('sb-access-token', data.session?.access_token || '', { expires: 7 });
      mutate(); // Refresca el usuario en caché
    }
    return { data, error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    Cookies.remove('sb-access-token');
    mutate(null); // Limpia el usuario en caché
  };

  // Solo mostrar loader la primera vez
  const hasLoadedOnce = useRef(false);
  if (!isLoading && !hasLoadedOnce.current) {
    hasLoadedOnce.current = true;
  }

  return (
    <AuthContext.Provider value={{ user, loading: isLoading, login, logout, refreshUser: mutate }}>
      {isLoading && !hasLoadedOnce.current ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <span className="text-xl font-bold text-[#9A8E5E] animate-pulse">Cargando Datos...</span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};