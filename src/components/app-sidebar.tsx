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
  Ellipsis,
  LoaderCircle,
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
import { toast } from "sonner";
import { HTTPException } from "hono/http-exception";

export function AppSidebar() {
  const router = useRouter();
  const { data: all_workspace, isPending: loading_workspace } = useQuery({
    queryKey: ["get-all-workspace"],
    queryFn: async () => {
      const res = await client.workspace.all.$get();
      return await res.json();
    },
    refetchOnWindowFocus: false,
  });

  const { data: current_workspace, isPending: loading_current_workspace } =
    useQuery({
      queryKey: ["get-current-workspace"],
      queryFn: async () => {
        const res = await client.workspace.current.$get();
        return await res.json();
      },
      refetchOnWindowFocus: false,
    });

  {
    console.log(current_workspace);
  }

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
          <Collapsible defaultOpen className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="flex items-center justify-between w-full text-sidebar-accent-foreground/90 text-sm gap-2">
                <WorkflowIcon width={16} height={16} /> My First Workspace{" "}
                <ChevronDown
                  width={16}
                  height={16}
                  className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <ScrollArea className="max-h-[200px] gap-2">
                  {!loading_workspace ? (
                    all_workspace?.map((workspace, i) => {
                      return (
                        <SidebarMenuSubItem key={i} className="mt-0.5">
                          <SidebarMenuSubButton asChild>
                            <Button
                              variant={"ghost"}
                              effect={"click"}
                              className={cn(
                                "w-full text-xs flex justify-start cursor-pointer",
                                {
                                  "font-medium bg-sidebar-accent": i === 0,
                                  "font-normal": i !== 0,
                                }
                              )}
                            >
                              <h1>{workspace.name}</h1>
                            </Button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })
                  ) : (
                    <SidebarMenuSubItem className="animate-pulse bg-accent rounded-lg">
                      <SidebarMenuSubButton></SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}
                </ScrollArea>
                <SidebarMenuSubItem>
                  <Dialog>
                    <DialogTrigger asChild className="w-full">
                      <SidebarMenuSubButton asChild>
                        <Button
                          variant={"outline"}
                          effect={"click"}
                          className="w-full"
                        >
                          <Plus className="" /> <h2>Create Workspace</h2>
                        </Button>
                      </SidebarMenuSubButton>
                    </DialogTrigger>
                    <DialogContent>
                      <NewWorkspaceDialogBox />
                    </DialogContent>
                  </Dialog>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
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

const NewWorkspaceDialogBox = () => {
  const [name, setName] = React.useState<string>("");
  const queryClient = useQueryClient();

  const { mutate: createWorkspace, isPending: creating_workspace } =
    useMutation({
      mutationFn: async ({ name }: { name: string }) => {
        const res = await client.workspace.create.$post({ name });
        return await res.json();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["get-all-workspace"],
        });
        setName("");
        toast.success("Workspace created! 🎉");
      },
      onError: (err: HTTPException) => {
        toast.error(`Failed to create Workspace: ${err.message}`);
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
          <Button
            className="w-full relative flex items-center"
            effect={"click"}
            disabled={creating_workspace}
            type="submit"
          >
            {creating_workspace ? (
              <LoaderCircle className="size-5 animate-spin " />
            ) : (
              "Create Workspace"
            )}
            {!creating_workspace && (
              <MoveUpRight className="absolute right-3" />
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};
