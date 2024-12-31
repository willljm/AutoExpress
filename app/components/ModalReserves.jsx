import { useState } from 'react';
import { MdError } from 'react-icons/md';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PaymentGateway from './PaymentGateway';
import AuthPopup from './AuthPopup'; // Añadir esta importación

const ModalReserves = ({
  showModal,
  setShowModal,
  selectedCar,
  setSelectedCar,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dateRange,
  setDateRange,
  ciudadRecogida,
  setCiudadRecogida,
  ciudadDevolucion,
  setCiudadDevolucion,
  lugarRecogida,
  setLugarRecogida,
  lugarDevolucion,
  setLugarDevolucion,
  errors,
  setErrors,
  calcularTotal,
  calcularDias,
  renderModalButtons,
  ciudadesColombia,
  getSpecIcon,
  showPaymentGateway,
  setShowPaymentGateway,
  reservaDetails,
  setReservaDetails,
  user,
  showAuthPopup,
  setShowAuthPopup
}) => {
  const specTitles = {
    asientos: 'Asientos',
    maletas: 'Maletas',
    bolsas: 'Bolsas',
    transmision: 'Transmisión',
    puertas: 'Puertas',
    edadMinima: 'Edad mínima'
  };

  return (
    <>
      {showModal && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{selectedCar.title}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <img 
                  src={selectedCar.image} 
                  alt={selectedCar.title} 
                  className="object-cover w-full h-48 rounded-lg"
                />
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold text-gray-700">Características:</h4>
                  {Object.entries(selectedCar.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      {getSpecIcon(key)}
                      <span className="text-gray-600">{specTitles[key]}: {value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Ubicación de recogida */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-semibold text-gray-700">
                    Ubicación de recogida
                    {errors.ciudadRecogida && (
                      <MdError className="text-red-500" title="Campo requerido" />
                    )}
                  </h4>
                  <select
                    value={ciudadRecogida}
                    onChange={(e) => setCiudadRecogida(e.target.value)}
                    className={`w-full p-2 border rounded-lg ${
                      errors.ciudadRecogida ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {ciudadesColombia.map(ciudad => (
                      <option key={ciudad.id} value={ciudad.id}>
                        {ciudad.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.ciudadRecogida && (
                    <p className="flex items-center gap-1 text-sm text-red-500">
                      <MdError /> Selecciona una ciudad de recogida
                    </p>
                  )}
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="aeropuerto"
                        checked={lugarRecogida === 'aeropuerto'}
                        onChange={(e) => setLugarRecogida(e.target.value)}
                        className="mr-2"
                      />
                      Aeropuerto
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="ciudad"
                        checked={lugarRecogida === 'ciudad'}
                        onChange={(e) => setLugarRecogida(e.target.value)}
                        className="mr-2"
                      />
                      Centro de la ciudad
                    </label>
                  </div>
                </div>

                {/* Ubicación de devolución */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-semibold text-gray-700">
                    Ubicación de devolución
                    {errors.ciudadDevolucion && (
                      <MdError className="text-red-500" title="Campo requerido" />
                    )}
                  </h4>
                  <select
                    value={ciudadDevolucion}
                    onChange={(e) => setCiudadDevolucion(e.target.value)}
                    className={`w-full p-2 border rounded-lg ${
                      errors.ciudadDevolucion ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {ciudadesColombia.map(ciudad => (
                      <option key={ciudad.id} value={ciudad.id}>
                        {ciudad.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.ciudadDevolucion && (
                    <p className="flex items-center gap-1 text-sm text-red-500">
                      <MdError /> Selecciona una ciudad de devolución
                    </p>
                  )}
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="aeropuerto"
                        checked={lugarDevolucion === 'aeropuerto'}
                        onChange={(e) => setLugarDevolucion(e.target.value)}
                        className="mr-2"
                      />
                      Aeropuerto
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="ciudad"
                        checked={lugarDevolucion === 'ciudad'}
                        onChange={(e) => setLugarDevolucion(e.target.value)}
                        className="mr-2"
                      />
                      Centro de la ciudad
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                    Selecciona las fechas
                    {errors.fechas && (
                      <MdError className="text-red-500" title="Campo requerido" />
                    )}
                  </h4>
                  <Calendar
                    selectRange={true}
                    minDate={new Date()}
                    value={dateRange}
                    onChange={(range) => {
                      setDateRange(range);
                      setStartDate(range[0]);
                      setEndDate(range[1]);
                    }}
                    className={`w-full shadow-sm ${
                      errors.fechas ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    locale="es-ES"
                    tileDisabled={({ date }) => date < new Date()}
                  />
                  {errors.fechas && (
                    <p className="flex items-center gap-1 text-sm text-red-500">
                      <MdError /> Selecciona las fechas de reserva
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>Precio por día:</span>
                    <span>${selectedCar.precio}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>Días seleccionados:</span>
                    <span>{calcularDias()} días</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total:</span>
                    <span>${calcularTotal()}</span>
                  </div>
                  {calcularTotal() === 0 && (
                    <p className="mt-2 text-sm text-red-500">
                      Selecciona al menos un día para continuar
                    </p>
                  )}
                </div>

                {/* Botón de pago corregido */}
                {renderModalButtons()}

                {/* Validación adicional */}
                {!ciudadRecogida && (
                  <p className="text-sm text-red-500">
                    Selecciona una ciudad de recogida
                  </p>
                )}
                {!ciudadDevolucion && (
                  <p className="text-sm text-red-500">
                    Selecciona una ciudad de devolución
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthPopup isOpen={showAuthPopup} onClose={() => setShowAuthPopup(false)} />

      {showPaymentGateway && reservaDetails && (
        <PaymentGateway
          car={selectedCar} 
          startDate={startDate}
          endDate={endDate}
          ciudad={ciudadRecogida}
          lugar={lugarRecogida}
          precioTotal={calcularTotal()}
          onClose={() => {
            setShowPaymentGateway(false);
            setReservaDetails(null);
          }}
          reservaDetails={reservaDetails}
        />
      )}
    </>
  );
};

export default ModalReserves;