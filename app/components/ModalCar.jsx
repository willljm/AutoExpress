"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function ModalCar() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-full py-32 bg-gradient-to-b from-white to-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '30px 30px'
            }}/>
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center p-12">
            {/* Contenido de texto */}
            <div className="text-white space-y-6">
              <span className="text-blue-200 text-sm font-medium tracking-wider uppercase">
                Descubre la Libertad
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Encuentra el Vehículo <br />
                Perfecto para Ti
              </h2>
              <p className="text-blue-100 text-lg">
                Explora nuestra amplia selección de vehículos y encuentra el que mejor se adapte a tus necesidades. Desde económicos hasta lujo, tenemos lo que buscas.
              </p>
              <div className="flex gap-4 pt-4">
                <Link 
                  href="/catalogo"
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                >
                  Ver Catálogo
                </Link>
                <Link
                  href="/about"
                  className="border border-white/30 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
                >
                  Conoce Más
                </Link>
              </div>
            </div>

            {/* Imagen del carro */}
            <div className="relative">
              <img
                src="https://www.sixt.com/fileadmin2/files/global/sideview/user_upload/fleet/png/752x500/gmc-acadia-suv-white-2023.png"
                alt="Luxury Car"
                className="w-full transform hover:scale-105 transition-transform duration-500"
                style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))' }}
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-black/20 blur-xl rounded-full"></div>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default ModalCar