import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';

const produk = [
  {
    id: 1,
    nama: 'Pupuk Organik Cair',
    deskripsi: 'Meningkatkan kesuburan tanah dan ramah lingkungan.',
    harga: 'Rp25.000',
    gambar: 'https://gdm.id/wp-content/uploads/2024/08/POC-buah-1lt.webp',
  },
  {
    id: 2,
    nama: 'Pupuk NPK Mutiara',
    deskripsi: 'Pupuk majemuk lengkap untuk semua jenis tanaman.',
    harga: 'Rp45.000',
    gambar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQBiMiZoOLxqNQy5ateApcQA7um9MZSIPJw&s',
  },
  {
    id: 3,
    nama: 'Pupuk Kompos',
    deskripsi: 'Pupuk padat alami dari limbah organik.',
    harga: 'Rp15.000',
    gambar: 'https://yuknanam.com/wp-content/uploads/2020/11/pupuk-kompos.jpg',
  },
  {
    id: 4,
    nama: 'Pupuk Urea',
    deskripsi: 'Mengandung nitrogen tinggi untuk pertumbuhan daun.',
    harga: 'Rp30.000',
    gambar: 'https://www.petrosida-gresik.com/sites/default/files/urea%20subsidi_0.jpg',
  },
];

const ProductList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('search')?.toLowerCase() || '';

  const filteredProducts = produk.filter((item) =>
    item.nama.toLowerCase().includes(keyword)
  );

  return (
    <div className="min-h-screen bg-green-50 py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-green-700 text-center mb-10">
          {keyword ? `Hasil Pencarian: "${keyword}"` : 'Daftar Produk Toko Pupuk'}
        </h1>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
