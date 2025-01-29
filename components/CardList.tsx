import Card from "./Card"

interface Item {
  id: number
  title: string
  description: string
  imageUrl: string
  price?: number
  date?: string
}

interface CardListProps {
  items: Item[]
  type: "excursions" | "events" | "products"
}

export default function CardList({ items, type }: CardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
          link={`/${type}/${item.id}`}
          price={item.price}
          date={item.date}
        />
      ))}
    </div>
  )
}

