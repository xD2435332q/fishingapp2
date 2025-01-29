import { notFound } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import Image from "next/image"
import AddToCartForm from "../../../components/AddToCartForm"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { data: product, error } = await supabase.from("products").select("*").eq("id", params.id).single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-[400px]"
          />
          <p className="mt-4 text-lg">{product.description}</p>
          <p className="mt-2 text-xl font-semibold">Precio: ${product.price}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Añadir al carrito</h2>
          <AddToCartForm productId={product.id} price={product.price} />
        </div>
      </div>
    </div>
  )
}

