"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

interface Item {
  id: number
  [key: string]: any
}

interface CrudTableProps {
  initialItems: Item[]
  columns: string[]
  tableName: string
}

export default function CrudTable({ initialItems, columns, tableName }: CrudTableProps) {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedItem, setEditedItem] = useState<Item | null>(null)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 10
  const router = useRouter()

  useEffect(() => {
    const filteredItems = initialItems.filter((item) =>
      columns.some((column) => item[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setItems(filteredItems)
  }, [searchTerm, initialItems, columns])

  const handleEdit = (item: Item) => {
    setEditingId(item.id)
    setEditedItem(item)
  }

  const handleSave = async () => {
    if (editedItem) {
      const { data, error } = await supabase.from(tableName).update(editedItem).eq("id", editedItem.id)

      if (error) {
        console.error("Error updating item:", error)
        alert("Error al actualizar el elemento")
      } else {
        setEditingId(null)
        setEditedItem(null)
        setItems(items.map((item) => (item.id === editedItem.id ? editedItem : item)))
        alert("Elemento actualizado con éxito")
        router.refresh()
      }
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      const { error } = await supabase.from(tableName).delete().eq("id", id)

      if (error) {
        console.error("Error deleting item:", error)
        alert("Error al eliminar el elemento")
      } else {
        setItems(items.filter((item) => item.id !== id))
        alert("Elemento eliminado con éxito")
        router.refresh()
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
    if (editedItem) {
      let value = e.target.value
      if (column === "latitude" || column === "longitude") {
        value = Number.parseFloat(value).toFixed(8)
      } else if (column === "price") {
        value = Number.parseFloat(value).toFixed(2)
      }
      setEditedItem({ ...editedItem, [column]: value })
    }
  }

  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editedItem?.[column] || ""}
                      onChange={(e) => handleChange(e, column)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item[column]
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {editingId === item.id ? (
                  <button onClick={handleSave} className="text-green-600 hover:text-green-900 mr-4">
                    Guardar
                  </button>
                ) : (
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-4">
                    Editar
                  </button>
                )}
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Anterior
        </button>
        <span>
          Página {page} de {Math.ceil(items.length / itemsPerPage)}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= Math.ceil(items.length / itemsPerPage)}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

