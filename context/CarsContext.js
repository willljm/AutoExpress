'use client'
import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const CarsContext = createContext();

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

  const addCar = (car) => {
    setCars(prev => [...prev, car]);
  };

  const removeCar = (carId) => {
    setCars(prev => prev.filter(car => car.id !== carId));
  };

  const value = {
    cars,
    loadCars,
    addCar,
    removeCar,
    setCars,
    publishedCars: cars.filter(car => car.is_public)
  };

  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars debe ser usado dentro de un CarsProvider');
  }
  return context;
}
