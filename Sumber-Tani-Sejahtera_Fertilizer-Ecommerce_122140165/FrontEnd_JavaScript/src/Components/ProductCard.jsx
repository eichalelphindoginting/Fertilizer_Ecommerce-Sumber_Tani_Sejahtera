// src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext'; // Pastikan path ini benar

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // 1. Pemeriksaan awal untuk prop 'product'
  if (!product || typeof product !== 'object') {
    console.error("ProductCard menerima prop product yang tidak valid:", product);
    return null; 
  }

  // 2. Pendefinisian eksplisit untuk setiap field dari tabel 'product' backend.
  //    Pola: Ambil data mentah -> validasi/format/fallback -> variabel siap pakai.

  // Untuk ID PRODUK (Kolom: id - Tipe: Integer)
  // Biasanya tidak ditampilkan langsung, tapi penting untuk 'key' dan data.
  const productId = product.id; // Data 'id' mentah dari backend. Diasumsikan selalu ada jika produk valid.

  // Untuk NAMA PRODUK (Kolom: name - Tipe: String)
  const rawProductName = product.name; // Data 'name' mentah dari backend
  // Definisi untuk tampilan: pastikan string, jika tidak atau kosong, gunakan fallback.
  const productNameForDisplay = (typeof rawProductName === 'string' && rawProductName.trim() !== '')
                              ? rawProductName
                              : "Nama Produk Tidak Tersedia";

  // Untuk DESKRIPSI PRODUK (Kolom: description - Tipe: Text/String)
  const rawProductDescription = product.description; // Data 'description' mentah dari backend
  // Definisi untuk tampilan: pastikan string, jika tidak atau kosong, gunakan fallback.
  const productDescriptionForDisplay = (typeof rawProductDescription === 'string' && rawProductDescription.trim() !== '')
                                   ? rawProductDescription
                                   : "Deskripsi tidak tersedia.";

  // Untuk HARGA PRODUK (Kolom: price - Tipe: Integer)
  const rawPrice = product.price; // Data 'price' mentah dari backend
  // Validasi: pastikan harga adalah angka, jika tidak atau tidak valid, gunakan 0.
  const hargaNumber = (typeof rawPrice === 'number' && !isNaN(rawPrice)) 
                      ? rawPrice 
                      : 0;
  // Format harga untuk tampilan dengan format mata uang Indonesia.
  const formattedHarga = `Rp${hargaNumber.toLocaleString('id-ID')}`;

  // Untuk STOK PRODUK (Kolom: stock - Tipe: Integer)
  const rawStock = product.stock; // Data 'stock' mentah dari backend
  // Validasi: pastikan stok adalah angka, jika tidak atau tidak valid, gunakan 0.
  const productStock = (typeof rawStock === 'number' && !isNaN(rawStock)) 
                       ? rawStock 
                       : 0;

  // Untuk URL GAMBAR PRODUK (Kolom: image_url - Tipe: String)
  const rawImageUrl = product.image_url; // Data 'image_url' mentah dari backend
  // Definisi untuk tampilan: pastikan string, jika tidak atau kosong, gunakan fallback.
  const imageUrlForDisplay = (typeof rawImageUrl === 'string' && rawImageUrl.trim() !== '')
                           ? rawImageUrl
                           : 'https://via.placeholder.com/150';

  // 3. Objek produk yang akan ditambahkan ke keranjang
  //    Menggunakan variabel yang sudah divalidasi dan memiliki fallback.
  const productForCart = {
    id: productId,
    nama: productNameForDisplay,
    deskripsi: productDescriptionForDisplay,
    harga: hargaNumber, // Harga sebagai angka (sudah divalidasi)
    gambar: imageUrlForDisplay,
    stock: productStock, // Stok sebagai angka (sudah divalidasi)
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center">
      <img
        src={imageUrlForDisplay}
        alt={productNameForDisplay}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h2 className="text-lg font-bold text-center mb-2 h-12 overflow-hidden">
        {productNameForDisplay}
      </h2>
      <p className="text-sm text-gray-600 text-center mb-3 h-16 overflow-hidden">
        {productDescriptionForDisplay}
      </p>
      <p className="text-green-700 font-semibold text-base mb-4">
        {formattedHarga}
      </p>
      {/* Anda bisa juga menampilkan stok jika diinginkan, contoh:
      <p className="text-sm text-gray-500 text-center mb-3">
        Stok: {productStock}
      </p>
      */}
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