import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function Accordions() {
    return (
        <section className="w-full py-10 px-4 md:px-0 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Түгээмэл Асуултууд & Санамж</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
                
                <AccordionItem value="item-1" className="bg-white px-6 rounded-xl border border-gray-100 shadow-sm">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline text-left">
                        1. Зураг авалтанд ирэхдээ юуг анхаарах вэ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Манайд гадуур өмссөн гуталтай оруулахгүй тул та зураг авалтанд өмсөх цэвэрхэн гуталтай ирэх эсвэл студийн шаахайг ашиглах боломжтой.</li>
                            <li>Зураг авалтанд ирэхдээ солих хувцас, нүүр будалтаа бэлдэж ирээрэй. Манайд нүүр будалтын үйлчилгээ байхгүй.</li>
                            <li>Цагаасаа хоцрохгүй байхыг хүсье.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white px-6 rounded-xl border border-gray-100 shadow-sm">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline text-left">
                        2. Бүх зургаа чанартайгаар нь авч болох уу?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                        Та Iphone, Ipad ашигладаг бол бүх зургаа өндөр чанартайгаар нь <strong>AirDrop</strong>-р маш хялбархан хүлээн авах боломжтой.
                        Та байнга ашигладаг и-мэйл хаягаа бүртгүүлээрэй. Бүртгүүлсэн и-мэйл хаяг руу бүх зураг илгээгдэнэ. 
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white px-6 rounded-xl border border-gray-100 shadow-sm">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline text-left">
                        3. Цаг цуцлах болон солих нөхцөл юу вэ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                        Хэрэв та цагаа цуцлах эсвэл солих шаардлагатай бол <strong>24 цагийн өмнө</strong> бидэнд мэдэгдэх шаардлагатайг анхаарна уу.
                        Цагаасаа хоцорсон тохиолдолд буцаалт хийхгүй.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-white px-6 rounded-xl border border-gray-100 shadow-sm">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline text-left">
                        4. Студид ямар хэрэгслүүд байгаа вэ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                        Манайд 9 төрлийн фон, 70-80 төрлийн нүдний шил, 60-70 төрлийн үсний гоёл, обручка, төрсөн өдрийн бялуу, тоотой шаар, титэм болон олон төрлийн цэцэгнүүд бэлэн байгаа. Та хүссэн чимэглэл, хэрэгслээ сонгон ашиглах боломжтой.
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </section>
    )
}