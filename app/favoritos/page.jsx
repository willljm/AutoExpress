"use client"
import React, { useState, useEffect } from 'react'
import { cars } from '../components/CardsCar'
import Link from 'next/link'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'; // Importar useRouter
import { supabase } from '@/lib/supabase';

function FavoritePage() {
  const { user } = useAuth();
  const router = useRouter(); // Usar useRouter
  const [isLoading, setIsLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [carsFavoritos, setCarsFavoritos] = useState([]);

  useEffect(() => {
    if (!user) {
      // Redirigir al usuario a la página de inicio de sesión si no está autenticado
      router.push('/login');
      return;
    }

    const loadFavoritos = async () => {
      try {
        setIsLoading(true);
        const favoritosGuardados = localStorage.getItem('favoritos');
        
        const favoritosIds = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
        setFavoritos(favoritosIds);

        // Obtener los carros favoritos desde Supabase
        const { data: carrosData, error } = await supabase
          .from('cars')
          .select('*')
          .in('id', favoritosIds);

        if (error) throw error;
        setCarsFavoritos(carrosData || []);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
        toast.error('Error al cargar favoritos');
        setFavoritos([]);
        setCarsFavoritos([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoritos();
  }, [user, router]);

  const removeFavorito = (id) => {
    try {
      const nuevosFavoritos = favoritos.filter(favId => favId !== id);
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      setFavoritos(nuevosFavoritos);
      setCarsFavoritos(prev => prev.filter(car => car.id !== id));
      
      toast.success('Eliminado de favoritos', {
        position: 'bottom-right',
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      toast.error('Error al eliminar de favoritos', {
        position: 'bottom-right',
        icon: '❌'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Toaster position="bottom-right" reverseOrder={false} />
      {isLoading && <Loading />}
      <Navbar />
      <div className="pt-32 pb-32 mx-auto max-w-7xl">
        <div className="flex items-center  justify-between mb-8">
          <h1 className="text-2xl ml-4 font-bold text-gray-900">Mis Favoritos</h1>
          <Link href="/" className="font-medium mr-4 text-blue-600 hover:text-blue-800">
            Volver a inicio
          </Link>
        </div>

        {carsFavoritos.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="text-2xl font-medium text-gray-600">No tienes vehículos favoritos</h2>
            <p className="mt-2 text-gray-500">Añade vehículos a favoritos para verlos aquí</p>
            <Link href="catalogo" className="inline-block px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {carsFavoritos.map((car) => (
              <div key={car.id} className="overflow-hidden bg-white shadow-md rounded-2xl">
                <div className="relative h-64">
                  <img
                    src={car.photo_url}
                    alt={car.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{car.title}</h3>
                  <p className="mb-4 text-2xl font-bold text-blue-600">${car.precio}/Día</p>
                  <button 
                    onClick={() => removeFavorito(car.id)}
                    className="w-full py-2 text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
                  >
                    Eliminar de favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default FavoritePage