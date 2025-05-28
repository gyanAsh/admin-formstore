import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import BreadCrumbs from "@/components/bread-crumbs";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { RiSkipLeftLine, RiSkipRightLine } from "@/pages/workspace/index";
import UpgradeFormstore from "@/components/upgrade-premium";

export default function WorkspaceHome() {
  return (
    <main className="flex grow w-full flex-col items-center justify-center p-2">
      <Card className="flex w-full grow p-2 overflow-y-auto border-sidebar-accent relative">
        {/* top-navbar */}

        <section
          className={cn(
            "sticky top-0 flex items-center justify-between p-2.5 w-full"
          )}
        >
          <div className="flex items-center justify-between space-x-3">
            <SidebarTriggerButton className="size-7" />
            <BreadCrumbs currentPage={`Dashboard`} />
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
          {false ? (
            <section className="flex flex-col gap-3 m-4">
              <Skeleton className="w-[120px] h-[40px]" />
              <Skeleton className="w-full h-[55px]" />
              <Skeleton className="w-full h-[55px]" />
            </section>
          ) : true ? (
            <div className="flex flex-col px-2 gap-3">
              Workspace Home Content
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-red-600 font-bold text-4xl">Error</div>
              <div>Something went wrong. Please try again later</div>
            </div>
          )}
        </section>
      </Card>
    </main>
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
