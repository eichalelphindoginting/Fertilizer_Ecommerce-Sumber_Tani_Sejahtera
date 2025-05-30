// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios'; // Pastikan axios sudah terinstal (npm install axios)

const ProductList = () => {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://127.0.0.1:6543/api/products'); // URL API Anda
        console.log("API Response:", response.data)
        if (response.data && response.data.success) {
          const productsFromApi = response.data.data.map(p => ({
            id: p.id,
            nama: p.name, // Sesuaikan dengan 'nama' jika ProductCard masih menggunakan itu
            deskripsi: p.description, // Sesuaikan dengan 'deskripsi'
            price: p.price, // API mengirim 'price' sebagai angka
            image_url: p.image_url, // API mengirim 'image_url'
            category_name: p.category_name,
            stock: p.stock
            // Jika ProductCard sudah diubah untuk menggunakan field API langsung (price, image_url),
            // maka mapping ini mungkin tidak serumit ini atau bahkan tidak perlu.
          }));
          setApiProducts(productsFromApi);
        } else {
          setError(response.data.message || 'Gagal mengambil data produk dari API.');
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Terjadi kesalahan saat menghubungi server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Hanya fetch sekali saat komponen dimuat

  const filteredProducts = apiProducts.filter((item) =>
    item.nama.toLowerCase().includes(keyword)
  );

  if (loading) {
    return <p className="text-center text-gray-500 text-lg py-20">Memuat produk...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg py-20">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-green-50 py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-green-700 text-center mb-10">
          {keyword ? `Hasil Pencarian: "${keyword}"` : 'Daftar Produk Pupuk Kami'}
        </h1>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            {keyword ? `Produk dengan kata kunci "${keyword}" tidak ditemukan.` : 'Belum ada produk yang tersedia.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;