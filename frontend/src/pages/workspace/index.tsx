import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formatDateISO, getAuthToken, getTimeAgo } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import BreadCrumbs from "@/components/bread-crumbs";
import React, { SVGProps, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import AddFormButton from "@/components/layout/dashboard/AddFormButton";
import UpgradeFormstore from "@/components/upgrade-premium";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Circle, Ellipsis, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkspaceDropdownContentOptions } from "@/components/options/workspace-options";
import { MotionConfig } from "motion/react";
import * as motion from "motion/react-client";
import { FormPopoverContentOptions } from "@/components/options/form-options";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

export function WorkspaceLayout({
  children,
  workspaceName,
}: {
  children: React.ReactNode;
  workspaceName: string;
}) {
  return (
    <>
      <main className="flex grow w-full flex-col items-center justify-center md:p-2 ">
        <Card className="flex w-full grow p-[0px_8px_8px_8px] h-[97.5dvh] overflow-y-auto border-sidebar-accent relative max-md:rounded-none">
          {/* top-navbar */}
          <section
            className={cn(
              "sticky top-0 z-10 flex max-sm:flex-col max-sm:gap-2.5 sm:items-center sm:justify-between p-2.5 w-full bg-inherit pt-3.5 sm:py-3.5"
            )}
          >
            <div className="flex items-center sm:justify-between space-x-3">
              <SidebarTriggerButton className="size-9" />
              <BreadCrumbs
                currentPage={workspaceName}
                otherPageLinks={[
                  {
                    name: "Dashboard",
                    path: "/dashboard",
                  },
                ]}
              />
            </div>

            <div className="flex justify-end items-center sm:justify-between space-x-3">
              <UpgradeFormstore />

              <ModeToggle
                variant="outline"
                effect={"click"}
                className="size-9 bg-black text-white dark:bg-white dark:hover:text-white   dark:text-black"
              />
            </div>
          </section>
          {children}
        </Card>
      </main>
    </>
  );
}

export default function Workspace() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const {
    data: formsData,
    isLoading: workspace_isLoading,
    isSuccess: workspace_isSuccess,
  } = useQuery({
    queryKey: ["api-workspace-forms", workspaceId],
    queryFn: async () => {
      const res = await fetch(`/api/workspace/${workspaceId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const data = await res.json();
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <WorkspaceLayout
      workspaceName={formsData?.workspace?.name ?? "workspace 1"}
    >
      <section className="grow gap-3">
        {workspace_isLoading ? (
          <section className="flex flex-col gap-3 m-4">
            <Skeleton className="w-[120px] h-[40px]" />
            <Skeleton className="w-full h-[55px]" />
            <Skeleton className="w-full h-[55px]" />
          </section>
        ) : workspace_isSuccess ? (
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} size={"icon"}>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <WorkspaceDropdownContentOptions
                    workspaceId={parseInt(workspaceId!)}
                    workspaceName={formsData?.workspace?.name}
                    sideOffset={2}
                    alignOffset={0}
                    animationDirection="right"
                  />
                </DropdownMenu>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3">
              {/* Only the visible items in the virtualizer, manually positioned to be in view */}
              {formsData?.forms?.map((form: any) => {
                console.log({ form });
                return (
                  <Card
                    key={form.id}
                    className={cn(
                      "hover:shadow-2xl hover:border-primary transition-all ease-in-out duration-200",
                      " cursor-default p-3 rounded-xl bg-zinc-50/75 dark:bg-slate-900/35 gap-3"
                    )}
                  >
                    <section className="flex flex-col items-start gap-1.5">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6 border">
                            <AvatarImage></AvatarImage>
                            <AvatarFallback className="bg-yellow-200 text-sm text-zinc-800">
                              ek
                            </AvatarFallback>
                          </Avatar>
                          <h2 className="text-base font-semibold">
                            {form.title}
                          </h2>
                        </div>

                        {form.status == "published" && (
                          <Badge variant={"green"}>
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
                        )}
                        {form.status == "draft" && (
                          <Badge variant={"dull"} className="pr-1.5">
                            <div className="relative">
                              <Circle
                                className="size-3 z-1 fill-zinc-400 dark:fill-zinc-500"
                                strokeWidth={0}
                              />
                              {/* <Circle
                                className="size-3 fill-zinc-400 dark:fill-zinc-500 absolute left-0 top-0 animate-ping"
                                strokeWidth={0}
                              /> */}
                            </div>
                            Draft
                          </Badge>
                        )}
                      </div>

                      <h2 className="text-muted-foreground text-sm">
                        Created on{" "}
                        <span className="text-foreground">
                          {formatDateISO(form.created_at)}
                        </span>
                      </h2>
                    </section>
                    {/* <img
                      src="/sand-style.png"
                      alt=""
                      className=" object-contain border rounded-xl"
                    /> */}

                    <section className="grid grid-cols-1">
                      <div className=" text-nowrap text-zinc-800 p-1.5 flex justify-between gap-1.5 text-sm items-end leading-6">
                        <h2 className="font-medium">Response Collected</h2>
                        <p className="text-lg font-semibold">---</p>
                      </div>
                      <Separator />
                      <div className=" text-nowrap text-zinc-800 p-1.5 flex justify-between gap-1.5 text-sm items-end leading-6">
                        <h2 className="font-medium">Last Updated</h2>
                        <p className="text-lg font-semibold">
                          {getTimeAgo(form.updated_at)}
                        </p>
                      </div>
                    </section>

                    <section className="flex items-center gap-1.5">
                      <Button
                        variant={"black"}
                        className="grow font-bold"
                        onClick={() => {
                          if (form.status == "published") {
                            navigate(
                              `/dashboard/${workspaceId}/${form.id}/analytics`
                            );
                          } else {
                            navigate(
                              `/dashboard/${workspaceId}/${form.id}/create`
                            );
                          }
                        }}
                        asChild
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.03,
                            transition: {
                              duration: 0.09,
                              type: "spring",
                              ease: "easeInOut",
                            },
                            border: "1px",
                          }}
                          whileTap={{ scale: 0.89 }}
                        >
                          View Form
                        </motion.div>
                      </Button>
                      <FormOptions formId={form.id} formTitle={form.title} />
                    </section>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-red-600 font-bold text-4xl">Error</div>
            <div>
              Something went wrong while fetching your workspace. Please try
              again later
            </div>
          </div>
        )}
      </section>
    </WorkspaceLayout>
  );
}

function FormOptions({
  formId,
  formTitle,
}: {
  formId: number;
  formTitle: string;
}) {
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <Popover open={openOptions} onOpenChange={setOpenOptions} modal>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Ellipsis />
          {/* Action btn "edit / duplicate / delete / rename / pause" */}
        </Button>
      </PopoverTrigger>
      <FormPopoverContentOptions
        formId={formId}
        formTitle={formTitle}
        closeOptions={() => setOpenOptions(false)}
        sideOffset={2}
        alignOffset={0}
        animationDirection="right"
      />
    </Popover>
  );
}

export function SidebarTriggerButton({
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
            {/* {open ? (
              <RiSkipLeftLine aria-hidden="true" />
            ) : (
              <RiSkipRightLine aria-hidden="true" />
            )} */}
            <AnimatedHamburgerButton active={open} />
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

const AnimatedHamburgerButton = ({ active }: { active: boolean }) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        className="relative size-9"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-[2px] rounded-full w-3.5 bg-slate-700 dark:bg-white/85"
          style={{ x: "-50%", y: "-50%", left: "50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-[2px] rounded-full w-3.5 bg-slate-700 dark:bg-white/85"
          style={{ x: "-50%", y: "-50%", left: "50%", top: "50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-[2px] rounded-full w-3.5 bg-slate-700 dark:bg-white/85"
          style={{
            x: "-50%",
            y: "50%",
            left: "50%",
            bottom: "35%",
            // left: "calc(50% + 10px)",
          }}
        />
      </motion.div>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      // left: "calc(50% + 10px)",
      left: "50%",
    },
  },
};
