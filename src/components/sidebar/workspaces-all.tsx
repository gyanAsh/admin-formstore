import { client } from "@/lib/client";
import { SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

async function queryWorkspaces() {
  const res = await client.workspace.all.$get();
  return await res.json();
}

type InferArrayType<T> = T extends (infer U)[] ? U : never;
type Workspace = InferArrayType<Awaited<ReturnType<typeof queryWorkspaces>>>;

function WorkspaceList({ all_workspace }: { all_workspace: Workspace[] }) {
  return (
    <>
      {all_workspace?.map((workspace, i) => {
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
      })}
    </>
  );
}

export function WorkspaceAll({
  ssr_all_workspace_data,
}: {
  ssr_all_workspace_data: Workspace[];
}) {
  const { data: all_workspace, isPending: loading_workspace } = useQuery({
    queryKey: ["get-all-workspace"],
    queryFn: queryWorkspaces,
    initialData: ssr_all_workspace_data,
    gcTime: 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {!loading_workspace ? (
        <WorkspaceList all_workspace={all_workspace} />
      ) : (
        <SidebarMenuSubItem className="animate-pulse bg-accent rounded-lg">
          <SidebarMenuSubButton></SidebarMenuSubButton>
        </SidebarMenuSubItem>
      )}
    </>
  );
}
