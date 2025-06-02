// context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCart([]); // Reset to empty cart on error
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        );
      } else {
        // Pastikan produk yang ditambahkan memiliki semua properti yang dibutuhkan, termasuk gambar
        return [...prevCart, { 
          id: product.id,
          nama: product.nama,
          harga: product.harga,
          gambar: product.gambar || product.img, // Menggunakan product.gambar atau product.img
          jumlah: product.quantity !== undefined ? product.quantity : 1 // Menggunakan product.quantity jika ada, jika tidak default ke 1
        }];
      }
    });
  };

  // Fungsi ini mengurangi jumlah, dan menghapus jika jumlah menjadi 0
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (!item) return prevCart;

      if (item.jumlah === 1) {
        return prevCart.filter((i) => i.id !== productId);
      } else {
        return prevCart.map((i) =>
          i.id === productId ? { ...i, jumlah: i.jumlah - 1 } : i
        );
      }
    });
  };

  // Fungsi BARU: Untuk mengubah kuantitas item ke nilai tertentu
  const updateItemQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity < 1) {
        // Jika kuantitas baru kurang dari 1, hapus item
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, jumlah: newQuantity } : item
      );
    });
  };

  // Fungsi BARU: Untuk menghapus item sepenuhnya, tidak peduli kuantitasnya
  const removeItemCompletely = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateItemQuantity, // Tambahkan fungsi baru ke provider value
        removeItemCompletely, // Tambahkan fungsi baru ke provider value
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};