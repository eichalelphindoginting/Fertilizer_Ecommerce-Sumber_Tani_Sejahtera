import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password tidak cocok');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        alert('Pendaftaran berhasil!');
        navigate('/loginpage');
      }
    } catch (error) {
      console.error(error);
      alert('Gagal mendaftar. Coba lagi.');
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
