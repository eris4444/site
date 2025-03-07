import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <div className="relative bg-amber-50 w-full">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">پوست سالم، زیبایی ماندگار</h1>
            <p className="text-lg mb-8">
              محصولات مراقبت از پوست ما با بهترین مواد طبیعی تهیه شده‌اند تا پوستی شاداب و درخشان داشته باشید.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <Link
                href="/products"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                مشاهده محصولات
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-100 text-amber-600 border border-amber-600 px-6 py-3 rounded-lg transition-colors"
              >
                تماس با ما
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-80">
              <Image
                src="/placeholder.svg?height=320&width=400"
                alt="محصولات مراقبت از پوست"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  )
}

