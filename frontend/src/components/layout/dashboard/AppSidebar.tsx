import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Crown } from "lucide-react";
import { Footer } from "@/components/layout/dashboard/Footer";
import WorkspaceGroup from "./Workspace";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="offcanvas">
      <SidebarHeader className="flex-row justify-between">
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
        <SidebarTrigger className="size-7" />
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
