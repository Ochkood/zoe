import { AdminSidebar } from "@/components/admin-sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      
      {/* Desktop Sidebar (Том дэлгэц) */}
      <aside className="hidden md:block w-64 fixed h-full z-10">
        <AdminSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Mobile Header (Утас) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-20">
            <div className="font-bold text-lg">Zoe Studio</div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <AdminSidebar />
                </SheetContent>
            </Sheet>
        </div>

        {/* Хуудасны доторх контент энд орно */}
        {children}
        
      </main>
    </div>
  );
}