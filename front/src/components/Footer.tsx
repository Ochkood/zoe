import Link from "next/link";
import { Camera, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Camera className="w-8 h-8 text-white" />
              <span>ZOE Self Photo Studio</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Бид таны амьдралын хамгийн нандин мөчүүдийг гэрэл зургийн хальснаа мөнхөлж, үнэ цэнтэй дурсамжийг бүтээнэ.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Холбоос</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Нүүр хуудас</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-white transition-colors">Цаг захиалах</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">Үнийн санал</Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Холбоо барих</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
                <span>БЗД, Кино үйлдвэр, Отгонтэнгэр их сургуулийн зүүн талд, CENTURY APARTMENT барилгын 4 давхарт</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                <a href="tel:+97688110000" className="hover:text-white transition-colors">+976 9111-4506</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500 shrink-0" />
                <a href="mailto:info@zoestudio.mn" className="hover:text-white transition-colors">zoestudio08@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* 4. Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-6">Биднийг дагаарай</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} Zoe Self Photo Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Үйлчилгээний нөхцөл</Link>
            <Link href="#" className="hover:text-white transition-colors">Нууцлалын бодлого</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}