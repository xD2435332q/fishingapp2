import Image from "next/image"
import Link from "next/link"
import SearchForm from "../components/SearchForm"
import CardList from "../components/CardList"
import { supabase } from "../lib/supabase"

export default async function Home() {
  const { data: propiedades } = await supabase.from("properties").select("*").limit(6)

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="relative min-h-[600px] flex items-center">
        <Image
          src="/lago-pesca.jpg"
          alt="Hermoso lago de pesca al atardecer"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Encuentra tu paraíso de pesca</h1>
            <p className="text-xl text-white mb-8">Descubre los mejores lugares para pescar y alojarte</p>
          </div>
          <SearchForm />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Propiedades destacadas</h2>
        {propiedades && propiedades.length > 0 ? (
          <CardList
            items={propiedades.map((propiedad) => ({
              id: propiedad.id,
              titulo: propiedad.name,
              descripcion: propiedad.description,
              imagenUrl: propiedad.image_url || "/placeholder.svg",
              precio: propiedad.price,
              enlace: `/propiedades/${propiedad.id}`,
            }))}
            tipo="propiedades"
          />
        ) : (
          <p>No hay propiedades disponibles en este momento.</p>
        )}
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Los mejores lugares</h3>
              <p className="text-gray-600">
                Cuidadosamente seleccionados para garantizar la mejor experiencia de pesca.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Experiencia local</h3>
              <p className="text-gray-600">Guías expertos y conocedores de las mejores zonas de pesca.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Todo incluido</h3>
              <p className="text-gray-600">Alojamiento, equipamiento y excursiones en un solo lugar.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

