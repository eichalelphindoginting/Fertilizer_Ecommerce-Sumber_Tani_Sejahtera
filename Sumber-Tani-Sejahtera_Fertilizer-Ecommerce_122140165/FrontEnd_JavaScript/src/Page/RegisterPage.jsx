// src/Components/Daftar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import useRegisterPage from '../Hooks/UseRegisterPage'; // Path sesuai yang Anda berikan
import { useAuth } from '../context/AuthContext';

// SVG Icons (Anda bisa meletakkan ini di file terpisah atau di atas komponen)
// UserIcon, LockIcon, SpinnerIcon bisa diimpor jika sudah dibuat di file terpisah
// atau didefinisikan ulang di sini jika belum.
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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

const RegisterPage = () => {
  const { registerSuccessCallback, isAuthenticated, isLoadingAuth } = useAuth(); // Ambil isAuthenticated & isLoadingAuth
  const navigate = useNavigate(); // Untuk redirect jika sudah login
  const {
    username,
    email,
    password,
    confirmPassword,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
    isLoading, // Diasumsikan ada dari useRegisterPage untuk proses registrasi
    error,     // Diasumsikan ada dari useRegisterPage
  } = useRegisterPage(registerSuccessCallback);

  React.useEffect(() => {
    // Jika pengguna sudah login, arahkan ke halaman utama
    // Ini berguna jika pengguna secara tidak sengaja navigasi ke halaman daftar saat sudah login
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isLoadingAuth && !isAuthenticated) { // Tampilkan loading hanya jika belum terautentikasi
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-700">
        <SpinnerIcon /> {/* Menggunakan spinner kustom dari LoginPage */}
        <p className="mt-2">Memeriksa status autentikasi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-24">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-2">
            <h1 className="text-3xl font-bold text-green-600 hover:text-green-700 transition-colors">
              Sumber Tani Sejahtera
            </h1>
          </Link>
          <p className="text-xl font-semibold text-gray-700">Buat Akun Baru Anda</p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md border border-red-200" role="alert">
            <span className="font-medium">Gagal mendaftar:</span> {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="usernameReg" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon />
              </div>
              <input
                id="usernameReg"
                type="text"
                placeholder="Pilih username unik"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-shadow"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="emailReg" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon />
              </div>
              <input
                id="emailReg"
                type="email"
                placeholder="cth: nama@email.com"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-shadow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="passwordReg" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                id="passwordReg"
                type="password"
                placeholder="Minimal 6 karakter"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-shadow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPasswordReg" className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                id="confirmPasswordReg"
                type="password"
                placeholder="Ulangi password Anda"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-shadow"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isLoadingAuth} // Nonaktifkan jika sedang loading
            className="w-full flex justify-center items-center bg-green-600 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 active:bg-green-800 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? ( // Jika isLoading dari hook useRegisterPage true
              <>
                <SpinnerIcon />
                <span className="ml-2">Mendaftarkan...</span>
              </>
            ) : (
              'Buat Akun Saya'
            )}
          </button>
        </form>

        <div className="mt-8 text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/loginpage" className="font-medium text-green-600 hover:text-green-700 hover:underline">
            Masuk di sini
          </Link>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Sumber Tani Sejahtera. All rights reserved.
      </p>
    </div>
  );
};

export default RegisterPage;