import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function Accordions() {
    return (
        <section className="w-full px-4 md:px-0 max-w-4xl mx-auto mb-32">
            <h2 className="text-3xl font-bold text-center mb-10">Түгээмэл Асуултууд</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
                
                <AccordionItem value="item-1" className="bg-white px-6 rounded-xl border border-gray-100 shadow-sm">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        1. Цаг захиалгаа хэрхэн баталгаажуулах вэ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                        Та сайтаар цагаа сонгож захиалга өгсний дараа таны имэйл хаяг руу төлбөрийн мэдээлэл очно. 
                        Урьдчилгаа 50% шилжүүлснээр таны цаг автоматаар баталгаажих ба бид хариу имэйл илгээнэ.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white px-6 rounded-xl border border-gray-100 shadow-sm">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        2. Хэдэн төрлийн фонтой вэ? Бүгдийг нь ашиглаж болох уу?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                        Манай студи цагаан, саарал, хар, болон бүтээлч өнгөлөг (ягаан, цэнхэр) нийт 5 төрлийн фонтой. 
                        Та захиалсан цагтаа багтаан хүссэн фоноо сольж ашиглах бүрэн боломжтой.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white px-6 rounded-xl border border-gray-100 shadow-sm">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        3. Бүх даруулсан зургаа авч болох уу?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                        Тийм ээ. Бид зураг авалтын бүх түүхий (raw) файлыг танд Google Drive холбоосоор өгнө. 
                        Харин засвартай зургийг таны сонгосон багцаас хамааран тодорхой тоогоор янзалж өгдөг.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-white px-6 rounded-xl border border-gray-100 shadow-sm">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        4. Хувцас солих өрөө байгаа юу?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                        Тийм, бид хувцас солих тусгай өрөө болон нүүр будах хэсэгтэй. 
                        Та цагаасаа 10-15 минутын өмнө ирж бэлтгэлээ хангах боломжтой.
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </section>
    )
}