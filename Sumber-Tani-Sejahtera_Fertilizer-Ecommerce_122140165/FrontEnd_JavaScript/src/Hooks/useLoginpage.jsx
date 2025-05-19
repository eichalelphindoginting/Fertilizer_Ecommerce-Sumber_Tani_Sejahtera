import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLoginpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Contoh validasi sederhana
    if (username === 'admin' && password === '123') {
      alert('Login berhasil!');
      navigate('/');
    } else {
      alert('Username atau password salah');
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
