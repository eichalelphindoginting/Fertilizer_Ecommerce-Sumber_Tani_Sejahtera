// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get('userData');
    const tokenCookie = Cookies.get('token');

    if (tokenCookie) {
      setToken(tokenCookie);
      if (userCookie) {
        try {
          setCurrentUser(JSON.parse(userCookie));
        } catch (error) {
          console.error("Gagal mem-parsing cookie pengguna:", error);
          Cookies.remove('userData');
          Cookies.remove('token');
          setCurrentUser(null);
          setToken(null);
        }
      } else {
        // Jika hanya ada token tapi tidak ada userData,
        // mungkin set currentUser ke null atau coba fetch dari backend
        // Untuk sekarang, jika userCookie tidak ada, kita set currentUser ke null
        // setCurrentUser(null); // Ini bisa menyebabkan logout jika hanya token yang ada dan userCookie hilang
      }
    }
    setIsLoading(false);
  }, []);

  const loginSuccessCallback = (userData, authToken) => {
    setCurrentUser(userData);
    setToken(authToken);
    Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
    Cookies.set('token', authToken, { expires: 7 });
    navigate('/'); // Navigasi ke halaman utama setelah login
  };

  const registerSuccessCallback = (userData, authToken) => {
    if (userData && authToken) { // Jika backend otomatis login setelah register
        setCurrentUser(userData);
        setToken(authToken);
        Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
        Cookies.set('token', authToken, { expires: 7 });
        navigate('/'); // Navigasi ke halaman utama
    } else { // Jika perlu login manual setelah register
        navigate('/loginpage');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    Cookies.remove('userData');
    Cookies.remove('token');
    navigate('/loginpage'); // Navigasi ke halaman login setelah logout
  };

  const value = {
    currentUser,
    token,
    isAuthenticated: !!currentUser, // Logika isAuthenticated berdasarkan currentUser
    isLoadingAuth: isLoading,
    loginSuccessCallback,
    registerSuccessCallback,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};