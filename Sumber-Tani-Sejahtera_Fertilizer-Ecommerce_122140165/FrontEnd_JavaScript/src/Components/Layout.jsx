// src/components/Layout.jsx
import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom'; // Outlet untuk merender child routes
import { useAuth } from '../context/AuthContext'; // Asumsi path AuthContext benar

// Impor Navbar Anda di sini
// import Navbar from './Navbar'; 

// Ikon-ikon untuk Sidebar (sama seperti yang didefinisikan di Homepage sebelumnya)
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>;
const CubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
const ArchiveBoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.001c0 .621.504 1.125 1.125 1.125z" /></svg>;
const InformationCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>;
const EnvelopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;


const Layout = ({ children }) => { // Terima children untuk merender konten halaman
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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

  const sidebarWidthClass = 'w-64'; 
  const sidebarToggleLeftOpen = 'left-64'; 

  return (
    <div className="relative min-h-screen">
      {/* Ganti dengan komponen Navbar Anda yang sudah ada */}
      {/* <Navbar /> */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-3 h-20">
         {/* Ini adalah placeholder Navbar, ganti dengan komponen Navbar Anda */}
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
            <Link to="/" className="text-xl font-bold text-green-600">Sumber Tani Sejahtera</Link>
            {/* Item Navbar lainnya mungkin ada di sini */}
        </div>
      </header>


      {/* --- Tombol Sidebar Toggle --- */}
      <div
        className={`fixed top-24 z-[60] transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? sidebarToggleLeftOpen : 'left-0' }`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
          className="bg-white shadow-lg rounded-r-full p-3 text-gray-700 hover:bg-green-50 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-150"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* --- Overlay --- */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 transition-opacity duration-300" 
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed top-0 left-0 h-full ${sidebarWidthClass} bg-gradient-to-b from-green-600 to-green-700 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end px-6 py-5 border-b border-green-500">
          {/* "Sumber Tani" di header sidebar dihilangkan sesuai permintaan */}
          {/* Anda bisa menambahkan logo kecil di sini jika mau */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="p-1 rounded-full hover:bg-green-500 transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { to: "/", label: "Beranda", icon: <HomeIcon />, type: "Link" },
            { to: "/ProductList", label: "Produk", icon: <CubeIcon />, type: "Protected" },
            { to: "/Tracking", label: "Paket Saya", icon: <ArchiveBoxIcon />, type: "Protected" },
            { to: "/About", label: "Tentang Kami", icon: <InformationCircleIcon />, type: "Link" },
            { to: "/Contact", label: "Kontak", icon: <EnvelopeIcon />, type: "Link" },
          ].map((item) => (
            item.type === "Link" ? (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)} 
                className="flex items-center space-x-3 px-4 py-2.5 rounded-md text-green-100 hover:bg-green-500 hover:text-white transition-all duration-150 group"
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.to} // Tetap href karena ini onClick
                onClick={(e) => {
                  handleProtectedLinkClick(e, item.to);
                  setIsSidebarOpen(false); 
                }}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-md text-green-100 hover:bg-green-500 hover:text-white transition-all duration-150 group cursor-pointer"
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            )
          ))}
        </nav>
        <div className="p-6 mt-auto text-xs text-green-300 border-t border-green-500">
            <p>&copy; {new Date().getFullYear()} Sumber Tani Sejahtera</p>
        </div>
      </aside>

      {/* Konten Utama Halaman */}
      <main className={`transition-all duration-300 ease-in-out `}> 
        {/* Jika sidebar model "push", tambahkan margin-left di sini saat isSidebarOpen true */}
        {/* Contoh: ml-0 lg: ${isSidebarOpen ? sidebarWidthClass : 'ml-0'}` */}
        {/* Untuk model overlay, tidak perlu margin, tapi pastikan konten tidak tertutup sidebar di beberapa kasus */}
        {children}
      </main>
    </div>
  );
};

export default Layout;