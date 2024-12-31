'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { reservasStorage } from '@/utils/reservasStorage';

export default function ReservasPage() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const cargarReservas = () => {
      try {
        if (!user) return;
        
        // Cargar todas las reservas
        const todasLasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
        console.log('Todas las reservas:', todasLasReservas); // Para debugging
        
        // Filtrar por usuario actual
        const reservasUsuario = todasLasReservas.filter(
          reserva => reserva.userId === user.uid
        );
        console.log('Reservas del usuario:', reservasUsuario); // Para debugging
        console.log('ID del usuario actual:', user.uid); // Para debugging
        
        setReservas(reservasUsuario);
        
        // Calcular total
        const total = reservasUsuario.reduce(
          (sum, r) => sum + (Number(r.total) || 0), 
          0
        );
        setTotalAmount(total);
        
      } catch (error) {
        console.error('Error al cargar reservas:', error);
        toast.error('Error al cargar las reservas');
      }
    };

    cargarReservas();
  }, [user]);

  const eliminarReserva = (id) => {
    try {
      reservasStorage.eliminarReserva(id);
      const reservasActualizadas = reservasStorage.obtenerReservas(user.uid);
      setReservas(reservasActualizadas);
      const nuevoTotal = reservasActualizadas.reduce(
        (sum, r) => sum + (Number(r.total) || 0), 
        0
      );
      setTotalAmount(nuevoTotal);
      toast.success('Reserva eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
      toast.error('Error al eliminar la reserva');
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pt-4 ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Estadísticas */}
          <div className="mb-8">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">Todas las Reservas</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-6 bg-white shadow-sm rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaCar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Reservas</p>
                    <p className="text-2xl font-bold">{reservas.length}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white shadow-sm rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaMoneyBillWave className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Ingresos</p>
                    <p className="text-2xl font-bold">${totalAmount}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white shadow-sm rounded-xl">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="all">Todas las reservas</option>
                  <option value="pagado">Pagadas</option>
                  <option value="pendiente">Pendientes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de Reservas */}
          <div className="overflow-hidden bg-white shadow-sm rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Vehículo</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Cliente</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Fechas</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Ubicación</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reservas
                    .filter(reserva => filterStatus === 'all' || reserva.status === filterStatus)
                    .map((reserva) => (
                      <tr key={reserva.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img src={reserva.carImage} alt="" className="object-cover w-10 h-10 rounded-lg" />
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{reserva.carTitle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {reserva.userEmail || 'Usuario'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400" />
                            {new Date(reserva.fechaInicio).toLocaleDateString()} - {new Date(reserva.fechaFin).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400" />
                            {reserva.ciudadRecogida}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            reserva.status === 'pagado' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reserva.status === 'pagado' ? 'Pagado' : 'Pendiente'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          ${reserva.total}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => eliminarReserva(reserva.id)}
                            className="px-2 py-1 text-xs text-white bg-red-500 rounded-full"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}