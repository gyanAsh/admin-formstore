import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNavbar } from "./top-navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-violet-500 dark:bg-violet-600/80">
      <AppSidebar />
      <div className="flex flex-col w-full">
        <TopNavbar />
        <div className="w-full h-full flex p-4 relative isolate">
          {children}
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
