'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/app/components/Sidebar'
import toast from 'react-hot-toast'

export default function AllReserves() {
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    const loadReservas = () => {
      const reservasGuardadas = JSON.parse(localStorage.getItem('reservas') || '[]')
      setReservas(reservasGuardadas)
    }
    loadReservas()
  }, [])

  const handleDeleteReserva = (reservaId) => {
    try {
      const reservasActualizadas = reservas.filter(reserva => reserva.id !== reservaId)
      localStorage.setItem('reservas', JSON.stringify(reservasActualizadas))
      setReservas(reservasActualizadas)
      toast.success('Reserva eliminada correctamente')
    } catch (error) {
      toast.error('Error al eliminar la reserva')
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 pl-64">
        <h1 className="mb-6 text-2xl font-bold">Todas las Reservas</h1>
        <div className="grid gap-6">
          {reservas.map((reserva) => (
            <div key={reserva.id} className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{reserva.carTitle}</h3>
                  <p className="text-gray-600">
                    {new Date(reserva.fechaInicio).toLocaleDateString()} - 
                    {new Date(reserva.fechaFin).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Cliente: {reserva.userEmail}</p>
                  <p className="text-gray-600">Ciudad: {reserva.ciudadRecogida}</p>
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
                  onClick={() => handleDeleteReserva(reserva.id)}
                  className="p-2 text-red-600 rounded-lg hover:text-red-800 hover:bg-red-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          {reservas.length === 0 && (
            <p className="text-center text-gray-500">No hay reservas disponibles</p>
          )}
        </div>
      </div>
    </div>
  )
}