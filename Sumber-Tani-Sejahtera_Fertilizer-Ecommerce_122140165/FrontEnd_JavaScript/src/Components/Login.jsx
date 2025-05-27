// src/Components/Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate jika belum ada
import useLoginpage from '../Hooks/useLoginpage';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { loginSuccessCallback, isLoadingAuth, isAuthenticated } = useAuth(); // Ambil isAuthenticated juga
  const navigate = useNavigate(); // Untuk redirect jika sudah login

  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    // isLoading, // Jika ada state loading di hook Anda
    // error,    // Jika ada state error di hook Anda
  } = useLoginpage(loginSuccessCallback); // Berikan callback ke custom hook

  React.useEffect(() => {
    // Jika pengguna sudah login, arahkan ke halaman utama
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memeriksa status autentikasi...
      </div>
    );
  }
  // Jika sudah diautentikasi dan belum redirect (misalnya loadingAuth selesai tapi useEffect belum jalan),
  // bisa juga return null atau loading untuk mencegah flash form login.
  // Namun, useEffect di atas seharusnya menangani redirect dengan cepat.

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <Link to="/">
          </Link>
          <h1 className="text-2xl font-bold text-green-600">Log In</h1>
        </div>
        {/* {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>} */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            // disabled={isLoading || isLoadingAuth}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {/* {isLoading || isLoadingAuth ? 'Memproses...' : 'Masuk'} */}
            Masuk
          </button>
        </form>
         <div className="mt-4 text-sm text-center text-gray-600">
          Belum punya akun?{' '}
          <Link to="/DaftarPage" className="text-green-600 hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;