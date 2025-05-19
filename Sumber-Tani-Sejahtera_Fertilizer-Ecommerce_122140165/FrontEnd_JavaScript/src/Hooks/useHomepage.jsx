import { useState } from 'react';

const useHomepage = () => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const search = () => {
    console.log('Cari produk dengan kata kunci:', keyword);
    // Nanti bisa dipakai untuk filter produk atau fetch API
  };

  return {
    keyword,
    handleChange,
    search,
  };
};

export default useHomepage;
