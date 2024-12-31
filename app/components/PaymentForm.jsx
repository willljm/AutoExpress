'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function PaymentForm({ car, startDate, endDate, ciudad, lugar, precioTotal }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        toast.error('Debes iniciar sesión');
        return;
      }

      // Crear nueva reserva con ID único
      const nuevaReserva = {
        id: Date.now().toString(),
        userId: user.uid,
        userEmail: user.email,
        carTitle: car.title || car.name,
        carImage: car.image || car.photo_url,
        fechaInicio: startDate,
        fechaFin: endDate,
        ciudadRecogida: ciudad,
        lugarRecogida: lugar,
        total: precioTotal,
        status: 'pagado',
        fechaCreacion: new Date().toISOString()
      };

      console.log('Nueva reserva a guardar:', nuevaReserva); // Para debugging

      // Obtener reservas existentes
      const reservasExistentes = JSON.parse(localStorage.getItem('reservas') || '[]');
      
      // Agregar nueva reserva
      const nuevasReservas = [...reservasExistentes, nuevaReserva];
      
      // Guardar en localStorage
      localStorage.setItem('reservas', JSON.stringify(nuevasReservas));

      console.log('Reservas guardadas:', nuevasReservas); // Para debugging

      toast.success('¡Reserva completada con éxito!');
      router.push('/dashboard/reservas');

    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      toast.error('Error al procesar la reserva');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mostrar resumen de la reserva */}
      <div className="p-4 rounded-lg bg-gray-50">
        <h3 className="mb-2 text-lg font-semibold">Resumen de la reserva</h3>
        <p>Vehículo: {car.title || car.name}</p>
        <p>Fecha inicio: {new Date(startDate).toLocaleDateString()}</p>
        <p>Fecha fin: {new Date(endDate).toLocaleDateString()}</p>
        <p>Ciudad: {ciudad}</p>
        <p>Lugar: {lugar}</p>
        <p className="mt-2 text-xl font-bold">Total: ${precioTotal}</p>
      </div>

      {/* Botón de pago */}
      <button
        type="submit"
        className="w-full px-4 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Confirmar y Pagar
      </button>
    </form>
  );
}
