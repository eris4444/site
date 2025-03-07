"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// نمونه محصولات (در نسخه واقعی باید از دیتابیس استفاده شود)
const initialProducts = [
  {
    id: 1,
    name: "کرم مرطوب کننده",
    price: 120000,
    image: "/placeholder.svg?height=100&width=100",
    category: "face",
    discount: 10,
  },
  {
    id: 2,
    name: "سرم ویتامین C",
    price: 180000,
    image: "/placeholder.svg?height=100&width=100",
    category: "face",
    discount: 0,
  },
]

export default function AdminPage() {
  const [products, setProducts] = useState(initialProducts)
  const [isEditing, setIsEditing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const router = useRouter()

  // در نسخه واقعی، این بخش باید با سیستم احراز هویت امن جایگزین شود
  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("رمز عبور اشتباه است!")
    }
  }

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product)
    setIsEditing(true)
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentProduct) return

    // به‌روزرسانی محصول در آرایه محصولات
    const updatedProducts = products.map((p) => (p.id === currentProduct.id ? currentProduct : p))

    setProducts(updatedProducts)
    setIsEditing(false)
    setCurrentProduct(null)

    // در نسخه واقعی، اینجا باید اطلاعات به دیتابیس ارسال شود
    alert("محصول با موفقیت به‌روزرسانی شد!")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentProduct({
      ...currentProduct,
      [name]: name === "price" || name === "discount" ? Number.parseInt(value) : value,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // در نسخه واقعی، اینجا باید فایل آپلود شود و URL آن دریافت شود
    // این کد فقط برای نمایش است
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result && currentProduct) {
        setCurrentProduct({
          ...currentProduct,
          image: reader.result.toString(),
        })
      }
    }
    reader.readAsDataURL(file)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">ورود به پنل مدیریت</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition-colors"
            >
              ورود
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">پنل مدیریت محصولات</h1>

      {isEditing && currentProduct ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">ویرایش محصول</h2>
          <form onSubmit={handleUpdateProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام محصول</label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">قیمت (تومان)</label>
                <input
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی</label>
                <select
                  name="category"
                  value={currentProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="face">مراقبت از صورت</option>
                  <option value="body">مراقبت از بدن</option>
                  <option value="hair">مراقبت از مو</option>
                  <option value="sunscreen">ضد آفتاب</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تخفیف (درصد)</label>
                <input
                  type="number"
                  name="discount"
                  value={currentProduct.discount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  max="100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">تصویر محصول</label>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="relative w-20 h-20 border border-gray-300 rounded-md overflow-hidden">
                    <Image
                      src={currentProduct.image || "/placeholder.svg?height=80&width=80"}
                      alt={currentProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4 space-x-reverse">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setCurrentProduct(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                ذخیره تغییرات
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => router.push("/")}
          className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          بازگشت به سایت
        </button>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                تصویر
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                نام محصول
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                قیمت
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                دسته‌بندی
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                تخفیف
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative w-12 h-12">
                    <Image
                      src={product.image || "/placeholder.svg?height=48&width=48"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.price.toLocaleString()} تومان</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {product.category === "face" && "مراقبت از صورت"}
                    {product.category === "body" && "مراقبت از بدن"}
                    {product.category === "hair" && "مراقبت از مو"}
                    {product.category === "sunscreen" && "ضد آفتاب"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.discount}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEditProduct(product)} className="text-amber-600 hover:text-amber-900">
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

