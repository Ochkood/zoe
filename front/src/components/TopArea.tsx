"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Avatars } from "./Avatars";
import { Button } from "@/components/ui/button"; // Shadcn Button ашиглая
import Link from "next/link";

const heroImages = [
  "/top1.jpg", // Таны зураг 1
  "/top2.jpeg", // Таны зураг 2
  "/top3.jpeg", // Таны зураг 3
];

export default function TopArea() {
  const [currentImage, setCurrentImage] = useState(0);

  // 5 секунд тутамд зураг солих
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-120 min-h-150 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroImages[currentImage]}
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Dark Overlay */}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
        >
          Жаргалтай мөчүүдээ <br/> 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
            Гэрэл зурагт
          </span> мөнхлөөрэй
        </motion.h1>

        <motion.p
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.7 }}
           className="text-gray-200 text-lg md:text-xl max-w-2xl"
        >
            ZOE Studio - Мэргэжлийн тоног төхөөрөмж, тав тухтай орчин, чадварлаг баг хамт олон таныг хүлээж байна.
        </motion.p>

        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
        >
            <Button size="lg" className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-gray-200" asChild>
                <Link href="/booking">Цаг Захиалах</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base text-white border-white bg-transparent hover:bg-white/10" asChild>
                <Link href="#services">Үйлчилгээ үзэх</Link>
            </Button>
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
        >
            <Avatars />
            <p className="text-white/70 text-sm mt-3">1,000+ гаруй үйлчлүүлэгч бидэнд итгэсэн</p>
        </motion.div>
      </div>
    </section>
  );
}