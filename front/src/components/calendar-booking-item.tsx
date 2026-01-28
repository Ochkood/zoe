"use client";

import { Booking } from "@prisma/client";
import { format } from "date-fns";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, Mail, Clock, Users, FileText, Calendar, User, Camera // 👈 Camera иконыг нэмсэн
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Хугацааг форматлах
const formatDuration = (minutes: number) => {
  if (minutes === 60) return "1 цаг";
  if (minutes === 120) return "2 цаг";
  return `${minutes} мин`;
};

export function CalendarBookingItem({ booking }: { booking: Booking }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left focus:outline-none group">
          <Badge 
            variant="outline" 
            className={`
              w-full justify-start font-normal px-1.5 py-0.5 border-0 text-[11px] truncate gap-1 shadow-sm
              ${booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : booking.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
              }
            `}
          >
            <span className="font-bold shrink-0">
                {format(new Date(booking.date), 'HH:mm')}
            </span>
            <span className="truncate">{booking.name}</span>
          </Badge>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            {booking.name}
          </DialogTitle>
          <DialogDescription>
             Захиалгын дэлгэрэнгүй мэдээлэл
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-2">
            
            {/* 1. Төлөв */}
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-500">Төлөв:</span>
                <Badge className={
                    booking.status === 'confirmed' ? 'bg-green-600' : 
                    booking.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                }>
                    {booking.status === 'pending' ? 'Хүлээгдэж буй' : 
                     booking.status === 'confirmed' ? 'Баталгаажсан' : 'Цуцлагдсан'}
                </Badge>
            </div>

            {/* 👇 2. Үйлчилгээний төрөл (ШИНЭЭР НЭМСЭН ХЭСЭГ) */}
            <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <Camera className="w-5 h-5 text-blue-600" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wide">
                        Үйлчилгээ
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                        {booking.service}
                    </span>
                </div>
            </div>

            <div className="space-y-4 text-sm mt-2">
                
                {/* 3. Цаг хугацаа */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Calendar className="w-3 h-3" /> Огноо
                        </span>
                        <span className="font-medium">
                            {format(new Date(booking.date), 'yyyy-MM-dd')}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Clock className="w-3 h-3" /> Цаг & Хугацаа
                        </span>
                        <span className="font-medium">
                            {format(new Date(booking.date), 'HH:mm')} ({formatDuration(booking.duration || 60)})
                        </span>
                    </div>
                </div>

                <Separator />

                {/* 4. Холбоо барих */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${booking.phone}`} className="text-blue-600 hover:underline font-medium">
                            {booking.phone}
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{booking.email || '-'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{booking.guests} хүн</span>
                    </div>
                </div>

                {/* 5. Тэмдэглэл */}
                {booking.notes && (
                    <>
                        <Separator />
                        <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
                            <div className="flex items-center gap-2 text-yellow-800 font-medium mb-1">
                                <FileText className="w-3 h-3" /> Тэмдэглэл:
                            </div>
                            <p className="text-gray-700">{booking.notes}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}