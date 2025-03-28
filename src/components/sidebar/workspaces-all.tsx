import { client } from "@/lib/client";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

async function queryWorkspaces() {
  const res = await client.workspace.all.$get();
  return await res.json();
}

type InferArrayType<T> = T extends (infer U)[] ? U : never;
type Workspace = InferArrayType<Awaited<ReturnType<typeof queryWorkspaces>>>;

function WorkspaceList({ all_workspace }: { all_workspace: Workspace[] }) {
  const router = useRouter();
  const { workspaceId } = useParams();

  return (
    <>
      {all_workspace?.map((workspace, i) => {
        return (
          <SidebarMenuItem key={i} className="">
            <Button
              variant="violet_secondary"
              effect={"click"}
              className={cn(
                "w-full text-xs flex justify-start cursor-pointer font-semibold hover:font-bold duration-75 transition-all",
                {
                  "bg-violet-300 dark:bg-violet-400 font-bold":
                    parseInt(workspaceId as string) === workspace.id,
                }
              )}
              disabled={false}
              onClick={() => {
                router.push(`/dashboard/${workspace.id}`)
                // updateCurrentWorkspace({ workspace_id: workspace.id });
              }}
            >
              <h1>{workspace.name}</h1>
            </Button>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}

export function WorkspaceAll() {
  const { data: all_workspace, isPending: loading_workspace } = useQuery({
    queryKey: ["get-all-workspace"],
    queryFn: queryWorkspaces,
  });

  return (
    <>
      {!loading_workspace ? (
        <WorkspaceList all_workspace={all_workspace ?? []} />
      ) : (
        <SidebarMenuItem className="animate-pulse bg-accent rounded-lg">
          <SidebarMenuButton></SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </>
  );
}
