interface ButtonProps {
    title: string;
    bgColor?: string;
    textColor?: string;
}

export default function MyButton({ title, bgColor, textColor }: ButtonProps) {
    const bgClass = bgColor ? `bg-${bgColor}` : 'bg-blue-500';
    const textClass = textColor ? `text-${textColor}` : 'text-white';

    return (
        
        <button className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-transparent ${bgClass} ${textClass} py-2 px-6 font-medium transition-all duration-300 hover:shadow-lg hover:cursor-pointer whitespace-nowrap`}>
            <span className="relative overflow-hidden">
               <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {title}
                </span>
                <span className="absolute top-0 left-0 block w-full translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    {title}
                </span>
            </span>
        </button>
    );
}
