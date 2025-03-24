import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarContents } from "@/components/app-sidebar-content";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-violet-500 dark:bg-violet-600/80">
      <AppSidebar />
      <SidebarContents>{children}</SidebarContents>
      <Toaster />
    </SidebarProvider>
  );
}
