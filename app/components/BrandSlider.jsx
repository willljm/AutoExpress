'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const brands = [
  { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
  { name: 'Mercedes', logo: 'https://www.carlogos.org/logo/Mercedes-Benz-logo.png' },
  { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo.png' },
  { name: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo.png' },
  { name: 'Honda', logo: 'https://www.carlogos.org/car-logos/honda-logo.png' },
  { name: 'Ford', logo: 'https://www.carlogos.org/car-logos/ford-logo.png' },
  { name: 'Fiat', logo: 'https://www.carlogos.org/car-logos/fiat-logo.png' },
  { name: 'Porsche', logo: 'https://www.carlogos.org/car-logos/porsche-logo.png' },
  { name: 'Chevrolet', logo: 'https://www.carlogos.org/car-logos/chevrolet-logo.png' },
  { name: 'Dodge', logo: 'https://www.carlogos.org/car-logos/dodge-logo.png' },
  { name: 'Jaguar', logo: 'https://www.carlogos.org/car-logos/jaguar-logo.png' },
  { name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo.png' },
  { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
  { name: 'Ferrari', logo: 'https://www.carlogos.org/logo/Ferrari-logo.png' },
  { name: 'Lamborghini', logo: 'https://www.carlogos.org/car-logos/lamborghini-logo.png' },
  { name: 'Maserati', logo: 'https://www.carlogos.org/car-logos/maserati-logo.png' },
  { name: 'Aston Martin', logo: 'https://www.carlogos.org/car-logos/aston-martin-logo.png' },
  { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/mazda-logo.png' },
  { name: 'Kia', logo: 'https://www.carlogos.org/car-logos/kia-logo.png' },
  { name: 'Mercedes', logo: 'https://www.carlogos.org/logo/Tesla-logo.png' },
  
];

function BrandSlider() {
  return (
    <div className="pt-10 pb-40">
      <div className="max-w-5xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          speed={800} // Velocidad de transición más rápida
          autoplay={{
            delay: 1500, // Reducido de 2500 a 1500
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center p-4">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`}
                  className="h-20 w-auto object-contain transition-all hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BrandSlider;