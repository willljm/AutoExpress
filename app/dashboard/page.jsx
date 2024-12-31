'use client'
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { FaCar, FaMoneyBillWave, FaUserFriends, FaCalendarCheck } from 'react-icons/fa';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalReservas: 0,
    reservasActivas: 0,
    ingresoTotal: 0,
    clientesActivos: 0
  });

  useEffect(() => {
    if (!user) return;

    // Cargar datos del localStorage
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const reservasUsuario = reservas.filter(r => r.userId === user.uid);
    const ahora = new Date();

    // Calcular estadísticas
    const activas = reservasUsuario.filter(
      r => new Date(r.fechaFin) > ahora
    );

    setStats({
      totalReservas: reservasUsuario.length,
      reservasActivas: activas.length,
      ingresoTotal: reservasUsuario.reduce((sum, r) => sum + (Number(r.total) || 0), 0),
      clientesActivos: activas.length
    });
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="mb-8 text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Reservas */}
        <div className="p-6 bg-white shadow-sm rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaCar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reservas</p>
              <p className="text-2xl font-bold">{stats.totalReservas}</p>
            </div>
          </div>
        </div>

        {/* Reservas Activas */}
        <div className="p-6 bg-white shadow-sm rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaCalendarCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reservas Activas</p>
              <p className="text-2xl font-bold">{stats.reservasActivas}</p>
            </div>
          </div>
        </div>

        {/* Ingreso Total */}
        <div className="p-6 bg-white shadow-sm rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaMoneyBillWave className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ingreso Total</p>
              <p className="text-2xl font-bold">${stats.ingresoTotal}</p>
            </div>
          </div>
        </div>

        {/* Clientes Activos */}
        <div className="p-6 bg-white shadow-sm rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaUserFriends className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clientes Activos</p>
              <p className="text-2xl font-bold">{stats.clientesActivos}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Área de bienvenida */}
      <div className="p-6 bg-white shadow-sm rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800">
          ¡Bienvenido, {user?.displayName || 'Usuario'}!
        </h2>
        <p className="mt-2 text-gray-600">
          Aquí podrás gestionar tus reservas y ver el estado de tus servicios.
        </p>
      </div>
    </div>
  );
}
