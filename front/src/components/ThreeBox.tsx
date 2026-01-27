import Image from "next/image";
import { Check } from "lucide-react";
import Link from "next/link";

export default function ThreeBox() {
    return (
        <section className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Багц Сонгох</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Box 1: Info Box */}
                <div className="flex flex-col p-8 justify-between bg-black text-white rounded-3xl min-h-100">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">ZOE Studio</h3>
                        <p className="text-gray-300 mb-8">
                            Танд тохирох багцыг сонгоод, мартагдашгүй дурсамжаа үлдээгээрэй. Бүх багцад студийн түрээс багтсан.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="px-4 py-2 border border-white/20 rounded-full text-sm inline-flex items-center gap-2">
                            <Check className="w-4 h-4"/> 45 минут зураг авалт
                        </div>
                        <div className="px-4 py-2 border border-white/20 rounded-full text-sm inline-flex items-center gap-2">
                            <Check className="w-4 h-4"/> Бүх зураг файлаар
                        </div>
                        <div className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold text-center mt-4 cursor-pointer hover:bg-gray-200 transition">
                            <Link href="/pricing">Бүх үнийг харах</Link>
                        </div>
                    </div>
                </div>

                {/* Box 2: Image Card (Portrait) */}
                <div className="relative group overflow-hidden rounded-3xl min-h-100">
                    <Image 
                        src="/2.jpeg" 
                        alt="Portrait" 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                        <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">HOT</span>
                        <h3 className="text-2xl font-bold text-white">Хөрөг Зураг</h3>
                        <p className="text-white/80 text-sm mt-1">Gané, Profile, Business зураг авалт</p>
                    </div>
                </div>

                {/* Box 3: Image Card (Family) */}
                <div className="relative group overflow-hidden rounded-3xl min-h-100">
                    <Image 
                        src="/3.jpeg" 
                        alt="Family" 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">FAMILY</span>
                        <h3 className="text-2xl font-bold text-white">Гэр бүлийн зураг</h3>
                        <p className="text-white/80 text-sm mt-1">Хүүхдийн ой, Тэмдэглэлт өдрүүд</p>
                    </div>
                </div>

            </div>
        </section>
    );
}