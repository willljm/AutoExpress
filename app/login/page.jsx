"use client"
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // No necesitamos poner aquí el router.push ya que está en el AuthContext
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md mx-4">
        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600 transition-transform transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.739 10.921c-1.347-.39-1.885-.538-3.552-.921 0 0-2.379-2.359-2.832-2.816-.568-.572-1.043-1.184-2.949-1.184h-7.894c-.511 0-.736.547-.07 1.043l3.052 2.309c.517.39.87.39 1.405.39h3.379c.779 0 1.356.532 1.356 1.188 0 .652-.572 1.187-1.356 1.187h-2.154c-.586 0-.779.39-.779.779 0 .39.193.784.779.784h1.39c.59 0 .763.397.763.797 0 .399-.173.797-.763.797h-2.535c-.658 0-.658.785 0 .785h1.924c.657 0 .657.785 0 .785h-4.436c-.515 0-1.019.321-1.019.837 0 .515.504.836 1.019.836h5.579c1.255 0 2.617-.226 3.605-1.218.449-.449.449-1.218.449-1.218h.658c1.476 0 2.123-.587 2.828-1.17.331-.274.607-.614.607-1.041.001-.428-.275-.768-.605-1.042z"/>
            </svg>
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text">
              AutoExpress
            </span>
          </Link>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h2>
            <p className="mt-2 text-gray-600">Inicia sesión para acceder a tu cuenta</p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full gap-3 px-6 py-3 text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:border-gray-300"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="font-medium">Continuar con Google</span>
          </button>

          <div className="mt-8 text-center">
            <Link href="/" className="font-medium text-blue-600 hover:text-blue-700">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
