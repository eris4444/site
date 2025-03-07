import Link from "next/link"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  discount: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : null

  return (
    <Link href={`/products/${product.id}`}>
      <div className="product-card bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative">
          <div className="w-full h-64 relative">
            <Image
              src={product.image || "/products/product-placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% تخفیف
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

          <div className="flex justify-between items-center">
            <div>
              {discountedPrice ? (
                <div className="flex flex-col">
                  <span className="text-gray-400 line-through text-sm">{product.price.toLocaleString()} تومان</span>
                  <span className="font-bold text-red-600">{discountedPrice.toLocaleString()} تومان</span>
                </div>
              ) : (
                <span className="font-bold">{product.price.toLocaleString()} تومان</span>
              )}
            </div>

            <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded transition-colors text-sm">
              سفارش
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

