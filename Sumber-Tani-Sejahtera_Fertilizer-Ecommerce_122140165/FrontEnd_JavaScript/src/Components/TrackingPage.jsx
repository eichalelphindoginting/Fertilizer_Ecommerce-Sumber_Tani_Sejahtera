// src/pages/TrackingPage.jsx atau src/components/TrackingPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  // Ikon yang hanya digunakan Header akan dihapus
  // MagnifyingGlassIcon, // Tidak diperlukan lagi jika Header dihapus
  // ShoppingCartIcon, // Tidak diperlukan lagi jika Header dihapus
  // Bars3Icon,          // Tidak diperlukan lagi jika Header dihapus
  XMarkIcon,         // Tetap digunakan untuk error di timeline (dan sebelumnya di Header)
  CheckCircleIcon,   // Untuk status selesai
  ClockIcon,           // Untuk status aktif saat ini
  ChevronRightIcon     // Untuk status menunggu/berikutnya
} from "@heroicons/react/24/solid"; // Anda menggunakan solid, bisa juga outline

// Contoh data pelacakan (icon dihilangkan, akan ditentukan saat render)
const dummyTrackingData = {
  'STS123456789': {
    orderId: 'STS123456789',
    currentStatus: 'Dikirim',
    estimatedDelivery: '29 Mei 2025',
    updates: [
      { status: 'Pesanan Dikonfirmasi', date: '25 Mei 2025, 10:00 WIB', location: 'Gudang Pusat, Jakarta', completed: true, error: false },
      { status: 'Pesanan Diproses', date: '25 Mei 2025, 14:30 WIB', location: 'Gudang Pusat, Jakarta', completed: true, error: false },
      { status: 'Pesanan Dikirim', date: '26 Mei 2025, 09:15 WIB', location: 'Sortir Hub, Jakarta Timur', completed: false, error: false },
      { status: 'Dalam Perjalanan ke Kota Tujuan', date: '27 Mei 2025, 08:00 WIB', location: 'Transit - Surabaya', completed: false, error: false },
      { status: 'Akan Diantar ke Alamat', date: '-', location: '-', completed: false, error: false },
      { status: 'Tiba di Tujuan', date: '-', location: '-', completed: false, error: false },
    ],
    itemsSummary: 'Pupuk Organik Super (x2), Benih Padi Unggul (x1)',
    shippingAddress: 'Jl. Tani Makmur No. 1, Desa Suka Maju, Kab. Hijau Lestari',
  },
  'GAGAL123': {
    orderId: 'GAGAL123',
    currentStatus: 'Masalah Pengiriman',
    estimatedDelivery: 'Hubungi CS',
    updates: [
      { status: 'Pesanan Dikonfirmasi', date: '20 Mei 2025, 10:00 WIB', location: 'Gudang Pusat, Jakarta', completed: true, error: false },
      { status: 'Alamat Tidak Ditemukan', date: '21 Mei 2025, 11:00 WIB', location: 'Hub Pengiriman Lokal', completed: false, error: true },
    ],
    itemsSummary: 'Pestisida Organik (x1)',
    shippingAddress: 'Jl. Tidak Jelas No. 0, Kota Antah Berantah',
  }
};

// Komponen Header DIHAPUS dari file ini

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Sumber Tani Sejahtera. Solusi Tepat Tanaman Anda.</p>
        <p className="text-sm text-gray-500 mt-1">
          <Link to="/privacy" className="hover:text-green-600">Kebijakan Privasi</Link> |
          <Link to="/terms" className="hover:text-green-600 ml-1">Syarat & Ketentuan</Link>
        </p>
      </div>
    </footer>
  );
}

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setError('');
    setOrderDetails(null);
    setIsLoading(true);
    setTimeout(() => {
      const data = dummyTrackingData[trackingId.toUpperCase()];
      if (data) {
        const activeStepIndex = data.updates.findIndex(update => !update.completed && !update.error);
        const processedUpdates = data.updates.map((update, index) => ({
          ...update,
          isCurrentActive: index === activeStepIndex
        }));
        setOrderDetails({ ...data, updates: processedUpdates });
      } else {
        setError('Nomor pelacakan tidak ditemukan atau tidak valid. Mohon periksa kembali.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const getTimelineIcon = (update) => {
    if (update.error) return XMarkIcon;
    if (update.completed) return CheckCircleIcon;
    if (update.isCurrentActive) return ClockIcon;
    return ChevronRightIcon;
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      {/* <Header /> // Pemanggilan Header DIHAPUS */}
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20"> {/* Menambahkan padding atas jika header eksternal Anda fixed */}
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-700">Lacak Status Pesanan Anda</h1>
            <p className="mt-2 text-lg text-gray-600">Masukkan nomor pelacakan yang Anda terima.</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-10">
            <form onSubmit={handleTrackOrder} className="space-y-4 sm:space-y-0 sm:flex sm:items-end sm:space-x-3">
              <div className="flex-grow">
                <label htmlFor="tracking-id" className="block text-sm font-medium text-gray-700 mb-1">Nomor Pelacakan</label>
                <input
                  type="text" id="tracking-id" value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Contoh: STS123456789"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit" disabled={isLoading}
                className={`w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'} transition duration-150 ease-in-out`}
              >
                {isLoading ? (
                  <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Melacak...</>
                ) : ('Lacak Pesanan')}
              </button>
            </form>
            {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
          </div>

          {orderDetails && (
            <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8">
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">Detail Pesanan: <span className="text-green-600">{orderDetails.orderId}</span></h2>
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-gray-700"><strong>Status Terkini:</strong><span className={`ml-2 font-bold ${orderDetails.currentStatus === 'Masalah Pengiriman' ? 'text-red-600' : 'text-green-700'}`}>{orderDetails.currentStatus}</span></p>
                  <p className="text-sm text-gray-600 mt-1"><strong>Perkiraan Tiba:</strong> {orderDetails.estimatedDelivery}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-5">Riwayat Pengiriman</h3>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  {orderDetails.updates.map((update, index) => {
                    const IconComponent = getTimelineIcon(update);
                    const iconColorClass = update.error ? 'text-red-600 dark:text-red-400' : (update.completed ? 'text-green-600 dark:text-green-400' : (update.isCurrentActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'));
                    const bgColorClass = update.error ? 'bg-red-200 dark:bg-red-900' : (update.completed ? 'bg-green-200 dark:bg-green-900' : (update.isCurrentActive ? 'bg-blue-200 dark:bg-blue-900' : 'bg-gray-200 dark:bg-gray-700'));

                    return (
                      <li key={index} className="mb-8 ml-6">
                        <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 ${bgColorClass}`}>
                          <IconComponent className={`w-4 h-4 ${iconColorClass}`} />
                        </span>
                        <h4 className={`flex items-center mb-1 text-md font-semibold ${update.error ? 'text-red-700' : 'text-gray-900'} dark:text-white`}>
                          {update.status}
                          {update.isCurrentActive && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">SAAT INI</span>
                          )}
                        </h4>
                        <time className="block mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">{update.date}</time>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{update.location}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Ringkasan Pesanan</h3>
                <p className="text-sm text-gray-600 mb-1"><strong>Produk:</strong> {orderDetails.itemsSummary}</p>
                <p className="text-sm text-gray-600"><strong>Alamat Pengiriman:</strong> {orderDetails.shippingAddress}</p>
              </div>
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">Butuh bantuan?{' '}<Link to="/contact-us" className="text-green-600 hover:text-green-700 font-medium underline">Hubungi Kami</Link></p>
              </div>
            </div>
          )}
          {!orderDetails && !isLoading && (
            <div className="text-center mt-12">
              <svg className="mx-auto w-24 h-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p className="text-gray-500">Hasil pelacakan akan muncul di sini.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackingPage;