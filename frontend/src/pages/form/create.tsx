import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, debounce } from "@/lib/utils";
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
import { Eye, MoreHorizontal } from "lucide-react";
import { addNewElement } from "@/store/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/utils";
import { useState } from "react";
import UpgradeFormstore from "@/components/upgrade-premium";
import {
  RiSkipLeftLine,
  RiSkipRightLine,
  SidebarTriggerButton,
} from "../workspace";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkspaceDropdownContentOptions } from "@/components/options/workspace-options";
import AddFormButton from "@/components/layout/dashboard/AddFormButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { FormDropdownContentOptions } from "@/components/options/form-options";
import PublishFormButton from "@/components/layout/dashboard/PubishFormButton";

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

export enum FormTypes {
  multiselect = "multiple_selection",
  dropdown = "drop_down",
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

export default function CreateForm() {
  const { workspaceId, formId } = useParams();
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  const {
    data: formData,
    isPending: form_isLoading,
    isError: form_hasError,
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

  const queryClient = useQueryClient();

  // const formElementMutation = useMutation({
  //   mutationFn: async ({
  //     id,
  //     type,
  //     label,
  //   }: {
  //     id: number;
  //     type: FormTypes;
  //     value: string;
  //   }) => {
  //     const res = await fetch("/api/form/element", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${getAuthToken()}`,
  //       },
  //       body: JSON.stringify({
  //         id: id,
  //         type: type,
  //         label: label,
  //       }),
  //     });
  //     const data = await res.json();
  //     return data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKeys: ["api-form-id"] });
  //   },
  // });

  // const updateFormElementValues = debounce(formElementMutation.mutate);

  useEffect(() => {
    if (formData && formData.form_elements) {
      setFormElements(formData.form_elements);
    }
  }, [formData]);

  return (
    <>
      <main className="flex grow w-full flex-col items-center justify-center p-2 ">
        <Card className="flex w-full grow p-[0px_8px_8px_8px] h-[97.5dvh] overflow-y-auto border-sidebar-accent relative">
          {/* top-navbar */}
          <section
            className={cn(
              "sticky top-0 z-10 flex max-sm:flex-col max-sm:gap-2.5 sm:items-center sm:justify-between p-2.5 w-full bg-inherit pt-3.5 sm:py-3.5"
            )}
          >
            <div className="flex items-center sm:justify-between space-x-3">
              <SidebarTriggerButton className="size-9" />
              <BreadCrumbs
                currentPage={
                  !form_isLoading && !form_hasError
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
                      !form_isLoading && !form_hasError
                        ? formData.workspace.name
                        : `Workspace: ID${workspaceId}`,
                    path: `/workspace/${workspaceId}`,
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

          <section className="grow gap-3">
            {form_isLoading ? (
              <section className="flex flex-col gap-3 m-4">
                <Skeleton className="w-[120px] h-[40px]" />
                <Skeleton className="w-full h-[55px]" />
                <Skeleton className="w-full h-[55px]" />
              </section>
            ) : !form_hasError ? (
              <div className="flex flex-col px-2 gap-4">
                <section className="flex items-end justify-between w-full">
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-zinc-500 dark:text-zinc-100/75">
                      Create Form
                    </h2>
                    <h2 className="text-3xl font-bold">Form Name</h2>
                  </div>
                  <div className="flex gap-2">
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} size={"icon"}>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <FormDropdownContentOptions
                        sideOffset={2}
                        alignOffset={0}
                        animationDirection="right"
                      />
                    </DropdownMenu> */}
                    <PublishFormButton />
                  </div>
                </section>
                Add Elements tab1 | Template tab2 | {`preview -> (link)`}
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3">
                  Form Elements Lisitng
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
