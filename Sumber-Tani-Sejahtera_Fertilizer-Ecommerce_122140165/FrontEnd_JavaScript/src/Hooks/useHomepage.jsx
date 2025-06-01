import { useState, useEffect } from 'react';

const IMAGE_BASE_URL = 'http://localhost:6543'; // Sesuaikan jika base URL API Anda berbeda

const useHomepage = () => {
  // State untuk fungsionalitas pencarian (jika ingin dipertahankan)
  const [keyword, setKeyword] = useState('');

  // State untuk produk unggulan dari API
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Jika Anda juga butuh semua produk
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Ganti dengan URL API Anda yang sebenarnya
        const response = await fetch(`${IMAGE_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // Asumsi API mengembalikan { success: true, data: [...] }
        const productsFromApi = result.data || [];
        setAllProducts(productsFromApi); // Simpan semua produk jika perlu

        // Transformasi data API ke format yang sesuai dan pilih produk unggulan
        const transformedAndFeatured = productsFromApi.map(p => ({
          id: p.id, 
          nama: p.name,
          desc: p.description,
          harga: parseFloat(p.price),
          img: p.image_url && p.image_url.startsWith('http') ? p.image_url : `${IMAGE_BASE_URL}${p.image_url || ''}`,
          stock: p.stock,
        })).slice(0, 3); // Ambil 3 produk pertama sebagai unggulan

        setFeaturedProducts(transformedAndFeatured);
        setError(null);
      } catch (e) {
        console.error("Failed to fetch products in useHomepage:", e);
        setError(e.message);
        setFeaturedProducts([]);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Dependency array kosong agar berjalan sekali

  // Fungsi untuk pencarian (jika ingin dipertahankan)
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const performSearch = () => {
    console.log('Mencari produk dengan kata kunci:', keyword);
    // Logika pencarian bisa diimplementasikan di sini, 
    // misalnya memfilter `allProducts` atau melakukan fetch API baru.
    // Contoh filter client-side:
    // const filtered = allProducts.filter(p => 
    //   p.nama.toLowerCase().includes(keyword.toLowerCase())
    // );
    // setFeaturedProducts(filtered.slice(0,3)); // Update featuredProducts berdasarkan hasil search
  };

  return {
    keyword,
    handleSearchChange,
    performSearch,
    featuredProducts, // Produk unggulan untuk ditampilkan
    allProducts,      // Semua produk jika diperlukan di komponen lain
    loading,          // Status loading
    error,            // Pesan error
  };
};

export default useHomepage;