'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const CarsContext = createContext();

export function CarsProvider({ children }) {
  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('is_public', true);

      if (error) throw error;
      setCars(data);
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const value = {
    cars,
    loadCars, // Exportar loadCars para poder recargar los carros cuando sea necesario
    publishedCars: cars.filter(car => car.is_public)
  };

  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>
  );
}
