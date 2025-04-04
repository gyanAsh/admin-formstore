import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Delete, FolderEditIcon, MoreHorizontal, Share2 } from "lucide-react";
import { Link } from "react-router";
import AddWorkspace from "./AddWorkspaceButton";

const WorkspaceGroup = () => {
  const projects = [
    { id: 1, name: "First project" },
    { id: 2, name: "JY Meeting" },
    { id: 3, name: "Nova Forms" },
  ];

  return (
    <SidebarGroup className="grid gap-1">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <WorkspaceIcon />
          <Label>Workspaces</Label>
        </div>
        <AddWorkspace />
      </section>

      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuItem key={project.name}>
              <SidebarMenuButton asChild>
                <Button
                  variant="outline"
                  className="flex justify-start"
                  asChild
                >
                  <Link to={project.id.toString()}>
                    <span>{project.name}</span>
                  </Link>
                </Button>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  align="start"
                  alignOffset={-5}
                  sideOffset={10}
                >
                  <DropdownMenuItem>
                    <Share2
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    Invite
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderEditIcon
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Delete
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
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
