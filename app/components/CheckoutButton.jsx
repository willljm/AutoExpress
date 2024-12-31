'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PaymentGateway from './PaymentGateway'

export default function CheckoutButton({ total, reservaDetails }) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    // Simular carga
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setShowPayment(true)
  }

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="flex items-center justify-center w-full gap-2 px-6 py-3 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
      >
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
            <span>Preparando pago...</span>
          </motion.div>
        ) : (
          <span>Proceder al pago</span>
        )}
      </button>

      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PaymentGateway 
              total={total} 
              reservaDetails={reservaDetails}
              onClose={() => setShowPayment(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
