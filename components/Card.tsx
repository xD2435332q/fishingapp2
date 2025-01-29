import Image from "next/image"
import Link from "next/link"

interface CardProps {
  titulo: string
  descripcion: string
  imagenUrl: string
  enlace: string
  precio?: number
  fecha?: string
}

export default function Card({ titulo, descripcion, imagenUrl, enlace, precio, fecha }: CardProps) {
  return (
    <div className="card hover:scale-105">
      <div className="relative h-48 mb-4">
        <Image src={imagenUrl || "/placeholder.svg"} alt={titulo} fill className="object-cover rounded-lg" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
      <p className="text-gray-600 mb-4">{descripcion}</p>
      {precio && <p className="text-lg font-bold mb-2">Precio: ${precio.toLocaleString("es-AR")}</p>}
      {fecha && <p className="text-sm text-gray-500 mb-2">Fecha: {new Date(fecha).toLocaleDateString("es-AR")}</p>}
      <Link href={enlace} className="btn-secondary inline-block">
        Ver más
      </Link>
    </div>
  )
}

