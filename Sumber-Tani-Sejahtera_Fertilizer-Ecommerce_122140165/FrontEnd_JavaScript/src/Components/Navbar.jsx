// src/Components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Impor useAuth

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.jumlah, 0);
  const { isAuthenticated, currentUser, logout, isLoadingAuth } = useAuth(); // Ambil status dari AuthContext

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      navigate(`/ProductList?search=${encodeURIComponent(keyword.trim())}`);
      setKeyword(""); 
    }
  };

  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari AuthContext (sudah menangani navigasi)
  };

  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); 
      alert("Anda harus login terlebih dahulu untuk melihat keranjang belanja.");
      navigate('/loginpage'); // Arahkan ke halaman login jika belum login
    }
    // Jika sudah login, Link akan bekerja secara normal mengarahkan ke /ShopCart
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-green-600">
          <Link to="/">Sumber Tani Sejahtera</Link>
        </div>

        <div className="flex-1 mx-4 hidden md:flex justify-center">
          <div className="flex items-center gap-2 w-full max-w-md">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15z" />
            </svg>
            <input
              type="text"
              placeholder="Cari produk..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              className="flex-grow bg-transparent border-b border-gray-300 text-sm text-gray-700 placeholder-gray-500 outline-none focus:border-green-500 transition"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm font-medium text-gray-700">
          <Link to="/ShopCart" onClick={handleCartClick} className="relative flex items-center hover:text-green-600"> {/* */}
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
              </svg>
              {isAuthenticated && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="ml-1">Cart</span>
          </Link>

          {isLoadingAuth ? (
            <div>Memuat...</div>
          ) : isAuthenticated && currentUser ? (
            <>
              <span className="hover:text-green-600 hidden sm:inline">
                Halo, {currentUser.username || currentUser.name}! {/* */}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/loginpage" className="px-3 py-1 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition">
                Login
              </Link>
              <Link to="/DaftarPage" className="px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;