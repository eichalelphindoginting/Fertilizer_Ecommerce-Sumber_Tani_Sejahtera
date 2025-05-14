import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import LoginPage from './Components/Loginpage';
import ProductList from './Components/Productlist';
import ShopCart from './Components/Shopcart';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Loginpage" element={<LoginPage />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/ShopCart" element={<ShopCart />} />
      </Routes>
    </Router>
  );
}

export default App;
