import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ShopCart = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();

  const totalHarga = cart.reduce((total, item) => total + item.harga * item.jumlah, 0);

  const handleCheckout = () => {
    alert("Terima kasih sudah belanja! Pesanan kamu sedang diproses.");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-green-50 py-18 px-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">Keranjang kamu kosong</div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b py-4">
              <img src={item.gambar} alt={item.nama} className="w-24 h-16 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.nama}</h2>
                <p className="text-sm text-gray-500">Harga: Rp{item.harga.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-2 rounded">
                    -
                  </button>
                  <span>{item.jumlah}</span>
                  <button onClick={() => addToCart(item)} className="bg-green-500 text-white px-2 rounded">
                    +
                  </button>
                </div>
              </div>
              <p className="font-semibold text-green-700">
                Rp{(item.harga * item.jumlah).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold text-green-700">Total: Rp{totalHarga.toLocaleString()}</h2>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/ProductList" className="text-green-600 hover:underline">
          &larr; Lanjut Belanja
        </Link>
      </div>
    </div>
  );
};

export default ShopCart;
