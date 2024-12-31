'use client'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'

export default function ClientAuthProvider({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" />
    </AuthProvider>
  )
}
