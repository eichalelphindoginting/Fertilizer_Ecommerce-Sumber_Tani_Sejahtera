// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Page/Homepage";
import LoginPage from "./Page/Loginpage";
import ProductList from "./Page/Productlistpage";
import ShopCart from "./Components/Shopcart";
import Navbar from "./Components/Navbar";
import RegisterPage from "./Page/RegisterPage";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import About from "./Components/About";
import Contact from "./Components/Contact";
import TrackingPage from "./Page/TrackingPage";
import Layout from "./Components/Layout";

function App() {
  return (
    <Router>
      {" "}
      {/* 👈 Router sekarang membungkus semuanya */}
      <CartProvider>
        <AuthProvider>
          <Layout>
            {" "}
            {/* 👈 AuthProvider sekarang ada DI DALAM Router */}
            <Navbar />
            <Routes>
              <Route path="/Contact" element={<Contact />} />
              <Route path="/About" element={<About />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/Tracking" element={<TrackingPage />} />
              <Route path="/DaftarPage" element={<RegisterPage />} />
              <Route path="/Loginpage" element={<LoginPage />} />
              <Route path="/ProductList" element={<ProductList />} />
              <Route path="/ShopCart" element={<ShopCart />} />
            </Routes>
            {/* Anda bisa meletakkan komponen Footer di sini jika ada */}
          </Layout>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
