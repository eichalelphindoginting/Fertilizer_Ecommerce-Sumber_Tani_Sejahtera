import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Konversi harga "Rp25.000" ke angka 25000
  const hargaNumber = Number(product.harga.replace(/[^\d]/g, ''));
  const formattedHarga = `Rp${hargaNumber.toLocaleString('id-ID')}`;

  const productWithHarga = {
    ...product,
    harga: hargaNumber,
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center">
      <img
        src={product.gambar}
        alt={product.nama}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h2 className="text-lg font-bold text-center mb-2">{product.nama}</h2>
      <p className="text-sm text-gray-600 text-center mb-3">{product.deskripsi}</p>
      <p className="text-green-700 font-semibold text-base mb-4">{formattedHarga}</p>
      <button
        onClick={() => addToCart(productWithHarga)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
};

export default ProductCard;
