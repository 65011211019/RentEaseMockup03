import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper styles import

function ProductCard({ images, title, description, price }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        className="product-image-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <div className="text-lg font-bold text-pink-600">{`฿${price}`} / วัน</div>
      </div>
    </div>
  );
}

export default ProductCard;
