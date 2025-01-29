"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

interface CreateFormProps {
  columns: string[]
  tableName: string
}

export default function CreateForm({ columns, tableName }: CreateFormProps) {
  const [newItem, setNewItem] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const validateField = (name: string, value: string) => {
    if (name === "latitude") {
      const lat = Number.parseFloat(value)
      if (isNaN(lat) || lat < -90 || lat > 90) {
        return "Latitude must be a number between -90 and 90"
      }
    } else if (name === "longitude") {
      const lon = Number.parseFloat(value)
      if (isNaN(lon) || lon < -180 || lon > 180) {
        return "Longitude must be a number between -180 and 180"
      }
    } else if (name === "price") {
      const price = Number.parseFloat(value)
      if (isNaN(price) || price < 0) {
        return "Price must be a positive number"
      }
    }
    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
    const value = e.target.value
    setNewItem({ ...newItem, [column]: value })
    const error = validateField(column, value)
    setErrors({ ...errors, [column]: error })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== "")) {
      alert("Please correct the errors before submitting")
      return
    }

    // Convert numeric fields
    const itemToSubmit = { ...newItem }
    if (tableName === "properties") {
      itemToSubmit.latitude = Number.parseFloat(newItem.latitude).toFixed(8)
      itemToSubmit.longitude = Number.parseFloat(newItem.longitude).toFixed(8)
      itemToSubmit.price = Number.parseFloat(newItem.price).toFixed(2)
    } else if (["excursions", "products"].includes(tableName)) {
      itemToSubmit.price = Number.parseFloat(newItem.price).toFixed(2)
    }

    const { data, error } = await supabase.from(tableName).insert([itemToSubmit])

    if (error) {
      console.error("Error creating item:", error)
      alert(`Error al crear el elemento: ${error.message}`)
    } else {
      setNewItem({})
      setErrors({})
      alert("Elemento creado con éxito")
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Crear nuevo elemento</h2>
      {columns
        .filter((col) => col !== "id")
        .map((column) => (
          <div key={column} className="mb-4">
            <label htmlFor={column} className="block text-sm font-medium text-gray-700">
              {column}
            </label>
            <input
              type="text"
              id={column}
              value={newItem[column] || ""}
              onChange={(e) => handleChange(e, column)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            {errors[column] && <p className="text-red-500 text-sm mt-1">{errors[column]}</p>}
          </div>
        ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Crear
      </button>
    </form>
  )
}

