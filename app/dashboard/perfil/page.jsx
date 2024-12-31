'use client'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Sidebar from '@/app/components/Sidebar';
import { useState, useEffect } from 'react';
import { cars } from '@/app/components/CardsCar';

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const [reservasActivas, setReservasActivas] = useState([]);
  const [historialReservas, setHistorialReservas] = useState([]);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalReservas, setTotalReservas] = useState(0);
  const [favoritos, setFavoritos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    // Cargar todas las reservas del localStorage
    const todasLasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const reservasUsuario = todasLasReservas.filter(
      reserva => reserva.userId === user.uid
    );

    // Filtrar reservas activas
    const ahora = new Date();
    const activas = reservasUsuario.filter(
      reserva => new Date(reserva.fechaFin) > ahora
    );
    setReservasActivas(activas);

    // Filtrar historial
    const historial = reservasUsuario.filter(
      reserva => new Date(reserva.fechaFin) <= ahora
    );
    setHistorialReservas(historial);

    // Calcular totales
    const ingresoTotal = reservasUsuario.reduce((sum, r) => sum + (Number(r.total) || 0), 0);
    setTotalIngresos(ingresoTotal);
    setTotalReservas(reservasUsuario.length);
    
  }, [user]);

  useEffect(() => {
    // Cargar favoritos
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      const favoritosIds = JSON.parse(favoritosGuardados);
      const carrosFavoritos = cars.filter(car => favoritosIds.includes(car.id));
      setFavoritos(carrosFavoritos);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // Usar la función logout del contexto en lugar de signOut directamente
      localStorage.removeItem('user');
      localStorage.removeItem(`favoritos_${user?.uid}`);
      router.push('/');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pt-16 md:pt-20 ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Información del usuario */}
          <div className="p-4 mb-4 bg-white shadow-sm md:p-6 md:mb-6 rounded-xl md:rounded-2xl">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Perfil" className="w-20 h-20 border-4 border-blue-100 rounded-full" />
              ) : (
                <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white bg-gray-800 rounded-full">
                  {user.displayName?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-center md:text-left">
                <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                  ¡Bienvenido, {user.displayName}!
                </h1>
                <p className="text-sm text-gray-600 md:text-base">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Estadísticas mejoradas */}
          <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-4 md:gap-6">
            <div className="p-6 bg-white rounded-xl">
              <h3 className="mb-2 text-lg font-semibold">Reservas Activas</h3>
              <p className="text-3xl font-bold text-blue-600">{reservasActivas.length}</p>
            </div>
            <div className="p-6 bg-white rounded-xl">
              <h3 className="mb-2 text-lg font-semibold">Vehículos Favoritos</h3>
              <p className="text-3xl font-bold text-purple-600">{favoritos.length}</p>
            </div>
            <div className="p-6 bg-white rounded-xl">
              <h3 className="mb-2 text-lg font-semibold">Total Reservas</h3>
              <p className="text-3xl font-bold text-green-600">{totalReservas}</p>
            </div>
            <div className="p-6 bg-white rounded-xl">
              <h3 className="mb-2 text-lg font-semibold">Total Gastado</h3>
              <p className="text-3xl font-bold text-emerald-600">${totalIngresos}</p>
            </div>
          </div>

          {/* Reservas Activas con estado de pago */}
          <div className="p-4 mb-4 bg-white shadow-sm md:p-6 md:mb-6 rounded-xl md:rounded-2xl">
            <div className="flex flex-col items-start justify-between mb-4 md:flex-row md:items-center">
              <h2 className="text-lg font-bold md:text-xl">Reservas Activas</h2>
              <span className="text-sm text-gray-500">Total: {reservasActivas.length}</span>
            </div>
            {reservasActivas.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {reservasActivas.map((reserva) => (
                  <div key={reserva.id} className="p-4 border rounded-lg">
                    <div className="flex gap-4">
                      <img src={reserva.carImage} alt={reserva.carTitle} className="object-cover w-24 h-24 rounded-lg" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold">{reserva.carTitle}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            reserva.status === 'pagado' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reserva.status === 'pagado' ? 'Pagado' : 'Pendiente'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(reserva.fechaInicio).toLocaleDateString()} - {new Date(reserva.fechaFin).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-blue-600">${reserva.total}</p>
                        <p className="text-sm text-gray-500">
                          Recogida: {reserva.ciudadRecogida} ({reserva.lugarRecogida})
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 md:text-base">No tienes reservas activas</p>
            )}
          </div>

          {/* Vehículos Favoritos */}
          <div className="p-4 mb-4 bg-white shadow-sm md:p-6 md:mb-6 rounded-xl md:rounded-2xl">
            <h2 className="mb-4 text-lg font-bold md:text-xl">Mis Favoritos</h2>
            {favoritos.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {favoritos.map((car) => (
                  <div key={car.id} className="p-4 border rounded-lg">
                    <img src={car.image} alt={car.title} className="object-cover w-full h-32 mb-2 rounded-lg" />
                    <h3 className="font-semibold">{car.title}</h3>
                    <p className="font-semibold text-blue-600">${car.precio}/día</p>
                    <Link 
                      href="/catalogo" 
                      className="block mt-2 text-sm text-blue-600 hover:underline"
                    >
                      Ver detalles
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 md:text-base">No tienes vehículos favoritos</p>
            )}
          </div>

          {/* Historial de Reservas */}
          <div className="p-4 bg-white shadow-sm md:p-6 rounded-xl md:rounded-2xl">
            <h2 className="mb-4 text-lg font-bold md:text-xl">Historial de Reservas</h2>
            {historialReservas.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {historialReservas.map((reserva) => (
                  <div key={reserva.id} className="p-4 border rounded-lg">
                    <div className="flex gap-4">
                      <img src={reserva.carImage} alt={reserva.carTitle} className="object-cover w-24 h-24 rounded-lg" />
                      <div>
                        <h3 className="font-semibold">{reserva.carTitle}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(reserva.fechaInicio).toLocaleDateString()} - {new Date(reserva.fechaFin).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-green-600">Completada</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 md:text-base">No tienes reservas anteriores</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}