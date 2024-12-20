import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentStartDate, setRentStartDate] = useState("");
  const [rentEndDate, setRentEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productImages, setProductImages] = useState([]); // Store product images
  const [rentalDays, setRentalDays] = useState(0); // Store rental days

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://rent-ease-api-beta.vercel.app/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct({
          id: data.product_id,
          title: data.product_name,
          description: data.product_desc,
          price: data.product_price,
          stock: data.stock,
          available: data.product_available,
          userId: data.user_id,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchProductImages = async () => {
      try {
        const response = await fetch(`https://rent-ease-api-beta.vercel.app/api/productimages`);
        if (!response.ok) {
          throw new Error("Failed to fetch product images");
        }
        const data = await response.json();
        const images = data.filter((image) => image.product_id === parseInt(id));
        setProductImages(images.map((image) => image.product_image_url));
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`https://rent-ease-api-beta.vercel.app/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUser({
          id: data.user_id,
          name: data.user_name,
          email: data.user_email,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch product, images, and user
    const loadData = async () => {
      await fetchProduct();
      await fetchProductImages();
      if (product && product.userId) {
        await fetchUser(product.userId);
      }
    };

    loadData();
  }, [id, product?.userId]);

  const calculateTotalPrice = () => {
    if (rentStartDate && rentEndDate) {
      const start = new Date(rentStartDate);
      const end = new Date(rentEndDate);
      const days = (end - start) / (1000 * 60 * 60 * 24); // Calculate difference in days
      const validDays = days > 0 ? days : 0; // Ensure non-negative days
      setRentalDays(validDays); // Set rental days
      setTotalPrice(validDays * product.price * quantity);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [rentStartDate, rentEndDate, quantity]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase" && prev < product.stock) return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  if (loading) {
    return <div className="text-center text-white">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section with Swiper Carousel */}
        <div className="md:w-1/2 relative">
          <Swiper spaceBetween={10} slidesPerView={1} loop={true} autoplay={{ delay: 3000 }}>
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-96 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Link
            to="/"
            className="absolute top-4 left-4 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-all"
          >
            &larr; กลับไปหน้าแรก
          </Link>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 bg-white space-y-6">
          <h1 className="text-4xl font-semibold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <div className="text-3xl font-bold text-pink-600">{`฿${product.price} / วัน`}</div>

          {/* User Section */}
          {user && (
            <div className="text-gray-600 text-sm">
              <p>ผู้ปล่อยเช่า: <span className="font-medium">{user.name}</span></p>
              <p>อีเมล: <span className="font-medium">{user.email}</span></p>
            </div>
          )}

          {/* Quantity Section */}
          <div className="flex items-center gap-6">
            <button
              className="bg-pink-300 px-4 py-2 rounded-lg text-white hover:bg-pink-400 transition"
              onClick={() => handleQuantityChange("decrease")}
            >
              -
            </button>
            <span className="text-xl font-medium">{quantity}</span>
            <button
              className="bg-pink-300 px-4 py-2 rounded-lg text-white hover:bg-pink-400 transition"
              onClick={() => handleQuantityChange("increase")}
            >
              +
            </button>
          </div>

          {/* Rent Date Section */}
          <div className="flex flex-col gap-4">
            <label>
              <span className="text-sm font-medium text-gray-700">วันที่เริ่มเช่า</span>
              <input
                type="date"
                value={rentStartDate}
                onChange={(e) => setRentStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </label>
            <label>
              <span className="text-sm font-medium text-gray-700">วันที่สิ้นสุดการเช่า</span>
              <input
                type="date"
                value={rentEndDate}
                onChange={(e) => setRentEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </label>
          </div>

          {/* Total Price */}
          <div className="text-2xl font-semibold text-gray-800">
            ราคารวม: {totalPrice > 0 ? `฿${totalPrice}` : "กรุณาเลือกวันที่เช่า"}
          </div>

          {/* Rental Days */}
          <div className="text-lg text-gray-600">
            {rentalDays > 0 ? `ระยะเวลากี่วัน: ${rentalDays} วัน` : "กรุณาเลือกวันที่เช่า"}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="w-1/2 bg-pink-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-pink-700 transition"
              onClick={() => alert("เพิ่มสินค้าลงในรถเข็นเรียบร้อย!")}
            >
              เพิ่มในรถเข็น
            </button>
            <button
              className="w-1/2 bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => alert("เริ่มการเช่าสินค้า!")}
            >
              เช่าสินค้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
