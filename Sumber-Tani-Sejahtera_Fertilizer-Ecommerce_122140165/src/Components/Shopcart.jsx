import React from 'react';
import { Link } from 'react-router-dom';

const dummyCart = [
  {
    id: 1,
    nama: 'Pupuk Organik Cair',
    harga: 25000,
    jumlah: 2,
    gambar: 'https://via.placeholder.com/150x100?text=Organik+Cair',
  },
  {
    id: 2,
    nama: 'Pupuk NPK Mutiara',
    harga: 45000,
    jumlah: 1,
    gambar: 'https://via.placeholder.com/150x100?text=NPK+Mutiara',
  },
];

const ShopCart = () => {
  const totalHarga = dummyCart.reduce((total, item) => total + item.harga * item.jumlah, 0);

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Keranjang Belanja</h1>

      {dummyCart.length === 0 ? (
        <div className="text-center text-gray-600">Keranjang kamu kosong</div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
          {dummyCart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b py-4">
              <img src={item.gambar} alt={item.nama} className="w-24 h-16 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.nama}</h2>
                <p className="text-sm text-gray-500">Harga: Rp{item.harga.toLocaleString()}</p>
                <p className="text-sm">Jumlah: {item.jumlah}</p>
              </div>
              <p className="font-semibold text-green-700">
                Rp{(item.harga * item.jumlah).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold text-green-700">Total: Rp{totalHarga.toLocaleString()}</h2>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
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
