// src/app/booking/page.tsx
import BookingForm from "@/components/BookingForm";
import Header from "@/components/header";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-20 px-4 flex justify-center items-center">
            <BookingForm />
        </div>
    </div>
  );
}