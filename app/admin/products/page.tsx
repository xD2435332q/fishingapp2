import { supabase } from "../../../lib/supabase"
import CrudTable from "../../../components/admin/CrudTable"
import CreateForm from "../../../components/admin/CreateForm"

export default async function AdminProducts() {
  const { data: products, error } = await supabase.from("products").select("*")

  if (error) {
    console.error("Error fetching products:", error)
  }

  const columns = ["id", "name", "description", "price", "stock"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Administrar Productos</h1>
      <CreateForm columns={columns} tableName="products" />
      {products ? (
        <CrudTable initialItems={products} columns={columns} tableName="products" />
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  )
}

