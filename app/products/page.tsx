"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"

// Sample products data
const allProducts = [
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
  {
    id: 5,
    name: "لوسیون بدن",
    price: 95000,
    image: "/placeholder.svg?height=300&width=300",
    category: "body",
    discount: 5,
  },
  {
    id: 6,
    name: "شامپو ترمیم کننده",
    price: 75000,
    image: "/placeholder.svg?height=300&width=300",
    category: "hair",
    discount: 0,
  },
  {
    id: 7,
    name: "کرم ضد چروک",
    price: 220000,
    image: "/placeholder.svg?height=300&width=300",
    category: "face",
    discount: 0,
  },
  {
    id: 8,
    name: "روغن آرگان",
    price: 130000,
    image: "/placeholder.svg?height=300&width=300",
    category: "hair",
    discount: 8,
  },
]

const categories = [
  { id: "all", name: "همه محصولات" },
  { id: "face", name: "مراقبت از صورت" },
  { id: "body", name: "مراقبت از بدن" },
  { id: "hair", name: "مراقبت از مو" },
  { id: "sunscreen", name: "ضد آفتاب" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [sortBy, setSortBy] = useState("default")

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  useEffect(() => {
    let filtered = [...allProducts]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "discount") {
      filtered.sort((a, b) => b.discount - a.discount)
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">محصولات ما</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">دسته‌بندی‌ها</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    className={`w-full text-right py-2 px-3 rounded-md transition-colors ${
                      selectedCategory === category.id ? "bg-amber-100 text-amber-800" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">مرتب‌سازی</h2>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">پیش‌فرض</option>
                <option value="price-asc">قیمت: کم به زیاد</option>
                <option value="price-desc">قیمت: زیاد به کم</option>
                <option value="discount">بیشترین تخفیف</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 p-8 rounded-lg text-center">
              <p className="text-lg">محصولی در این دسته‌بندی یافت نشد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

