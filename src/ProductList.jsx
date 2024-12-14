import React from "react";
import ProductCard from "./ProductCard"; // Import the ProductCard component

function ProductList({ products }) {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
        สินค้าแนะนำ
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
