import Image from "next/image";
import Box from "./Box";

export default function ThreeBox() {
    return (
        <div className="grid grid-cols-1 gap-4 px-10 py-10 m-auto lg:grid-cols-3 lg:px-5 lg:py-5">
            <div className="flex flex-col p-10 justify-evenly gap-20 bg-black rounded-4xl">
                <div className=" text-white text-xl">
                    Keep everyone aligned and engaged with tools designed for real-time collaboration.
                </div>
                <div className="flex flex-col w-auto text-white gap-3">
                    <div className="px-4 py-1 border-white border rounded-full">Employee workflow</div>
                    <div className="bg-gray-600 px-4 py-1 rounded-full">Generate invoices</div>
                    <div className="bg-gray-600 px-4 py-1 rounded-full">Connections</div>
                </div>
            </div>
            <div className="rounded-full">
                <Box
                    imageUrl="/2.jpeg"
                    imageAlt="Three Box 1"
                    startColor="pink-500"
                    endColor="purple-600"
                    children={<div className="text-white"> <Image src="/hbd.png" alt="Box 1" width={300} height={300}></Image></div>}
                />
            </div>
            <div className="rounded-full">
                <Box
                    imageUrl="/3.jpeg"
                    imageAlt="Three Box 2"
                    startColor="blue-500"
                    endColor="indigo-700"
                    children={<div className="text-white"><Image src="/happy.png" alt="Box 1" width={300} height={300}></Image></div>}
                />
            </div>
        </div>
    );
}