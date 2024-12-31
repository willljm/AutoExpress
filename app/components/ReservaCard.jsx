'use client'

import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ReservaCard({ reserva, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      try {
        onDelete(reserva.id)
        toast.success('Reserva eliminada correctamente')
      } catch (error) {
        toast.error('Error al eliminar la reserva')
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{reserva.carTitle}</h3>
          <p className="text-gray-600">
            {new Date(reserva.fechaInicio).toLocaleDateString()} - 
            {new Date(reserva.fechaFin).toLocaleDateString()}
          </p>
          <p className="font-semibold text-blue-600">${reserva.total}</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            reserva.status === 'confirmado' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {reserva.status}
          </span>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
