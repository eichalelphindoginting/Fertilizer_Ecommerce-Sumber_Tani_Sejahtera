import React from 'react';

const About = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">Tentang Kami</h1>
        
        <p className="text-lg mb-6 text-center text-gray-700">
          <strong>Sumber Tani Sejahtera</strong> adalah mitra terpercaya petani Indonesia dalam menyediakan pupuk berkualitas tinggi. Kami berdedikasi untuk mendukung pertanian berkelanjutan yang ramah lingkungan dan meningkatkan hasil panen petani di seluruh nusantara.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Visi Kami</h2>
            <p className="text-gray-700">
              Menjadi perusahaan terdepan dalam penyediaan solusi pertanian yang ramah lingkungan, modern, dan terpercaya untuk mendukung ketahanan pangan nasional.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Misi Kami</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Menyediakan produk pupuk berkualitas tinggi dengan harga terjangkau.</li>
              <li>Mengedukasi petani tentang pemupukan yang efisien dan berkelanjutan.</li>
              <li>Menjalin kemitraan strategis dengan komunitas dan lembaga pertanian.</li>
              <li>Mendukung inovasi dalam teknologi pertanian hijau.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <img
            src="https://images.unsplash.com/photo-1603166982488-b53bd37655ae?auto=format&fit=crop&w=1050&q=80"
            alt="Pertanian"
            className="rounded-lg shadow-lg mx-auto w-full max-w-2xl object-cover"
          />
          <p className="mt-4 text-sm text-gray-500 italic">Bersama membangun masa depan pertanian Indonesia.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
