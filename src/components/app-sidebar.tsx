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

import { MoveUpRight, Plus, WorkflowIcon } from "lucide-react";
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
import { authClient } from "@/lib/auth-clinet";
import { useRouter } from "next/navigation";
import React from "react";

export function AppSidebar() {
  const router = useRouter();
  const { data: all_workspace, isPending: loading_workspace } = useQuery({
    queryKey: ["get-all-workspace"],
    queryFn: async () => {
      const res = await client.workspace.all.$get();
      return await res.json();
    },
  });
  {
    console.log({ all_workspace });
  }

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
                  className="grow justify-start border-accent-foreground/30 "
                >
                  <WorkflowIcon /> My First Workspace{" "}
                </Button>
              </DropdownMenuTrigger>
              <Dialog>
                <DialogTrigger>
                  <div className="p-[6px] border rounded-lg hover:scale-105 active:scale-95 bg-foreground cursor-pointer duration-75">
                    <Plus className="text-background" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <NewWorkspaceDialogBox />
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
        <Button
          effect={"small_scale"}
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
          Sign Out
        </Button>
        <ModeToggle effect={"small_scale"} className="w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}

const NewWorkspaceDialogBox = () => {
  const [name, setName] = React.useState<string>("");
  const queryClient = useQueryClient();

  const { mutate: createWorkspace, isPending } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await client.workspace.create.$post({ name });
      return await res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-workspace"] });
      setName("");
    },
  });
  return (
    <>
      {" "}
      <DialogHeader className="text-start">
        <DialogTitle>Create New Workspace</DialogTitle>
        <DialogDescription>
          Please provide a unique name for the new workspace. Names can include
          letters, numbers, and underscores, and should be between 3 and 20
          characters long.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createWorkspace({ name });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            createWorkspace({ name });
          }
        }}
      >
        {" "}
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Please enter a name for the new workspace..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full relative flex items-center" type="submit">
            Create Workspace
            <MoveUpRight className="absolute right-3" />
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};
