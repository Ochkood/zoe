import Image from "next/image";
import MyButton from "./Button";

export default function Service() {
    return (
        <div className="flex h-200 gap-10 my-20 bg-white p-10 border rounded-2xl">
            <div className="flex flex-col justify-center gap-10">
                <p>MEANING</p>
                <h2>Our Services</h2>
                <p>Bring your people together through meaningful rituals, guided team-building exercises, and shared experiences.</p>
                <MyButton title="Get Started" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <Image
                    src="/2.jpeg"
                    alt="Service Image"
                    width={400}
                    height={300}
                    className="mt-10 rounded-lg"
                />
            </div>
        </div>
    )
}