"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { user } = useUser();

  const links = [
    { href: "/admin", label: "Захиалгууд", icon: LayoutDashboard },
    { href: "/admin/calendar", label: "Календарь", icon: Calendar }, // 👈 Шинэ цэс
  ];

  return (
    <div className={cn("flex flex-col h-full bg-white border-r", className)}>
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Zoe Studio</h2>
        <p className="text-xs text-gray-500 mt-1">Admin Dashboard v1.1</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          // Тухайн хуудас идэвхтэй эсэхийг шалгах
          const isActive = pathname === link.href; 
          
          return (
            <Button
              key={link.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive ? "text-gray-900 font-medium" : "text-gray-500"
              )}
              asChild
            >
              <Link href={link.href}>
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            </Button>
          );
        })}
        
        <Button variant="ghost" className="w-full justify-start gap-2 text-gray-500 mt-4">
            <Settings className="w-4 h-4" />
            Тохиргоо
        </Button>
      </nav>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-3 px-2">
           <UserButton afterSignOutUrl="/"/>
           <div className="text-sm overflow-hidden">
                <p className="font-medium text-gray-900 truncate">{user?.firstName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.emailAddresses[0]?.emailAddress}</p>
           </div>
        </div>
      </div>
    </div>
  );
}