import { notFound } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import Image from "next/image"
import ReservationForm from "../../../components/ReservationForm"

export default async function ExcursionDetailPage({ params }: { params: { id: string } }) {
  const { data: excursion, error } = await supabase.from("excursions").select("*").eq("id", params.id).single()

  if (error || !excursion) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{excursion.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={excursion.image_url || "/placeholder.svg"}
            alt={excursion.name}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-[400px]"
          />
          <p className="mt-4 text-lg">{excursion.description}</p>
          <p className="mt-2 text-xl font-semibold">Precio: ${excursion.price}</p>
          <p className="mt-2">Fecha: {new Date(excursion.date).toLocaleDateString()}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Reserva tu lugar</h2>
          <ReservationForm excursionId={excursion.id} price={excursion.price} />
        </div>
      </div>
    </div>
  )
}

