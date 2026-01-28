"use client";

import { Booking } from "@prisma/client";
import { format } from "date-fns";
import { mn } from "date-fns/locale";
import { 
  MoreHorizontal, Clock, MapPin, CheckCircle, XCircle, Trash2, 
  Phone, Mail, FileText, Hourglass 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"; 
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { updateBookingStatus, deleteBooking } from "@/app/actions";

const getDurationLabel = (minutes: number) => {
  if (minutes === 30) return "30 минут";
  if (minutes === 60) return "1 цаг";
  if (minutes === 90) return "1.5 цаг";
  if (minutes === 120) return "2 цаг";
  return `${minutes} мин`;
};

export function BookingCard({ booking, hideDate = false }: { booking: Booking, hideDate?: boolean }) {
  const dateObj = new Date(booking.date);
  const duration = booking.duration || 60;
  const endTime = new Date(dateObj.getTime() + duration * 60000);
  
  const durationLabel = getDurationLabel(duration);

  return (
    <div className="group flex flex-col md:flex-row items-start gap-4 p-4 md:p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
      
      {/* 1. Огноо (Зөвхөн hideDate=false үед) */}
      {!hideDate && (
        <div className="flex flex-row md:flex-col items-center md:justify-center gap-2 md:gap-0 w-full md:w-auto md:min-w-[80px] md:border-r md:pr-6 border-gray-100 border-b md:border-b-0 pb-3 md:pb-0">
          <span className="text-red-500 font-bold text-sm uppercase tracking-wide">
            {format(dateObj, "EEE", { locale: mn })}
          </span>
          <span className="text-3xl font-bold text-gray-900 mx-2 md:mx-0">
            {format(dateObj, "d")}
          </span>
          <span className="text-gray-400 text-xs uppercase">
              {format(dateObj, "MMM", { locale: mn })}
          </span>
        </div>
      )}

      {/* 2. Үндсэн Мэдээлэл */}
      <div className="flex-1 space-y-3 w-full min-w-0"> {/* min-w-0 is important for truncation */}
        
        {/* Дээд хэсэг: Цаг, Хугацаа, Статус */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-3 border-b border-gray-50 pb-2">
            <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-md">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="whitespace-nowrap">
                      {format(dateObj, "HH:mm")} - {format(endTime, "HH:mm")}
                    </span>
                </div>
                
                <Badge variant="secondary" className="font-normal text-xs gap-1 bg-gray-100 text-gray-600 hover:bg-gray-200 whitespace-nowrap">
                    <Hourglass className="w-3 h-3" /> {durationLabel}
                </Badge>
            </div>

            <Badge className={`
                border-0 px-2.5 py-0.5 text-[10px] uppercase font-bold shadow-none ml-auto
                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-700'}
            `}>
                {booking.status === 'pending' ? 'Хүлээгдэж буй' : 
                 booking.status === 'confirmed' ? 'Баталгаажсан' : 'Цуцлагдсан'}
            </Badge>
        </div>
        
        {/* Дунд хэсэг: Багц болон Хэрэглэгч */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Багц */}
            <div>
                <p className="text-[10px] text-gray-500 mb-0.5 uppercase tracking-wider font-medium">Сонгосон багц:</p>
                <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight">
                  {booking.service}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    Zoe Studio
                </div>
            </div>

            {/* Хэрэглэгчийн мэдээлэл (Mobile friendly layout) */}
            <div className="bg-gray-50/50 p-2 rounded-lg sm:bg-transparent sm:p-0">
                <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider font-medium">Захиалагч:</p>
                <div className="flex items-start gap-3">
                    <Avatar className="w-9 h-9 text-xs border border-gray-200 shrink-0">
                        <AvatarFallback className="bg-blue-600 text-white font-bold">
                            {booking.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-gray-900 truncate">{booking.name}</span>
                        
                        {/* Утас & Имэйл (Mobile дээр доошоо, Desktop дээр зэрэгцэнэ) */}
                        <div className="flex flex-col xl:flex-row xl:items-center gap-1 xl:gap-3 mt-0.5">
                            <a href={`tel:${booking.phone}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1.5 font-medium whitespace-nowrap">
                                <Phone className="w-3 h-3" /> {booking.phone}
                            </a>
                            
                            {booking.email && (
                                <a href={`mailto:${booking.email}`} className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1.5 truncate transition-colors">
                                    <Mail className="w-3 h-3" /> 
                                    <span className="truncate max-w-[150px]">{booking.email}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Доод хэсэг: Тэмдэглэл */}
        {booking.notes && (
            <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-100 p-2.5 rounded-lg mt-1 text-xs">
                <FileText className="w-3.5 h-3.5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="text-gray-700">
                    <span className="font-semibold text-yellow-800 mr-1">Тэмдэглэл:</span>
                    {booking.notes}
                </div>
            </div>
        )}
      </div>

      {/* 3. Үйлдэл (Absolute position on mobile to save space, flex on desktop) */}
      <div className="absolute top-4 right-4 md:relative md:top-0 md:right-0 md:ml-auto md:pl-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-black">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white">
            {booking.status === 'pending' && (
                <form action={updateBookingStatus.bind(null, booking.id, 'confirmed')}>
                    <button className="w-full text-left">
                        <DropdownMenuItem className="cursor-pointer text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" /> Батлах
                        </DropdownMenuItem>
                    </button>
                </form>
            )}
            {booking.status !== 'cancelled' && (
                <form action={updateBookingStatus.bind(null, booking.id, 'cancelled')}>
                    <button className="w-full text-left">
                        <DropdownMenuItem className="cursor-pointer text-orange-600">
                            <XCircle className="mr-2 h-4 w-4" /> Цуцлах
                        </DropdownMenuItem>
                    </button>
                </form>
            )}
            <form action={deleteBooking.bind(null, booking.id)}>
                <button className="w-full text-left">
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Устгах
                    </DropdownMenuItem>
                </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}