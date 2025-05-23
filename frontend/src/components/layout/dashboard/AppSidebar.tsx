import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Footer } from "@/components/layout/dashboard/Footer";
import WorkspaceGroup from "./Workspace";
import { Button } from "@/components/ui/button";
import { ChartLine, Home } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="!bg-transparent">
      <SidebarHeader className="flex-row gap-2.5">
        <img
          src={"/formstore-logo-light.svg"}
          alt="Logo"
          loading="lazy"
          className="dark:hidden block"
        />
        <img
          src={"/formstore-logo-dark.svg"}
          alt="Logo"
          loading="lazy"
          className="hidden dark:block"
        />
        <h2 className="text-3xl font-semibold">formstore</h2>
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
