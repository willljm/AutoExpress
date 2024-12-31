"use client"
import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Footer() {
  const footerVariants = {
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
    <motion.footer 
      className="relative pt-20 pb-6 text-white bg-gradient-to-b from-gray-800 to-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="flex flex-col items-center mb-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 group">
            <span className="text-3xl font-bold text-white">
              Auto<span className="text-blue-500">Express</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex gap-8 mb-8">
            <Link href="/catalogo" className="text-gray-400 transition-colors hover:text-white">
              Catálogo
            </Link>
            <Link href="/about" className="text-gray-400 transition-colors hover:text-white">
              Nosotros
            </Link>
            <Link href="/favoritos" className="text-gray-400 transition-colors hover:text-white">
              Favoritos
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex gap-6 mb-12">
            {[
              { Icon: FaInstagram, href: '#' },
              { Icon: FaTwitter, href: '#' },
              { Icon: FaFacebookF, href: '#' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors border border-gray-700 rounded-full hover:text-white hover:border-gray-600"
              >
                <social.Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} AutoExpress. Todos los derechos reservados.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer