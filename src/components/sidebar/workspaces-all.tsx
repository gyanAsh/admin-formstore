import { client } from "@/lib/client";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

async function queryWorkspaces() {
  const res = await client.workspace.all.$get();
  return await res.json();
}

type InferArrayType<T> = T extends (infer U)[] ? U : never;
type Workspace = InferArrayType<Awaited<ReturnType<typeof queryWorkspaces>>>;

function WorkspaceList({ all_workspace }: { all_workspace: Workspace[] }) {
  const router = useRouter();

  return (
    <>
      {all_workspace?.map((workspace, i) => {
        return (
          <SidebarMenuItem key={i} className="">
            <SidebarMenuButton asChild>
              <Button
                variant={"ghost"}
                effect={"click"}
                className={cn(
                  "w-full pl-3 text-xs flex justify-start cursor-pointer active:bg-background font-normal duration-75"
                )}
                onClick={() => {
                  router.push(workspace.name);
                }}
              >
                <h1>{workspace.name}</h1>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
  console.log({ all_workspace });
  return (
    <>
      {!loading_workspace ? (
        <WorkspaceList all_workspace={all_workspace} />
      ) : (
        <SidebarMenuItem className="animate-pulse bg-accent rounded-lg">
          <SidebarMenuButton></SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </>
  );
}
