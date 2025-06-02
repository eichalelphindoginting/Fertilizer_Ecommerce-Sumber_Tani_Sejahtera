// src/pages/Contact.jsx (atau path yang sesuai)
import React, { useState } from 'react';

// Contoh Ikon Sederhana (Anda bisa menggunakan library seperti Heroicons atau FontAwesome)
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const EnvelopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// Anda bisa menambahkan ikon untuk Instagram, Facebook, WhatsApp di sini

const Contact = () => {
  const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini Anda akan menambahkan logika pengiriman data ke backend
    console.log("Form Data:", formData); 
    setIsSubmitted(true); // Tampilkan pesan sukses
    // alert("Pesan Anda telah dikirim. Terima kasih telah menghubungi kami!"); // Ganti dengan pesan yang lebih terintegrasi
    setFormData({ nama: '', email: '', pesan: '' }); // Reset form
    setTimeout(() => setIsSubmitted(false), 5000); // Sembunyikan pesan sukses setelah 5 detik
  };

  return (
    <div className="bg-green-50 min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto pt-16"> {/* pt-16 untuk spacer navbar fixed */}
        <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 tracking-tight">Hubungi Kami</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan, saran, atau ingin berdiskusi lebih lanjut? Kami siap mendengarkan Anda.
            </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-8 md:p-12 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Formulir Kontak */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kirim Pesan Langsung</h2>
            {isSubmitted && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-200 rounded-md text-sm">
                Pesan Anda telah berhasil dikirim. Terima kasih!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="cth: nama@email.com"
                />
              </div>
              <div>
                <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-1">Pesan Anda</label>
                <textarea
                  name="pesan"
                  id="pesan"
                  rows="5"
                  value={formData.pesan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Tuliskan pesan Anda di sini..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Informasi Kontak */}
          <div className="space-y-8 text-gray-700 order-1 md:order-2">
            <div>
                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center"><MapPinIcon /> Alamat Kantor</h3>
                <p className="ml-9">Jl. Pertanian No. 123, Kota Bandung, Jawa Barat, 40100</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center"><EnvelopeIcon /> Email</h3>
                <a href="mailto:info@sumbertani.com" className="ml-9 hover:text-green-600 hover:underline">info@sumbertani.com</a>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center"><PhoneIcon /> Telepon</h3>
                <a href="tel:+62221234567" className="ml-9 hover:text-green-600 hover:underline">(022) 123-4567</a>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center"><ClockIcon /> Jam Operasional</h3>
                <p className="ml-9">Senin - Jumat: 08.00 - 17.00 WIB</p>
                <p className="ml-9">Sabtu: 08.00 - 14.00 WIB</p>
                <p className="ml-9">Minggu & Hari Libur Nasional: Tutup</p>
            </div>
            {/* Placeholder untuk Peta Google Maps */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-green-700 mb-3">Lokasi Kami</h3>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow">
                     {/* Ganti dengan iframe Google Maps Anda */}
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.900906789206!2d107.6069838153105!3d-6.902874195012099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8c237b%3A0x4c78b6d1e6d3cd26!2sGedung%20Sate!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
                        width="100%" 
                        height="250" 
                        style={{ border:0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                        title="Lokasi Sumber Tani Sejahtera"
                        className="rounded-lg"
                    ></iframe>
                </div>
            </div>
             <div className="mt-8">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Ikuti Kami di Sosial Media</h3>
              <div className="flex space-x-4">
                {/* Ganti # dengan link sosial media Anda dan gunakan ikon SVG jika ada */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors"><span className="sr-only">Instagram</span> {/* Ganti dengan ikon Instagram SVG */}ICON_IG</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors"><span className="sr-only">Facebook</span> {/* Ganti dengan ikon Facebook SVG */}ICON_FB</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors"><span className="sr-only">WhatsApp</span> {/* Ganti dengan ikon WhatsApp SVG */}ICON_WA</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;