import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/dashboard/AppSidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative w-full min-h-screen flex flex-col">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
