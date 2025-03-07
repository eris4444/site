"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { WhatsAppButton } from "./whatsapp-button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/placeholder.svg?height=40&width=40" alt="لوگو" width={40} height={40} className="ml-2" />
            <span className="text-xl font-bold">پوست زیبا</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
              صفحه اصلی
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-amber-600 transition-colors">
              محصولات
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors">
              درباره ما
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
              تماس با ما
            </Link>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <Link
              href="/contact"
              className="hidden md:inline-flex bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              سفارش محصول
            </Link>

            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-50 rounded-lg p-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
                صفحه اصلی
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-amber-600 transition-colors">
                محصولات
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
                تماس با ما
              </Link>
              <Link
                href="/contact"
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors text-center"
              >
                سفارش محصول
              </Link>
            </nav>
          </div>
        )}
      </div>

      <WhatsAppButton phoneNumber="989123456789" />
    </header>
  )
}

