import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import LoginPage from './Components/Login';
import ProductList from './Components/Productlist';
import ShopCart from './Components/Shopcart';
import Navbar from './Components/Navbar';
import RegisterPage from './Components/Daftar';
import {CartProvider}  from './context/CartContext'; // pastikan path ini sesuai

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>    
          <Route path="/" element={<Homepage />} />
          <Route path="/DaftarPage" element={<RegisterPage />} />
          <Route path="/Loginpage" element={<LoginPage />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/ShopCart" element={<ShopCart />} />
        </Routes>
        
      </Router>
    </CartProvider>
  );
}

export default App;
