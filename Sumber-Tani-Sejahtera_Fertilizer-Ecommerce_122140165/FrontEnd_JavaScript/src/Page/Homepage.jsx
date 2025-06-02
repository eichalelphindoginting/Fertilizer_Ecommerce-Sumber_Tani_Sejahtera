/* eslint-disable no-irregular-whitespace */
import React from 'react'; // useState dihapus karena state sidebar dipindah
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import useHomepage from '../Hooks/useHomepage';

// Ikon-ikon yang relevan untuk Homepage
const LeafIcon = () => ( <svg className="w-12 h-12 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0zM9 14l-2 2m0 0l2-2m-2 2h14M5 10h14M5 6h14" /></svg> );
const QualityIcon = () => ( <svg className="w-12 h-12 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> );
const SupportIcon = () => ( <svg className="w-12 h-12 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg> );
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>;

// Komponen FaqItem (bisa juga dipisah ke file sendiri jika digunakan di banyak tempat)
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false); // React.useState
  
    return (
      <div className="border-b border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full py-5 text-left text-gray-700 hover:text-green-600 focus:outline-none"
        >
          <span className="text-base md:text-lg font-medium">{question}</span>
          <span className={`${isOpen ? 'transform rotate-180' : ''}`}>
            <ChevronDownIcon />
          </span>
        </button>
        {isOpen && (
          <div className="pb-5 pr-4 text-gray-600 text-sm leading-relaxed">
            {answer}
          </div>
        )}
      </div>
    );
};

const Homepage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const {
    featuredProducts,
    loading,
    error,
  } = useHomepage();

  const handleBuyNow = (produk) => {
    if (!isAuthenticated) {
      alert("Anda harus login terlebih dahulu untuk membeli produk.");
      navigate('/loginpage');
    } else {
      addToCart({
        id: produk.id,
        nama: produk.nama,
        harga: produk.harga,
        gambar: produk.img,
        quantity: 1
      });
      navigate('/ShopCart');
    }
  };
  
  // handleProtectedLinkClick tidak lagi dibutuhkan di Homepage jika sidebar dipindah
  // Namun, jika ada link terproteksi lain di konten Homepage, ini bisa dipertahankan.
  // Untuk saat ini, kita asumsikan link terproteksi utama ada di sidebar/navbar.

  const faqData = [
    { q: "Bagaimana cara memesan produk?", a: "Anda dapat memesan produk langsung melalui website kami dengan menambahkannya ke keranjang dan melanjutkan ke proses checkout. Pastikan Anda sudah login terlebih dahulu." },
    { q: "Apakah pupuk ini aman untuk semua jenis tanaman?", a: "Sebagian besar pupuk kami bersifat umum, namun kami menyarankan untuk membaca deskripsi produk atau berkonsultasi dengan tim kami untuk memastikan kesesuaian dengan tanaman spesifik Anda." },
    { q: "Berapa lama waktu pengiriman?", a: "Waktu pengiriman bervariasi tergantung lokasi Anda, biasanya antara 2-5 hari kerja untuk wilayah Jawa dan 5-10 hari kerja untuk luar Jawa." },
    { q: "Apakah ada layanan konsultasi?", a: "Ya, kami menyediakan layanan konsultasi gratis. Silakan hubungi kami melalui halaman Kontak untuk menjadwalkan sesi dengan ahli pertanian kami." },
    { q: "Bagaimana cara melacak pesanan saya?", a: "Setelah pesanan dikirim, Anda akan menerima nomor resi melalui email. Anda juga dapat melacak status pesanan melalui menu 'Paket Saya' jika Anda login ke akun Anda." },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Spacer untuk navbar fixed, ini mungkin lebih baik dikelola oleh komponen Layout */}
      {/* Jika Navbar tidak transparan, spacer ini mungkin tidak perlu jika Layout menangani padding-top untuk konten */}
      <div className="h-20" /> 

      <section className="bg-gradient-to-br from-green-500 via-green-600 to-teal-600 text-white py-24 px-6 text-center rounded-b-[50px] shadow-xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight animate-fade-in-down">Sumber Tani Sejahtera</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">Solusi Pupuk Berkualitas untuk Hasil Panen Melimpah dan Berkelanjutan.</p>
        <Link 
          to="/ProductList" 
          onClick={(e) => { 
            if (!isAuthenticated) { 
              e.preventDefault(); 
              alert("Anda harus login terlebih dahulu untuk melihat produk."); 
              navigate('/loginpage');
            }
          }}
          className="bg-white text-green-600 px-8 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-400"
        >
          Jelajahi Produk Kami
        </Link>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Mengapa Memilih Kami?</h2>
          <p className="text-gray-600 mb-12 text-lg max-w-3xl mx-auto">Kami berdedikasi untuk menyediakan produk pertanian terbaik yang mendukung pertumbuhan optimal tanaman Anda dan menjaga kelestarian lingkungan.</p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"><LeafIcon /><h3 className="text-xl font-semibold text-green-700 mb-2">Ramah Lingkungan</h3><p className="text-gray-600 text-sm leading-relaxed">Produk kami diformulasikan dari bahan alami, aman bagi tanah dan ekosistem pertanian Anda.</p></div>
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"><QualityIcon /><h3 className="text-xl font-semibold text-green-700 mb-2">Kualitas Teruji</h3><p className="text-gray-600 text-sm leading-relaxed">Terbukti meningkatkan hasil panen secara signifikan melalui riset dan pengujian lapangan.</p></div>
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"><SupportIcon /><h3 className="text-xl font-semibold text-green-700 mb-2">Dukungan Ahli</h3><p className="text-gray-600 text-sm leading-relaxed">Tim kami siap membantu Anda memilih produk terbaik dan memberikan konsultasi pertanian.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-16">Produk Unggulan Kami</h2>
        {loading && <p className="text-center text-lg text-green-600">Memuat produk unggulan...</p>}
        {error && <p className="text-center text-red-500">Gagal memuat produk: {error}</p>}
        {!loading && !error && featuredProducts.length === 0 && <p className="text-center text-gray-500 text-lg">Saat ini belum ada produk unggulan.</p>}
        {!loading && !error && featuredProducts.length > 0 && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((produk) => (
              <div key={produk.id} className="group bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                <div className="relative w-full h-56 sm:h-64 bg-gray-100">
                  <img src={produk.img} alt={produk.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/300x300.png?text=Gambar+Error'; }} />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">{produk.nama}</h3>
                  <p className="text-green-600 font-semibold text-lg mb-3">Rp{produk.harga.toLocaleString('id-ID')}</p>
                  <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{produk.desc}</p> 
                  <button onClick={() => handleBuyNow(produk)} className="w-full bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 mt-auto">
                    Beli Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Pertanyaan Umum (FAQ)</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Temukan jawaban cepat untuk pertanyaan umum tentang produk dan layanan kami.</p>
          </div>
          <div className="space-y-3">
            {faqData.map((faqItem, index) => (
              <FaqItem key={index} question={faqItem.q} answer={faqItem.a} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/contact" className="text-green-600 hover:text-green-700 hover:underline font-medium">
              Tidak menemukan jawaban? Hubungi kami &rarr;
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-teal-500 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Punya Pertanyaan atau Butuh Konsultasi?</h2>
          <p className="text-lg mb-8 text-green-100">Tim ahli kami siap membantu Anda menemukan solusi terbaik untuk kebutuhan pertanian Anda.</p>
          <Link to="/Contact" className="bg-white text-green-700 px-10 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Hubungi Kami Sekarang
          </Link>
        </div>
      </section>

      <footer className="bg-gray-100 mt-0 text-gray-700 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
          <div><h3 className="text-xl font-bold mb-3 text-green-700">Sumber Tani Sejahtera</h3><p className="text-sm leading-relaxed">Solusi tepat untuk kebutuhan pertanian Anda. Kami menyediakan produk berkualitas untuk hasil panen yang melimpah dan berkelanjutan.</p></div>
          <div><h4 className="text-lg font-semibold mb-3 text-gray-800">Navigasi Cepat</h4><ul className="space-y-2 text-sm"><li><Link to="/" className="hover:text-green-600 transition-colors">Beranda</Link></li><li><Link to="/ProductList" className="hover:text-green-600 transition-colors cursor-pointer">Produk</Link></li><li><Link to="/About" className="hover:text-green-600 transition-colors">Tentang Kami</Link></li><li><Link to="/Contact" className="hover:text-green-600 transition-colors">Kontak</Link></li><li><Link to="/FaqPage" className="hover:text-green-600 transition-colors">FAQ</Link></li></ul></div>
          <div><h4 className="text-lg font-semibold mb-3 text-gray-800">Hubungi Kami</h4><address className="text-sm not-italic space-y-1"><p>Jl. Pertanian No. 123, Bandung, Jawa Barat</p><p>Email: <a href="mailto:info@sumbertani.com" className="text-green-600 hover:underline">info@sumbertani.com</a></p><p>Telepon: <a href="tel:+62221234567" className="text-green-600 hover:underline">(022) 123-4567</a></p></address></div>
        </div>
        <div className="bg-gray-200 text-center text-sm text-gray-600 py-6">&copy; {new Date().getFullYear()} Sumber Tani Sejahtera. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default Homepage;

// --- Animasi CSS (opsional, jika Anda menggunakannya) ---
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .delay-200 { animation-delay: 0.2s; }
  .delay-400 { animation-delay: 0.4s; }
  // ... (definisi keyframes fade-in-down dan fade-in-up)
}
*/