"use client"
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { FaCalendar, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { reservasStorage } from '@/utils/reservasStorage'; // Agregar esta importación

export default function CarsReservesPage() {
  const { user } = useAuth();
  const [misReservas, setMisReservas] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const cargarReservas = () => {
      if (!user) return;

      // Obtener todas las reservas del localStorage
      const reservasUsuario = reservasStorage.obtenerReservas(user.uid);
      console.log('Reservas cargadas:', reservasUsuario); // Para debugging

      if (reservasUsuario && reservasUsuario.length > 0) {
        setMisReservas(reservasUsuario);
      }
    };

    if (user) {
      cargarReservas();
    }
  }, [user]);

  // Para debugging - ver qué usuario está activo
  useEffect(() => {
    if (user) {
      console.log('Usuario actual:', user.uid);
    }
  }, [user]);

  const eliminarReserva = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar esta reserva?');
    if (confirmacion) {
      const todasLasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      const reservasActualizadas = todasLasReservas.filter(reserva => reserva.id !== id);
      localStorage.setItem('reservas', JSON.stringify(reservasActualizadas));
      cargarMisReservas();
      toast.success('Reserva eliminada con éxito');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pt-20 pl-64">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Mis Reservas</h1>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="all">Todas</option>
              <option value="pendiente">Pendientes</option>
              <option value="confirmado">Confirmadas</option>
              <option value="completado">Completadas</option>
            </select>
          </div>

          <div className="space-y-4">
            {misReservas
              .filter(reserva => filterStatus === 'all' || reserva.status === filterStatus)
              .map((reserva) => (
                <div key={reserva.id} className="p-6 bg-white rounded-lg shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img 
                        src={reserva.carImage} 
                        alt={reserva.carTitle}
                        className="object-cover w-32 h-24 rounded-lg"
                      />
                      <div>
                        <h3 className="mb-2 text-xl font-semibold">{reserva.carTitle}</h3>
                        <div className="space-y-1 text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-blue-500" />
                            <span>{new Date(reserva.fechaInicio).toLocaleDateString()} - {new Date(reserva.fechaFin).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-500" />
                            <span>{reserva.ciudadRecogida} ({reserva.lugarRecogida})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        reserva.status === 'confirmado' 
                          ? 'bg-green-100 text-green-800'
                          : reserva.status === 'completado'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reserva.status === 'confirmado' ? 'Confirmado' : 
                         reserva.status === 'completado' ? 'Completado' : 'Pendiente'}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold">${reserva.total}</span>
                        <button
                          onClick={() => eliminarReserva(reserva.id)}
                          className="p-2 text-red-600 rounded-full hover:text-red-800 hover:bg-red-50"
                          title="Eliminar reserva"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {misReservas.length === 0 && (
              <div className="py-12 text-center bg-white rounded-lg">
                <p className="mb-4 text-gray-500">No tienes reservas actualmente</p>
                <a href="/catalogo" className="text-blue-600 hover:underline">
                  Ver catálogo de vehículos
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
