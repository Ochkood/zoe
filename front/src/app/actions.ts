'use server'
import { prisma } from '@/lib/prisma' // <-- Шинэ импорт
import { revalidatePath } from 'next/cache'

// Цаг захиалах функц (Хэвээрээ)
export async function createBooking(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string
  const service = formData.get('service') as string
  const dateStr = formData.get('date') as string
  
  // 👇 Шинээр нэмэх:
  const guests = formData.get('guests') as string
  const notes = formData.get('notes') as string

  if (!name || !phone || !service || !dateStr || !guests) { // guests-ийг шалгах
    return { success: false, message: 'Бүх талбарыг бөглөнө үү' }
  }

  try {
    await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        service,
        date: new Date(dateStr),
        guests, // 👇 Бааз руу бичих
        notes,  // 👇 Бааз руу бичих
        status: 'pending'
      },
    })

    revalidatePath('/booking') 
    return { success: true, message: 'Захиалга амжилттай илгээгдлээ!' }
    
  } catch (error) {
    console.error('Booking error:', error)
    return { success: false, message: 'Захиалга хийхэд алдаа гарлаа.' }
  }
}


// 1. Төлөв өөрчлөх функц (Жишээ нь: pending -> confirmed)
export async function updateBookingStatus(id: string, newStatus: string) {
  try {
    await prisma.booking.update({
      where: { id },
      data: { status: newStatus },
    });
    // Админ хуудсыг шинэчилж өөрчлөлтийг шууд харуулна
    revalidatePath("/admin");
  } catch (error) {
    console.error("Update error:", error);
  }
}

// 2. Захиалга устгах функц
export async function deleteBooking(id: string) {
  try {
    await prisma.booking.delete({
      where: { id },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Delete error:", error);
  }
}