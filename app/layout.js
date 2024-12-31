import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider, AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutoExpress',
  description: 'Renta de vehículos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
        <AuthContextProvider>
          <ThemeProvider>
            <Toaster position="top-center" />
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
