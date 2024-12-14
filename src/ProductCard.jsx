import React from "react";

function ProductCard({ image, title, description, price }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full flex flex-col"> 
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center"
      />

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between"> 
        {/* Product Title */}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2> 

        {/* Product Description */}
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {description}
        </p>

        {/* Product Price */}
        <p className="text-lg font-semibold text-pink-500 mt-4">{price}</p>
      </div>

      {/* Button to view more or add to cart */}
      <div className="flex justify-between items-center space-x-2 p-4 mt-4"> 
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm sm:text-base transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
          Add to Cart
        </button>
        <button className="bg-transparent border-2 border-gray-500 text-gray-500 px-4 py-2 rounded-md text-sm sm:text-base transform transition duration-300 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
