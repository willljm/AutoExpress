'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Sidebar from '../../components/Sidebar';
import toast from 'react-hot-toast';
import { useCars } from '@/context/CarsContext';
export default function ManageCarsPage() {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const { publishedCars, addCar } = useCars();
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({
    title: '',
    precio: '',
    tipoVehiculo: '',
    image: '',
    specs: {
      asientos: '',
      maletas: '',
      bolsas: '',
      transmision: '',
      puertas: '',
      edadMinima: ''
    }
  });
  const [editingCar, setEditingCar] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Cargar carros cuando cambie el usuario
  useEffect(() => {
    if (user?.uid) {
      loadCars();
    }
  }, [user]);

  // Función para cargar los carros
  const loadCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', user.uid);

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error loading cars:', error);
      toast.error('Error al cargar los carros');
    }
  };

  const handleCreateCar = async (carData) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .insert([{
          photo_url: carData.image,
          user_id: user.uid,
          name: carData.title,
          asiento: carData.specs.asientos,
          maletas: carData.specs.maletas,
          bolsas: carData.specs.bolsas,
          puertas: carData.specs.puertas,
          tipo_vehiculo: carData.tipoVehiculo,
          transmision: carData.specs.transmision,
          pasajeros: carData.specs.asientos,
          edad_minima: carData.specs.edadMinima,
          precio: carData.precio.toString(),
          is_public: true
        }])
        .select()
        .single();

      if (error) throw error;
      toast.success('Carro creado exitosamente');
      // Actualizar la UI
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear el carro');
    }
  };

  // Función para togglear publicación
  const handleTogglePublish = async (carId) => {
    if (window.confirm('¿Estás seguro de cambiar el estado de publicación?')) {
      try {
        const { data: car } = await supabase
          .from('cars')
          .select('is_public')
          .eq('id', carId)
          .single();

        const { error } = await supabase
          .from('cars')
          .update({ is_public: !car.is_public })
          .eq('id', carId);

        if (error) throw error;
        
        toast.success(!car.is_public ? 'Carro publicado' : 'Carro despublicado');
        loadCars();
      } catch (error) {
        toast.error('Error al cambiar estado del carro');
      }
    }
  };

  // Función para eliminar carro
  const handleDelete = async (carId) => {
    if (window.confirm('¿Estás seguro de eliminar este carro?')) {
      try {
        const { error } = await supabase
          .from('cars')
          .delete()
          .eq('id', carId);

        if (error) throw error;
        
        toast.success('Carro eliminado');
        loadCars();
      } catch (error) {
        toast.error('Error al eliminar el carro');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const carData = {
        photo_url: newCar.image,
        user_id: user.uid,
        name: newCar.title,
        asiento: newCar.specs.asientos,
        maletas: newCar.specs.maletas,
        bolsas: newCar.specs.bolsas,
        puertas: newCar.specs.puertas,
        tipo_vehiculo: newCar.tipoVehiculo,
        transmision: newCar.specs.transmision,
        pasajeros: newCar.specs.asientos,
        edad_minima: newCar.specs.edadMinima,
        precio: newCar.precio,
        is_public: true
      };

      const { data, error } = await supabase
        .from('cars')
        .insert([carData])
        .select()
        .single();

      if (error) throw error;

      toast.success('Carro agregado exitosamente');
      setShowModal(false);
      loadCars(); // Recargar los carros después de agregar uno nuevo

    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear el carro');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const carData = {
        name: editingCar.title,
        precio: editingCar.precio,
        tipo_vehiculo: editingCar.tipoVehiculo,
        photo_url: editingCar.image,
        asiento: editingCar.specs.asientos,
        maletas: editingCar.specs.maletas,
        bolsas: editingCar.specs.bolsas,
        puertas: editingCar.specs.puertas,
        transmision: editingCar.specs.transmision,
        pasajeros: editingCar.specs.asientos,
        edad_minima: editingCar.specs.edadMinima,
        user_id: user.uid
      };

      const { error } = await supabase
        .from('cars')
        .update(carData)
        .eq('id', editingCar.id);

      if (error) throw error;

      toast.success('Carro actualizado exitosamente');
      setShowEditModal(false);
      loadCars(); // Recargar la lista de carros
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar el carro');
    }
  };

  const startEditing = (car) => {
    setEditingCar({
      id: car.id,
      title: car.name,
      precio: car.precio,
      tipoVehiculo: car.tipo_vehiculo,
      image: car.photo_url,
      specs: {
        asientos: car.asiento,
        maletas: car.maletas,
        bolsas: car.bolsas,
        transmision: car.transmision,
        puertas: car.puertas,
        edadMinima: car.edad_minima
      }
    });
    setShowEditModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-8 md:pl-64">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Cars</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Agregar Nuevo Carro
          </button>
        </div>

        {/* Lista de carros */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div key={car.id} className="p-4 bg-white rounded-lg shadow">
              <img src={car.photo_url} alt={car.name} className="object-cover w-full h-48 mb-4 rounded-lg"/>
              <h3 className="mb-2 text-lg font-semibold">{car.name}</h3>
              <p className="mb-4 font-bold text-blue-600">${car.precio}/día</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleTogglePublish(car.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                    car.is_public 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {car.is_public ? 'Despublicar' : 'Publicar'}
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="px-3 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => startEditing(car)}
                  className="px-3 py-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {!car.is_public && (
                <p className="mt-2 text-xs text-gray-500">Este carro no está visible en el catálogo</p>
              )}
            </div>
          ))}
        </div>

        {/* Modal de Agregar Carro */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Agregar Nuevo Carro</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium">Título</label>
                    <input
                      type="text"
                      value={newCar.title}
                      onChange={(e) => setNewCar({...newCar, title: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Precio por día</label>
                    <input
                      type="number"
                      value={newCar.precio}
                      onChange={(e) => setNewCar({...newCar, precio: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Tipo de Vehículo</label>
                    <select
                      value={newCar.tipoVehiculo}
                      onChange={(e) => setNewCar({...newCar, tipoVehiculo: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Deportivo">Deportivo</option>
                      <option value="Descapotable">Descapotable</option>
                      <option value="Camioneta">Camioneta</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Recreativo">Recreativo</option>
                      
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium">URL de la imagen</label>
                    <input
                      type="url"
                      value={newCar.image}
                      onChange={(e) => setNewCar({...newCar, image: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <h3 className="col-span-2 mt-4 font-semibold">Especificaciones</h3>

                  {Object.keys(newCar.specs).map((spec) => (
                    <div key={spec}>
                      <label className="block mb-2 text-sm font-medium">
                        {spec.charAt(0).toUpperCase() + spec.slice(1)}
                      </label>
                      <input
                        type="text"
                        value={newCar.specs[spec]}
                        onChange={(e) => setNewCar({
                          ...newCar,
                          specs: {
                            ...newCar.specs,
                            [spec]: e.target.value
                          }
                        })}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Publicar Carro
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Edición */}
        {showEditModal && editingCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="w-full max-w-2xl p-6 overflow-y-auto bg-white rounded-lg shadow-xl max-h-[90vh]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Editar Carro</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEdit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium">Título</label>
                    <input
                      type="text"
                      value={editingCar.title}
                      onChange={(e) => setEditingCar({...editingCar, title: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Precio por día</label>
                    <input
                      type="number"
                      value={editingCar.precio}
                      onChange={(e) => setEditingCar({...editingCar, precio: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Tipo de Vehículo</label>
                    <select
                      value={editingCar.tipoVehiculo}
                      onChange={(e) => setEditingCar({...editingCar, tipoVehiculo: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Deportivo">Deportivo</option>
                      <option value="Descapotable">Descapotable</option>
                      <option value="Camioneta">Camioneta</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Recreativo">Recreativo</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium">URL de la imagen</label>
                    <input
                      type="url"
                      value={editingCar.image}
                      onChange={(e) => setEditingCar({...editingCar, image: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  {/* Especificaciones */}
                  <h3 className="col-span-2 mt-4 font-semibold">Especificaciones</h3>
                  {Object.entries(editingCar.specs).map(([key, value]) => (
                    <div key={key}>
                      <label className="block mb-2 text-sm font-medium">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setEditingCar({
                          ...editingCar,
                          specs: {
                            ...editingCar.specs,
                            [key]: e.target.value
                          }
                        })}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
    </div>
    
  );
}

