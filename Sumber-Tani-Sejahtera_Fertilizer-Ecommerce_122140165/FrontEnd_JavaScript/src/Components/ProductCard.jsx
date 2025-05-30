// src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext'; // Asumsi path ini benar

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // API mengirimkan 'price' sebagai angka. 'product.price' di sini adalah angka.
  // 'product.image_url' dari API, sebelumnya 'product.gambar'
  const hargaNumber = product.price || 0; // Langsung gunakan product.price jika sudah angka
  const formattedHarga = `Rp${hargaNumber.toLocaleString('id-ID')}`;

  // Menyesuaikan objek produk yang dikirim ke keranjang agar memiliki field 'harga' sebagai angka
  // jika CartContext mengharapkan field 'harga'.
  const productForCart = {
    ...product, // Sebarkan semua properti produk dari API
    id: product.id,
    nama: product.name,
    deskripsi: product.description,
    harga: hargaNumber, // Pastikan field ini 'harga' jika CartContext membutuhkannya
    gambar: product.image_url, // Jika CartContext masih mengharapkan 'gambar'
    // Atau, jika CartContext bisa langsung menggunakan 'price' dan 'image_url',
    // Anda mungkin tidak perlu membuat productForCart atau cukup sebarkan product.
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center">
      <img
        src={product.image_url || 'https://via.placeholder.com/150'} // Fallback jika image_url tidak ada
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h2 className="text-lg font-bold text-center mb-2">{product.name}</h2>
      <p className="text-sm text-gray-600 text-center mb-3 h-16 overflow-hidden"> {/* Batasi tinggi deskripsi */}
        {product.description || 'Tidak ada deskripsi.'}
      </p>
      <p className="text-green-700 font-semibold text-base mb-4">{formattedHarga}</p>
      <button
        onClick={() => addToCart(productForCart)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
};

export default ProductCard;