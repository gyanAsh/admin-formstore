"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoveUpRight, Plus, Send, WorkflowIcon } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { client } from "@/lib/client";

export function AppSidebar() {
  useEffect(() => {
    client.workspace.all
      .$get()
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <Sidebar>
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
          <DropdownMenu>
            <section className="flex items-center gap-2">
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  effect={"small_scale"}
                  className="grow justify-start "
                >
                  <WorkflowIcon /> My First Workspace{" "}
                </Button>
              </DropdownMenuTrigger>
              <Dialog>
                <DialogTrigger>
                  <div className="p-[6px] border rounded-lg hover:scale-105 active:scale-95 bg-accent cursor-pointer duration-75">
                    <Plus />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="text-start">
                    <DialogTitle>Create New Workspace</DialogTitle>
                    <DialogDescription>
                      Please provide a unique name for the new workspace. Names
                      can include letters, numbers, and underscores, and should
                      be between 3 and 20 characters long.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Please enter a name for the new workspace..."
                        defaultValue=""
                        type="text"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      className="w-full relative flex items-center"
                      type="submit"
                    >
                      Create Workspace
                      <MoveUpRight className="absolute right-3" />
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </section>

            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>Your Workspace</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:shadow-sm hover:bg-accent duration-75 font-semibold cursor-not-allowed">
                My First Workspace
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:shadow-sm hover:bg-accent cursor-pointer duration-75">
                My Second Workspace
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:shadow-sm hover:bg-accent cursor-pointer duration-75">
                My Third Workspace
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:shadow-sm hover:bg-accent cursor-pointer duration-75">
                My Fourth Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroup>
        <SidebarGroup>a</SidebarGroup>
        <SidebarGroup>a</SidebarGroup>
        <SidebarGroup>a</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle className="w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}
