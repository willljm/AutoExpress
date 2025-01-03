import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CarsProvider } from "@/context/CarsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoExpress - Donde rentar tus sueños",
  description: "AutoExpress - Tu concesionario de confianza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <CarsProvider>
            {children}
          </CarsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
