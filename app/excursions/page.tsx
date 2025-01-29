import { supabase } from "../../lib/supabase"
import CardList from "../../components/CardList"

export default async function ExcursionsPage() {
  const { data: excursions, error } = await supabase.from("excursions").select("*").order("date", { ascending: true })

  if (error) {
    console.error("Error fetching excursions:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Excursiones de Pesca</h1>
      {excursions ? (
        <CardList
          items={excursions.map((excursion) => ({
            id: excursion.id,
            title: excursion.name,
            description: excursion.description,
            imageUrl: excursion.image_url || "/placeholder.svg",
            price: excursion.price,
            date: new Date(excursion.date).toLocaleDateString(),
          }))}
          type="excursions"
        />
      ) : (
        <p>Cargando excursiones...</p>
      )}
    </div>
  )
}

