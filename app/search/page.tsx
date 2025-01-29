import { supabase } from "../../lib/supabase"
import CardList from "../../components/CardList"
import SearchForm from "../../components/SearchForm"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { location?: string; dates?: string; guests?: string }
}) {
  let query = supabase.from("properties").select("*")

  if (searchParams.location) {
    query = query.ilike("name", `%${searchParams.location}%`)
  }

  if (searchParams.guests) {
    query = query.gte("capacity", Number.parseInt(searchParams.guests))
  }

  const { data: properties, error } = await query

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchForm />
      </div>

      <h1 className="text-3xl font-bold mb-8">Resultados de búsqueda</h1>

      {error ? (
        <p className="text-red-500">Error al buscar propiedades</p>
      ) : properties && properties.length > 0 ? (
        <CardList
          items={properties.map((property) => ({
            id: property.id,
            title: property.name,
            description: property.description,
            imageUrl: property.image_url || "/placeholder.svg",
            price: property.price,
          }))}
          type="properties"
        />
      ) : (
        <p>No se encontraron propiedades que coincidan con tu búsqueda.</p>
      )}
    </div>
  )
}

