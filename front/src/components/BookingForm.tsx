// src/components/BookingForm.tsx
"use client";

import { useActionState } from "react";
import { createBooking } from "@/app/actions";
import MyButton from "./Button";

// Анхны төлөв (Form эхлэх үед)
const initialState = {
  success: false,
  message: "",
};

export default function BookingForm() {
  // Server Action-тай холбогдох хэсэг
  const [state, formAction, isPending] = useActionState(createBooking, initialState);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Цаг Захиалах</h2>

      {/* Хариу мессеж харуулах хэсэг */}
      {state.message && (
        <div className={`p-4 mb-4 rounded-lg text-sm ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {state.message}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        {/* Нэр */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Таны нэр</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Болд"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Утас */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Утасны дугаар</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="8888-8888"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* И-мэйл */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">И-мэйл (Заавал биш)</label>
          <input
            name="email"
            type="email"
            placeholder="name@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Үйлчилгээ сонгох */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Багц сонгох</label>
          <select
            name="service"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none bg-white"
          >
            <option value="Portrait">Хөрөг зураг (Portrait)</option>
            <option value="Family">Гэр бүлийн зураг</option>
            <option value="Event">Арга хэмжээ</option>
            <option value="Product">Бүтээгдэхүүний зураг</option>
          </select>
        </div>

        {/* Хүний тоо */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ирэх хүний тоо</label>
          <input
            name="guests"
            type="text" 
            required
            placeholder="Жишээ нь: 4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Нэмэлт мэдээлэл */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Нэмэлт мэдээлэл (Хүсэлт)</label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Жишээ нь: Гэр бүлийн зураг авахуулна, хувцас солих өрөө хэрэгтэй..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Огноо */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Товлосон цаг</label>
          <input
            name="date"
            type="datetime-local"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Submit товч */}
        <div className="mt-4">
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {isPending ? "Илгээж байна..." : "Захиалах"}
          </button>
        </div>
      </form>
    </div>
  );
}