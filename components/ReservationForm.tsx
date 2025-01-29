"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"

interface ReservationFormProps {
  excursionId: number
  price: number
}

export default function ReservationForm({ excursionId, price }: ReservationFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [participants, setParticipants] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.from("reservations").insert([
      {
        excursion_id: excursionId,
        name,
        email,
        participants,
        total_price: price * participants,
      },
    ])

    if (error) {
      alert("Error al hacer la reserva. Por favor, inténtelo de nuevo.")
    } else {
      alert("Reserva realizada con éxito!")
      setName("")
      setEmail("")
      setParticipants(1)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
          Número de participantes
        </label>
        <input
          type="number"
          id="participants"
          value={participants}
          onChange={(e) => setParticipants(Number.parseInt(e.target.value))}
          min="1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <p className="text-lg font-semibold">Total: ${price * participants}</p>
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Reservar
      </button>
    </form>
  )
}

