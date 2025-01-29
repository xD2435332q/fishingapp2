"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [location, setLocation] = useState("")
  const [dates, setDates] = useState("")
  const [guests, setGuests] = useState(1)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?location=${location}&dates=${dates}&guests=${guests}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="¿A dónde vas?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Fechas"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number"
            placeholder="Número de personas"
            value={guests}
            onChange={(e) => setGuests(Number.parseInt(e.target.value))}
            min="1"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}

