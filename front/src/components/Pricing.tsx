"use client";

import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Багцуудын мэдээлэл
const packages = [
  {
    category: "basic",
    name: "Багц 1: Энгийн",
    duration: "30 минут",
    price: "40,000₮",
    features: ["13x18 хэмжээтэй зураг 2ш"],
    highlight: false,
  },
  {
    category: "basic",
    name: "Багц 2: Энгийн",
    duration: "60 минут",
    price: "60,000₮",
    features: ["А4 хэмжээтэй зураг 1ш", "13x18 хэмжээтэй зураг 2ш"],
    highlight: true,
  },
  {
    category: "special",
    name: "Багц 3: Найзууд",
    duration: "60 минут",
    price: "60,000₮",
    features: ["13x18 хэмжээтэй зураг 3-6ш"],
    highlight: false,
  },
  {
    category: "special",
    name: "Багц 4: Хос",
    duration: "60 минут",
    price: "70,000₮",
    features: ["13x18 жаазтай 2ш", "13x18 хэмжээтэй зураг 2ш"],
    highlight: true,
  },
  {
    category: "special",
    name: "Багц 5: Төрсөн өдөр/Жирэмсэн",
    duration: "60 минут",
    price: "70,000₮",
    features: ["15x20 шилэн жаазтай 1ш", "13x18 хэмжээтэй зураг 2ш"],
    highlight: false,
  },
  {
    category: "family",
    name: "Багц 6: Гэр бүл",
    duration: "60 минут",
    price: "100,000₮",
    features: [
      "20x30 жаазтай 1ш",
      "20x30 жаазгүй 1ш",
      "13x18 жаазтай 2ш",
      "Хөргөгчний наалт (2 талдаа зурагтай) 1ш",
      "Түлхүүрийн оосор (2 талдаа зурагтай) 1ш",
    ],
    highlight: true,
  },
  {
    category: "family",
    name: "Багц 7: Гэр бүл XL",
    duration: "60 минут",
    price: "125,000₮",
    features: ["30x40 жаазтай 1ш", "20x30 жаазтай 2ш", "13x18 жаазгүй 2ш"],
    highlight: false,
  },
  {
    category: "family",
    name: "Багц 8: Гэр бүл Premium",
    duration: "60 минут",
    price: "150,000₮",
    features: ["30x40 модон зураг 1ш", "20x30 модон зураг 2ш", "13x18 жаазгүй 2ш"],
    highlight: false,
  },
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("basic");

  const filteredPackages = packages.filter((pkg) => pkg.category === activeTab);

  return (
    <section id="pricing" className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-gray-50/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Үнийн санал</h2>
        <p className="text-gray-600">Танд болон таны дотны хүмүүст тохирох багцыг сонгоорой.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {[
          { id: "basic", label: "Энгийн Багц" },
          { id: "special", label: "Найз/Хос/Төрсөн өдөр" },
          { id: "family", label: "Гэр бүл" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-black text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {filteredPackages.map((pkg, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col p-8 bg-white rounded-3xl border transition-all duration-300",
              pkg.highlight
                ? "border-blue-500 shadow-xl scale-105 z-10"
                : "border-gray-100 shadow-sm hover:shadow-md"
            )}
          >
            {pkg.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Эрэлттэй
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
                ⏱ {pkg.duration}
              </p>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-0.5 bg-green-100 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className={cn(
                "w-full rounded-full font-bold",
                pkg.highlight ? "bg-blue-600 hover:bg-blue-700" : "bg-black hover:bg-gray-800"
              )}
              asChild
            >
              <Link href="/booking">Захиалах</Link>
            </Button>
          </div>
        ))}
      </div>
      
      {/* Additional Info Link */}
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">
          * Нэмэлт үйлчилгээ (Жааз, цомог, хэвлэлт) болон бусад дэлгэрэнгүйг студи дээр ирж танилцана уу.
        </p>
      </div>
    </section>
  );
}