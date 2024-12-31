import './globals.css'
import { Montserrat_Alternates } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import NextTopLoader from 'nextjs-toploader'
import { CarsProvider } from '@/context/CarsContext'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'

const montserrat = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat'
})

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutoExpress',
  description: 'Reserva tu carro de la manera más sencilla',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NextTopLoader 
          color="#000000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #000000,0 0 5px #000000"
        />
        <AuthProvider>
          <CarsProvider>
            <Providers>
              {children}
              <Toaster />
            </Providers>
          </CarsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}