'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase' 
import { MdPayment, MdAccessTime, MdCheck } from 'react-icons/md'
import { FaMobile, FaMoneyBill, FaUniversity, FaCreditCard, FaQrcode } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'

export default function PaymentGateway({ 
  car, 
  startDate, 
  endDate, 
  ciudad, 
  lugar, 
  precioTotal, 
  onClose,
  reservaDetails 
}) {
  const router = useRouter();
  const { user } = useAuth()
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'nequi',
      name: 'Nequi',
      icon: <FaMobile className="w-6 h-6" />,
      color: 'bg-pink-600',
      number: '300 123 4567',
      description: 'Paga desde tu app Nequi escaneando el código QR'
    },
    {
      id: 'bancolombia',
      name: 'Bancolombia',
      icon: <FaUniversity className="w-6 h-6" />,
      color: 'bg-yellow-500',
      number: '1234-5678-9012-3456',
      description: 'Transferencia bancaria a cuenta de ahorros'
    },
    {
      id: 'efectivo',
      name: 'Efectivo',
      icon: <FaMoneyBill className="w-6 h-6" />,
      color: 'bg-green-600',
      code: 'PAY-123456789',
      description: 'Paga en efectivo en cualquier punto autorizado'
    }
  ];

  const handleCompletePurchase = async () => {
    try {
      setIsProcessing(true);
      
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 5000));

      const orderData = {
        car_id: reservaDetails.car.id,
        car_name: reservaDetails.carTitle,
        user_id: user.uid,
        status: 'pagado',
        ciudad_recogida: reservaDetails.ciudadRecogida,
        ciudad_devolucion: reservaDetails.ciudadDevolucion,
        lugar_recogida: reservaDetails.lugarRecogida,
        lugar_devolucion: reservaDetails.lugarDevolucion,
        fecha_inicio: new Date(reservaDetails.fechaInicio).toISOString(),
        fecha_fin: new Date(reservaDetails.fechaFin).toISOString(),
        total: precioTotal.toString() // Usar precioTotal en lugar de total
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      // Guardar la reserva en localStorage
      const reservasActuales = JSON.parse(localStorage.getItem('reservas') || '[]');
      const nuevasReservas = [...reservasActuales, { ...reservaDetails, userId: user.uid }];
      localStorage.setItem('reservas', JSON.stringify(nuevasReservas));

      toast.success('¡Pago realizado con éxito!');
      await new Promise(resolve => setTimeout(resolve, 2000));

      onClose();
      router.push('/dashboard/reservas');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const { error } = await supabase
        .from('reservas')
        .insert([{
          user_id: user.id,
          car_id: reservaDetails.car.id,
          fecha_inicio: reservaDetails.fechaInicio,
          fecha_fin: reservaDetails.fechaFin,
          ciudad_recogida: reservaDetails.ciudadRecogida,
          ciudad_devolucion: reservaDetails.ciudadDevolucion,
          total: reservaDetails.total,
          status: 'completada'
        }]);

      if (error) throw error;

      toast.success('¡Pago exitoso!');
      router.push('/dashboard/reservas');
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      toast.error('Error al procesar la reserva');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Realizar Pago</h2>
            {!isProcessing && (
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="p-4 mb-6 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Resumen de la reserva</h3>
                <span className="text-2xl font-bold text-blue-600">${precioTotal}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Vehículo: {reservaDetails.carTitle}</p>
                <p>Fecha: {new Date(reservaDetails.fechaInicio).toLocaleDateString()} - {new Date(reservaDetails.fechaFin).toLocaleDateString()}</p>
                <p>Lugar: {reservaDetails.ciudadRecogida}</p>
              </div>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setPaymentMethod(method.id);
                    setStep(2);
                  }}
                  disabled={isProcessing}
                  className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-colors ${
                    paymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-600'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${method.color} text-white`}>
                    {method.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {step === 2 && paymentMethod && (
            <div className="pt-6 border-t">
              {paymentMethod === 'efectivo' ? (
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-4 mb-4">
                    <FaQrcode className="w-32 h-32 text-gray-400" />
                    <div>
                      <p className="mb-2 font-medium">Código de pago:</p>
                      <div className="font-mono text-lg font-bold">{paymentMethods[2].code}</div>
                      <p className="mt-2 text-sm text-gray-500">
                        Presenta este código en cualquier punto de pago autorizado
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MdAccessTime />
                    <span>El código expira en 24 horas</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-4">
                    <FaQrcode className="w-32 h-32 text-gray-400" />
                    <div>
                      <p className="mb-2 font-medium">Transfiere a:</p>
                      <div className="font-mono text-lg font-bold">
                        {paymentMethod === 'nequi' ? paymentMethods[0].number : paymentMethods[1].number}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Escanea el código QR desde tu app o realiza la transferencia manual
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {step === 2 && paymentMethod && (
          <div className="p-6 bg-white border-t">
            <button
              onClick={handleCompletePurchase}
              disabled={isProcessing}
              className="flex items-center justify-center w-full gap-2 py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <FaCreditCard />
                  <span>Confirmar Pago</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
