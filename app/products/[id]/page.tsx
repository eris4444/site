"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// Sample products data
const products = [
  {
    id: 1,
    name: "کرم مرطوب کننده", // نام محصول را اینجا تغییر دهید
    price: 120000, // قیمت محصول را اینجا تغییر دهید
    image: "/products/moisturizer.jpg", // مسیر عکس جدید را اینجا قرار دهید
    category: "face",
    discount: 10, // میزان تخفیف را اینجا تغییر دهید
    description: "این کرم مرطوب کننده با فرمولاسیون غنی و مواد طبیعی و ارگانیک...", // توضیحات محصول را اینجا تغییر دهید
    features: [
      "حاوی هیالورونیک اسید و کلاژن برای آبرسانی عمیق", // ویژگی‌های محصول را اینجا تغییر دهید
      "غنی شده با ویتامین E و آلوئه ورا",
      // ویژگی‌های دیگر را اضافه یا ویرایش کنید
    ],
    howToUse: "صبح و شب روی پوست تمیز صورت و گردن استفاده کنید...", // روش استفاده را اینجا تغییر دهید
    ingredients: "آب، گلیسیرین، هیالورونیک اسید، عصاره آلوئه ورا، روغن جوجوبا...", // ترکیبات را اینجا تغییر دهید
  },
  {
    id: 2,
    name: "سرم ویتامین C",
    price: 180000,
    image: "/placeholder.svg?height=500&width=500",
    category: "face",
    discount: 0,
    description:
      "سرم ویتامین C با غلظت 20 درصد، برای روشن کردن پوست، کاهش لک و ایجاد درخشندگی طبیعی. این سرم قدرتمند با خاصیت آنتی‌اکسیدانی، از پوست در برابر آسیب‌های محیطی محافظت می‌کند و به بهبود بافت پوست کمک می‌نماید. همچنین حاوی عصاره چای سبز برای تقویت پوست است.",
    features: [
      "غلظت 20% ویتامین C خالص",
      "حاوی اسید فرولیک برای تقویت اثر ویتامین C",
      "کمک به تولید کلاژن و الاستین",
      "کاهش لک‌های تیره و ایجاد یکنواختی در رنگ پوست",
      "مناسب برای استفاده روزانه",
    ],
    howToUse:
      "صبح‌ها پس از شستشوی صورت و قبل از مرطوب کننده، 3-4 قطره از سرم را روی پوست خشک صورت و گردن بزنید و به آرامی ماساژ دهید تا جذب شود. برای محافظت بیشتر، حتماً پس از استفاده از سرم، از ضد آفتاب استفاده کنید.",
    ingredients:
      "آب، اسکوربیک اسید (ویتامین C)، گلیسیرین، اتانول، اسید فرولیک، پروپیلن گلیکول، سدیم هیالورونات، توکوفرول، پنتنول، عصاره چای سبز",
  },
]

export default function ProductDetail({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id);
  const product = products.find(p => p.id === productId);
  
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">محصول یافت نشد</h1>
        <p className="mb-8">متأسفانه محصول مورد نظر شما یافت نشد.</p>
        <Link href="/products" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors">
          بازگشت به محصولات
        </Link>
      </div>
    );
  }
  
  const discountedPrice = product.discount > 0 
    ? Math.round(product.price * (1 - product.discount / 100)) 
    : null;
    
  const handleWhatsAppOrder = () => {
    const message = `سلام، من قصد سفارش محصول ${product.name} به تعداد ${quantity} عدد را دارم. لطفاً راهنمایی کنید.`;
    window.open(`https://wa.me/989123456789?text=${encodeURIComponent(message)}`, '_blank');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative h-96 md:h-full">
            <Image 
              src={product.image || "/placeholder.svg"} 
              alt={product.name}
              fill
              className="object-contain"
            />
            
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {product.discount}% تخفیف
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <nav className="flex mb-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-amber-600 transition-colors">
                صفحه اصلی
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link href="/products" className="text-gray-500 hover:text-amber-600 transition-colors">
                محصولات
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-700">{product.name}</span>
            </nav>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-6">
              {discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-gray-400 line-through text-lg ml-3">
                    {product.price.toLocaleString()} تومان
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {discountedPrice.toLocaleString()} تومان
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">
                  {product.price.toLocaleString()} تومان
                </span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="ml-3 font-medium">تعداد:</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    id="quantity"
                    className="w-12 text-center border-none focus:outline-none"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button 
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center transition-colors"
                onClick={handleWhatsAppOrder}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.\

