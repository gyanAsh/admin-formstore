"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  ChevronDown,
  LogOut,
  MoveUpRight,
  Plus,
  WandSparkles,
  WorkflowIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { WorkspaceArea } from "./sidebar/workspace-area";

export function AppSidebar() {
  const router = useRouter();

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
        <SidebarGroup>a</SidebarGroup>
        <SidebarGroup>a</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          effect={"click"}
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/"); // redirect to login page
                },
              },
            });
          }}
        >
          <LogOut /> Sign Out
        </Button>
        <ModeToggle effect="click" className="w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}
