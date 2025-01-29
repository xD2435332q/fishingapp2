import Image from "next/image"
import Link from "next/link"

type Property = {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

type FeaturedPropertiesProps = {
  properties: Property[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <Link href={`/property/${property.id}`} key={property.id}>
          <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={property.image_url || "/placeholder.svg"}
              alt={property.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
              <p className="text-gray-600 mb-2">{property.description.substring(0, 100)}...</p>
              <p className="font-bold text-lg">Desde ${property.price} por noche</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

