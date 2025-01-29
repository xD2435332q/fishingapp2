import Link from "next/link"
import { Building2, Users, ShoppingBag, Calendar } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/properties" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Building2 className="w-8 h-8 mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold mb-2">Propiedades</h2>
          <p className="text-gray-600">Gestionar propiedades para alquiler</p>
        </Link>

        <Link href="/admin/excursions" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Users className="w-8 h-8 mb-4 text-green-500" />
          <h2 className="text-xl font-semibold mb-2">Excursiones</h2>
          <p className="text-gray-600">Gestionar excursiones de pesca</p>
        </Link>

        <Link href="/admin/products" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <ShoppingBag className="w-8 h-8 mb-4 text-purple-500" />
          <h2 className="text-xl font-semibold mb-2">Productos</h2>
          <p className="text-gray-600">Gestionar inventario de productos</p>
        </Link>

        <Link href="/admin/events" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Calendar className="w-8 h-8 mb-4 text-orange-500" />
          <h2 className="text-xl font-semibold mb-2">Eventos</h2>
          <p className="text-gray-600">Gestionar eventos y torneos</p>
        </Link>
      </div>
    </div>
  )
}

