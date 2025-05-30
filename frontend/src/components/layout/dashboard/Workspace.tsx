import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MoreHorizontal } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import AddWorkspace from "./AddWorkspaceButton";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkspaces } from "@/lib/workspaces";
import * as motion from "motion/react-client";
import { WorkspaceDropdownContentOptions } from "@/components/options/workspace-options";
import { useState, useEffect } from "react";

const WorkspaceGroup = () => {
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(0);
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (workspaceId && parseInt(workspaceId) != currentWorkspaceId) {
      setCurrentWorkspaceId(parseInt(workspaceId));
    }
  }, [workspaceId]);

  const {
    isPending: workspacesIsPending,
    isSuccess: workspaceSuccess,
    data: workspaces,
  } = useQuery({
    queryKey: ["api-workspaces"],
    queryFn: async () => {
      try {
        const data = await getWorkspaces();
        return data;
      } catch (err) {
        console.error(err);
      }
      return [];
    },
    refetchOnWindowFocus: false,
  });

  return (
    <SidebarGroup className="grid space-y-3.5 mt-3">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* <WorkspaceIcon /> */}
          <Label className="text-zinc-500 dark:text-zinc-100/75 font-semibold text-base">
            Workspaces
          </Label>
        </div>
        <AddWorkspace />
      </section>

      <SidebarGroupContent>
        <SidebarMenu>
          {workspacesIsPending ? (
            <SidebarMenuItem className="space-y-1 mt-2">
              <Skeleton className="w-full h-7" />
              <Skeleton className="w-full h-7" />
              <Skeleton className="w-full h-7" />
            </SidebarMenuItem>
          ) : workspaceSuccess ? (
            workspaces?.map((project) => (
              <SidebarMenuItem className="space-y-0.5" key={project.name}>
                <SidebarMenuButton asChild>
                  <motion.button
                    onMouseDown={() => {
                      setCurrentWorkspaceId(project.id);
                      navigate(project.id.toString());
                    }}
                    whileHover={{
                      scale: 1.04,
                      transition: { duration: 0.07 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "bg-primary/5 text-zinc-600 hover:text-primary! dark:text-zinc-300 hover:dark:text-primary hover:bg-primary/15 transition-all duration-150",
                      "grid rounded-lg font-semibold p-4 justify-start cursor-pointer w-full",
                      {
                        "bg-primary/35 text-primary/90 dark:text-primary":
                          currentWorkspaceId === project.id,
                      }
                    )}
                  >
                    <span className="text-ellipsis">{project.name}</span>
                  </motion.button>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      className={cn(
                        "right-2.5 cursor-pointer hover:bg-background !rounded-lg",
                        {
                          "text-primary": currentWorkspaceId === project.id,
                        }
                      )}
                    >
                      <MoreHorizontal />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <WorkspaceDropdownContentOptions workspaceId={project.id} workspaceName={project.name} />
                </DropdownMenu>
              </SidebarMenuItem>
            ))
          ) : (
            <h2 className="text-destructive text-sm">
              Error : Unable to load your Workspace
            </h2>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default WorkspaceGroup;

export const WorkspaceIcon = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.6048 5.75H16.1667C17.1332 5.75 17.9167 6.5335 17.9167 7.5V14.0556C17.9167 15.0221 17.1332 15.8056 16.1667 15.8056H4.5C3.5335 15.8056 2.75 15.0221 2.75 14.0556V7.97222C2.75 7.83415 2.86193 7.72222 3 7.72222H7.30751C8.01032 7.72222 8.69419 7.4944 9.25659 7.07291L10.5553 6.09963C10.8581 5.87267 11.2263 5.75 11.6048 5.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.5 3.75H8.44093C8.8449 3.75 9.23643 3.88976 9.54909 4.14557L11.8156 6L9.54909 7.85443C9.23643 8.11024 8.8449 8.25 8.44092 8.25H5.66666H2.75L2.75 5.5C2.75 4.5335 3.5335 3.75 4.5 3.75Z"
        fill="#E7F900"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};
