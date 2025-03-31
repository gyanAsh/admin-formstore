import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/dashboard/AppSidebar";
import ModeToggle from "@/components/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="fixed flex gap-2 top-1.5 left-1.5 z-1 ">
        <SidebarTrigger className="size-7" />
        <ModeToggle variant={"secondary"} effect={"click"} className="size-7" />
      </div>
      {children}
    </SidebarProvider>
  );
}
