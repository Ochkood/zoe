import Image from "next/image";
import Box from "./Box";

export default function ThreeBox() {
    return (
        <div className="grid grid-cols-1 gap-4 px-20 py-10 m-auto lg:grid-cols-3 lg:px-5 lg:py-5">
            <div className="flex flex-col p-10 justify-evenly gap-20 bg-black rounded-4xl">
                <div className=" text-white text-2xl">
                    Keep everyone aligned and engaged with tools designed for real-time collaboration.
                </div>
                <div className="flex flex-col text-white gap-3">
                    <div className="px-4 py-1 border-white border rounded-full">Employee workflow</div>
                    <div className="bg-gray-600 px-4 py-1 rounded-full">Generate invoices</div>
                    <div className="bg-gray-600 px-4 py-1 rounded-full">Connections</div>
                </div>
            </div>
            <div className="rounded-full">
                <Box
                    imageUrl="/box1.png"
                    imageAlt="Three Box 1"
                    startColor="pink-500"
                    endColor="purple-600"
                />
            </div>
            <div className="rounded-full">
                <Box
                    imageUrl="/box2.png"
                    imageAlt="Three Box 2"
                    startColor="blue-500"
                    endColor="indigo-700"
                />
            </div>
        </div>
    );
}