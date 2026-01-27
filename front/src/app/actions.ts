'use server'

import { Resend } from 'resend'; // 👈 1. Import нэмэх
import { EmailTemplate } from '@/components/email-template'; // 👈 2. Template нэмэх
import { AdminEmailTemplate } from '@/components/admin-email-template';
import { EmailConfirmedTemplate } from '@/components/email-confirmed-template'; // 👈 Шинэ загвараа import хийнэ
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { auth } from "@clerk/nextjs/server";

const resend = new Resend(process.env.RESEND_API_KEY); // 👈 3. Resend тохируулах

// Админуудын жагсаалт (Энийг тусад нь helper function болгосон ч болно)
const adminEmails = ["ochko0614@gmail.com", "yanjmaa76@gmail.com"];

// ----------------------------------------------------------------------
// 1. FRONTEND-Д ЗОРИУЛСАН: Тухайн өдрийн захиалгуудыг татах функц
// ----------------------------------------------------------------------
export async function getBookingsByDate(dateStr: string) {
  if (!dateStr) return [];

  // Ирсэн dateStr нь "2026-01-28" гэсэн форматтай байна гэж үзнэ.
  // Үүнийг UTC цагаар тухайн өдрийн эхлэл ба төгсгөл болгож хувиргана.
  
  const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
  const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);

  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: { not: 'cancelled' }
    },
    select: {
      date: true,
      duration: true,
    }
  });

  return bookings;
}

// ----------------------------------------------------------------------
// 2. ЗАХИАЛГА ҮҮСГЭХ ФУНКЦ (Шинэчлэгдсэн)
// ----------------------------------------------------------------------
export async function createBooking(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string
  const service = formData.get('service') as string
  const dateStr = formData.get('date') as string
  const guests = formData.get('guests') as string
  const notes = formData.get('notes') as string
  // Хугацааг тоон утга болгож авах (Default 60 минут)
  const duration = parseInt(formData.get('duration') as string) || 60;

  // Шалгалт
  if (!name || !phone || !service || !dateStr || !guests || !email) {
    return { success: false, message: 'Бүх талбарыг бөглөнө үү' }
  }

  const requestedDate = new Date(dateStr);

  // SERVER-SIDE DAVHARTSAL SHALGAH (Аюулгүй байдлын үүднээс)
  // Тухайн өдрийн бүх захиалгыг татаад, цаг давхцаж байгаа эсэхийг шалгана
  const dayStart = new Date(requestedDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(requestedDate);
  dayEnd.setHours(23, 59, 59, 999);

  const existingBookings = await prisma.booking.findMany({
    where: {
      date: { gte: dayStart, lte: dayEnd },
      status: { not: 'cancelled' }
    }
  });

  const requestedEnd = requestedDate.getTime() + duration * 60000;

  const hasConflict = existingBookings.some(booking => {
    const bookingStart = booking.date.getTime();
    const bookingEnd = bookingStart + (booking.duration * 60000);

    // Давхцаж буй нөхцөл: (StartA < EndB) && (EndA > StartB)
    return requestedDate.getTime() < bookingEnd && requestedEnd > bookingStart;
  });

  if (hasConflict) {
    return { success: false, message: 'Уучлаарай, сонгосон цаг дээр өөр захиалга орсон байна.' };
  }

  // Хадгалах
  try {
    await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        service,
        date: requestedDate,
        guests,
        notes,
        duration, // Шинэ талбар
        status: 'pending'
      },
    })


    // 👇 2. И-МЭЙЛ ИЛГЭЭХ КОД (Шинээр нэмэх)
    if (email) {
      const formattedDate = format(requestedDate, 'yyyy-MM-dd');
      const formattedTime = format(requestedDate, 'HH:mm');

      await resend.emails.send({
        from: 'Zoe Studio <onboarding@resend.dev>', // Resend-ийн туршилтын мэйл
        to: [email], // Хэрэглэгчийн мэйл
        subject: 'Таны захиалгыг хүлээж авлаа ✅',
        react: EmailTemplate({
          name,
          date: formattedDate,
          time: formattedTime,
          service
        }),
      });
    }

    // B. 👇 АДМИН (ТАНЬ РУУ) ИЛГЭЭХ КОД (Шинээр нэмэх)
    const formattedDate = format(requestedDate, 'yyyy-MM-dd');
    const formattedTime = format(requestedDate, 'HH:mm');

    // Энд өөрийнхөө имэйлийг бичээрэй 👇
    const myAdminEmail = "ochko0614@gmail.com"; 

    await resend.emails.send({
        from: 'Zoe Studio <onboarding@resend.dev>',
        to: [myAdminEmail], 
        subject: `📸 Шинэ захиалга: ${name} (${service})`,
        react: AdminEmailTemplate({ 
            name, 
            phone,
            email,
            service,
            date: formattedDate, 
            time: formattedTime, 
            guests,
            notes
        }),
    });

    // Админ хуудас болон Захиалгын хуудсыг шинэчлэх (Сул цагууд өөрчлөгдөнө)
    revalidatePath('/booking')
    revalidatePath('/admin')

    return { success: true, message: 'Захиалга амжилттай илгээгдлээ!' }

  } catch (error) {
    console.error('Booking error:', error)
    return { success: false, message: 'Захиалга хийхэд алдаа гарлаа.' }
  }
}

// ----------------------------------------------------------------------
// 3. АДМИНЫ ФУНКЦУУД (Хэвээрээ)
// ----------------------------------------------------------------------

// Төлөв өөрчлөх
export async function updateBookingStatus(id: string, newStatus: string) {
  // 1. ХАМГААЛАЛТ: Нэвтэрсэн хэрэглэгч мөн эсэхийг шалгана
  const session = await auth();

  if (!session.userId) {
    throw new Error("Unauthorized: Та нэвтрэх шаардлагатай.");
  }

  try {
    // 2. DATABASE ШИНЭЧЛЭХ
    // update функц нь шинэчлэгдсэн мэдээллийг буцаадаг (updatedBooking)
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: newStatus },
    });

    // 3. ИМЭЙЛ ИЛГЭЭХ (Зөвхөн 'confirmed' болсон үед)
    if (newStatus === 'confirmed' && updatedBooking.email) {
      
      // Огноог уншихад эвтэйхэн болгож форматлах
      const formattedDate = format(new Date(updatedBooking.date), 'yyyy-MM-dd');
      const formattedTime = format(new Date(updatedBooking.date), 'HH:mm');

      await resend.emails.send({
        // Хэрэв домэйн холбоогүй бол 'onboarding@resend.dev' ашиглана
        from: 'Zoe Studio <onboarding@resend.dev>', 
        to: [updatedBooking.email],
        subject: '✅ Таны захиалга баталгаажлаа',
        react: EmailConfirmedTemplate({ 
          name: updatedBooking.name, 
          date: formattedDate, 
          time: formattedTime, 
          service: updatedBooking.service 
        }),
      });
      
      console.log(`Confirmation email sent to ${updatedBooking.email}`);
    }

    // 4. ХУУДСУУДЫГ ШИНЭЧЛЭХ
    revalidatePath("/admin");   // Админ дээр төлөв нь солигдож харагдана
    revalidatePath("/booking"); // Захиалгын хуудсан дээр цаг нь түгжигдэнэ (эсвэл сулрана)

  } catch (error) {
    console.error("Update error:", error);
    throw new Error("Failed to update booking");
  }
}

// Устгах
export async function deleteBooking(id: string) {
  try {
    await prisma.booking.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/booking"); // Устгавал цаг нь сулрах ёстой
  } catch (error) {
    console.error("Delete error:", error);
  }
}