'use client'

import { createContext, useContext, useState } from 'react';
import { cars as initialCars } from '@/app/components/CardsCar';

const CarsContext = createContext();

export function CarsProvider({ children }) {
  const [publishedCars, setPublishedCars] = useState(initialCars || []);

  const addCar = (car) => {
    setPublishedCars(prev => [...prev, car]);
  };

  const removeCar = (carId) => {
    setPublishedCars(prev => prev.filter(car => car.id !== carId));
  };

  return (
    <CarsContext.Provider value={{ 
      publishedCars, 
      addCar, 
      removeCar,
      setPublishedCars 
    }}>
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
