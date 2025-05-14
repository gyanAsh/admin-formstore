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
        <ScrollArea className="min-h-[150px]">
          <WorkspaceGroup />
          {/* <SidebarGroup>
            <Button
              variant="default"
              effect="click"
              className="flex justify-start font-medium"
            >
              Submission Insights
            </Button>
          </SidebarGroup> */}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
