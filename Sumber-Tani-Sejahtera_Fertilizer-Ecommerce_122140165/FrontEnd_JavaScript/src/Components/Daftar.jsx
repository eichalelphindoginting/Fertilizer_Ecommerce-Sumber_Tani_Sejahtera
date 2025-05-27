// src/Components/Daftar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRegisterPage from '../Hooks/UseRegisterPage';
import { useAuth } from '../context/AuthContext'; // 👈 Impor useAuth

const RegisterPage = () => {
  const { registerSuccessCallback } = useAuth(); // 👈 Ambil callback dari AuthContext
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
  } = useRegisterPage(registerSuccessCallback); // 👈 Berikan callback ke custom hook

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
         {/* ... logo dan judul ... */}
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">Daftar Akun Baru</h1>
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* ... input fields ... */}
           <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Konfirmasi Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Daftar
          </button>
        </form>
         {/* ... navigasi tambahan ... */}
        <div className="mt-4 text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/loginpage" className="text-green-600 hover:underline">
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;