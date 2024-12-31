"use client"
import React from 'react'
import { FaCar, FaMoneyBillWave, FaHeadset, FaShieldAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

function CaracteristicasCard() {
  const caracteristicas = [
    {
      icon: <FaCar className="w-10 h-10 text-gray-800" />,
      titulo: "Flota Moderna",
      descripcion: "Vehículos nuevos y bien mantenidos para su seguridad y confort"
    },
    {
      icon: <FaMoneyBillWave className="w-10 h-10 text-gray-800" />,
      titulo: "Precios Competitivos",
      descripcion: "Tarifas transparentes y opciones para todos los presupuestos"
    },
    {
      icon: <FaHeadset className="w-10 h-10 text-gray-800" />,
      titulo: "Atención 24/7",
      descripcion: "Soporte al cliente disponible en todo momento para ayudarte"
    },
    {
      icon: <FaShieldAlt className="w-10 h-10 text-gray-800" />,
      titulo: "Seguridad Garantizada",
      descripcion: "Todos nuestros vehículos cuentan con seguros completos"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-40 mb-20 bg-white">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-20"
          variants={itemVariants}
        >
          <span className="text-sm uppercase tracking-wider text-gray-500 mb-2 block">Nuestros Beneficios</span>
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            ¿Por qué elegirnos?
          </h2>
          <div className="w-20 h-[1px] bg-gray-200 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {caracteristicas.map((item, index) => (
            <motion.div 
              key={index} 
              className="group"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="mb-6 transform transition-transform duration-300 group-hover:-translate-y-2">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {item.titulo}
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default CaracteristicasCard