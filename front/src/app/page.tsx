import { Accordions } from "@/components/Accordian";
import Header from "@/components/header";
import Reviews from "@/components/Reviews";
import Service from "@/components/ServiceCard";
import ThreeBox from "@/components/ThreeBox";
import TopArea from "@/components/TopArea";
import Footer from "@/components/Footer"; // 👈 Import хийнэ

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[rgba(0,0,0,0.10)] font-sans dark:bg-black">
        <Header />
        
        <main className="flex-grow">
          <TopArea />
          <Reviews />
          <Service />
          <ThreeBox />
          <Accordions />
        </main>
        
        <Footer /> {/* 👈 Энд байршуулна */}
    </div>
  );
}