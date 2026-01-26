"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react"; // lucide-react суулгасан байх шаардлагатай
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const menuItems = [
    { name: "Үнийн санал", href: "/pricing" },
    { name: "Хэрэгсэл", href: "/tools" },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 md:px-0">
      <div className="mx-auto max-w-4xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm rounded-full py-2 pl-6 pr-2 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-bold text-lg tracking-tight">
          ZOE Photo Studio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
          >
            Цаг Захиалах
          </Link>
        </nav>

        {/* Mobile Navigation (Shadcn UI Sheet) */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/booking"
            className="bg-black text-white px-4 py-2 rounded-full text-xs font-medium"
          >
            Захиалах
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-62.5 sm:w-75">
              <nav className="flex flex-col gap-4 px-5 mt-10">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium border-b pb-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}