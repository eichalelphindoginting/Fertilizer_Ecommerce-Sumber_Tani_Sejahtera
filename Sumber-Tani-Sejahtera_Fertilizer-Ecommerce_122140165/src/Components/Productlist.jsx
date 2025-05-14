import React from 'react';
import { Link } from 'react-router-dom';

const produk = [
  {
    id: 1,
    nama: 'Pupuk Organik Cair',
    deskripsi: 'Meningkatkan kesuburan tanah dan ramah lingkungan.',
    harga: 'Rp25.000',
    gambar: 'https://via.placeholder.com/200x150?text=Organik+Cair',
  },
  {
    id: 2,
    nama: 'Pupuk NPK Mutiara',
    deskripsi: 'Pupuk majemuk lengkap untuk semua jenis tanaman.',
    harga: 'Rp45.000',
    gambar: 'https://via.placeholder.com/200x150?text=NPK+Mutiara',
  },
  {
    id: 3,
    nama: 'Pupuk Kompos',
    deskripsi: 'Pupuk padat alami dari limbah organik.',
    harga: 'Rp15.000',
    gambar: 'https://via.placeholder.com/200x150?text=Kompos',
  },
  {
    id: 4,
    nama: 'Pupuk Urea',
    deskripsi: 'Mengandung nitrogen tinggi untuk pertumbuhan daun.',
    harga: 'Rp30.000',
    gambar: 'https://via.placeholder.com/200x150?text=Urea',
  },
];

const ProductList = () => {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-6">
      {/* Logo dan link ke homepage */}
      <div className="mb-6">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2909/2909763.png"
            alt="Logo Toko Pupuk"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-green-700">Toko Pupuk</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        Daftar Produk Toko Pupuk
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produk.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={item.gambar}
              alt={item.nama}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-4">{item.nama}</h2>
            <p className="text-sm text-gray-600 mt-1">{item.deskripsi}</p>
            <p className="text-green-700 font-semibold mt-2">{item.harga}</p>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
