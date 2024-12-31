"use client"
import React, { useState, useEffect } from 'react'
import CardsCar from '../components/CardsCar'
import Link from 'next/link'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import Header from '../components/Navbar'

function CatalogoPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Header />
      {isLoading && <Loading />}
      
      <CardsCar  />
      <Footer />
    </div>
  );
}

export default CatalogoPage;