"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

// 1-ээс 20 хүртэлх зургийн нэрийг үүсгэх
const allImages = Array.from({ length: 20 }, (_, i) => `/review${i + 1}.jpg`);

// Зургуудыг 2 баганад хуваах
const col1Images = allImages.slice(0, 10); // review1 - review10
const col2Images = allImages.slice(10, 20); // review11 - review20

// Текстэн сэтгэгдлүүд (Хэвээрээ)
const reviews = [
  { name: "Сара К.", text: "Гайхалтай туршлага! Зургууд үнэхээр гоё гарсан, багийнхан маш мэргэжлийн байлаа." },
  { name: "Жон Д.", text: "ZOE студитэй ажиллахад таатай байлаа. Бидний нандин мөчүүдийг төгс буулгаж чадсан." },
  { name: "Эмили Р.", text: "Маш их санал болгож байна! Бүтээлч сэтгэлгээтэй, зураг авалтын үйл явц хөгжилтэй байсан." },
  { name: "Мишээл Б.", text: "Миний үйлчлүүлж байсан хамгийн шилдэг студи. Чанар бол ярих юмгүй." },
  { name: "Анна С.", text: "Маш найрсаг орчин, өндөр чанартай үр дүн. Дахин заавал ирнээ!" },
];
const duplicatedReviews = [...reviews, ...reviews];

export default function Reviews() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 1. ЗҮҮН ТАЛ: ЗУРАГНУУД (Vertical Infinite Scroll) */}
          <div className="relative h-150 w-full hidden lg:block overflow-hidden rounded-3xl bg-white/50 border border-gray-100">
            
            {/* Дээд ба Доод талын уусгалт (Fade Effect) */}
            <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-gray-50 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-gray-50 to-transparent z-20 pointer-events-none" />

            {/* "1k+" Карт - Хөвөгч байдлаар голд нь байрлуулна */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-center items-center text-center w-40">
                <span className="text-4xl font-bold text-gray-900">1k+</span>
                <span className="text-xs text-gray-500 mt-1">Сэтгэл ханамжтай үйлчлүүлэгч</span>
            </div> */}

            {/* Зургийн баганууд */}
            <div className="grid grid-cols-2 gap-4 h-full p-4">
                
                {/* Багана 1 (review1 - review10) */}
                <div className="h-full overflow-hidden">
                    <motion.div
                        className="flex flex-col gap-4"
                        animate={{ y: ["0%", "-50%"] }} // Дээшээ урсана
                        transition={{
                            ease: "linear",
                            duration: 60, // Хурд
                            repeat: Infinity,
                        }}
                    >
                        {/* Зургуудыг 2 дахин давтана (Loop) */}
                        {[...col1Images, ...col1Images].map((src, index) => (
                            <div key={`col1-${index}`} className="relative w-full aspect-3/4 rounded-xl overflow-hidden shadow-sm">
                                <Image 
                                    src={src} 
                                    alt={`Review Image ${index}`} 
                                    fill 
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Багана 2 (review11 - review20) - Арай удаан хурдтай урсана */}
                <div className="h-full overflow-hidden pt-12"> {/* pt-12 нь бага зэрэг зөрүүлж харагдуулна */}
                    <motion.div
                        className="flex flex-col gap-4"
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 80, // Өөр хурдтай байвал илүү гоё харагдана
                            repeat: Infinity,
                        }}
                    >
                         {/* Зургуудыг 2 дахин давтана (Loop) */}
                        {[...col2Images, ...col2Images].map((src, index) => (
                            <div key={`col2-${index}`} className="relative w-full aspect-3/4 rounded-xl overflow-hidden shadow-sm">
                                <Image 
                                    src={src} 
                                    alt={`Review Image ${index}`} 
                                    fill 
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
          </div>

          {/* 2. БАРУУН ТАЛ: СЭТГЭГДЛҮҮД (Хэвээрээ) */}
          <div className="flex flex-col justify-center">
            
            <div className="mb-10 text-left">
                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Сэтгэгдэл</span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 leading-tight">
                    Бидний тухай <br/> 
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                        Тэд юу хэлсэн бэ?
                    </span>
                </h2>
                <p className="text-gray-600 mt-4 text-lg">
                    Бидний хамгийн том шагнал бол үйлчлүүлэгчдийн маань инээмсэглэл юм.
                </p>
            </div>

            {/* Scrolling Reviews Container */}
            <div className="relative w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-gray-50 to-transparent z-10"></div>

                <motion.div
                    className="flex gap-6"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        ease: "linear",
                        duration: 30,
                        repeat: Infinity,
                    }}
                >
                    {duplicatedReviews.map((review, index) => (
                        <div
                            key={index}
                            className="min-w-[320px] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                            <div>
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                    "{review.text}"
                                </p>
                            </div>
                            
                            <div className="mt-6 flex items-center gap-3 border-t pt-4">
                                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-sm text-white font-bold">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900 text-sm">{review.name}</span>
                                    <span className="block text-xs text-gray-500">Баталгаажсан үйлчлүүлэгч</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}