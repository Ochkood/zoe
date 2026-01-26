import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, getDay, addMonths, subMonths 
} from "date-fns";
import { mn } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarBookingItem } from "@/components/calendar-booking-item"; // 👈 Шинэ компонент

export default async function AdminCalendarPage({
    searchParams,
  }: {
    searchParams?: Promise<{ month?: string }>;
  }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  
  const adminEmails = ["ochko0614@gmail.com", "yanjmaa76@gmail.com"];
  if (!adminEmails.includes(user.emailAddresses[0].emailAddress)) {
     return <div className="p-8 text-red-500">Access Denied</div>;
  }

  // 1. Сонгосон сарыг олох
  const params = await searchParams;
  const today = new Date();
  
  // URL-ээс сарыг авах, байхгүй бол өнөөдрөөр авах
  const currentMonthStr = params?.month || format(today, "yyyy-MM");
  const currentMonthDate = new Date(currentMonthStr + "-01"); // "2026-01-01" болгож хөрвүүлэх

  // 2. Navigation Logic (Өмнөх болон Дараа сар)
  const prevMonth = format(subMonths(currentMonthDate, 1), "yyyy-MM");
  const nextMonth = format(addMonths(currentMonthDate, 1), "yyyy-MM");

  // 3. Сар эхлэх, дуусах
  const monthStart = startOfMonth(currentMonthDate);
  const monthEnd = endOfMonth(currentMonthDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // 4. Захиалга татах
  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: monthStart,
        lte: monthEnd,
      },
      status: { not: 'cancelled' } 
    },
    orderBy: { date: 'asc' }
  });

  const weekDays = ["Ням", "Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям"];
  const startDayIndex = getDay(monthStart); 
  
  return (
    <div className="p-4 md:p-8 h-full flex flex-col min-h-screen bg-gray-50/50">
        
        {/* HEADER: Сар солих хэсэг */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    {format(currentMonthDate, 'yyyy оны MMMM', { locale: mn })}
                </h1>
            </div>

            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/calendar?month=${prevMonth}`}>
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                </Button>
                
                <span className="text-sm font-medium px-4 min-w-[100px] text-center">
                    {format(currentMonthDate, 'yyyy-MM')}
                </span>

                <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/calendar?month=${nextMonth}`}>
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </Button>

                {/* Өнөөдөр лүү буцах товч */}
                <Button variant="outline" size="sm" className="ml-2 text-xs" asChild>
                    <Link href={`/admin/calendar`}>Өнөөдөр</Link>
                </Button>
            </div>
        </div>

        {/* CALENDAR GRID */}
        <div className="bg-white border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
            
            {/* Гарагууд */}
            <div className="grid grid-cols-7 border-b bg-gray-50/80">
                {weekDays.map((d) => (
                    <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-r last:border-r-0">
                        {d}
                    </div>
                ))}
            </div>

            {/* Өдрүүд */}
            <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-gray-100 gap-[1px] border-b">
                {/* Хоосон нүднүүд */}
                {Array.from({ length: startDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-white min-h-[100px]" />
                ))}

                {/* Жинхэнэ өдрүүд */}
                {days.map((day) => {
                    const isToday = isSameDay(day, today);
                    const dayBookings = bookings.filter(b => isSameDay(b.date, day));

                    return (
                        <div key={day.toString()} className={`
                            bg-white p-2 min-h-[120px] relative hover:bg-gray-50 transition-colors flex flex-col gap-2
                        `}>
                            {/* Өдрийн дугаар */}
                            <div className="flex justify-between items-start">
                                <span className={`
                                    text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                                    ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700'}
                                `}>
                                    {format(day, 'd')}
                                </span>
                                {dayBookings.length > 0 && (
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        {dayBookings.length}
                                    </span>
                                )}
                            </div>

                            {/* Захиалгуудын жагсаалт */}
                            <div className="space-y-1 overflow-y-auto max-h-[100px] pr-1 custom-scrollbar">
                                {dayBookings.map(b => (
                                    // 👈 Шинэ клиент компонент ашиглаж байна
                                    <CalendarBookingItem key={b.id} booking={b} />
                                ))}
                            </div>
                        </div>
                    );
                })}
                
                {/* Төгсгөлийн хоосон нүднүүд (Optional: Grid-ийг дүүргэхийн тулд) */}
                {Array.from({ length: (7 - (days.length + startDayIndex) % 7) % 7 }).map((_, i) => (
                    <div key={`end-empty-${i}`} className="bg-white min-h-[100px]" />
                ))}
            </div>
        </div>
    </div>
  );
}