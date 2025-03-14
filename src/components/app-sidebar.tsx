import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { WorkspaceArea } from "./sidebar/workspace-area";
import { Footer } from "./sidebar/footer";

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex flex-row w-fit items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h2 className=" font-bold"> Chad CN</h2>
            </TooltipTrigger>
            <TooltipContent>
              <p>I am the creator of this library, soon to be Gigachad CN</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button
            variant={"outline"}
            effect="click"
            className="grow justify-start border-accent-foreground/30 "
          >
            <WandSparkles />
            But Premium{" "}
          </Button>
        </SidebarGroup>
        <SidebarGroup>
          <WorkspaceArea />
        </SidebarGroup>
        <SidebarGroup>View Submissions Analysis Page</SidebarGroup>
        <SidebarGroup>Try Template</SidebarGroup>
        <SidebarGroup>Create Workspace Form</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
