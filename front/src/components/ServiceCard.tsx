import Image from "next/image";
import { Button } from "@/components/ui/button"; // Shadcn Button
import Link from "next/link";
import { Camera, MonitorPlay, Sparkles } from "lucide-react"; // Icons

export default function Service() {
    return (
        <section id="services" className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
                
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                    <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Бидний үйлчилгээ</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Танд хэрэгтэй бүх зүйл нэг дор.
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Бид зөвхөн зураг дараад зогсохгүй, таныг хамгийн сайхнаараа харагдахад туслах бүхий л үйлчилгээг үзүүлдэг.
                    </p>
                    
                    <div className="space-y-4 pt-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-lg"><Camera className="w-5 h-5 text-blue-600"/></div>
                            <div>
                                <h4 className="font-bold">Мэргэжлийн Тоног Төхөөрөмж</h4>
                                <p className="text-sm text-gray-500">Sony & Canon брэндийн сүүлийн үеийн камер, линз.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-purple-600"/></div>
                            <div>
                                <h4 className="font-bold">Тав тухтай орчин</h4>
                                <p className="text-sm text-gray-500">Хувцас солих өрөө, нүүр будалтын хэсэг, Wi-Fi.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-green-50 p-2 rounded-lg"><MonitorPlay className="w-5 h-5 text-green-600"/></div>
                            <div>
                                <h4 className="font-bold">Шуурхай үйлчилгээ</h4>
                                <p className="text-sm text-gray-500">Зургийг 24 цагийн дотор засварлаж хүлээлгэн өгнө.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button className="rounded-full px-8" asChild>
                            <Link href="/booking">Захиалга өгөх</Link>
                        </Button>
                    </div>
                </div>

                {/* Image Content */}
                <div className="flex-1 relative w-full h-100 md:h-125">
                    <Image
                        src="/2.jpeg" // Энд студийн дотоод зургийг хийгээрэй
                        alt="Studio Interior"
                        fill
                        className="object-cover rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
            </div>
        </section>
    )
}