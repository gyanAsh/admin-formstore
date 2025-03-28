import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuBadge,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Crown, SidebarOpenIcon, WandSparkles } from "lucide-react";
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
import { ScrollArea } from "./ui/scroll-area";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="offcanvas">
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
        <ScrollArea className="min-h-[150px]">
          <SidebarGroup>
            <Button variant="lemon_primary" effect="click" className=" ">
              <Crown strokeWidth={3} className="text-yellow-500/80" />
              Buy Premium{" "}
            </Button>
          </SidebarGroup>
          <SidebarGroup>
            <WorkspaceArea />
          </SidebarGroup>
          {/* <SidebarGroup>
            <Button
              variant="outline"
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
