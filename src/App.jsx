import React from "react";
import Nav from "./nav";
import Hero from "./Hero"; // Hero component
import ProductList from "./ProductList"; // Import ProductList component
import productData from "./productData"; // Import product data
import Footer from "./Footer"; // Import Footer component

function App() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col relative">
      {/* Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-to-black-start to-pink-to-black-end rounded-b-[20rem] z-[-1]"></div>

      {/* Header (Nav) */}
      <Nav />

      {/* Main Content Wrapper */}
      <Hero /> {/* Hero Component here */}

      {/* Product List Section */}
      <ProductList products={productData} /> {/* Pass the product data to ProductList */}

      {/* Footer Section */}
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default App;
