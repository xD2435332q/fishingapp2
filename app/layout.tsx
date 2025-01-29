import "./globals.css"
import { Roboto_Slab } from "next/font/google"
import type { Metadata } from "next"
import type React from "react" // Import React

const robotoSlab = Roboto_Slab({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PescaReservas - Tu destino de pesca",
  description: "Reserva propiedades, excursiones y compra productos de pesca",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={robotoSlab.className}>{children}</body>
    </html>
  )
}

