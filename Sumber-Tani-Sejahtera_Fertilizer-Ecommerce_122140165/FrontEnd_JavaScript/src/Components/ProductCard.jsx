// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Impor Link
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart(); // Ambil 'cart' juga untuk cek item

  if (!product || typeof product !== 'object') {
    console.error("ProductCard menerima prop product yang tidak valid:", product);
    return ( // Berikan fallback UI minimal jika produk tidak valid di production
      <div className="border rounded-lg p-4 text-center text-red-500">
        Data produk tidak valid.
      </div>
    );
  }

  const productId = product.id;
  const productNameForDisplay = (typeof product.name === 'string' && product.name.trim() !== '')
                                ? product.name
                                : "Nama Produk Tidak Tersedia";
  const productDescriptionForDisplay = (typeof product.description === 'string' && product.description.trim() !== '')
                                      ? product.description
                                      : "Deskripsi tidak tersedia.";
  const hargaNumber = (typeof product.price === 'number' && !isNaN(product.price)) 
                        ? product.price 
                        : 0;
  const formattedHarga = `Rp${hargaNumber.toLocaleString('id-ID')}`;
  const productStock = (typeof product.stock === 'number' && !isNaN(product.stock)) 
                        ? product.stock 
                        : 0;
  const imageUrlForDisplay = (typeof product.image_url === 'string' && product.image_url.trim() !== '')
                              ? product.image_url
                              : 'https://via.placeholder.com/300x200.png?text=No+Image';

  const productForCart = {
    id: productId,
    nama: productNameForDisplay,
    // deskripsi: productDescriptionForDisplay, // Deskripsi biasanya tidak perlu di cart object
    harga: hargaNumber,
    gambar: imageUrlForDisplay,
    // stock: productStock, // Stock juga biasanya tidak disimpan di cart, tapi diambil dari data produk asli
  };

  const itemInCart = cart.find(item => item.id === productId);

  // Menentukan status stok dan warna teksnya
  let stockStatusText;
  let stockTextColorClass;
  if (productStock > 10) {
    stockStatusText = "Stok Melimpah";
    stockTextColorClass = "text-green-600";
  } else if (productStock > 0 && productStock <= 10) {
    stockStatusText = `Stok Terbatas (${productStock})`;
    stockTextColorClass = "text-orange-500";
  } else {
    stockStatusText = "Stok Habis";
    stockTextColorClass = "text-red-600";
  }

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 overflow-hidden">
      <Link to={`/product/${productId}`} className="block relative aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
        {/* Gunakan plugin aspect-ratio jika tersedia, atau atur h-X untuk tinggi tetap */}
        {/* aspect-w-1 aspect-h-1 akan membuat gambar persegi */}
        <img
          src={imageUrlForDisplay}
          alt={productNameForDisplay}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/300x200.png?text=Error'; }}
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow"> {/* flex-grow agar konten ini mengisi ruang dan tombol terdorong ke bawah */}
        <Link to={`/product/${productId}`} className="block mb-1">
          <h2 
            className="text-base font-semibold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2" 
            title={productNameForDisplay} // Tooltip untuk nama lengkap jika terpotong
            style={{ minHeight: '2.5rem' }} // Untuk 2 baris teks (1rem line-height * 2 + sedikit spasi)
          >
            {productNameForDisplay}
          </h2>
        </Link>

        {/* Deskripsi bisa diaktifkan jika perlu, dengan line-clamp */}
        <p 
            className="text-xs text-gray-500 mb-2 line-clamp-3"
            style={{ minHeight: '2.25rem' }} // Untuk 3 baris teks (0.75rem line-height * 3)
        >
          {productDescriptionForDisplay}
        </p>
        
        <p className={`text-xs font-medium mt-1 mb-3 ${stockTextColorClass}`}>
          {stockStatusText}
        </p>

        {/* mt-auto akan mendorong harga dan tombol ke bawah jika deskripsi pendek */}
        <p className="text-green-700 font-bold text-lg mt-auto pt-2"> 
          {formattedHarga}
        </p>
      </div>

      <div className="p-4 pt-0 mt-auto"> {/* Padding terpisah untuk tombol agar selalu di bawah */}
        <button
          onClick={() => addToCart(productForCart)}
          disabled={productStock === 0}
          className={`w-full text-sm font-medium py-2.5 px-4 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
            ${productStock === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500'
            }`}
        >
          {productStock === 0 ? 'Stok Habis' : (itemInCart ? `Tambah Lagi (${itemInCart.jumlah})` : 'Tambah ke Keranjang')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;