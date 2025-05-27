import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesan Anda telah dikirim. Terima kasih telah menghubungi kami!");
    setFormData({ nama: '', email: '', pesan: '' });
  };

  return (
    <div className="bg-white min-h-screen py-16 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">Kontak Kami</h1>

        <p className="text-center text-gray-600 mb-10">
          Ada pertanyaan, saran, atau ingin bekerja sama dengan kami? Silakan hubungi kami melalui formulir di bawah atau lewat informasi kontak yang tersedia.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulir Kontak */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Pesan</label>
              <textarea
                name="pesan"
                rows="5"
                value={formData.pesan}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Kirim Pesan
            </button>
          </form>

          {/* Informasi Kontak */}
          <div className="space-y-6 text-sm text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Alamat</h3>
              <p>Jl. Pertanian No. 123, Bandung</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Email</h3>
              <p>info@sumbertani.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Telepon</h3>
              <p>(022) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Jam Operasional</h3>
              <p>Senin - Jumat: 08.00 - 17.00</p>
              <p>Sabtu: 08.00 - 14.00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Ikuti Kami</h3>
              <div className="flex space-x-4 text-green-600">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Facebook</a>
                <a href="#" className="hover:underline">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
