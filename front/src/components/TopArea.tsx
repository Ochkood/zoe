import Image from "next/image";
import { Avatars } from "./Avatars";
import MyButton from "./Button";

export default function TopArea() {
    return (
        // relative болон overflow-hidden нь арын зураг гадагшаа ил гарахаас сэргийлнэ
        <section className="relative w-full min-h-70 flex flex-col items-center justify-center overflow-hidden">

            {/* 1. Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/ps.jpg" // Өөрийн зургийн замыг энд оруулна уу
                    alt="ZOE Photo Studio Background"
                    fill
                    priority // Hero section учраас хамгийн түрүүнд ачаалах ёстой
                    className="object-cover"
                />
                {/* 2. Overlay Layer: Зураг дээрх бичвэрийг уншихад хялбар болгох бараан туяа */}
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/2.jpeg"
                        alt=""
                        fill={true} // Зургийг бүрэн дүүргэх
                        objectFit="cover" // Зургийг дотор нь бүрэн харагдуулах
                        className="opacity-40" // Зургийг арай бүдэг болгох (gradient-ийг тодотгохын тулд)
                    />
                </div>
            </div>

            {/* 3. Content Layer: Бүх контент зургийн дээр (z-10) байрлана */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-10 py-40 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center px-5 lg:text-7xl text-white lg:max-w-4xl leading-tight">
                    Жаргалтай, Дурсамжтай мөчүүдээ гэрэл зурагт мөнхлөөрэй
                </h1>

                <div className="flex flex-wrap justify-center gap-5">
                    <MyButton title="Багц Сонгох" bgColor="white" textColor="black" />
                    <MyButton title="Студитэй Танилцах" bgColor="transparent" textColor="white" />
                </div>

                <div className="mt-5">
                    <Avatars />
                    <p className="text-white/80 text-sm text-center mt-2">
                        1,000+ гаруй үйлчлүүлэгч бидэнд итгэсэн
                    </p>
                </div>
            </div>
        </section>
    );
}