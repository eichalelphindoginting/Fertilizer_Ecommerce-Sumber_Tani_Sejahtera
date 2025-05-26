import React from 'react';
import { Link } from 'react-router-dom';
import useRegisterPage from '../Hooks/UseRegisterPage'; // Buat hook ini seperti useLoginpage

const RegisterPage = () => {
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
  } = useRegisterPage();

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
          <h1 className="text-2xl font-bold text-green-600">Daftar Toko Pupuk</h1>
        </div>

        {/* Form Register */}
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Daftar
          </button>
        </form>

        {/* Navigasi Tambahan */}
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
