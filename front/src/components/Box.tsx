import Image from 'next/image';

interface GradientWithImageProps {
  imageUrl: string;
  imageAlt: string;
  startColor: string; // Tailwind-ийн өнгөний нэр: 'blue-500', 'purple-600' гэх мэт
  endColor: string;   // Tailwind-ийн өнгөний нэр: 'indigo-700', 'pink-500' гэх мэт
  children?: React.ReactNode; // Дотор нь өөр элемэнт нэмэх боломжтой
}

export default function Box({
  imageUrl,
  imageAlt,
  startColor,
  endColor,
  children,
}: GradientWithImageProps) {
  // Tailwind CSS-ийн gradient class-ыг динамикаар үүсгэх
  const gradientClass = `bg-gradient-to-r from-${startColor} to-${endColor}`;

  return (
    <div
      className={`relative flex items-center justify-center p-8 rounded-lg shadow-xl overflow-hidden ${gradientClass}`}
      style={{ minHeight: '300px' }} // Энэ бол зүгээр жишээ, та үүнийг өөрчилж болно
    >
      {/* PNG зургийг байрлуулах */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={200} // Зургийн өргөн
          height={200} // Зургийн өндөр
          objectFit="contain" // Зургийг дотор нь бүрэн харагдуулах
          className="opacity-70" // Зургийг арай бүдэг болгох (gradient-ийг тодотгохын тулд)
        />
      </div>

      {/* Gradient болон зургийн дээр харагдах контент (сонголтоор) */}
      <div className="relative z-10 text-center text-white p-4">
        {children ? (
          children
        ) : (
          <h2 className="text-3xl font-bold">Таны Контент Энд</h2>
        )}
      </div>
    </div>
  );
}