"use client";
import {
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { HTTPException } from "hono/http-exception";
import { WorkspaceAll } from "./workspaces-all";

export function WorkspaceArea() {
  const { data: current_workspace, isPending: loading_current_workspace } =
    useQuery({
      queryKey: ["get-current-workspace"],
      queryFn: async () => {
        const res = await client.workspace.current.$get();
        return await res.json();
      },
      refetchOnWindowFocus: false,
    });

  return (
    <>
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
            <ScrollArea className="h-[100px] gap-2">
              <WorkspaceAll ssr_all_workspace_data={[]} />
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
    </>
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
