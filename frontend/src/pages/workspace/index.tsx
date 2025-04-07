import BreadCrumbs from "@/pages/workspace/BreadCrumbs";
import ModeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { memo, SVGProps } from "react";
import { NavLink, useParams } from "react-router";

export default memo(function Workspace() {
  const { workspaceId } = useParams();
  return (
    <>
      <main className="flex grow w-full flex-col items-center justify-center p-2">
        <Card className="flex w-full grow p-2 overflow-y-auto border-sidebar-accent relative">
          {/* top-navbar */}
          <section className="sticky top-0 flex items-center justify-between p-2 gap-2 w-full">
            <div className="flex h-5 items-center justify-between space-x-3">
              <SidebarTriggerButton className="size-7" />
              <Separator
                orientation="vertical"
                className="bg-accent-foreground/40"
                decorative
              />
              <BreadCrumbs
                currentPage={`${workspaceId}`}
                otherPageLinks={[
                  {
                    name: "Workspace",
                    path: "/workspace",
                  },
                ]}
              />
            </div>

            <ModeToggle
              variant="outline"
              effect={"click"}
              className="size-7 bg-black text-white dark:bg-white dark:hover:text-white   dark:text-black"
            />
          </section>

          <div className="grow flex flex-col items-center justify-center gap-6 px-4 py-16">
            <h1
              className={cn(
                "inline-flex tracking-tight flex-col gap-1 transition text-center",
                "font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-none lg:text-[4rem]",
                "bg-gradient-to-r from-20% bg-clip-text text-transparent",
                "from-blue-500 to-purple-500"
              )}
            >
              <span>WordspaceID : {workspaceId}</span>
            </h1>
            <p className="text-lg/7 md:text-xl/8 text-pretty sm:text-wrap sm:text-center text-center mb-8">
              The stack for building seriously fast, lightweight and{" "}
              <span className="inline sm:block">
                this is it's Workspace page.
              </span>
            </p>
            <Button asChild>
              <NavLink to={"/"}>Home</NavLink>
            </Button>
          </div>
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
