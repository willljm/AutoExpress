'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PaymentGateway from './PaymentGateway'

export default function PaymentButton({ total, reservaDetails }) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setShowPayment(true)
  }

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="p-8 text-center bg-white rounded-lg">
            <div className="w-16 h-16 mb-4 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
            <p className="text-lg font-medium text-gray-800">Preparando pago...</p>
          </div>
        </div>
      ) : showPayment ? (
        <PaymentGateway
          total={total}
          reservaDetails={reservaDetails}
          onClose={() => setShowPayment(false)}
        />
      ) : (
        <button
          onClick={handlePayment}
          className="w-full py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          Proceder al pago
        </button>
      )}
    </>
  )
}
