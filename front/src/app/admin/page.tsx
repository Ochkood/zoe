import { prisma } from "@/lib/prisma";
import { deleteBooking, updateBookingStatus } from "@/app/actions";
import { 
  Trash2, CheckCircle, XCircle, Clock, Phone, Mail, Users, Calendar as CalendarIcon
} from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

// Shadcn UI Components
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AdminSearch } from "@/components/admin-search";

// Хугацааг гоё харагдуулах
const formatDuration = (minutes: number) => {
  if (minutes === 60) return "1 цаг";
  if (minutes === 120) return "2 цаг";
  return `${minutes} мин`;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Админ мэйл шалгах
  const adminEmails = ["ochko0614@gmail.com", "yanjmaa76@gmail.com"];
  if (!adminEmails.includes(user.emailAddresses[0].emailAddress)) {
    return <div className="p-10 text-red-500">Уучлаарай, хандах эрхгүй байна.</div>;
  }

  // Хайлт болон Хуудаслалт
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 10;

  const whereCondition = query ? {
    OR: [
      { name: { contains: query, mode: 'insensitive' as const } },
      { phone: { contains: query, mode: 'insensitive' as const } },
      { email: { contains: query, mode: 'insensitive' as const } },
    ],
  } : {};

  const totalItems = await prisma.booking.count({ where: whereCondition });
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const bookings = await prisma.booking.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="p-4 md:p-8 space-y-6 flex-1 bg-gray-50/50 min-h-full">
        
        {/* HEADER: Гарчиг болон Хайлт */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Захиалгын Жагсаалт</h1>
                <p className="text-sm text-muted-foreground">
                    Нийт {totalItems} захиалга | Хуудас {currentPage} / {totalPages || 1}
                </p>
            </div>
            <div className="w-full sm:w-auto">
                <AdminSearch />
            </div>
        </div>

        {/* 1. DESKTOP TABLE VIEW (Зөвхөн том дэлгэц дээр харагдана) */}
        <div className="hidden md:block bg-white rounded-lg border shadow-sm overflow-hidden">
             <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="pl-6 py-4">Захиалагч</TableHead>
                        <TableHead>Холбоо барих</TableHead>
                        <TableHead>Үйлчилгээ</TableHead>
                        <TableHead>Огноо</TableHead>
                        <TableHead>Төлөв</TableHead>
                        <TableHead className="text-right pr-6">Үйлдэл</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.id} className="hover:bg-gray-50 transition-colors">
                             {/* Захиалагч */}
                             <TableCell className="pl-6 py-4 align-top">
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-9 w-9 bg-gray-100 border">
                                        <AvatarFallback>{booking.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-gray-900">{booking.name}</div>
                                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                            <Users className="w-3 h-3" /> {booking.guests} хүний
                                        </div>
                                        {booking.notes && (
                                            <div className="mt-1 text-[10px] bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 inline-block">
                                                {booking.notes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                             </TableCell>

                             {/* Холбоо барих */}
                             <TableCell className="align-top py-4">
                                <div className="space-y-1 text-sm">
                                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                                        <Phone className="w-3.5 h-3.5 text-gray-400" /> {booking.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                        <Mail className="w-3.5 h-3.5 text-gray-400" /> 
                                        {booking.email ? (
                                            <span className="truncate max-w-37.5" title={booking.email}>{booking.email}</span>
                                        ) : '-'}
                                    </div>
                                </div>
                             </TableCell>

                             {/* Үйлчилгээ */}
                             <TableCell className="align-top py-4">
                                <div className="flex flex-col gap-1 items-start">
                                    <Badge variant="outline" className="font-normal text-xs bg-blue-50 text-blue-700 border-blue-100">
                                        {booking.service}
                                    </Badge>
                                    <span className="text-xs text-gray-500 flex items-center gap-1 ml-1">
                                        <Clock className="w-3 h-3" /> {formatDuration(booking.duration || 60)}
                                    </span>
                                </div>
                             </TableCell>

                             {/* Огноо */}
                             <TableCell className="align-top py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">
                                        {new Date(booking.date).toLocaleDateString("mn-MN", {month: 'short', day: 'numeric'})}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(booking.date).toLocaleTimeString("mn-MN", {hour: '2-digit', minute: '2-digit'})}
                                    </span>
                                </div>
                             </TableCell>

                             {/* Төлөв */}
                             <TableCell className="align-top py-4">
                                <Badge className={`
                                    ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800 border-green-200' :
                                      'bg-red-100 text-red-800 border-red-200'} 
                                    border shadow-none font-medium
                                `}>
                                    {booking.status === 'pending' ? 'Хүлээгдэж буй' : 
                                     booking.status === 'confirmed' ? 'Баталгаажсан' : 'Цуцлагдсан'}
                                </Badge>
                             </TableCell>

                             {/* Үйлдлүүд */}
                             <TableCell className="text-right py-4 pr-6 align-top">
                                <div className="flex justify-end gap-1">
                                    {booking.status === 'pending' && (
                                        <form action={updateBookingStatus.bind(null, booking.id, 'confirmed')}>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50" title="Батлах">
                                                <CheckCircle className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    )}
                                    {booking.status === 'confirmed' && (
                                        <form action={updateBookingStatus.bind(null, booking.id, 'cancelled')}>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-orange-600 hover:bg-orange-50" title="Цуцлах">
                                                <XCircle className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    )}
                                    <form action={deleteBooking.bind(null, booking.id)}>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50" title="Устгах">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                             </TableCell>
                        </TableRow>
                    ))}
                    
                    {bookings.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                                {query ? `"${query}" илэрц олдсонгүй.` : "Захиалга одоогоор алга байна."}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
             </Table>
        </div>

        {/* 2. MOBILE CARD VIEW (Зөвхөн утсан дээр харагдана) */}
        <div className="md:hidden space-y-4">
            {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden border shadow-sm">
                    <CardContent className="p-4">
                        {/* Header: Нэр & Статус */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border bg-gray-50">
                                    <AvatarFallback>{booking.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold text-gray-900">{booking.name}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {booking.guests} хүний
                                    </div>
                                </div>
                            </div>
                            <Badge className={`${
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                            } border-0 px-2 py-0.5 text-xs shadow-none`}>
                                {booking.status === 'pending' ? 'Хүлээлгэ' : 
                                 booking.status === 'confirmed' ? 'Баталсан' : 'Цуцалсан'}
                            </Badge>
                        </div>

                        {/* Body: Дэлгэрэнгүй мэдээлэл */}
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <span>
                                    {new Date(booking.date).toLocaleDateString("mn-MN", {month: 'numeric', day: 'numeric'})}, 
                                    {new Date(booking.date).toLocaleTimeString("mn-MN", {hour: '2-digit', minute: '2-digit'})}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{formatDuration(booking.duration || 60)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 col-span-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <a href={`tel:${booking.phone}`} className="text-blue-600 hover:underline">{booking.phone}</a>
                            </div>
                        </div>
                        
                        {booking.notes && (
                            <div className="bg-gray-50 text-gray-700 text-xs p-2 rounded mb-4 border border-gray-100">
                                📝 {booking.notes}
                            </div>
                        )}

                        {/* Footer: Товчнууд */}
                        <div className="flex items-center justify-between border-t pt-3 mt-2">
                            <div className="flex gap-2 w-full">
                                {booking.status === 'pending' && (
                                    <form action={updateBookingStatus.bind(null, booking.id, 'confirmed')} className="flex-1">
                                        <Button variant="outline" className="w-full text-green-700 hover:text-green-800 hover:bg-green-50 border-green-200 h-9">
                                            <CheckCircle className="w-4 h-4 mr-2" /> Батлах
                                        </Button>
                                    </form>
                                )}
                                {booking.status === 'confirmed' && (
                                    <form action={updateBookingStatus.bind(null, booking.id, 'cancelled')} className="flex-1">
                                        <Button variant="outline" className="w-full text-orange-700 hover:text-orange-800 hover:bg-orange-50 border-orange-200 h-9">
                                            <XCircle className="w-4 h-4 mr-2" /> Цуцлах
                                        </Button>
                                    </form>
                                )}
                            </div>
                            
                            <form action={deleteBooking.bind(null, booking.id)} className="ml-2">
                                <Button size="icon" variant="ghost" className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {bookings.length === 0 && (
                 <div className="text-center text-gray-500 py-10">
                    {query ? `"${query}" илэрц олдсонгүй.` : "Захиалга байхгүй байна."}
                 </div>
            )}
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
            <div className="flex items-center justify-center md:justify-end gap-2 pt-4">
                <Button variant="outline" size="sm" disabled={currentPage <= 1} asChild>
                    <Link href={`/admin?page=${currentPage - 1}&query=${query}`}>Өмнөх</Link>
                </Button>
                
                <span className="text-sm font-medium text-gray-600 px-2">
                    {currentPage} / {totalPages}
                </span>

                <Button variant="outline" size="sm" disabled={currentPage >= totalPages} asChild>
                    <Link href={`/admin?page=${currentPage + 1}&query=${query}`}>Дараах</Link>
                </Button>
            </div>
        )}
    </div>
  );
}