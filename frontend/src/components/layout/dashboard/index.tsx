import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/dashboard/AppSidebar";
import ModeToggle from "@/components/theme-toggle";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="fixed flex gap-2 top-1.5 left-1.5 z-1 ">
        <SidebarTrigger className="size-7" />
        <ModeToggle variant={"secondary"} effect={"click"} className="size-7" />
      </div>
      <Outlet />
    </SidebarProvider>
  );
}
