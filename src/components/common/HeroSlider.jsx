
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function HeroSlider() {

       const images = [
         "/images/adam-marikar-eLWWiDeVFKk-unsplash.jpg",
         "/images/gene-gallin-9utPXzOTrTY-unsplash.jpg",
         "/images/keane-tfkCXjZWBms-unsplash.jpg",
         "/images/patrick-federi-UNpBdFqhl6I-unsplash.jpg"
    ];

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Image Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={2500}
        loop={true}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 z-10"></div>

      {/* Fixed Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Ferry Management System
        </h1>

        <p className="text-xl md:text-2xl mb-8">
          Safe Journey, Happy Voyage
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition">
          Book Your Ticket
        </button>
      </div>
    </div>
  );
}
