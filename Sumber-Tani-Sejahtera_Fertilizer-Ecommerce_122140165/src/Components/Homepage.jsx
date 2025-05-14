import { useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">

      {/* Navbar ala Bite */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b shadow-sm flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">
          TokoPupuk
        </div>

        {/* Menu Navigasi */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
        
        </nav>
        {/* Menu Navigasi */}
        <div className="flex-1 mx-6 md:block">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm w-full max-w-xl mx-auto">
  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15z" />
  </svg>
        {/* Inputan */}
        <input
    type="text"
    placeholder="Cari produk..."
    className="flex-grow outline-none focus:outline-none bg-transparent text-gray-700"
  />
</div>
        </div>
        {/* Ikon Kanan */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <Link to="/ShopCart" className="flex items-center text-gray-700 hover:text-green-600">
            <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
            </svg>
            Cart
          </Link>

          {/* Akun */}
         <Link to="/Loginpage" className="flex items-center text-gray-700 hover:text-green-600">
  <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
  </svg>
  My Account
</Link>
        </div>
      </header>

      {/* Tombol Sidebar */}
      <div
        className={`fixed top-25 left-0 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-64' : 'translate-x-0'
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white shadow-md rounded-r-full p-2 text-gray-800 hover:text-green-600"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-white/10 z-30"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-10 py-7 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-2 text-gray-700">
          <Link to="/" className="hover:bg-gray-100 px-3 py-2 rounded">Beranda</Link>
          <Link to="/ProductList" className="hover:bg-gray-100 px-3 py-2 rounded">Produk</Link>
          <Link to="/tentang" className="hover:bg-gray-100 px-3 py-2 rounded">Tentang</Link>
          <Link to="/kontak" className="hover:bg-gray-100 px-3 py-2 rounded">Kontak</Link>
        </nav>
      </div>

      {/* Spacer karena navbar fixed */}
      <div className="h-40"></div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-300 to-green-500 text-white text-center py-20 rounded-b-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Selamat Datang di Toko Pupuk</h1>
        <p className="text-lg mb-6">Temukan berbagai jenis pupuk berkualitas untuk pertanian Anda</p>
        <Link to="/" className="bg-white text-green-600 px-6 py-2 rounded-full shadow hover:bg-gray-200">
          Lihat Produk
        </Link>
      </div>

      {/* Produk Unggulan */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">Produk Unggulan</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[{
            nama: 'Pupuk Organik A',
            desc: 'Cocok untuk semua jenis tanaman. 100% alami.',
            img: 'https://via.placeholder.com/150',
          }, {
            nama: 'Pupuk Cair B',
            desc: 'Mudah diserap tanaman dan ramah lingkungan.',
            img: 'https://via.placeholder.com/150',
          }, {
            nama: 'Pupuk NPK C',
            desc: 'Meningkatkan hasil panen secara signifikan.',
            img: 'https://via.placeholder.com/150',
          }].map((produk, i) => (
            <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <img src={produk.img} alt={produk.nama} className="w-full h-32 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{produk.nama}</h3>
              <p className="text-sm mb-4">{produk.desc}</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Beli Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
