'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  getRedirectResult,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '@/firebase/config'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Manejar el resultado de la redirección
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user)
          localStorage.setItem('user', JSON.stringify(result.user))
          toast.success('¡Bienvenido!')
        }
      })
      .catch((error) => {
        console.error('Error al procesar redirección:', error)
      })

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        localStorage.setItem('user', JSON.stringify(currentUser))
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      localStorage.removeItem('user')
      localStorage.removeItem(`favoritos_${user?.uid}`)
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const value = {
    user,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
