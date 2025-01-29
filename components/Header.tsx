"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin")) {
    return null
  }

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md fixed w-full z-50">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/fishing-logo.svg" alt="PescaReservas Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-blue-600">PescaReservas</span>
        </Link>
        <div className="space-x-4 mt-4 md:mt-0">
          <Link href="/properties" className="text-gray-600 hover:text-blue-600">
            Propiedades
          </Link>
          <Link href="/excursions" className="text-gray-600 hover:text-blue-600">
            Excursiones
          </Link>
          <Link href="/events" className="text-gray-600 hover:text-blue-600">
            Eventos
          </Link>
          <Link href="/shop" className="text-gray-600 hover:text-blue-600">
            Tienda
          </Link>
          <Link href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  )
}

