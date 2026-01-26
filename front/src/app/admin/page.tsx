import { prisma } from "@/lib/prisma";
import { deleteBooking, updateBookingStatus } from "@/app/actions";
import { Trash2, CheckCircle, XCircle } from "lucide-react";

export default async function AdminPage() {
    const bookings = await prisma.booking.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Захиалгын Самбар</h1>
                    <span className="bg-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                        Нийт: {bookings.length}
                    </span>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Нэр / Утас</th>
                                    <th className="p-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Үйлчилгээ</th>
                                    {/* 👇 Хүний тоог энд авчирлаа (3-р багана) */}
                                    <th className="p-4 font-semibold text-gray-600 text-xs uppercase tracking-wider text-center">Хүний тоо</th>
                                    <th className="p-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Цаг</th>
                                    <th className="p-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Төлөв</th>
                                    {/* 👇 Үйлдлийг хамгийн ард нь тавилаа */}
                                    <th className="p-4 font-semibold text-gray-600 text-xs uppercase tracking-wider text-right">Үйлдэл</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors group">
                                        {/* 1. Нэр, Утас, Note */}
                                        <td className="p-4 align-top">
                                            <div className="font-medium text-gray-900">{booking.name}</div>
                                            <div className="text-gray-500 text-xs">{booking.phone}</div>
                                            {booking.notes && (
                                                <div className="mt-2 text-xs text-orange-700 bg-orange-50 p-2 rounded border border-orange-100 max-w-[200px]">
                                                    📝 {booking.notes}
                                                </div>
                                            )}
                                        </td>

                                        {/* 2. Үйлчилгээ */}
                                        <td className="p-4 align-top">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                {booking.service}
                                            </span>
                                        </td>

                                        {/* 3. Хүний тоо */}
                                        <td className="p-4 text-gray-600 text-sm font-medium text-center align-top">
                                            {booking.guests} хүний
                                        </td>

                                        {/* 4. Цаг */}
                                        <td className="p-4 text-gray-700 text-sm align-top">
                                            {new Date(booking.date).toLocaleString("mn-MN", {
                                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>

                                        {/* 5. Төлөв */}
                                        <td className="p-4 align-top">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                {booking.status === 'pending' ? 'Хүлээгдэж буй' : booking.status}
                                            </span>
                                        </td>

                                        {/* 6. Үйлдэл */}
                                        <td className="p-4 text-right align-top">
                                            <div className="flex justify-end gap-2">
                                                {booking.status === 'pending' && (
                                                    <form action={updateBookingStatus.bind(null, booking.id, 'confirmed')}>
                                                        <button
                                                            title="Баталгаажуулах"
                                                            className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors border border-green-200"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    </form>
                                                )}

                                                {booking.status === 'confirmed' && (
                                                    <form action={updateBookingStatus.bind(null, booking.id, 'cancelled')}>
                                                        <button
                                                            title="Цуцлах"
                                                            className="p-2 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 transition-colors border border-orange-200"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </form>
                                                )}

                                                <form action={deleteBooking.bind(null, booking.id)}>
                                                    <button
                                                        title="Устгах"
                                                        className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors border border-red-200"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {bookings.length === 0 && (
                                    <tr>
                                        {/* 👇 colSpan-ийг 6 болгож зассан */}
                                        <td colSpan={6} className="p-12 text-center text-gray-500">
                                            Одоогоор захиалга ирээгүй байна.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}