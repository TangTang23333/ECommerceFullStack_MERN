import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Success from "./pages/Success";
import { useSelector } from 'react-redux';

export default function App() {

  const user = useSelector(state => state.user.currentUser);



  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} /> 
      <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>} /> 
      <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />  
      <Route path="/products/:category" element={<ProductList/>} />  
      <Route path="products" element={<ProductList/>} />
      <Route path="/product/:id" element={<ProductPage/>} />  
      <Route path="/cart" element={<Cart/>} /> 
      <Route path='/success' element={<Success/>} />
      <Route path='/wishlist' element={<Wishlist />} />
      
      </Routes>
    </Router>
  )
}; 
