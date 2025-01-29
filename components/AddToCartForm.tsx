"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"

interface AddToCartFormProps {
  productId: number
  price: number
}

export default function AddToCartForm({ productId, price }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // En una aplicación real, aquí manejaríamos la lógica del carrito,
    // posiblemente almacenando en el estado global o en una base de datos.
    // Por ahora, solo mostraremos un mensaje de éxito.
    alert(`Producto añadido al carrito: ${quantity} unidad(es)`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
          min="1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <p className="text-lg font-semibold">Total: ${price * quantity}</p>
      </div>
      <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Añadir al carrito
      </button>
    </form>
  )
}

