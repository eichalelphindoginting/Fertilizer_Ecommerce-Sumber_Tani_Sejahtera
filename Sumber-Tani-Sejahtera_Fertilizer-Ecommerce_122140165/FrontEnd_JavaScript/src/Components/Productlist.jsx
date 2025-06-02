// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Tambahkan Link
import ProductCard from './ProductCard';
import axios from 'axios';

// Ikon untuk state (opsional, bisa diganti dengan SVG inline atau library)
const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4"></div>
    <p className="text-xl text-gray-600">Memuat produk...</p>
    <p className="text-sm text-gray-500">Mohon tunggu sebentar.</p>
  </div>
);

const ErrorDisplay = ({ message, onRetry }) => (
  <div className="text-center py-20 max-w-lg mx-auto bg-red-50 border border-red-200 p-8 rounded-xl shadow-lg">
    <svg className="mx-auto h-16 w-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
    <h2 className="mt-2 text-2xl font-semibold text-red-700">Oops! Terjadi Kesalahan</h2>
    <p className="mt-2 text-red-600">{message}</p>
    <button
      onClick={onRetry}
      className="mt-8 px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-150"
    >
      Coba Lagi
    </button>
  </div>
);

const NoProductsFound = ({ keyword }) => (
  <div className="text-center py-20 max-w-lg mx-auto bg-yellow-50 border border-yellow-200 p-8 rounded-xl shadow-lg">
    <svg className="mx-auto h-16 w-16 text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
    </svg>
    <h2 className="mt-2 text-2xl font-semibold text-yellow-700">
      {keyword ? `Produk Tidak Ditemukan` : 'Belum Ada Produk'}
    </h2>
    <p className="mt-2 text-yellow-600">
      {keyword 
        ? `Kami tidak dapat menemukan produk dengan kata kunci "${keyword}". Coba gunakan kata kunci yang lebih umum atau periksa ejaan.` 
        : 'Saat ini belum ada produk yang tersedia di toko kami. Silakan kunjungi kembali nanti.'
      }
    </p>
    {keyword && (
      <Link 
        to="/ProductList" // Menghapus query pencarian
        className="mt-8 inline-block px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-150"
      >
        Lihat Semua Produk
      </Link>
    )}
  </div>
);


const ProductList = () => {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  
  // Fungsi untuk mengambil ulang data produk
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://127.0.0.1:6543/api/products'); // URL API Anda
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        const productsFromApi = response.data.data.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: Number(p.price) || 0, // Pastikan harga adalah angka
          image_url: p.image_url,
          category_name: p.category_name,
          stock: Number(p.stock) || 0 // Pastikan stok adalah angka
        }));
        setApiProducts(productsFromApi);
      } else {
        setError(response.data?.message || 'Gagal mengambil data produk dari API dengan format yang benar.');
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      let errorMessage = 'Terjadi kesalahan saat menghubungi server.';
      if (err.response) {
        errorMessage = `Error ${err.response.status}: ${err.response.data?.message || err.message}`;
      } else if (err.request) {
        errorMessage = 'Tidak ada respons dari server. Periksa koneksi Anda atau pastikan server berjalan.';
      } else {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Hanya fetch sekali saat komponen dimuat pertama kali

  // Mendapatkan keyword pencarian setiap kali lokasi berubah
  const query = new URLSearchParams(location.search);
  const keyword = query.get('search')?.toLowerCase() || '';

  const filteredProducts = apiProducts.filter((item) =>
    item.name.toLowerCase().includes(keyword) ||
    (item.description && item.description.toLowerCase().includes(keyword)) || // Opsional: cari di deskripsi juga
    (item.category_name && item.category_name.toLowerCase().includes(keyword)) // Opsional: cari di kategori juga
  );

  if (loading) {
    return <div className="pt-24"><LoadingSpinner /></div>; // pt-24 untuk navbar fixed
  }

  if (error) {
    return <div className="pt-24"><ErrorDisplay message={error} onRetry={fetchProducts} /></div>;
  }

  return (
    <div className="min-h-screen bg-green-50 py-12 md:py-16 lg:py-20"> {/* Adjusted padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16"> {/* pt-16 untuk spacer dari navbar fixed */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-700">
            {keyword ? `Hasil Pencarian untuk "${keyword}"` : 'Semua Produk Pupuk Kami'}
          </h1>
          {!keyword && <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Temukan pupuk berkualitas tinggi untuk segala kebutuhan pertanian Anda.</p>}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <NoProductsFound keyword={keyword} />
        )}
      </div>
    </div>
  );
};

export default ProductList;