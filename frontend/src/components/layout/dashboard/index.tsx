import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/dashboard/AppSidebar";
import { Outlet } from "react-router";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className={cn("relative w-full min-h-screen flex flex-col")}>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
