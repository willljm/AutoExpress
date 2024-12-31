'use client'
import React from 'react'
import { motion } from 'framer-motion'
import CardsCar from './components/CardsCar'
import Navbar from './components/Navbar'
import BrandSlider from './components/BrandSlider'
import Caracteristicas from './components/Caracteristicas'
import ModalCar from './components/ModalCar'
import Footer from './components/Footer'
import Link from 'next/link'
import Image from 'next/image'

function Homepage() {
  return (
    <div>
      <Navbar />

      <section className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
            alt="Fondo" 
            className="object-cover w-full h-full"
            width={1920}  
            height={1080} 
            quality={100}  
            priority
            unoptimized={process.env.NODE_ENV === 'development'}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="max-w-4xl px-4 mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 text-6xl font-bold text-white drop-shadow-md"
            >
              Renta el carro de <br /> 
              tus sueños <span className="text-blue-600">ahora</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-12 text-xl text-gray-100 drop-shadow"
            >
              Elija entre nuestra amplia selección de vehículos premium.<br />
              Reserva fácilmente y conduce con estilo.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex items-center justify-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/catalogo" 
                  className="px-8 py-4 text-white transition-colors rounded-lg bg-blue-600/90 hover:bg-blue-700 backdrop-blur-sm"
                >
                  Ver Catálogo
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/about" 
                  className="px-8 py-4 text-white transition-colors border-2 rounded-lg border-white/70 hover:bg-white/10 backdrop-blur-sm"
                >
                  Conócenos
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute left-0 right-0 -bottom-7">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320" 
            className="w-full"
            preserveAspectRatio="none"
            style={{ height: '150px' }}  
            >
            <path 
              fill="#F9FAFB" 
              fillOpacity="1" 
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="relative bg-gray-50">
        <div className="pt-24"> 
          <BrandSlider />
        </div>
      </section>

      
      <section className="bg-gray-50">
        <CardsCar />
      </section>
      <section className="py-20 bg-white">
        <ModalCar/>
      </section>
      
      <section className="bg-white">
        <Caracteristicas />
      </section>

      <Footer />
    </div>
  )
}

export default Homepage
