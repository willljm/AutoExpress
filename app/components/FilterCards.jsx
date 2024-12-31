import React from 'react';

export default function FilterCards({ dbCars, ordenPrecio, setOrdenPrecio, tipoVehiculo, setTipoVehiculo, transmision, setTransmision, pasajeros, setPasajeros, edadConductor, setEdadConductor }) {
  const obtenerOpcionesFiltro = (key) => {
    const opciones = new Set();
    if (dbCars) {
      dbCars.forEach(car => {
        if (car[key]) {
          opciones.add(car[key]);
        }
      });
    }
    return Array.from(opciones);
  };

  const filtros = {
    ordenPrecio: ['Menor a mayor', 'Mayor a menor'],
    tipoVehiculo: obtenerOpcionesFiltro('tipo_vehiculo'),
    transmision: obtenerOpcionesFiltro('transmision'),
    pasajeros: obtenerOpcionesFiltro('pasajeros'),
    edadConductor: obtenerOpcionesFiltro('edad_minima').filter(opcion => [23, 25, 27].includes(parseInt(opcion)))
  };

  const filteredCars = dbCars ? dbCars.filter(car => {
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
  }) : [];

  return (
    <div className="mx-auto mb-12 max-w-7xl">
      <div className="grid grid-cols-1 gap-4 p-4 bg-white shadow-sm md:grid-cols-3 lg:grid-cols-5 rounded-xl">
        <select 
          value={ordenPrecio}
          onChange={(e) => setOrdenPrecio(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Ordenar por precio</option>
          {filtros.ordenPrecio.map(opcion => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>

        <select 
          value={tipoVehiculo}
          onChange={(e) => setTipoVehiculo(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Tipo de vehículo</option>
          {filtros.tipoVehiculo.map(opcion => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>

        <select 
          value={transmision}
          onChange={(e) => setTransmision(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Transmisión</option>
          {filtros.transmision.map(opcion => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>

        <select 
          value={pasajeros}
          onChange={(e) => setPasajeros(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Pasajeros</option>
          {filtros.pasajeros.map(opcion => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>

        <select 
          value={edadConductor}
          onChange={(e) => setEdadConductor(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Edad del conductor</option>
          {filtros.edadConductor.map(opcion => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => {
            setOrdenPrecio('');
            setTipoVehiculo('');
            setTransmision('');
            setPasajeros('');
            setEdadConductor('');
          }}
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}