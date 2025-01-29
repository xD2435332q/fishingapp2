import { supabase } from "../../../lib/supabase"
import CrudTable from "../../../components/admin/CrudTable"
import CreateForm from "../../../components/admin/CreateForm"

export default async function AdminExcursions() {
  const { data: excursions, error } = await supabase.from("excursions").select("*")

  if (error) {
    console.error("Error fetching excursions:", error)
  }

  const columns = ["id", "name", "description", "price", "date"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Administrar Excursiones</h1>
      <CreateForm columns={columns} tableName="excursions" />
      {excursions ? (
        <CrudTable initialItems={excursions} columns={columns} tableName="excursions" />
      ) : (
        <p>Cargando excursiones...</p>
      )}
    </div>
  )
}

