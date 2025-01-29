import { supabase } from "../../../lib/supabase"
import CrudTable from "../../../components/admin/CrudTable"
import CreateForm from "../../../components/admin/CreateForm"

export default async function AdminProperties() {
  const { data: properties, error } = await supabase.from("properties").select("*")

  if (error) {
    console.error("Error fetching properties:", error)
  }

  const columns = ["id", "name", "description", "price", "latitude", "longitude"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Administrar Propiedades</h1>
      <CreateForm columns={columns} tableName="properties" />
      {properties ? (
        <CrudTable initialItems={properties} columns={columns} tableName="properties" />
      ) : (
        <p>Cargando propiedades...</p>
      )}
    </div>
  )
}

