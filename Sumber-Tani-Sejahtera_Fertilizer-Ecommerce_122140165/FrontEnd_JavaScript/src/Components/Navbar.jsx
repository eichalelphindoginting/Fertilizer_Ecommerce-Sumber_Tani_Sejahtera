// src/Components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.jumlah, 0);
  const { isAuthenticated, currentUser, logout, isLoadingAuth } = useAuth();

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      navigate(`/ProductList?search=${encodeURIComponent(keyword.trim())}`);
      setKeyword("");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert("Anda harus login terlebih dahulu untuk melihat keranjang belanja.");
      navigate('/loginpage');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-green-600">
          <Link to="/">Sumber Tani Sejahtera</Link>
        </div>

        <div className="flex-1 mx-4 hidden md:flex justify-center items-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari produk kesayangan Anda..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 text-sm font-medium text-gray-700">
          <Link
            to="/ShopCart"
            onClick={handleCartClick}
            className="relative flex items-center p-2 hover:bg-gray-100 rounded-full group transition-colors duration-150"
          >
            {/* === LOGO CART BARU === */}
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-green-600 transition-colors duration-150"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            {/* === AKHIR LOGO CART BARU === */}
            {isAuthenticated && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
            {/* Nama "Keranjang" tetap ada via teks "Cart" */}
            <span className="ml-2 hidden sm:inline group-hover:text-green-600 transition-colors duration-150">
              Cart
            </span>
          </Link>

          {isLoadingAuth ? (
            <div className="px-3 py-1.5">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
            </div>
          ) : isAuthenticated && currentUser ? (
            <>
              <span className="hover:text-green-600 hidden sm:inline whitespace-nowrap">
                Halo, {currentUser.username || currentUser.name}!
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white active:bg-red-600 active:text-white transition-colors duration-150 text-xs sm:text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* === TOMBOL LOGIN DENGAN EFEK ACTIVE === */}
              <Link
                to="/loginpage"
                className="px-4 py-1.5 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white active:bg-green-700 active:text-white active:border-green-700 transition-all duration-150 text-xs sm:text-sm"
              >
                Login
              </Link>
              {/* === AKHIR TOMBOL LOGIN === */}

              {/* === TOMBOL DAFTAR DENGAN EFEK ACTIVE === */}
              <Link
                to="/DaftarPage"
                className="px-4 py-1.5 bg-green-600 text-white border border-green-600 rounded-full hover:bg-green-700 hover:border-green-700 active:bg-white active:text-green-600 active:border-green-600 transition-all duration-150 text-xs sm:text-sm"
              >
                Daftar
              </Link>
              {/* === AKHIR TOMBOL DAFTAR === */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;