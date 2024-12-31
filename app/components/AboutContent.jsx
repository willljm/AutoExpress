"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function AboutContent() {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="py-20"
    >
      {/* Hero Section con gradiente */}
      <motion.div 
        variants={fadeIn}
        className="relative h-[400px] mb-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-4 text-5xl font-bold">Sobre AutoExpress</h1>
          <p className="text-xl">Pasión por los autos desde 2010</p>
        </div>
      </motion.div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Estadísticas */}
        <motion.div 
          variants={fadeIn}
          className="grid grid-cols-1 gap-8 mb-20 md:grid-cols-3"
        >
          <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-center">10+ Años</h3>
            <p className="text-center text-gray-600">De experiencia en el mercado</p>
          </div>

          <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-center">10,000+</h3>
            <p className="text-center text-gray-600">Clientes satisfechos</p>
          </div>

          <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-center">98%</h3>
            <p className="text-center text-gray-600">Índice de satisfacción</p>
          </div>
        </motion.div>

        {/* Nuestra Historia */}
        <motion.div 
          variants={fadeIn}
          className="grid items-center grid-cols-1 gap-16 mb-20 lg:grid-cols-2"
        >
          <div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900">Nuestra Historia</h2>
            <p className="mb-6 text-lg text-gray-600">
              Desde nuestros humildes inicios en 2010, hemos crecido hasta convertirnos
              en el referente del mercado automotriz en la región.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Más de 10,000 vehículos vendidos
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                98% de clientes satisfechos
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Presencia en 5 ciudades principales
              </li>
            </ul>
          </div>
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/AUTOEXPRESS.png"
              alt="Nuestra Historia"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Sede Principal */}
        <motion.div 
          variants={fadeIn}
          className="grid items-center grid-cols-1 gap-16 mb-20 lg:grid-cols-2"
        >
          <div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900">Sede Principal</h2>
            <p className="mb-6 text-lg text-gray-600">
              Nuestra sede principal, ubicada en el corazón de la ciudad, cuenta con:
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="p-2 mr-3 text-white bg-blue-600 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Showroom de 2000m² con los últimos modelos
              </li>
              <li className="flex items-center">
                <span className="p-2 mr-3 text-white bg-blue-600 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Taller de servicio premium
              </li>
              <li className="flex items-center">
                <span className="p-2 mr-3 text-white bg-blue-600 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Zona de prueba de manejo
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-lg shadow-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <h3 className="mb-4 text-2xl font-bold text-white">Visítanos</h3>
              <div className="space-y-3 text-white/90">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Av. Principal #123
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lun - Sáb: 9:00 - 18:00
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +58 (212) 555-0123
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Valores con nuevo diseño */}
        <motion.div 
          variants={fadeIn}
          className="p-12 mb-20 text-white shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl"
        >
          <h2 className="mb-12 text-4xl font-bold text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Integridad",
                description: "Transparencia en cada transacción",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              },
              {
                title: "Excelencia",
                description: "Calidad en cada servicio",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              },
              {
                title: "Innovación",
                description: "Siempre a la vanguardia",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              }
            ].map((valor, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 text-center transition-colors duration-300 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex justify-center mb-4"
                >
                  <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {valor.icon}
                  </svg>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold">{valor.title}</h3>
                <p className="text-blue-200">{valor.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
