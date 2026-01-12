import { Accordions } from "@/components/Accordian";
import Header from "@/components/header";
import ThreeBox from "@/components/ThreeBox";
import TopArea from "@/components/TopArea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center bg-[rgba(0,0,0,0.10)] font-sans dark:bg-black">
        <Header />
        <TopArea />
        <ThreeBox />
        <Accordions />
    </div>
  );
}
