import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useLoginpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5432/login', {
        username,
        password,
      });

      // Asumsikan response sukses mengembalikan token atau status
      if (response.data.success) {
        alert('Login berhasil!');
        // Simpan token jika ada, lalu navigasi
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        alert('Login gagal: ' + response.data.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat login');
      console.error(error);
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };
};

export default useLoginpage;
