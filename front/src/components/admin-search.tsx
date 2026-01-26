"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; 
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function AdminSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Хэрэглэгч бичиж дууссанаас хойш 300ms дараа хайлт хийнэ (Серверийг ачаалахгүй байх үүднээс)
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    // Хайлт хийх үед хуудсыг 1-р хуудас руу буцаана
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    
    // URL-ийг шинэчилнэ (Жишээ нь: /admin?query=8811&page=1)
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full md:w-1/3">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Нэр, Утас, Имэйлээр хайх..."
        className="pl-9 w-75 bg-white"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}