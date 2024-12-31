'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast, { Toaster } from 'react-hot-toast'

function Reservas() {
  const { user } = useAuth()
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    if (!user) return;

    // Cargar todas las reservas del localStorage
    const todasLasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const reservasUsuario = todasLasReservas.filter(
      reserva => reserva.userId === user.uid
    );

    setReservas(reservasUsuario);
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className="pt-20 pb-20 mx-auto  max-w-7xl sm:px-6">
        <h1 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">Mis Reservas</h1>
        {reservas.length === 0 ? (
          <div className="py-8 text-center md:py-12">
            <h2 className="text-xl font-medium text-gray-600 md:text-2xl">No tienes reservas activas</h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">Reserva un vehículo para verlo aquí</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="overflow-hidden bg-white rounded-lg shadow-md md:rounded-2xl">
                <div className="relative h-48 md:h-64">
                  <img
                    src={reserva.carImage}
                    alt={reserva.carTitle}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="mb-2 text-lg font-semibold md:text-xl">{reserva.carTitle}</h3>
                  <p className="mb-4 text-xl font-bold text-blue-600 md:text-2xl">${reserva.total}</p>
                  <div className="space-y-2 text-sm md:text-base">
                    <p className="text-gray-600">Fecha inicio: {new Date(reserva.fechaInicio).toLocaleDateString()}</p>
                    <p className="text-gray-600">Fecha fin: {new Date(reserva.fechaFin).toLocaleDateString()}</p>
                    <p className="text-gray-600">Ciudad recogida: {reserva.ciudadRecogida}</p>
                    <p className="text-gray-600">Ciudad devolución: {reserva.ciudadDevolucion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Reservas
