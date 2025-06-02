// src/Components/ShopCart.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import { useCart } from '../context/CartContext';

// Contoh ikon sederhana (Anda bisa menggunakan library ikon seperti Heroicons atau FontAwesome)
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.576 0c1.135 0 2.27 0 3.408-.06A48.108 48.108 0 0112 5.397m0 0L12 5.397m0 0V4.057c0-.57.488-1.029 1.066-.969A18.314 18.314 0 0120.25 6.057m-8.25 0c-1.135 0-2.27 0-3.408.061a48.108 48.108 0 00-3.478.397m12.576 0L12 5.397" />
  </svg>
);


const ShopCart = () => {
  const { cart, removeFromCart, updateItemQuantity, clearCart, removeItemCompletely } = useCart(); // Asumsi ada updateItemQuantity dan removeItemCompletely
  const navigate = useNavigate(); // Untuk navigasi setelah checkout

  const [alamatPengiriman, setAlamatPengiriman] = useState({
    namaPenerima: '',
    noTelp: '',
    alamatLengkap: '',
    kota: '',
    kodePos: '',
  });
  const [metodePembayaran, setMetodePembayaran] = useState(''); // Misal: 'cod', 'transfer', 'kartu-kredit'

  const totalHarga = cart.reduce((total, item) => total + item.harga * item.jumlah, 0);
  // Simulasi ongkos kirim
  const ongkosKirim = totalHarga > 0 ? 15000 : 0;
  const totalKeseluruhan = totalHarga + ongkosKirim;


  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      // Jika jumlah jadi 0, pertimbangkan untuk menghapus item atau biarkan 1
      removeItemCompletely(item.id); // atau updateItemQuantity(item.id, 1);
    } else {
      updateItemQuantity(item.id, newQuantity);
    }
  };

  const handleAlamatChange = (e) => {
    const { name, value } = e.target;
    setAlamatPengiriman(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
        alert("Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.");
        return;
    }
    if (!metodePembayaran) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }
    if (Object.values(alamatPengiriman).some(field => field.trim() === '')) {
        alert("Mohon lengkapi alamat pengiriman Anda.");
        return;
    }

    // Logika checkout (misalnya mengirim data ke backend)
    console.log("Pesanan:", cart);
    console.log("Total Harga:", totalKeseluruhan);
    console.log("Alamat Pengiriman:", alamatPengiriman);
    console.log("Metode Pembayaran:", metodePembayaran);

    alert(`Terima kasih sudah belanja! Pesanan kamu dengan total Rp${totalKeseluruhan.toLocaleString('id-ID')} sedang diproses.`);
    clearCart();
    navigate('/'); // Arahkan ke homepage atau halaman status pesanan
  };

  return (
    <div className="min-h-screen bg-green-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8"> {/* pt-24 untuk memberi ruang dari navbar fixed */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">Keranjang Belanja Anda</h1>
          <p className="mt-2 text-lg text-gray-600">Periksa item Anda dan lanjutkan ke pembayaran.</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <svg className="mx-auto h-24 w-24 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="mt-6 text-2xl font-semibold text-gray-700">Keranjang Anda Kosong</h2>
            <p className="mt-2 text-gray-500">Sepertinya Anda belum menambahkan produk apapun.</p>
            <Link
              to="/ProductList"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Mulai Belanja Sekarang
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            {/* Daftar Item di Keranjang (Kolom Kiri) */}
            <section className="lg:col-span-7 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Item di Keranjang ({cart.length})</h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="flex py-6 space-x-6">
                    <img
                      src={item.gambar || 'https://via.placeholder.com/150?text=No+Image'}
                      alt={item.nama}
                      className="flex-none w-28 h-28 object-cover rounded-md bg-gray-100"
                      onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/150?text=Error'; }}
                    />
                    <div className="flex flex-col justify-between flex-auto">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 hover:text-green-600">
                          <Link to={`/products/${item.id}`}>{item.nama}</Link> {/* Arahkan ke detail produk jika ada */}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Harga Satuan: Rp{item.harga.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item, item.jumlah - 1)}
                            className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-l disabled:opacity-50"
                            disabled={item.jumlah <= 1}
                          >
                            &ndash;
                          </button>
                          <span className="px-4 py-1.5 text-sm text-gray-800 border-l border-r">{item.jumlah}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item, item.jumlah + 1)}
                            className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-r"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItemCompletely(item.id)} // Tombol hapus item
                          className="ml-4 text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
                        >
                          <TrashIcon /> <span className="ml-1">Hapus</span>
                        </button>
                      </div>
                    </div>
                     <p className="text-lg font-semibold text-green-700 whitespace-nowrap">
                        Rp{(item.harga * item.jumlah).toLocaleString('id-ID')}
                     </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Ringkasan Pesanan & Form (Kolom Kanan) */}
            <section className="lg:col-span-5 mt-10 lg:mt-0">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24"> {/* Sticky agar tetap terlihat saat scroll */}
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Ringkasan Pesanan</h2>
                
                {/* Alamat Pengiriman */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-800 mb-2">Alamat Pengiriman</h3>
                  <div className="space-y-3">
                    <input type="text" name="namaPenerima" placeholder="Nama Penerima" value={alamatPengiriman.namaPenerima} onChange={handleAlamatChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm" />
                    <input type="tel" name="noTelp" placeholder="Nomor Telepon" value={alamatPengiriman.noTelp} onChange={handleAlamatChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm" />
                    <textarea name="alamatLengkap" placeholder="Alamat Lengkap (Nama Jalan, RT/RW, Kelurahan, Kecamatan)" value={alamatPengiriman.alamatLengkap} onChange={handleAlamatChange} rows="3" className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"></textarea>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" name="kota" placeholder="Kota / Kabupaten" value={alamatPengiriman.kota} onChange={handleAlamatChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm" />
                        <input type="text" name="kodePos" placeholder="Kode Pos" value={alamatPengiriman.kodePos} onChange={handleAlamatChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm" />
                    </div>
                  </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-800 mb-2">Metode Pembayaran</h3>
                  <select
                    value={metodePembayaran}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm bg-white"
                  >
                    <option value="" disabled>Pilih Metode Pembayaran</option>
                    <option value="cod">Bayar di Tempat (COD)</option>
                    <option value="transfer-bca">Transfer Bank BCA</option>
                    <option value="transfer-mandiri">Transfer Bank Mandiri</option>
                    <option value="gopay">GoPay</option>
                    <option value="ovo">OVO</option>
                  </select>
                </div>
                
                {/* Detail Biaya */}
                <dl className="space-y-2 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal ({cart.reduce((acc, item) => acc + item.jumlah, 0)} item)</dt>
                    <dd className="text-sm font-medium text-gray-800">Rp{totalHarga.toLocaleString('id-ID')}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Ongkos Kirim</dt>
                    <dd className="text-sm font-medium text-gray-800">Rp{ongkosKirim.toLocaleString('id-ID')}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3 mt-3">
                    <dt className="text-lg font-semibold text-gray-800">Total Keseluruhan</dt>
                    <dd className="text-lg font-semibold text-green-600">Rp{totalKeseluruhan.toLocaleString('id-ID')}</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <button
                    onClick={handleCheckout}
                    type="button"
                    className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500 transition-colors disabled:opacity-70"
                    disabled={cart.length === 0}
                  >
                    Lanjutkan ke Pembayaran
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <Link to="/ProductList" className="text-sm font-medium text-green-600 hover:text-green-500">
                    <span aria-hidden="true"> &larr; </span>
                    Lanjut Belanja
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCart;