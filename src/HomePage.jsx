// src/HomePage.js
import React from "react";
import Hero from "./Hero"; // Hero component
import ProductList from "./ProductList"; // ProductList component
import productData from "./productData"; // Product data

const HomePage = () => {
  return (
    <div>
      <Hero /> {/* Hero Component */}
      <ProductList products={productData} /> {/* Product List Section */}
    </div>
  );
};

export default HomePage;
