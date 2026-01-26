"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { createBooking, getBookingsByDate } from "@/app/actions";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, addMinutes, setHours, setMinutes, isBefore } from "date-fns";

const initialState = { success: false, message: "" };

export default function BookingForm() {
  const [state, formAction, isPending] = useActionState(createBooking, initialState);
  
  // State-үүд
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState(60); 
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<{start: Date, end: Date}[]>([]);

  // 1. Өдөр сонгогдох үед тухайн өдрийн захиалгуудыг серверээс татах
  useEffect(() => {
    if (date) {
      const fetchBookings = async () => {
        try {
          // toISOString() БИШ, format() ашиглана
          // Энэ нь цагийн зөрүүг тооцохгүйгээр яг "2026-01-28" гэсэн текст явуулна
          const dateString = format(date, "yyyy-MM-dd");

          const bookings = await getBookingsByDate(dateString);
          const slots = bookings.map(b => ({
            start: new Date(b.date),
            end: addMinutes(new Date(b.date), b.duration) // Захиалга дуусах цаг
          }));
          setBookedSlots(slots);
          setSelectedTime(null); 
        } catch (error) {
          console.error("Bookings fetch error:", error);
        }
      };
      fetchBookings();
    }
  }, [date]);

// 2. Цагийн хуваарь үүсгэх (10:00 - 20:00 хүртэл)
  const generateTimeSlots = () => {
    if (!date) return []; // Өдөр сонгоогүй бол цаг харуулахгүй

    const slots = [];
    
    // ❌ ХУУЧИН: let start = setMinutes(setHours(new Date(), 10), 0);
    // Энэ нь дандаа "Өнөөдөр"-ийг авч байсан алдаатай мөр

    // ✅ ШИНЭ: Сонгосон `date`-ээс хуулбар авч цагийг тохируулна
    const baseDate = new Date(date); 
    
    let start = setMinutes(setHours(baseDate, 10), 0); // Сонгосон өдрийн 10:00
    const end = setMinutes(setHours(baseDate, 22), 0); // Сонгосон өдрийн 20:00

    while (start < end) {
      slots.push(new Date(start));
      start = addMinutes(start, 30); 
    }
    return slots;
  };

  // 3. Тухайн цаг сул эсэхийг шалгах (ХАМГИЙН ЧУХАЛ ХЭСЭГ)
  const isTimeDisabled = (slotTime: Date) => {
    // Хэрэв өнгөрсөн цаг байвал идэвхгүй болгох (Өнөөдөр бол)
    const now = new Date();
    if (date && date.toDateString() === now.toDateString()) {
       // Сонгох гэж буй цаг нь одоогийн цагаас өмнө байвал
       const slotWithDate = new Date(date);
       slotWithDate.setHours(slotTime.getHours(), slotTime.getMinutes());
       if (isBefore(slotWithDate, now)) return true;
    }

    // Миний захиалах гэж буй цагийн дуусах хугацаа
    const myEnd = addMinutes(slotTime, duration);

    // Бусад захиалгуудтай давхцаж байгаа эсэхийг шалгах
    for (const booking of bookedSlots) {
      // Давхцлын томъёо: (StartA < EndB) && (EndA > StartB)
      // Таны эхлэх цаг < Захиалгын дуусах цаг БА Таны дуусах цаг > Захиалгын эхлэх цаг
      if (slotTime < booking.end && myEnd > booking.start) {
        return true; // Давхцаж байна -> Disable
      }
    }
    return false;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Цаг Захиалах</h2>

      {state.message && (
        <div className={`p-4 mb-6 rounded-lg text-sm text-center ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Зүүн тал: Календарь */}
          <div>
            <Label className="block mb-3">Өдөр сонгох</Label>
            <div className="border rounded-lg p-2 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} 
              />
            </div>
          </div>

          {/* Баруун тал: Хугацаа & Цаг */}
          <div className="space-y-6">
            
            {/* Хугацаа сонгох */}
            <div>
              <Label className="block mb-3">Үргэлжлэх хугацаа</Label>
              <div className="flex gap-2">
                {[30, 60, 120].map((min) => (
                  <Button
                    key={min}
                    type="button"
                    variant={duration === min ? "default" : "outline"}
                    onClick={() => { setDuration(min); setSelectedTime(null); }}
                    className="flex-1"
                  >
                    {min === 60 ? "1 Цаг" : min === 120 ? "2 Цаг" : "30 мин"}
                  </Button>
                ))}
              </div>
              <input type="hidden" name="duration" value={duration} />
            </div>

            {/* Цаг сонгох Grid */}
            <div>
              <Label className="block mb-3">
                Эхлэх цаг {date ? `(${format(date, 'MM/dd')})` : ''}
              </Label>
              <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
                {date && generateTimeSlots().map((slot, i) => {
                  const isDisabled = isTimeDisabled(slot);
                  const timeString = format(slot, "HH:mm");
                  const isSelected = selectedTime === timeString;

                  // 💡 СОНГОЛТ: Хэрэв та захиалгатай цагийг БҮРМӨСӨН НУУХЫГ хүсвэл доорх мөрийг нээнэ үү:
                  // if (isDisabled) return null;

                  return (
                    <Button
                      key={i}
                      type="button"
                      disabled={isDisabled}
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "text-sm", 
                        // Идэвхгүй үеийн загвар: Саарал, дарагдахгүй, дундуураа зураастай
                        isDisabled && "opacity-30 cursor-not-allowed bg-gray-100 decoration-slate-500 line-through"
                      )}
                      onClick={() => setSelectedTime(timeString)}
                    >
                      {timeString}
                    </Button>
                  );
                })}
                {!date && <p className="text-gray-400 text-sm col-span-3 text-center py-4">Эхлээд өдөр сонгоно уу</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Нууц input (Сонгосон огноог илгээх) */}
        {date && selectedTime && (
            <input 
                type="hidden" 
                name="date" 
                value={(() => {
                    const [hours, minutes] = selectedTime.split(':').map(Number);
                    const finalDate = new Date(date);
                    finalDate.setHours(hours, minutes);
                    return finalDate.toISOString();
                })()} 
            />
        )}

        {/* Хувийн мэдээлэл */}
        <div className="space-y-6 border-t pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                    <Label htmlFor="name">Таны нэр</Label>
                    <Input id="name" name="name" required placeholder="Жишээ: Б.Батболд" className="bg-gray-50 focus:bg-white" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Утасны дугаар</Label>
                    <Input id="phone" name="phone" required type="tel" placeholder="8811-XXXX" className="bg-gray-50 focus:bg-white" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">И-мэйл хаяг</Label>
                    <Input id="email" name="email" type="email" placeholder="name@example.com" className="bg-gray-50 focus:bg-white" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="guests">Ирэх хүний тоо</Label>
                    <Input id="guests" name="guests" required placeholder="Жишээ нь: 4" className="bg-gray-50 focus:bg-white" />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="service">Үйлчилгээний төрөл</Label>
                    <Select name="service" defaultValue="Portrait">
                        <SelectTrigger className="bg-gray-50 focus:bg-white">
                            <SelectValue placeholder="Үйлчилгээ сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Portrait">Хөрөг зураг (Portrait)</SelectItem>
                            <SelectItem value="Family">Гэр бүлийн зураг</SelectItem>
                            <SelectItem value="Event">Эвент / Тэмдэглэлт өдөр</SelectItem>
                            <SelectItem value="Commercial">Байгууллага / Реклам</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Нэмэлт хүсэлт / Тэмдэглэл</Label>
                    <Textarea 
                        id="notes" 
                        name="notes" 
                        placeholder="Жишээ нь: Хувцас солих өрөө хэрэгтэй..." 
                        className="bg-gray-50 focus:bg-white min-h-[100px]"
                    />
                </div>
            </div>
        </div>

        <Button 
            disabled={isPending || !selectedTime} 
            type="submit" 
            className="w-full text-lg py-6"
        >
            {isPending ? "Уншиж байна..." : "Захиалга баталгаажуулах"}
        </Button>

      </form>
    </div>
  );
}