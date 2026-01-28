import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCard } from "@/components/admin/booking-card";
import { AdminSearch } from "@/components/admin-search";
import { format } from "date-fns";
import { mn } from "date-fns/locale";

// Захиалгын type
type BookingType = Awaited<ReturnType<typeof prisma.booking.findMany>>[number];

export default async function BookingsListPage({
    searchParams,
  }: {
    searchParams?: Promise<{ query?: string }>;
  }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const adminEmails = ["ochko0614@gmail.com", "yanjmaa76@gmail.com"];
  if (!adminEmails.includes(user.emailAddresses[0].emailAddress)) {
     return <div>Access Denied</div>;
  }

  const params = await searchParams;
  const query = params?.query || "";

  const bookings = await prisma.booking.findMany({
    where: query ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
        ],
    } : {},
    orderBy: { date: 'asc' }, 
  });

  const now = new Date();

  // Ангилах
  const upcomingBookings = bookings.filter(b => new Date(b.date) >= now && b.status !== 'cancelled' && b.status === 'confirmed');
  const pendingBookings = bookings.filter(b => b.status === 'pending' && new Date(b.date) >= now);
  const pastBookings = bookings.filter(b => new Date(b.date) < now && b.status !== 'cancelled');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  // 👇 Групплэх функц (Өдрөөр нь багцлах)
  const groupBookingsByDate = (list: BookingType[]) => {
    const groups: Record<string, BookingType[]> = {};
    list.forEach((booking) => {
      // "2026-01-28" гэсэн түлхүүр үүсгэнэ
      const dateKey = format(new Date(booking.date), "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(booking);
    });
    return groups;
  };

  // 👇 Шинэчлэгдсэн Жагсаалтын Компонент
  const BookingGroupList = ({ data, emptyText }: { data: BookingType[], emptyText: string }) => {
    if (data.length === 0) {
        return (
            <div className="mt-12 text-center py-12 bg-white rounded-xl border border-dashed text-gray-500">
                {emptyText}
            </div>
        );
    }

    const groups = groupBookingsByDate(data);

    return (
        <div className="space-y-8 mt-6">
            {Object.keys(groups).map((dateKey) => {
                const groupBookings = groups[dateKey];
                const dateObj = new Date(dateKey);

                return (
                    <div key={dateKey} className="flex flex-col md:flex-row gap-6">
                        {/* Зүүн тал: Огноо (Нэг удаа л харагдана) */}
                        <div className="md:w-24 md:text-right pt-2 sticky top-0">
                            <div className="text-red-500 font-bold uppercase tracking-wide text-sm">
                                {format(dateObj, "EEE", { locale: mn })}
                            </div>
                            <div className="text-3xl font-bold text-gray-900 leading-none">
                                {format(dateObj, "d")}
                            </div>
                            <div className="text-gray-400 text-xs uppercase mt-1">
                                {format(dateObj, "MMM", { locale: mn })}
                            </div>
                        </div>

                        {/* Баруун тал: Тухайн өдрийн захиалгууд */}
                        <div className="flex-1 space-y-3">
                            {groupBookings.map((booking) => (
                                <BookingCard 
                                    key={booking.id} 
                                    booking={booking} 
                                    hideDate={true} // 👈 Огноог карт дотор нууна
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Захиалгууд</h1>
                <p className="text-sm text-gray-500">Таны хуваарьт байгаа бүх захиалгын жагсаалт</p>
            </div>
            <div className="w-full md:w-auto">
                <AdminSearch />
            </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
            <div className="bg-gray-100/80 p-1 rounded-lg inline-flex mb-4 overflow-x-auto max-w-full">
                <TabsList className="bg-transparent h-auto p-0 gap-1">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-black transition-all">
                        Ирж буй ({upcomingBookings.length})
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-orange-600 transition-all">
                        Хүлээгдэж буй ({pendingBookings.length})
                    </TabsTrigger>
                    <TabsTrigger value="past" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-black transition-all">
                        Өнгөрсөн ({pastBookings.length})
                    </TabsTrigger>
                    <TabsTrigger value="cancelled" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-red-600 transition-all">
                        Цуцлагдсан ({cancelledBookings.length})
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="upcoming">
                <BookingGroupList data={upcomingBookings} emptyText="Ойрын хугацаанд батлагдсан захиалга алга." />
            </TabsContent>
            
            <TabsContent value="pending">
                <BookingGroupList data={pendingBookings} emptyText="Хүлээгдэж буй захиалга байхгүй байна." />
            </TabsContent>

            <TabsContent value="past">
                <BookingGroupList data={pastBookings} emptyText="Өнгөрсөн захиалга байхгүй." />
            </TabsContent>

            <TabsContent value="cancelled">
                <BookingGroupList data={cancelledBookings} emptyText="Цуцлагдсан захиалга байхгүй." />
            </TabsContent>
        </Tabs>
    </div>
  );
}