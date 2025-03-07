import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "face",
    name: "مراقبت از صورت",
    image: "/placeholder.svg?height=200&width=200",
    count: 24,
  },
  {
    id: "body",
    name: "مراقبت از بدن",
    image: "/placeholder.svg?height=200&width=200",
    count: 18,
  },
  {
    id: "hair",
    name: "مراقبت از مو",
    image: "/placeholder.svg?height=200&width=200",
    count: 15,
  },
  {
    id: "sunscreen",
    name: "ضد آفتاب",
    image: "/placeholder.svg?height=200&width=200",
    count: 10,
  },
]

export function Categories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/products?category=${category.id}`}>
          <div className="category-card bg-white rounded-lg overflow-hidden shadow-md">
            <div className="w-full h-48 relative">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
              <p className="text-gray-500 text-sm">{category.count} محصول</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

