import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import React, { SVGProps, useEffect } from "react";
import { FigmaAdd } from "@/components/icons";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import BreadCrumbs from "@/components/bread-crumbs";
import ModeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import FormThemes from "./themes";
import LayoutToggle from "./layout-toggle";
import { Eye } from "lucide-react";
import { FormContent } from "./form-content";
import { addNewElement } from "@/store/form";
import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/utils";
import { useState } from "react";

type Form = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  workspace_id: string;
};

type Workspace = {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

enum FormTypes {
  default = "default",
  multiselect = "multiple select",
  dropdown = "dropdown",
  date = "date",
  text = "text",
  phone = "phone",
  email = "email",
}

export type FormElement = {
  id: number;
  type: FormTypes;
  value: string;
};

export default function Form() {
  const { workspaceId, formId } = useParams();
  const [formElements, setFormElements] = useState<FormElement[]>([
    { id: 0, type: "default" },
  ] as FormElement[]);

  const {
    data: formData,
    isPending: loadingFormData,
    isError: errorFormData,
  } = useQuery({
    queryFn: async () => {
      const res = await fetch(`/api/form/${formId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const data = await res.json();
      return data as {
        form: Form;
        workspace: Workspace;
        form_elements: FormElement[];
      };
    },
    queryKey: ["api-form-id"],
  });

  useEffect(() => {
    if (formData && formData.form_elements) {
      setFormElements(formData.form_elements);
    }
  }, [formData]);

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
                currentPage={
                  !loadingFormData && !errorFormData
                    ? formData.form.title
                    : `Form: ID${formId}`
                }
                otherPageLinks={[
                  {
                    name: "Workspace",
                    path: "/workspace",
                  },
                  {
                    name:
                      !loadingFormData && !errorFormData
                        ? formData.workspace.name
                        : `Workspace: ID${workspaceId}`,
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
              <div className="grid grow gap-3 relative h-1 overflow-y-auto snap-y">
                <Card className=" sticky top-0 z-20 flex flex-row justify-between p-2 rounded-t-none border-t-0 items-center max-w-[770px] w-full mx-auto">
                  <div className="flex flex-row h-6 items-center space-x-3.5">
                    <FormThemes />
                    <Separator
                      orientation="vertical"
                      className="bg-accent-foreground/40"
                      decorative
                    />
                    {/* <TemplateSelect /> 
                    <Separator
                      orientation="vertical"
                      className="bg-accent-foreground/40"
                      decorative
                    />//on hold right now */}
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
                <FormContent
                  formElements={formElements}
                  setFormElements={setFormElements}
                />
                <Button
                  className="w-fit mx-auto"
                  effect={"click"}
                  onClick={addNewElement}
                >
                  <FigmaAdd /> Add Element
                </Button>
                *these element pages are dragable.
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
