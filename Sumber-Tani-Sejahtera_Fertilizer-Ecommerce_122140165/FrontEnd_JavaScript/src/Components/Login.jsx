import React from 'react';
import { Link } from 'react-router-dom';
import useLoginpage from '../Hooks/useLoginpage'; // Pastikan ini alias dari useUserAccount.js


const LoginPage = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  } = useLoginpage();

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo dan Judul */}
        <div className="text-center mb-6">
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2909/2909763.png"
              alt="Logo Toko Pupuk"
              className="w-16 h-16 mx-auto mb-2"
            />
          </Link>
          <h1 className="text-2xl font-bold text-green-600">Login Toko Pupuk</h1>
        </div>

        {/* Form Login */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email atau Username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Masuk
          </button>
        </form>

        {/* Navigasi Tambahan */}
        <div className="mt-4 text-sm text-center text-gray-600">
          <Link to="/lupa-password" className="text-green-600 hover:underline">
            Lupa password?
          </Link>
        </div>
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
