import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/dashboard/AppSidebar";
import ModeToggle from "@/components/theme-toggle";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative w-full min-h-screen flex flex-col">
        <div className="sticky top-0 flex items-center justify-between p-2 gap-2 bg-sidebar mt-2 mx-2 h-11 rounded-lg">
          <SidebarTrigger className="size-7" />
          <ModeToggle
            variant="outline"
            effect={"click"}
            className="size-7 bg-black text-white dark:bg-white dark:hover:text-white   dark:text-black"
          />
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
