import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Crown } from "lucide-react";
import { Footer } from "@/components/layout/dashboard/Footer";
import WorkspaceGroup from "./Workspace";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="offcanvas">
      <SidebarHeader className="flex-row justify-between">
        <h2
          className="font-bold text-2xl"
          style={{ textShadow: "1px 1px 2px #e7f900" }}
        >
          Formstore
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="min-h-[150px]">
          <SidebarGroup>
            <Button variant="lemon_primary" effect="click" className=" ">
              <Crown strokeWidth={3} className="text-yellow-500/80" />
              Buy Premium{" "}
            </Button>
          </SidebarGroup>
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
