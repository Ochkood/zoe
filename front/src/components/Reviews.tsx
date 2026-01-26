"use client"; // Next.js App Router ашиглаж байгаа бол заавал бичнэ

import { motion } from "framer-motion";

export default function InfiniteReviews() {
  const reviews = [
    { name: "Sarah K.", text: "Amazing experience! The photos turned out fantastic and the team was so professional." },
    { name: "John D.", text: "I loved working with ZOE Photo Studio. They captured our special moments perfectly." },
    { name: "Emily R.", text: "Highly recommend! The team was creative and made the whole process enjoyable." },
    { name: "Michael B.", text: "The best photography service I have ever used. Quality is top notch." },
    { name: "Anna S.", text: "Very friendly environment and high quality results. Will come back again!" },
  ];

  // Жагсаалтыг 2 дахин үржүүлж "infinite" (төгсгөлгүй) мэт харагдуулна
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Үйлчлүүлэгчдийн маань сэтгэгдлээс...</h2>
      </div>

      {/* Контейнер: Хажуу талуудыг бүдгэрүүлж харагдуулах (Fade effect) */}
      <div className="relative flex overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white to-transparent z-10"></div>

        {/* Хөдөлгөөнт хэсэг */}
        <motion.div
          className="flex gap-6 pr-6"
          animate={{
            x: ["0%", "-50%"], // Хагасыг нь туулахад дахин эхнээс нь эхлүүлнэ
          }}
          transition={{
            ease: "linear",
            duration: 20, // Хурдыг эндээс тохируулна (илүү их секунд байх тусам удаан урсана)
            repeat: Infinity,
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={index}
              className="min-w-87.5 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {review.name[0]}
                </div>
                <span className="font-semibold text-gray-800 text-sm">{review.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}