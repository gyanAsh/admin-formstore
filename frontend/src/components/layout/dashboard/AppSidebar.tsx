import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Footer } from "@/components/layout/dashboard/Footer";
import WorkspaceGroup from "./Workspace";

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="!bg-transparent">
      <SidebarHeader className="flex-row items-center gap-2.5">
        <img
          src={"/formstore-logo-light.svg"}
          alt="Logo"
          loading="lazy"
          className="dark:hidden block size-9"
        />
        <img
          src={"/formstore-logo-dark.svg"}
          alt="Logo"
          loading="lazy"
          className="hidden dark:block size-9"
        />
        <div className="text-lg leading-4 font-semibold">
          <h1 className="font-['Playfair_Display','serif'] italic">The</h1>
          <h1 className="">Formstore</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="min-h-[150px] space-y-1">
          {/* <SidebarGroup className="py-1">
            <Button
              variant={"outline"}
              effect="click"
              className="flex justify-start text-base text-muted-foreground font-bold"
            >
              <Home /> Home
            </Button>
          </SidebarGroup>
          <SidebarGroup className="py-1">
            <Button
              variant={"outline"}
              effect="click"
              className="flex justify-start text-base text-muted-foreground font-bold"
            >
              <ChartLine /> Analytics
            </Button>
          </SidebarGroup> */}
          <WorkspaceGroup />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
