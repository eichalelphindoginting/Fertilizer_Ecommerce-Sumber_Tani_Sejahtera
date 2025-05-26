import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// context/CartContext.js

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, jumlah: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    if (item.jumlah === 1) {
      setCart(cart.filter((i) => i.id !== productId));
    } else {
      setCart(
        cart.map((i) =>
          i.id === productId ? { ...i, jumlah: i.jumlah - 1 } : i
        )
      );
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
