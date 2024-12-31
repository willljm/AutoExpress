'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function AuthPopup({ isOpen, onClose }) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
        display: 'popup'
      });

      const result = await signInWithPopup(
        auth, 
        provider, 
        browserPopupRedirectResolver
      );
      
      if (result.user) {
        console.log('Login exitoso:', result.user);
        onClose(); // Cerrar el popup
        router.push('/dashboard/perfil');
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Popup cerrado por el usuario');
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('Solicitud de popup cancelada');
      } else {
        console.error('Error en login:', error);
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Iniciar Sesión
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Inicia sesión para acceder a esta funcionalidad
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full gap-3 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <img 
                      src="https://www.google.com/favicon.ico" 
                      alt="Google" 
                      className="w-5 h-5"
                    />
                    Continuar con Google
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-red-600 transition-colors border border-transparent rounded-md hover:bg-red-100"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
