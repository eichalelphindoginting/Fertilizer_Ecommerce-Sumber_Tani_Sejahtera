// src/pages/About.jsx (atau path yang sesuai)
import React from 'react';

// Contoh ikon sederhana untuk misi
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const About = () => {
  return (
    <div className="bg-green-50 min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto pt-16"> {/* pt-16 untuk spacer navbar fixed */}
        
        {/* Hero Section About */}
        <section className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-700 tracking-tight">
            Tentang Sumber Tani Sejahtera
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Mitra terpercaya petani Indonesia dalam menyediakan solusi pertanian berkualitas tinggi untuk masa depan yang lebih hijau dan sejahtera.
          </p>
        </section>

        {/* Seksi Siapa Kami dengan Gambar */}
        <section className="mb-16 md:mb-20">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center bg-white p-8 md:p-12 rounded-xl shadow-xl">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Dedikasi Kami untuk Pertanian Indonesia</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                    Di <strong>Sumber Tani Sejahtera</strong>, kami percaya bahwa pertanian adalah tulang punggung bangsa. Sejak awal berdiri, kami berkomitmen penuh untuk mendukung para petani dengan menyediakan produk-produk inovatif dan layanan terbaik. Kami memahami tantangan yang dihadapi petani modern dan berupaya menjadi bagian dari solusi untuk pertanian yang lebih produktif, efisien, dan berkelanjutan.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                    Kami tidak hanya menjual pupuk, kami membangun kemitraan. Bersama-sama, kita wujudkan hasil panen yang melimpah dan kesejahteraan bagi seluruh komunitas pertanian.
                    </p>
                </div>
                <div className="order-1 md:order-2">
                    <img
                        src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1050&q=80" // Ganti dengan gambar yang lebih relevan jika ada
                        alt="Tim Sumber Tani Sejahtera atau aktivitas pertanian"
                        className="rounded-lg shadow-lg object-cover w-full h-80 md:h-96"
                    />
                </div>
            </div>
        </section>


        {/* Visi dan Misi dalam Layout Kartu */}
        <section className="mb-16 md:mb-20">
            <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">Visi Kami</h2>
                    <p className="text-gray-700 leading-relaxed">
                    Menjadi perusahaan agritech terdepan yang memberdayakan petani melalui solusi pertanian inovatif, ramah lingkungan, dan berkelanjutan demi tercapainya ketahanan pangan nasional dan kesejahteraan petani.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">Misi Kami</h2>
                    <ul className="space-y-3 text-gray-700">
                    {[
                        "Menyediakan produk pupuk dan nutrisi tanaman berkualitas superior dengan standar internasional.",
                        "Mengembangkan dan menyebarkan teknologi pertanian presisi yang efisien dan mudah diakses.",
                        "Memberikan edukasi dan pendampingan berkelanjutan kepada petani untuk praktik pertanian terbaik.",
                        "Membangun ekosistem kemitraan yang kuat dan saling menguntungkan dengan seluruh pemangku kepentingan.",
                        "Berinovasi secara terus-menerus untuk menciptakan solusi yang berdampak positif bagi lingkungan."
                    ].map((misi, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircleIcon />
                            <span>{misi}</span>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </section>
        
        {/* Seksi Nilai-Nilai Kami (Opsional) */}
        <section className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl font-bold text-green-700 mb-10">Nilai-Nilai Inti Kami</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Integritas", "Inovasi", "Kemitraan", "Keberlanjutan"].map((value) => (
              <div key={value} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-green-600">{value}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Bagian Akhir dengan Gambar dan Pesan Penutup */}
        <section className="text-center">
          <img
            src="https://images.unsplash.com/photo-1603166982488-b53bd37655ae?auto=format&fit=crop&w=1050&q=80"
            alt="Pertanian Indonesia"
            className="rounded-xl shadow-2xl mx-auto w-full max-w-3xl object-cover h-72 md:h-96"
          />
          <p className="mt-6 text-lg text-gray-600 italic max-w-2xl mx-auto">
            "Bersama membangun masa depan pertanian Indonesia yang lebih cerah dan berkelanjutan."
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;