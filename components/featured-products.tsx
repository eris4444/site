import Link from "next/link"
import { ProductCard } from "./product-card"

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: "کرم مرطوب کننده", // نام محصول را اینجا تغییر دهید
    price: 120000, // قیمت محصول را اینجا تغییر دهید
    image: "/products/moisturizer.jpg", // مسیر عکس جدید را اینجا قرار دهید
    category: "face",
    discount: 10, // میزان تخفیف را اینجا تغییر دهید
  },
  {
    id: 2,
    name: "سرم ویتامین C",
    price: 180000,
    image: "/placeholder.svg?height=300&width=300",
    category: "face",
    discount: 0,
  },
  {
    id: 3,
    name: "ماسک صورت آبرسان",
    price: 85000,
    image: "/placeholder.svg?height=300&width=300",
    category: "face",
    discount: 15,
  },
  {
    id: 4,
    name: "ضد آفتاب SPF 50",
    price: 150000,
    image: "/placeholder.svg?height=300&width=300",
    category: "sunscreen",
    discount: 0,
  },
]

export function FeaturedProducts() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/products"
          className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
        >
          <span>مشاهده همه محصولات</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

