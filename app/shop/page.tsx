import { supabase } from "../../lib/supabase"
import CardList from "../../components/CardList"

export default async function ShopPage() {
  const { data: products, error } = await supabase.from("products").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching products:", error)
    return <div>Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tienda de Productos de Pesca</h1>
      {products && products.length > 0 ? (
        <CardList
          items={products.map((product) => ({
            id: product.id,
            title: product.name,
            description: product.description,
            imageUrl: product.image_url || "/placeholder.svg",
            price: product.price,
            link: `/shop/${product.id}`,
          }))}
          type="products"
        />
      ) : (
        <p>No hay productos disponibles en este momento.</p>
      )}
    </div>
  )
}

