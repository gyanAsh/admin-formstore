import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, getAuthToken } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import BreadCrumbs from "@/components/bread-crumbs";
import React, { memo, SVGProps } from "react";
import { Link, useParams } from "react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQuery } from "@tanstack/react-query";
import AddFormButton from "@/components/layout/dashboard/AddFormButton";
import { useStore } from "@nanostores/react";
import { $all_workspaces, $current_workspace } from "@/store/workspace";

export default memo(function Workspace() {
  const { workspaceId } = useParams();
  const workspaces = useStore($all_workspaces);
  const currentWorkspace = useStore($current_workspace);

  const {
    data: forms,
    isPending: formsIsPending,
    error: formsError,
  } = useQuery({
    queryKey: ["api-workspace-forms", workspaceId],
    queryFn: async () => {
      const res = await fetch(`/api/workspace/${workspaceId}/forms`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const data = await res.json();
      return data;
    },
    refetchOnWindowFocus: false,
  });
  const forms_data = { forms: forms ?? [] };
  const parentRef = React.useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: forms_data?.forms.length ?? 0,
    // count: 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <>
      <main className="flex grow w-full flex-col items-center justify-center p-2">
        <Card className="flex w-full grow p-2 overflow-y-auto border-sidebar-accent relative">
          {/* top-navbar */}
          <section className="sticky top-0 flex items-center justify-between pt-2 px-2 w-full">
            <div className="flex h-5 items-center justify-between space-x-3">
              <SidebarTriggerButton className="size-7" />
              <Separator
                orientation="vertical"
                className="bg-accent-foreground/40"
                decorative
              />
              <BreadCrumbs
                currentPage={currentWorkspace.name}
                otherPageLinks={[
                  {
                    name: "Workspace",
                    path: "/workspace",
                  },
                ]}
              />
            </div>

            <div className="flex h-5 items-center justify-between space-x-3">
              <AddFormButton />
              <Separator
                orientation="vertical"
                className="bg-accent-foreground/40"
                decorative
              />
              <ModeToggle
                variant="outline"
                effect={"click"}
                className="size-7 bg-black text-white dark:bg-white dark:hover:text-white   dark:text-black"
              />
            </div>
          </section>
          <section className="grow gap-3">
            {false ? (
              <section className="flex flex-col gap-3 m-4">
                <Skeleton className="w-[120px] h-[40px]" />
                <Skeleton className="w-full h-[55px]" />
                <Skeleton className="w-full h-[55px]" />
              </section>
            ) : true ? (
              <div className="flex flex-col px-2 gap-3">
                <section className="flex justify-between w-full">
                  <div className="flex items-center gap-1">
                    {/* {forms_data?.workspace?.name} */}
                    Workspace Name
                  </div>
                  <div className="flex gap-2 mx-6">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          All Forms (Default)
                        </SelectItem>
                        <SelectItem value="dark">Drafted Form</SelectItem>
                        <SelectItem value="system">Published Form</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          Last Updated (Default)
                        </SelectItem>
                        <SelectItem value="dark">Date created</SelectItem>
                        <SelectItem value="system">Alphabetical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </section>
                <div className="flex flex-col gap-3">
                  {/* The scrollable element for your list */}
                  <div className="grid grid-cols-5 gap-4 text-start">
                    <div>ID</div>
                    <div>Title</div>
                    <div>Status</div>
                    <div>Response</div>
                    <div>Updated</div>
                  </div>
                  <div
                    ref={parentRef}
                    style={{
                      height: `calc(100dvh - 180px)`,
                      overflow: "auto", // Make it scroll!
                    }}
                  >
                    {/* The large inner element to hold all of the items */}
                    <div
                      style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                      {rowVirtualizer
                        .getVirtualItems()
                        .map((virtualItem, idx) => (
                          <Button
                            key={virtualItem.key}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: `${virtualItem.size}px`,
                              transform: `translateY(${virtualItem.start}px)`,
                            }}
                            variant={"violet_secondary"}
                            className="grid grid-cols-5 gap-4 text-start border active:scale-[0.998] active:translate-y-[2px]"
                            onClick={() => console.log("btb lick lcik")}
                            asChild
                          >
                            <Link to={`/workspace/${workspaceId}/${idx + 1}`}>
                              <div>
                                ID{forms_data?.forms[virtualItem.index]?.id}
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger
                                    className=" overflow-hidden text-start"
                                    asChild
                                  >
                                    <div>
                                      {
                                        forms_data?.forms[virtualItem.index]
                                          ?.title
                                      }
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      {
                                        forms_data?.forms[virtualItem.index]
                                          ?.title
                                      }
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <div className=" capitalize">
                                {/* {forms_data?.forms[virtualItem.index]?.status} */}
                                STATUS DRAFT/PUBLISHED
                              </div>
                              <div>
                                {/* {forms_data?.forms[virtualItem.index]?.response} */}
                                RESPONSE COUNT
                              </div>
                              <div>
                                {new Date(
                                  forms_data?.forms[
                                    virtualItem.index
                                  ]?.updated_at.replace(/\.(\d{3})\d+/, ".$1")
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </div>
                            </Link>
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-red-600">Error</div>
                <div>
                  Something went wrong while fetching your forms. Please try
                  again later
                </div>
              </div>
            )}
          </section>
        </Card>
      </main>
    </>
  );
});

function SidebarTriggerButton({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const {
    toggleSidebar,
    open: desktopOpen,
    isMobile,
    openMobile,
  } = useSidebar();
  let open = desktopOpen && !isMobile;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            data-sidebar="trigger"
            variant="outline"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            data-slot="sidebar-trigger"
            size="icon"
            className={cn("hover:text-foreground", className)}
            onClick={(event) => {
              onClick?.(event);
              toggleSidebar();
            }}
            {...props}
          >
            {open ? (
              <RiSkipLeftLine aria-hidden="true" />
            ) : (
              <RiSkipRightLine aria-hidden="true" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {(open && !isMobile) || (isMobile && openMobile) ? (
            <p>Close sidebar</p>
          ) : (
            <p>Open sidebar</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function RiSkipLeftLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m13.914 12l4.793-4.793l-1.414-1.414L11.086 12l6.207 6.207l1.414-1.414zM7 18V6h2v12z"
      />
    </svg>
  );
}

export function RiSkipRightLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m10.086 12l-4.793 4.793l1.414 1.414L12.914 12L6.707 5.793L5.293 7.207zM17 6v12h-2V6z"
      />
    </svg>
  );
}
