// src/hooks/useLoginpage.jsx
import { useState } from 'react';
import axios from 'axios';

const useLoginpage = (onLoginSuccess) => { // Menerima onLoginSuccess sebagai argumen
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Anda bisa menambahkan state untuk loading atau error di sini jika diperlukan
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // setError(null);

    try {
      // URL API disesuaikan dengan backend Pyramid Anda
      const response = await axios.post('http://localhost:6543/api/login', {
        username, // Backend mengharapkan 'username'
        password,
      });

      // Backend mengembalikan success: true, user, dan token
      if (response.data.success && response.data.user && response.data.token) {
        alert('Login berhasil!'); // Feedback langsung ke pengguna
        if (onLoginSuccess) {
          // Panggil callback dari AuthContext dengan data user dan token
          onLoginSuccess(response.data.user, response.data.token);
        }
      } else {
        // Jika backend mengembalikan success: false atau data tidak lengkap
        // setError(response.data.message || 'Username atau password salah.');
        alert('Login gagal: ' + (response.data.message || 'Username atau password salah.'));
      }
    } catch (error) {
      // Menangani error dari axios (misalnya server down, atau error dari backend)
      const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan saat login.';
      // setError(errorMessage);
      alert(errorMessage);
      console.error("Error saat login:", error.response || error);
    } finally {
      // setIsLoading(false);
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    // isLoading, // Jika Anda menambahkannya
    // error,     // Jika Anda menambahkannya
  };
};

export default useLoginpage;