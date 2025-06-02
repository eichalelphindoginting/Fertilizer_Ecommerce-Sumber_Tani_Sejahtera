// src/Components/Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLoginpage from '../Hooks/useLoginpage'; // Pastikan path ini benar
import { useAuth } from '../context/AuthContext';  // Pastikan path ini benar

// SVG Icons (Anda bisa meletakkan ini di file terpisah atau di atas komponen)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


const LoginPage = () => {
  const { loginSuccessCallback, isLoadingAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    isLoading, // Diasumsikan ada dari useLoginpage untuk proses login
    error,     // Diasumsikan ada dari useLoginpage
  } = useLoginpage(loginSuccessCallback);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isLoadingAuth && !isAuthenticated) { // Tampilkan loading hanya jika belum terautentikasi
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-700">
        <SpinnerIcon /> {/* Menggunakan spinner kustom */}
        <p className="mt-2">Memeriksa status autentikasi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-2">
            {/* Anda bisa mengganti ini dengan logo gambar jika ada */}
            <h1 className="text-3xl font-bold text-green-600 hover:text-green-700 transition-colors">
              Sumber Tani Sejahtera
            </h1>
          </Link>
          <p className="text-xl font-semibold text-gray-700">Selamat Datang Kembali!</p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md border border-red-200" role="alert">
            <span className="font-medium">Terjadi kesalahan:</span> {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon />
              </div>
              <input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-shadow"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password Anda"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-shadow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
             <div className="text-right mt-1">
              <a href="#" className="text-xs text-green-600 hover:underline">
                Lupa password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isLoadingAuth} // Nonaktifkan jika sedang loading auth atau proses login
            className="w-full flex justify-center items-center bg-green-600 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 active:bg-green-800 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? ( // Jika isLoading dari hook useLoginpage true
              <>
                <SpinnerIcon />
                <span className="ml-2">Memproses...</span>
              </>
            ) : (
              'Masuk Akun'
            )}
          </button>
        </form>

        <div className="mt-8 text-sm text-center text-gray-600">
          Belum punya akun?{' '}
          <Link to="/DaftarPage" className="font-medium text-green-600 hover:text-green-700 hover:underline">
            Daftar sekarang gratis!
          </Link>
        </div>
      </div>
       <p className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Sumber Tani Sejahtera. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;