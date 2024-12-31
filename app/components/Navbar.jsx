'use client'
import Link from "next/link"
import Image from "next/image"
import { Montserrat } from 'next/font/google'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation' // Añadir este import
import AuthPopup from './AuthPopup'
import { motion } from 'framer-motion'
import { GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
import { auth } from '@/firebase/config';

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' })

function Navbar() {
  const { user, logout, loginWithGoogle } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Obtener la ruta actual
  const router = useRouter(); // Agregar esta línea

  const isDarkPage = ['/', '/dashboard'].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleFavoritosClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowAuthPopup(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setShowAuthPopup(false);
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !isDarkPage
          ? 'bg-white/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      } ${montserrat.className}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600 transition-transform transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.739 10.921c-1.347-.39-1.885-.538-3.552-.921 0 0-2.379-2.359-2.832-2.816-.568-.572-1.043-1.184-2.949-1.184h-7.894c-.511 0-.736.547-.07 1.043l3.052 2.309c.517.39.87.39 1.405.39h3.379c.779 0 1.356.532 1.356 1.188 0 .652-.572 1.187-1.356 1.187h-2.154c-.586 0-.779.39-.779.779 0 .39.193.784.779.784h1.39c.59 0 .763.397.763.797 0 .399-.173.797-.763.797h-2.535c-.658 0-.658.785 0 .785h1.924c.657 0 .657.785 0 .785h-4.436c-.515 0-1.019.321-1.019.837 0 .515.504.836 1.019.836h5.579c1.255 0 2.617-.226 3.605-1.218.449-.449.449-1.218.449-1.218h.658c1.476 0 2.123-.587 2.828-1.17.331-.274.607-.614.607-1.041.001-.428-.275-.768-.605-1.042z"/>
                <path d="M10.072 11.511c-.445.444-.918.843-1.505 1.158v2.421c0 .559.751.559.751 0v-1.957c1.244-.886 2.141-1.962 2.141-1.962.126-.561-.562-.561-.688 0l-.699.34z"/>
              </svg>
              <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text">
                AutoExpress
              </span>
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
                </svg>
              )}
            </button>

            <div className="items-center hidden space-x-8 md:flex">
              <Link 
                href="/" 
                className={`relative focus:text-blue-500 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full ${
                 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/catalogo" 
                className="relative focus:text-blue-500 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full text-gray-500 hover:text-blue-600"
              >
                Catalogo
              </Link>
              <Link 
                href={user ? "/favoritos" : "#"} 
                onClick={handleFavoritosClick}
                className="relative focus:text-blue-500 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full text-gray-500 hover:text-blue-600"
              >
                Favoritos
              </Link>
              <Link 
                href="/about" 
                className="relative focus:text-blue-500 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full text-gray-500 hover:text-blue-600"
              >
                About
              </Link>
            </div>

            <div className="items-center hidden gap-4 md:flex">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-2 p-1 transition-colors rounded-full hover:bg-gray-100"
                  >
                    <Image
                      src={user.photoURL || '/default-avatar.png'}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user.displayName?.split(' ')[0]}
                    </span>
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
                      <Link
                        href="/dashboard/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        href="/favoritos"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Favoritos
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleGoogleLogin();
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <img 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    className="w-5 h-5"
                  />
                  Iniciar con Google
                </button>
              )}
            </div>
          </div>

          {/* Menú móvil */}
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-4 md:hidden"
            >
              <div className="flex flex-col px-4 space-y-4">
                <Link 
                  href="/" 
                  className="text-gray-500 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/catalogo" 
                  className="text-gray-500 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Catalogo
                </Link>
                <Link 
                  href={user ? "/favoritos" : "#"} 
                  onClick={(e) => {
                    handleFavoritosClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-500 hover:text-blue-600"
                >
                  Favoritos
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-500 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/dashboard/perfil"
                      className="text-gray-500 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-red-600 hover:text-red-700"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleGoogleLogin();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <img 
                      src="https://www.google.com/favicon.ico" 
                      alt="Google" 
                      className="w-5 h-5"
                    />
                    Iniciar con Google
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </nav>
      
      <AuthPopup 
        isOpen={showAuthPopup} 
        onClose={() => setShowAuthPopup(false)} 
        redirectUrl={pathname} 
        
      />
    </>
  )
}

export default Navbar