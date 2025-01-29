import { supabase } from "../../../lib/supabase"
import CrudTable from "../../../components/admin/CrudTable"
import CreateForm from "../../../components/admin/CreateForm"

export default async function AdminEvents() {
  const { data: events, error } = await supabase.from("events").select("*")

  if (error) {
    console.error("Error fetching events:", error)
  }

  const columns = ["id", "name", "description", "date", "location", "price"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Administrar Eventos</h1>
      <CreateForm columns={columns} tableName="events" />
      {events ? <CrudTable initialItems={events} columns={columns} tableName="events" /> : <p>Cargando eventos...</p>}
    </div>
  )
}

