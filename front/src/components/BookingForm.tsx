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
// 👇 ШИНЭ: Dialog болон Icon import хийнэ
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react"; 

import { cn } from "@/lib/utils";
import { format, addMinutes, setHours, setMinutes, isBefore } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation"; // useRouter нэмсэн

// Багц бүрийн үндсэн хугацаа
const SERVICE_DEFAULTS: Record<string, number> = {
  "Basic30min": 30,
  "Basic60min": 60,
  "SocialMedia": 60,
  "Friends": 60,
  "Love247": 60,
  "Birthday": 60,
  "Family": 60,
  "FamilyXL": 60,
  "FamilyPremium": 60,
};

const initialState = { success: false, message: "" };

export default function BookingForm() {
  const [state, formAction, isPending] = useActionState(createBooking, initialState);
  const searchParams = useSearchParams();
  const router = useRouter(); // Хуудас шилжихэд хэрэг болно

  // State-үүд
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState(60);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<{ start: Date, end: Date }[]>([]);
  const [service, setService] = useState("");
  
  // 👇 ШИНЭ: Dialog нээх state
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // 1. URL-ээс ирсэн 'service' параметрийг уншиж тохируулах
  useEffect(() => {
    const serviceCode = searchParams.get("service");
    if (serviceCode) {
      setService(serviceCode);
      const defaultDuration = SERVICE_DEFAULTS[serviceCode] || 60;
      setDuration(defaultDuration);
    }
  }, [searchParams]);

  // 2. Өдөр сонгогдох үед тухайн өдрийн захиалгуудыг серверээс татах
  useEffect(() => {
    if (date) {
      const fetchBookings = async () => {
        try {
          const dateString = format(date, "yyyy-MM-dd");
          const bookings = await getBookingsByDate(dateString);
          const slots = bookings.map(b => ({
            start: new Date(b.date),
            end: addMinutes(new Date(b.date), b.duration)
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

  // 👇 ШИНЭ: Амжилттай болсон үед Dialog нээх useEffect
  useEffect(() => {
    if (state.success) {
      setShowSuccessDialog(true);
    }
  }, [state.success]);

  // 3. Цагийн хуваарь үүсгэх
  const generateTimeSlots = () => {
    if (!date) return [];
    const slots = [];
    const baseDate = new Date(date);
    let start = setMinutes(setHours(baseDate, 10), 0);
    const end = setMinutes(setHours(baseDate, 22), 0);
    while (start < end) {
      slots.push(new Date(start));
      start = addMinutes(start, 30);
    }
    return slots;
  };

  // 4. Тухайн цаг сул эсэхийг шалгах
  const isTimeDisabled = (slotTime: Date) => {
    const now = new Date();
    if (date && date.toDateString() === now.toDateString()) {
      const slotWithDate = new Date(date);
      slotWithDate.setHours(slotTime.getHours(), slotTime.getMinutes());
      if (isBefore(slotWithDate, now)) return true;
    }
    const myEnd = addMinutes(slotTime, duration);
    for (const booking of bookedSlots) {
      if (slotTime < booking.end && myEnd > booking.start) {
        return true;
      }
    }
    return false;
  };

  const handleServiceChange = (val: string) => {
    setService(val);
    const defaultDuration = SERVICE_DEFAULTS[val] || 60;
    setDuration(defaultDuration);
    setSelectedTime(null);
  };

  return (
    <>
      {/* --- SUCCESS DIALOG --- */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center text-xl">Захиалга амжилттай!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Таны захиалгын хүсэлтийг хүлээн авлаа.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-2 border border-gray-100">
            <p>
              Бид таны оруулсан <strong>имэйл хаяг руу</strong> төлбөр төлөх заавар болон дансны мэдээллийг илгээлээ.
            </p>
            <p className="font-medium text-black">
              ⚠️ Төлбөр төлөгдсөний дараа таны захиалга бүрэн баталгаажихыг анхаарна уу.
            </p>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button 
              type="button" 
              className="w-full sm:w-auto min-w-37.5"
              onClick={() => {
                setShowSuccessDialog(false);
                // Сонголтоор: Нүүр хуудас руу буцаах эсвэл формоо шинэчлэх
                // router.push("/"); 
                window.location.reload(); // Формыг цэвэрлэхийн тулд refresh хийж байна
              }}
            >
              Ойлголоо
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Цаг Захиалах</h2>
        <p className="text-center text-gray-500 mb-8">Та мэдээллээ үнэн зөв бөглөнө үү.</p>

        {/* Зөвхөн АЛДАА гарсан үед л энд мессеж харуулна. Амжилттай үед Dialog гарна. */}
        {state.message && !state.success && (
          <div className="p-4 mb-6 rounded-lg text-sm text-center font-medium bg-red-50 text-red-800 border border-red-200">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-8">

          {/* --- 1. ҮЙЛЧИЛГЭЭ СОНГОХ ХЭСЭГ --- */}
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <Label htmlFor="service" className="block mb-2 font-bold text-gray-800 text-lg">
              1. Үйлчилгээний багц сонгох
            </Label>
            <Select name="service" value={service} onValueChange={handleServiceChange}>
              <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-2 focus:ring-black h-12 text-base">
                <SelectValue placeholder="Энд дарж багцаа сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic30min">Багц 1: Энгийн 30 мин (40к)</SelectItem>
                <SelectItem value="Basic60min">Багц 2: Энгийн 1 цаг (60к)</SelectItem>
                <SelectItem value="SocialMedia">Багц 3: Social Media (50к)</SelectItem>
                <SelectItem value="Friends">Багц 4: Найзууд (60к)</SelectItem>
                <SelectItem value="Love247">Багц 5: Хос (70к)</SelectItem>
                <SelectItem value="Birthday">Багц 6: Төрсөн өдөр (70к)</SelectItem>
                <SelectItem value="Family">Багц 7: Гэр бүл (100к)</SelectItem>
                <SelectItem value="FamilyXL">Багц 8: Гэр бүл XL (125к)</SelectItem>
                <SelectItem value="FamilyPremium">Багц 9: Гэр бүл Premium (150к)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* --- 2. ЦАГ БОЛОН ӨДӨР СОНГОХ --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Зүүн тал: Календарь */}
            <div>
              <Label className="block mb-3 text-lg font-semibold text-gray-700">2. Өдөр сонгох</Label>
              <div className="border rounded-2xl p-4 flex justify-center bg-gray-50/50">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md p-0 w-full"
                  classNames={{
                    months: "flex flex-col sm:flex-col space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                    month: "space-y-6 w-full",
                    caption: "flex justify-center pt-1 relative items-center mb-6",
                    caption_label: "text-2xl font-bold text-gray-800",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-10 w-10 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-xl hover:bg-gray-100 transition-colors",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-auto mx-auto border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-14 font-normal text-[1rem]",
                    row: "flex w-full mt-2",
                    cell: "h-14 w-14 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-12 w-13 p-0 font-medium text-lg aria-selected:opacity-100 hover:bg-gray-100 rounded-2xl transition-all",
                    day_selected: "bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white shadow-lg scale-110 font-bold hover:cursor-pointer",
                    day_today: "bg-gray-100 text-accent-foreground font-bold border border-gray-300",
                    day_outside: "text-muted-foreground opacity-30",
                    day_disabled: "text-muted-foreground opacity-30",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>
            </div>

            {/* Баруун тал: Хугацаа & Цаг */}
            <div className="space-y-6">

              {/* Хугацаа сонгох */}
              <div>
                <Label className="block mb-3 text-lg font-semibold text-gray-700">3. Үргэлжлэх хугацаа</Label>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg ">
                  {[30, 60, 120].map((min) => (
                    <Button
                      key={min}
                      type="button"
                      variant={duration === min ? "default" : "ghost"}
                      onClick={() => { setDuration(min); setSelectedTime(null); }}
                      className={cn(
                        "flex-1 rounded-md transition-all",
                        duration === min ? "bg-black text-white shadow-sm font-bold" : "text-gray-500 hover:text-black hover:cursor-pointer"
                      )}
                    >
                      {min === 60 ? "1 Цаг" : min === 120 ? "2 Цаг" : "30 мин"}
                    </Button>
                  ))}
                </div>
                <input type="hidden" name="duration" value={duration} />
              </div>

              {/* Цаг сонгох Grid */}
              <div>
                <Label className="block mb-3 font-semibold text-gray-700">
                  4. Эхлэх цаг {date ? <span className="text-blue-600 font-normal">({format(date, 'MM сарын dd')})</span> : ''}
                </Label>
                <div className="grid grid-cols-4 gap-2 max-h-70 overflow-y-auto pr-1 custom-scrollbar">
                  {date && generateTimeSlots().map((slot, i) => {
                    const isDisabled = isTimeDisabled(slot);
                    const timeString = format(slot, "HH:mm");
                    const isSelected = selectedTime === timeString;

                    return (
                      <Button
                        key={i}
                        type="button"
                        disabled={isDisabled}
                        variant={isSelected ? "default" : "outline"}
                        className={cn(
                          "text-sm h-10",
                          isSelected ? "bg-black text-white" : "border-gray-200 hover:border-gray-900 hover:cursor-pointer",
                          isDisabled && "opacity-40 cursor-not-allowed bg-gray-50 border-transparent text-gray-400 decoration-gray-400 line-through "
                        )}
                        onClick={() => setSelectedTime(timeString)}
                      >
                        {timeString}
                      </Button>
                    );
                  })}
                  {!date && <p className="text-gray-400 text-sm col-span-4 text-center py-8 bg-gray-50 rounded-lg border border-dashed">Эхлээд өдрөө сонгоно уу</p>}
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

          {/* --- 5. ХУВИЙН МЭДЭЭЛЭЛ --- */}
          <div className="space-y-6 border-t pt-8">
            <h3 className="font-bold text-lg">5. Хувийн мэдээлэл</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Service Select-ийг эндээс авч хаясан */}

              <div className="space-y-2">
                <Label htmlFor="name">Таны нэр</Label>
                <Input id="name" name="name" required placeholder="Бүтэн нэрээ бичнэ үү" className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-black h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Ирэх хүний тоо</Label>
                <Input id="guests" name="guests" required placeholder="Жишээ нь: 4" className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-black h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Утасны дугаар</Label>
                <Input id="phone" name="phone" required type="tel" placeholder="8811-XXXX" className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-black h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">И-мэйл хаяг <span className="text-gray-400 font-normal">(Зураг илгээх тул зөв бичнэ үү)</span></Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-black h-11" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Нэмэлт хүсэлт / Тэмдэглэл</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Таньд нэмэлт ямар нэгэн хүсэлт байна уу?"
                  className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-black min-h-24 resize-none"
                />
              </div>
            </div>
          </div>

          <Button
            disabled={isPending || !selectedTime || !service}
            type="submit"
            className="w-full text-lg py-7 rounded-xl bg-black hover:bg-gray-800 transition-all active:scale-[0.99] hover:cursor-pointer"
          >
            {isPending ? "Уншиж байна..." : selectedTime ?  "Захиалга баталгаажуулах" : "Цагаа сонгоно уу"}
          </Button>

        </form>
      </div>
    </>
  );
}