import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import React, { memo, SVGProps } from "react";
import { FigmaAdd } from "@/components/icons";
import { useParams } from "react-router";
import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import BreadCrumbs from "@/components/bread-crumbs";
import ModeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { $current_form, $current_workspace } from "@/store/workspace";
import FormThemes from "./themes";

export default memo(function Form() {
  const { workspaceId } = useParams();
  const currentWorkspace = useStore($current_workspace);
  const currentForm = useStore($current_form);

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
                currentPage={currentForm.title}
                otherPageLinks={[
                  {
                    name: "Workspace",
                    path: "/workspace",
                  },
                  {
                    name: currentWorkspace.name,
                    path: `/workspace/${workspaceId}`,
                  },
                ]}
              />
            </div>

            <div className="flex h-5 items-center justify-between space-x-3">
              <Button effect={"click"}>
                <FigmaAdd /> Publish
              </Button>
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
          <section className="grow flex flex-col border gap-3">
            {false ? (
              <section className="flex flex-col gap-3 m-4">
                <Skeleton className="w-[120px] h-[40px]" />
                <Skeleton className="w-full h-[55px]" />
                <Skeleton className="w-full h-[55px]" />
              </section>
            ) : true ? (
              <>
                <div className="flex px-2 gap-3 max-w-[770px] w-full border mx-auto border-rose-600">
                  <FormThemes />
                  <Separator
                    orientation="vertical"
                    className="bg-accent-foreground/40"
                    decorative
                  />
                  new theme layout select option + single page layout/ one form
                  layout toggle btn + preview page btn{" "}
                </div>
                <div className="flex flex-col px-2 gap-3 max-w-[770px] w-full border mx-auto bg-rose-500">
                  by defalut here will be elements options{" "}
                </div>
                <div className="flex flex-col px-2 gap-3 max-w-[200px] border mx-auto bg-rose-500">
                  + (this will be a add btn) to create new page element
                </div>
                *these element pages are dragable.
              </>
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
