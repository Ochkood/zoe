import { Avatars } from "./Avatars";
import MyButton from "./Button";

export default function TopArea() {
    return(
        <div className="flex flex-col items-center justify-center gap-10 h-full py-20">
            <h1 className="text-4xl font-bold text-center lg:text-6xl">Жаргалтай, Дурсамжтай мөчүүдээ гэрэл зурагт мөнхлөөрэй</h1>
            <div className="flex gap-5">
                <MyButton title="Багц Сонгох" bgColor="black" textColor="white"/>
                <MyButton title="Студитэй Танилцах" bgColor="white" textColor="black"/>
            </div>
            <div>
                <Avatars />
            </div>
        </div>
    );
}