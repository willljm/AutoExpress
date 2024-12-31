'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/context/AuthContext'

export default function AuthPopup({ isOpen, onClose }) {
  const { loginWithGoogle } = useAuth()

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      onClose()
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="p-6 bg-white rounded-xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full gap-3 px-4 py-3 text-gray-700 transition-all duration-300 bg-white border-2 rounded-lg hover:bg-gray-50 hover:border-blue-600 group"
            >
              <FcGoogle className="w-6 h-6" />
              <span className="font-medium group-hover:text-blue-600">
                Continuar con Google
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
