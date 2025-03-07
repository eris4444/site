import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "سارا محمدی",
    avatar: "/placeholder.svg?height=80&width=80",
    text: "من از کرم مرطوب کننده این برند استفاده می‌کنم و واقعاً از نتیجه آن راضی هستم. پوستم نرم و لطیف شده است.",
    rating: 5,
  },
  {
    id: 2,
    name: "علی رضایی",
    avatar: "/placeholder.svg?height=80&width=80",
    text: "سرم ویتامین C این برند فوق‌العاده است. بعد از یک ماه استفاده، لک‌های صورتم کمرنگ شده‌اند.",
    rating: 4,
  },
  {
    id: 3,
    name: "مریم حسینی",
    avatar: "/placeholder.svg?height=80&width=80",
    text: "من عاشق محصولات این برند هستم. کیفیت بالا و قیمت مناسب. حتماً به دوستانم هم پیشنهاد می‌دهم.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">نظرات مشتریان</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full ml-3"
              />
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

