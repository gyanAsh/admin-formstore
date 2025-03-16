"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  ChevronDown,
  LoaderCircle,
  MoveUpRight,
  Plus,
  WorkflowIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import React from "react";
import { toast } from "sonner";
import { HTTPException } from "hono/http-exception";
import { WorkspaceAll } from "./workspaces-all";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function WorkspaceArea() {
  // const { data: current_workspace, isPending: loading_current_workspace } =
  //   useQuery({
  //     queryKey: ["get-current-workspace"],
  //     queryFn: async () => {
  //       const res = await client.workspace.current.$get();
  //       return await res.json();
  //     },
  //     refetchOnWindowFocus: false,
  //   });

  return (
    <section className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1 items-center text-sm font-semibold">
          <WorkflowIcon width={14} height={14} /> My Workspace{" "}
        </div>
        <Dialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <SidebarMenuSubButton asChild>
                    <Button
                      variant="outline"
                      effect={"click"}
                      className="size-7"
                    >
                      <Plus className="" />
                    </Button>
                  </SidebarMenuSubButton>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create New Workspace</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DialogContent>
            <NewWorkspaceDialogBox />
          </DialogContent>
        </Dialog>
      </div>
      <SidebarMenu>
        <WorkspaceAll ssr_all_workspace_data={[]} />
      </SidebarMenu>
    </section>
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
