"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Users } from "lucide-react"

export default function SearchForm() {
  const [ubicacion, setUbicacion] = useState("")
  const [fechas, setFechas] = useState("")
  const [personas, setPersonas] = useState("1")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams({
      ubicacion,
      fechas,
      personas,
    })
    router.push(`/buscar?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md shadow-lg p-6 rounded-xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Ubicación
          </label>
          <input
            type="text"
            id="ubicacion"
            placeholder="¿A dónde vas?"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="fechas" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fechas
          </label>
          <input
            type="date"
            id="fechas"
            value={fechas}
            onChange={(e) => setFechas(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="personas" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Personas
          </label>
          <input
            type="number"
            id="personas"
            min="1"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button type="submit" className="btn-primary text-lg font-semibold">
          Buscar
        </button>
      </div>
    </form>
  )
}

