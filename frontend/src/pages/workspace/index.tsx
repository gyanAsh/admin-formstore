import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formatDateISO, getAuthToken } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import BreadCrumbs from "@/components/bread-crumbs";
import React, { SVGProps } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import AddFormButton from "@/components/layout/dashboard/AddFormButton";
import UpgradeFormstore from "@/components/upgrade-premium";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

export default function Workspace() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const { data: formsData, isLoading: form_isLoading } = useQuery({
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

  console.log({ formsData });
  return (
    <>
      <main className="flex grow w-full flex-col items-center justify-center p-2 ">
        <Card className="flex w-full grow p-[0px_8px_8px_8px] h-[97.5dvh] overflow-y-auto border-sidebar-accent relative">
          {/* top-navbar */}
          <section
            className={cn(
              "sticky top-0 z-10 flex items-center justify-between p-2.5 w-full bg-inherit py-3.5"
            )}
          >
            <div className="flex items-center justify-between space-x-3">
              <SidebarTriggerButton className="size-7" />
              <BreadCrumbs
                currentPage={formsData?.workspace?.name ?? "Current Workspace"}
                otherPageLinks={[
                  {
                    name: "Dashboard",
                    path: "/workspace",
                  },
                ]}
              />
            </div>

            <div className="flex items-center justify-between space-x-3">
              <UpgradeFormstore />
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
            {form_isLoading ? (
              <section className="flex flex-col gap-3 m-4">
                <Skeleton className="w-[120px] h-[40px]" />
                <Skeleton className="w-full h-[55px]" />
                <Skeleton className="w-full h-[55px]" />
              </section>
            ) : true ? (
              <div className="flex flex-col px-2 gap-4">
                <section className="flex items-end justify-between w-full">
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-zinc-500 dark:text-zinc-100/75">
                      Workspace
                    </h2>
                    <h2 className="text-3xl font-bold">
                      {formsData?.workspace?.name}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <AddFormButton />
                  </div>
                </section>

                <section className="flex items-center gap-2 mt-4">
                  <Avatar className="size-6">
                    <AvatarImage></AvatarImage>
                    <AvatarFallback className="bg-yellow-200 text-sm text-zinc-800">
                      ek
                    </AvatarFallback>
                  </Avatar>
                  <Label className="font-semibold text-zinc-500 dark:text-zinc-100/75">
                    1 member
                  </Label>
                </section>

                <Separator />
                <div className="grid grid-cols-3 2xl:grid-cols-4 gap-3">
                  {/* The scrollable element for your list */}
                  {/* <div
                    className={cn(
                      "grid grid-cols-5 gap-4 text-start font-semibold text-base text-zinc-700/95 dark:text-zinc-100/90 ",
                      "bg-zinc-200/65 dark:bg-slate-700 px-3 py-3 rounded-t-2xl ml-5 mr-3.5"
                    )}
                  >
                    <div>ID</div>
                    <div>Title</div>
                    <div>Status</div>
                    <div>Response</div>
                    <div>Updated</div>
                  </div> */}

                  {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                  {formsData?.forms?.map((form: any) => {
                    return (
                      <Card
                        key={form.id}
                        className={cn(
                          "hover:shadow-2xl hover:scale-[1.01] transition-all ease-in-out duration-200",
                          " cursor-default p-3 rounded-xl bg-zinc-50/75 dark:bg-slate-900/35"
                        )}
                        // onClick={() => {
                        //   navigate(`/workspace/${workspaceId}/${form.id}`);
                        // }}
                      >
                        <section className="flex items-start">
                          <div className="grow">
                            <h2 className="text-base font-semibold">
                              {form.title}
                            </h2>
                            <h2 className="text-muted-foreground text-xs">
                              Published on {formatDateISO(form.created_at)}
                            </h2>
                          </div>
                          <Badge
                            // className={cn(
                            //   "rounded-xl gap-1 px-1 border border-zinc-900/20 dark:border-zinc-100/30 cursor-pointer ",
                            //   " bg-green-100 text-zinc-700",
                            //   "dark:bg-green-500/15 dark:text-zinc-100"
                            // )}
                            variant={"green"}
                          >
                            <div className="relative">
                              <Circle
                                className="size-3 z-1 fill-green-400 dark:fill-green-500"
                                strokeWidth={0}
                              />
                              <Circle
                                className="size-3 fill-green-400 dark:fill-green-500 absolute left-0 top-0 animate-ping"
                                strokeWidth={0}
                              />
                            </div>
                            Active
                          </Badge>
                        </section>
                        <section>template image</section>
                        <section className="flex items-center">
                          <div>info. container eg: "res. count"</div>
                          <div>
                            Action btn "edit / duplicate / delete / rename /
                            pause"
                          </div>
                        </section>
                      </Card>
                    );
                  })}
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
}

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
