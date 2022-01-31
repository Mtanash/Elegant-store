import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage";
import AuthPage from "./components/AuthPage/AuthPage";
import Home from "./components/Home/Home";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
