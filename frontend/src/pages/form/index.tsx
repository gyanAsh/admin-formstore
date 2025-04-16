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
import TemplateSelect from "./form-styles";
import LayoutToggle from "./layout-toggle";
import {
  ArrowDownSquare,
  Calendar,
  Eye,
  ListChecks,
  Mail,
  Phone,
  Text,
} from "lucide-react";

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
                className="size-7 bg-black text-white dark:bg-white dark:hover:text-white dark:text-black"
              />
            </div>
          </section>
          <section className="grow flex flex-col border-t gap-3">
            {false ? (
              <section className="flex flex-col gap-3 m-4">
                <Skeleton className="w-[120px] h-[40px]" />
                <Skeleton className="w-full h-[55px]" />
                <Skeleton className="w-full h-[55px]" />
              </section>
            ) : true ? (
              <>
                <Card className="flex flex-row justify-between p-2 rounded-t-none border-t-0 items-center max-w-[770px] w-full mx-auto">
                  <div className="flex flex-row h-6 items-center space-x-3.5">
                    <FormThemes />
                    <Separator
                      orientation="vertical"
                      className="bg-accent-foreground/40"
                      decorative
                    />
                    <TemplateSelect />
                    <Separator
                      orientation="vertical"
                      className="bg-accent-foreground/40"
                      decorative
                    />
                    <LayoutToggle />
                  </div>
                  <div>
                    <Separator
                      orientation="vertical"
                      className="bg-accent-foreground/40"
                      decorative
                    />
                    <Button
                      variant={"outline"}
                      effect={"click"}
                      className="bg-black text-white dark:bg-white dark:hover:text-white dark:text-black"
                    >
                      <Eye /> Preview
                    </Button>
                  </div>
                </Card>
                <Card className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-2 gap-3 max-w-[770px] w-full border mx-auto shadow-xl">
                  <Button
                    variant={"violet_secondary"}
                    effect={"click"}
                    className="gap-3  justify-start shadow-md hover:scale-[1.02]"
                  >
                    {" "}
                    <div className="p-1 flex items-center justify-center rounded bg-red-300 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                    </div>
                    Email
                  </Button>
                  <Button
                    variant={"violet_secondary"}
                    effect={"click"}
                    className="gap-3  justify-start shadow-md hover:scale-[1.02]"
                  >
                    {" "}
                    <div className="p-1 flex items-center justify-center rounded bg-blue-300 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Phone
                  </Button>
                  <Button
                    variant={"violet_secondary"}
                    effect={"click"}
                    className="gap-3  justify-start shadow-md hover:scale-[1.02]"
                  >
                    {" "}
                    <div className="p-1 flex items-center justify-center rounded bg-pink-300 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.243 3.743a.75.75 0 0 1 .75.75v6.75h9v-6.75a.75.75 0 1 1 1.5 0v15.002a.75.75 0 1 1-1.5 0v-6.751h-9v6.75a.75.75 0 1 1-1.5 0v-15a.75.75 0 0 1 .75-.75Zm17.605 4.964a.75.75 0 0 1 .396.661v9.376h1.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h1.5V10.77l-1.084.722a.75.75 0 1 1-.832-1.248l2.25-1.5a.75.75 0 0 1 .77-.037Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Text
                  </Button>
                  <Button
                    variant={"violet_secondary"}
                    effect={"click"}
                    className="gap-3  justify-start shadow-md hover:scale-[1.02]"
                  >
                    {" "}
                    <div className="p-1 flex items-center justify-center rounded bg-emerald-300 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Date
                  </Button>
                  <Button
                    variant={"violet_secondary"}
                    effect={"click"}
                    className="gap-3  justify-start shadow-md hover:scale-[1.02]"
                  >
                    {" "}
                    <div className="p-1 flex items-center justify-center rounded bg-amber-300 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Drop Down
                  </Button>
                  <Button
                    variant={"violet_secondary"}
                    effect={"click"}
                    className="gap-3  justify-start shadow-md hover:scale-[1.02]"
                  >
                    <div className="p-1 flex items-center justify-center rounded bg-indigo-300 text-white">
                      <ListChecks className="size-5" strokeWidth={1.5} />
                    </div>
                    Multiple Select
                  </Button>
                </Card>
                <Button className="w-fit mx-auto" effect={"click"}>
                  <FigmaAdd /> Add Element
                </Button>
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
