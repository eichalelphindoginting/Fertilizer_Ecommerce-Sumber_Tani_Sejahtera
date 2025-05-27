// src/hooks/UseRegisterPage.jsx
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useRegisterPage = (onRegisterSuccess) => { // Tambahkan onRegisterSuccess
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password tidak cocok');
      return;
    }

    try {
      // Pastikan URL dan port backend Anda benar
      // Port 8000 di contoh Anda, mungkin perlu disesuaikan
      const response = await axios.post('http://localhost:6543/api/register', {
        username,
        email,
        password,
      });

      // Asumsikan backend mengembalikan data pengguna setelah register berhasil
      if (response.status === 200 || response.status === 201) {
        alert('Pendaftaran berhasil!');
        // Panggil callback dengan data pengguna
        // Jika backend tidak langsung me-login setelah register,
        // Anda mungkin hanya menavigasi atau memanggil onRegisterSuccess tanpa data pengguna
        // Jika backend langsung me-login, sertakan data pengguna seperti di login
        if (response.data.user && response.data.token) { // Jika ada data user dan token
            onRegisterSuccess(response.data.user, response.data.token);
        } else {
            onRegisterSuccess(); // Atau panggil tanpa argumen jika hanya notifikasi
        }
        // navigate('/loginpage'); // Navigasi bisa ditangani oleh AuthContext atau komponen
      }
    } catch (error) {
      console.error(error);
      alert('Gagal mendaftar: ' + (error.response?.data?.message || 'Coba lagi.'));
    }
  };

  return {
    username,
    email,
    password,
    confirmPassword,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
  };
};

export default useRegisterPage;