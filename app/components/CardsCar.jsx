"use client"

import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';
import AuthPopup from './AuthPopup';
import { motion } from 'framer-motion';
import { useCars } from '@/context/CarsContext';
import { useAuth } from '@/context/AuthContext';  
import { FaUsers, FaSuitcase, FaShoppingBag, FaCog, FaDoorOpen, FaUserClock } from 'react-icons/fa';
import PaymentGateway from './PaymentGateway';
import { supabase } from '@/lib/supabase'
import ModalReserves from './ModalReserves'; 
import FilterCards from './FilterCards';

export const cars = [];

const ciudadesColombia = [
  { id: 'BOG', nombre: 'Bogotá', aeropuerto: 'Aeropuerto El Dorado' },
  { id: 'MDE', nombre: 'Medellín', aeropuerto: 'Aeropuerto José María Córdova' },
  { id: 'CLO', nombre: 'Cali', aeropuerto: 'Aeropuerto Alfonso Bonilla Aragón' },
  { id: 'BAQ', nombre: 'Barranquilla', aeropuerto: 'Aeropuerto Ernesto Cortissoz' },
  { id: 'CTG', nombre: 'Cartagena', aeropuerto: 'Aeropuerto Rafael Núñez' },
  { id: 'SMR', nombre: 'Santa Marta', aeropuerto: 'Aeropuerto Simón Bolívar' },
  { id: 'BGA', nombre: 'Bucaramanga', aeropuerto: 'Aeropuerto Palonegro' },
  { id: 'PEI', nombre: 'Pereira', aeropuerto: 'Aeropuerto Matecaña' }
];

function CardsCar() {
  const { user } = useAuth(); // Añadir este hook
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ordenPrecio, setOrdenPrecio] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [transmision, setTransmision] = useState('');
  const [pasajeros, setPasajeros] = useState('');
  const [edadConductor, setEdadConductor] = useState('');
  const [visibleCars, setVisibleCars] = useState(6);
  const [favoritos, setFavoritos] = useState([]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ciudadRecogida, setCiudadRecogida] = useState('');
  const [ciudadDevolucion, setCiudadDevolucion] = useState('');
  const [lugarRecogida, setLugarRecogida] = useState('aeropuerto'); 
  const [lugarDevolucion, setLugarDevolucion] = useState('aeropuerto');
  const [errors, setErrors] = useState({
    fechas: false,
    ciudadRecogida: false,
    ciudadDevolucion: false
  });
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [reservaDetails, setReservaDetails] = useState(null); // Añadir este estado
  const [dbCars, setDbCars] = useState([]);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('is_public', true);

        if (error) throw error;
        setDbCars(data);
      } catch (error) {
        console.error('Error loading cars:', error);
        toast.error('Error al cargar los carros');
      }
    };

    loadCars();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  useEffect(() => {
    try {
      const favoritosGuardados = localStorage.getItem('favoritos');
      if (!favoritosGuardados) {
        localStorage.setItem('favoritos', JSON.stringify([]));
        setFavoritos([]);
        return;
      }

      const favoritosIds = JSON.parse(favoritosGuardados);
      if (!Array.isArray(favoritosIds)) {
        throw new Error('Formato inválido de favoritos');
      }
      
      setFavoritos(favoritosIds);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      localStorage.setItem('favoritos', JSON.stringify([]));
      setFavoritos([]);
    }
  }, []);

  const toggleFavorito = (car) => {
    try {
      if (!user) {
        setShowAuthPopup(true);
        return;
      }

      const favoritosActuales = JSON.parse(localStorage.getItem('favoritos') || '[]');
      const isCurrentlyFavorite = favoritosActuales.includes(car.id);
      
      let nuevosFavoritos;
      if (isCurrentlyFavorite) {
        nuevosFavoritos = favoritosActuales.filter(id => id !== car.id);
        toast.success('Eliminado de favoritos', {
          position: 'bottom-right',
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        nuevosFavoritos = [...favoritosActuales, car.id];
        toast.success('Añadido a favoritos', {
          position: 'bottom-right',
          icon: '❤️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
      
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      setFavoritos(nuevosFavoritos);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar favoritos', {
        position: 'bottom-right',
        icon: '❌'
      });
    }
  };
  const handleReservar = (car) => {
    const adaptedCar = {
      id: car.id,
      title: car.name,
      image: car.photo_url,
      precio: parseFloat(car.precio),
      specs: {
        asientos: car.asiento,
        maletas: car.maletas,
        bolsas: car.bolsas,
        transmision: car.transmision,
        puertas: car.puertas,
        edadMinima: car.edad_minima
      }
    };
    setSelectedCar(adaptedCar);
    setShowModal(true);
  };

  const calcularTotal = () => {
    if (!selectedCar || !startDate || !endDate) return 0;
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return selectedCar.precio * days;
  };

  const calcularDias = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  // Obtener las opciones de filtros dinámicamente


  const validateForm = () => {
    const newErrors = {
      fechas: !startDate || !endDate || calcularTotal() === 0,
      ciudadRecogida: !ciudadRecogida,
      ciudadDevolucion: !ciudadDevolucion
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleProcederPago = () => {
    if (!validateForm()) {
      toast.error('Por favor completa todos los campos requeridos', {
        duration: 2000,
      });
      return;
    }

    // Crear objeto con detalles de la reserva
    const newReservaDetails = {
      id: crypto.randomUUID(), // Generar un UUID válido
      car: {
        ...selectedCar,
        id: selectedCar.id.toString() // Asegurarnos que el ID sea string
      },
      carTitle: selectedCar.title,
      carImage: selectedCar.image,
      fechaInicio: startDate,
      fechaFin: endDate,
      ciudadRecogida: ciudadesColombia.find(ciudad => ciudad.id === ciudadRecogida)?.nombre,
      ciudadDevolucion: ciudadesColombia.find(ciudad => ciudad.id === ciudadDevolucion)?.nombre,
      lugarRecogida,
      lugarDevolucion,
      total: calcularTotal(),
      status: 'pendiente'
    };

    // Guardar la reserva en localStorage
    const reservasActuales = JSON.parse(localStorage.getItem('reservas') || '[]');
    localStorage.setItem('reservas', JSON.stringify([...reservasActuales, newReservaDetails]));

    // Actualizar el estado con los detalles de la reserva
    setReservaDetails(newReservaDetails);
    setShowModal(false);
    setShowPaymentGateway(true);
  };

  const handleAction = (action, car) => {
    if (!user) {
      setShowAuthPopup(true);
      return;
    }
    
    if (action === 'reserve') {
      // Adaptar el formato del carro para la reserva
      const carForReservation = {
        id: car.id,
        title: car.name,
        image: car.photo_url,
        precio: parseFloat(car.precio),
        specs: {
          asientos: car.asiento || 'No especificado',
          maletas: car.maletas || 'No especificado',
          bolsas: car.bolsas || 'No especificado',
          transmision: car.transmision || 'No especificado',
          puertas: car.puertas || 'No especificado',
          edadMinima: car.edad_minima || 'No especificado'
        }
      };
      setSelectedCar(carForReservation);
      setShowModal(true);
    } else if (action === 'favorite') {
      toggleFavorito(car);
    }
  };

  const renderModalButtons = () => (
    <button
      onClick={handleProcederPago}
      disabled={!ciudadRecogida || !ciudadDevolucion || calcularTotal() === 0}
      className="w-full py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
    >
      Proceder al pago
    </button>
  );
  const FavoriteIcon = ({ isFavorite }) => (
    <svg 
      className={`w-6 h-6 transition-colors duration-300 ${ isFavorite ? 'text-red-500' : 'text-gray-400' }`} 
      fill={isFavorite ? "currentColor" : "none"}    
      stroke="currentColor"
      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke="currentColor"
        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
    </svg>
  );

 

  const specIcons = {
    asientos: <FaUsers className="w-5 h-5 text-blue-600" />,
    maletas: <FaSuitcase className="w-5 h-5 text-blue-600" />,
    bolsas: <FaShoppingBag className="w-5 h-5 text-blue-600" />,
    transmision: <FaCog className="w-5 h-5 text-blue-600" />,
    puertas: <FaDoorOpen className="w-5 h-5 text-blue-600" />,
    edadMinima: <FaUserClock className="w-5 h-5 text-blue-600" />
  };

  const getSpecIcon = (key) => {
    return specIcons[key] || <div className="w-5 h-5 bg-blue-600 rounded-full" />;
  };

const handleFavoriteClick = (e, car) => {
  e.preventDefault();
  if (!user) {
    setShowAuthPopup(true);
    return;
  }
  toggleFavorito(car);
};
;

const renderActionButtons = (car) => (
  <div className="flex gap-3">
    <button 
      onClick={() => handleAction('reserve', car)} 
      className="flex items-center justify-center flex-1 py-3 space-x-2 text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800"
    >
      <span>
        {user ? 'Reservar ahora' : 'Iniciar sesión para reservar'}
      </span>
      <svg  xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path stroke="currentColor"  d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z"/>
      </svg>
    </button>
    <button 
      onClick={(e) => handleFavoriteClick(e, car)}
      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
        favoritos.includes(car.id) && user
          ? 'border-red-500 bg-red-50 text-red-500'
          : 'border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-400 hover:text-red-500'
      }`}
      title={user ? 'Agregar a favoritos' : 'Iniciar sesión para agregar a favoritos'}
    >
      <FavoriteIcon isFavorite={favoritos.includes(car.id)} />
    </button>
  </div>
);

  const renderSpecs = (car) => (
    <>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
          <FaUsers className="w-5 h-5 text-blue-600" />
        </div>
        <span className="text-sm text-gray-600">Asientos: {car.asiento}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
          <FaSuitcase className="w-5 h-5 text-blue-600" />
        </div>
        <span className="text-sm text-gray-600">Maletas: {car.maletas}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
          <FaCog className="w-5 h-5 text-blue-600" />
        </div>
        <span className="text-sm text-gray-600">Transmisión: {car.transmision}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
          <FaDoorOpen className="w-5 h-5 text-blue-600" />
        </div>
        <span className="text-sm text-gray-600">Puertas: {car.puertas}</span>
      </div>
    </>
  );

  const filteredCars = dbCars.filter(car => {
    if (!car) return false;
  
    const pasajerosNum = parseInt(pasajeros?.replace('+', '') || '0');
    const edadNum = parseInt(edadConductor?.replace('+', '') || '0');
  
    return (
      (!tipoVehiculo || car.tipo_vehiculo === tipoVehiculo) &&
      (!pasajeros || parseInt(car.pasajeros) >= pasajerosNum) &&
      (!edadConductor || parseInt(car.edad_minima) >= edadNum)
    );
  }).sort((a, b) => {
    if (ordenPrecio === 'Menor a mayor') return parseFloat(a.precio) - parseFloat(b.precio);
    if (ordenPrecio === 'Mayor a menor') return parseFloat(b.precio) - parseFloat(a.precio);
    return 0;
  });

  return (
    <motion.div 
      className="px-4 bg-gray-50 py-36"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div 
        className="pb-20 mx-auto max-w-7xl"
        variants={headerVariants}
      >
        <h1 className="text-5xl font-bold text-center text-gray-900">
          Encuentra tu automóvil favorito
        </h1>
        <p className="mt-4 text-xl text-center text-gray-900">
          Busca automóviles de alta calidad y precio, con una amplia <br /> variedad de opciones de transmisión y condiciones de servicio.
        </p>
      </motion.div>

      <FilterCards 
        dbCars={dbCars}
        ordenPrecio={ordenPrecio}
        setOrdenPrecio={setOrdenPrecio}
        tipoVehiculo={tipoVehiculo}
        setTipoVehiculo={setTipoVehiculo}
        transmision={transmision}
        setTransmision={setTransmision}
        pasajeros={pasajeros}
        setPasajeros={setPasajeros}
        edadConductor={edadConductor}
        setEdadConductor={setEdadConductor}
      />
  
   
      

      <motion.div 
        className="grid grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredCars.slice(0, visibleCars).map((car) => (
          <motion.div 
            key={car.id} 
            variants={cardVariants}
            className="overflow-hidden transition-all duration-500 bg-white shadow-md group rounded-2xl hover:shadow-xl"
          >
            <div className="relative h-64">
              <img
                src={car.photo_url}
                alt={car.name}
                className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-100 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="mb-2 text-xl font-semibold text-white">{car.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      ${car.precio}/Día
                    </span>
                    <span className="px-3 py-1 text-sm text-white rounded-full bg-green-500/90">
                      Disponible
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {renderSpecs(car)}
              </div>
              {renderActionButtons(car)}
            </div>

          </motion.div>
          
        ))}
      </motion.div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setVisibleCars(prev => Math.min(prev + 3, dbCars.length))} 
          className="px-8 py-3 font-semibold text-blue-600 transition-all duration-300 transform bg-white border-2 border-blue-600 group hover:bg-blue-50 rounded-xl hover:scale-105"
        >
          Ver más vehículos
        </button>
      </div>

      {/* Renderizar ModalReserves */}
      <ModalReserves
        showModal={showModal}
        setShowModal={setShowModal}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        dateRange={dateRange}
        setDateRange={setDateRange}
        ciudadRecogida={ciudadRecogida}
        setCiudadRecogida={setCiudadRecogida}
        ciudadDevolucion={ciudadDevolucion}
        setCiudadDevolucion={setCiudadDevolucion}
        lugarRecogida={lugarRecogida}
        setLugarRecogida={setLugarRecogida}
        lugarDevolucion={lugarDevolucion}
        setLugarDevolucion={setLugarDevolucion}
        errors={errors}
        setErrors={setErrors}
        calcularTotal={calcularTotal}
        calcularDias={calcularDias}
        renderModalButtons={renderModalButtons}
        ciudadesColombia={ciudadesColombia}
        getSpecIcon={getSpecIcon}
        showPaymentGateway={showPaymentGateway}
        setShowPaymentGateway={setShowPaymentGateway}
        reservaDetails={reservaDetails}
        setReservaDetails={setReservaDetails}
        user={user}
        showAuthPopup={showAuthPopup}
        setShowAuthPopup={setShowAuthPopup}
      />
      
    </motion.div>
  );
}

export default CardsCar;