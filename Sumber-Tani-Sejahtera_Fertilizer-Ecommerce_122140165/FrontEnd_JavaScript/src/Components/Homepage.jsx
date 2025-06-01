/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react'; // Hapus useEffect jika tidak ada lagi yang menggunakannya di sini
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import useHomepage from '../Hooks/useHomepage'; // Impor hook yang sudah dimodifikasi

// import ProductList from './Productlist'; // Tetap tidak digunakan untuk featured products di sini

const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Gunakan hook useHomepage
  const {
    // keyword, // uncomment jika ingin menggunakan search bar di homepage
    // handleSearchChange, // uncomment jika ingin menggunakan search bar di homepage
    // performSearch, // uncomment jika ingin menggunakan search bar di homepage
    featuredProducts,
    loading,
    error,
  } = useHomepage();

  const handleBuyNow = (produk) => {
    if (!isAuthenticated) {
      alert("Anda harus login terlebih dahulu untuk membeli produk.");
      navigate('/loginpage');
    } else {
      addToCart({
        id: produk.id, // Pastikan produk memiliki properti 'id'
        nama: produk.nama,
        harga: produk.harga,
        gambar: produk.img,
        quantity: 1 
      });
      navigate('/ShopCart');
    }
  };

  const handleProtectedLinkClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
      navigate('/loginpage');
    } else {
      if (path) {
        navigate(path);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Tombol Sidebar Toggle ... (kode sidebar tetap sama) ... */}
      <div
        className={`fixed top-24 z-50 transition-all duration-300 ${
          isSidebarOpen ? 'left-48' : 'left-0'
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white shadow-md rounded-r-full p-2 text-gray-800 hover:text-green-600 focus:outline-none"
        >
          {isSidebarOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M15 6l-6 6 6 6"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay ... (kode overlay tetap sama) ... */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 backdrop-blur-md bg-white/30 z-30 transition duration-300"
        />
      )}

      {/* Sidebar ... (kode sidebar tetap sama) ... */}
      <aside
        className={`fixed top-0 left-0 h-full w-48 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-green-600">Menu</h2>
        </div>
        <nav className="p-4 space-y-2 text-sm">
          <Link to="/" className="block px-4 py-2 rounded hover:bg-green-50 transition">Beranda</Link>
          <a 
            href="/ProductList" 
            onClick={(e) => handleProtectedLinkClick(e, '/ProductList')} 
            className="block px-4 py-2 rounded hover:bg-green-50 transition cursor-pointer"
          >
            Produk
          </a>
          <a 
            href="/Tracking" 
            onClick={(e) => handleProtectedLinkClick(e, '/Tracking')} 
            className="block px-4 py-2 rounded hover:bg-green-50 transition cursor-pointer"
          >
            Paket Saya
          </a>
          <Link to="/About" className="block px-4 py-2 rounded hover:bg-green-50 transition">Tentang</Link>
          <Link to="/Contact" className="block px-4 py-2 rounded hover:bg-green-50 transition">Kontak</Link>
        </nav>
      </aside>

      <div className="h-20" /> {/* Spacer untuk navbar fixed */}

      {/* Hero ... (kode hero tetap sama) ... */}
      <section className="bg-gradient-to-tr from-green-400 to-green-600 text-white py-24 px-6 text-center rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sumber Tani Sejahtera</h1>
        <p className="text-lg mb-6">Solusi Tepat Tanaman Anda</p>
        <Link
          to="/ProductList"
          onClick={(e) => {
              if (!isAuthenticated) {
                  e.preventDefault();
                  alert("Anda harus login terlebih dahulu untuk melihat produk.");
                  navigate('/loginpage');
              }
          }}
          className="bg-white text-green-600 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          Lihat Produk
        </Link>
      </section>

      {/* Info Section ... (kode info section tetap sama) ... */}
      <section className="py-16 px-6 bg-green-50 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Mengapa Memilih Pupuk Kami?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-md">
          Produk kami telah teruji secara ilmiah dan terbukti meningkatkan hasil pertanian secara
          signifikan. Dengan komposisi alami dan ramah lingkungan, pupuk kami membantu petani
          menjaga kualitas tanah jangka panjang.
        </p>
      </section>

      {/* Produk Unggulan */}
      <section className="py-16 px-6 bg-green-50">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-12">Produk Unggulan</h2>
        
        {/* Bagian Search Bar (Opsional, jika ingin digunakan) */}
        {/* <div className="mb-8 max-w-md mx-auto">
          <input 
            type="text"
            placeholder="Cari produk unggulan..."
            value={keyword}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          />
          <button 
            onClick={performSearch}
            className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Cari
          </button>
        </div>
        */}

        {loading && <p className="text-center">Memuat produk unggulan...</p>}
        {error && <p className="text-center text-red-500">Gagal memuat produk: {error}</p>}
        {!loading && !error && featuredProducts.length === 0 && (
          <p className="text-center text-gray-500">Saat ini belum ada produk unggulan.</p>
        )}
        {!loading && !error && featuredProducts.length > 0 && (
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-2">
            {featuredProducts.map((produk) => (
              <div
                key={produk.id} // Menggunakan produk.id dari API
                className="min-w-[280px] md:min-w-[320px] bg-white border rounded-2xl p-5 shadow hover:shadow-md transition-all duration-300 flex flex-col items-center"
              >
                <img
                  src={produk.img}
                  alt={produk.nama}
                  className="w-full h-52 object-contain rounded-md mb-4 bg-gray-100"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/300x200.png?text=Gambar+Error'; }}
                />
                <h3 className="text-lg font-bold text-center text-black mb-1">{produk.nama}</h3>
                <p className="text-green-600 font-semibold mb-1">
                  Rp{produk.harga.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-center text-gray-600 mb-4 h-16 overflow-hidden">{produk.desc}</p>
                <button
                  onClick={() => handleBuyNow(produk)}
                  className="bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-green-700 transition mt-auto"
                >
                  Beli Sekarang
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer ... (kode footer tetap sama) ... */}
      <footer className="bg-gray-50 mt-12 text-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-600">Sumber Tani Sejahtera</h3>
            <p className="text-sm">
              Solusi tepat untuk kebutuhan pertanian Anda. Kami menyediakan produk berkualitas
              untuk hasil panen yang melimpah.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Navigasi</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-green-600">Beranda</Link></li>
              <li>
                <a 
                  href="/ProductList" 
                  onClick={(e) => handleProtectedLinkClick(e, '/ProductList')} 
                  className="hover:text-green-600 cursor-pointer"
                >
                  Produk
                </a>
              </li>
              <li><Link to="/About" className="hover:text-green-600">Tentang</Link></li>
              <li><Link to="/Contact" className="hover:text-green-600">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kontak Kami</h4>
            <p className="text-sm">Jl. Pertanian No. 123, Bandung</p>
            <p className="text-sm">Email: info@sumbertani.com</p>
            <p className="text-sm">Telepon: (022) 123-4567</p>
          </div>
        </div>
        <div className="bg-white text-center text-sm text-gray-500 py-4 border-t">
          &copy; {new Date().getFullYear()} Sumber Tani Sejahtera. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Homepage;