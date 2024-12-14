import React from "react";

function Hero() {
  return (
    <div className="relative flex flex-col items-center text-white px-4 sm:px-6 md:px-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500 to-black z-[-1]"></div>

      {/* Hero Section */}
      <section className="text-center mt-16 sm:mt-20 md:mt-32 lg:mt-40 px-6 sm:px-12">
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white mb-4">
          Rent <span className="text-gradient-start">Ease</span>
        </h1>

        {/* Hero Description */}
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto mb-8">
          "เช่าง่าย ได้ทุกอย่าง ประหยัดทุกบาท! แพลตฟอร์มเช่าของใช้ที่คุณต้องลอง"
        </p>

        {/* Button Section */}
        <div className="flex justify-center gap-6">
          {/* Sign Up Button */}
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg sm:text-xl font-semibold transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-lg">
            สมัครสมาชิก
          </button>

          {/* View Demo Button */}
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg sm:text-xl font-semibold transform transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-lg">
            ดูสินค้าทั้งหมด
          </button>
        </div>
      </section>
    </div>
  );
}

export default Hero;
