import { supabase } from "../../lib/supabase"
import CardList from "../../components/CardList"

export default async function EventsPage() {
  const { data: events, error } = await supabase.from("events").select("*").order("date", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    // Return an error message to the user
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Torneos y Eventos de Pesca</h1>
        <p className="text-red-500">
          Lo sentimos, ha ocurrido un error al cargar los eventos. Por favor, inténtelo de nuevo más tarde.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Torneos y Eventos de Pesca</h1>
      {events && events.length > 0 ? (
        <CardList
          items={events.map((event) => ({
            id: event.id,
            title: event.name,
            description: event.description,
            imageUrl: event.image_url || "/placeholder.svg",
            date: new Date(event.date).toLocaleDateString(),
          }))}
          type="events"
        />
      ) : (
        <p>No hay eventos programados en este momento.</p>
      )}
    </div>
  )
}

