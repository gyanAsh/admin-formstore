import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router";
import BreadCrumbs from "@/components/bread-crumbs";
import ModeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/utils";
import UpgradeFormstore from "@/components/upgrade-premium";
import { SidebarTriggerButton } from "../workspace";
import PublishFormButton from "@/components/layout/dashboard/PublishFormButton";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { AddFormElement } from "@/components/tabs-content/create-form/add-form-element";
import { updateForm } from "@/store/forms/form-elements";
import { FormElementPreview } from "@/components/tabs-content/create-form/preview-form-elements";
import { defaultDesignState } from "@/store/forms/formV1Design";
import { FormElements, Forms } from "@/store/forms/form-elements.types";
import SaveFormButton from "@/components/layout/dashboard/SaveFormButton";
import { getBadgeValue } from "@/store/forms/values";
import RefreshFormButton from "@/components/layout/dashboard/RefreshFormButton";
import { Separator } from "@/components/ui/separator";
import { Blocks, Paintbrush } from "lucide-react";

type ApiFormData = {
  form: {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
    design: any;
  };
  elements: {
    seq_number: number;
    label: string;
    description: string;
    type: string;
    required: boolean;
    properties: any;
  }[];
  workspace: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: string;
  };
};

function parseFormDataFromApi(inp: ApiFormData): Forms {
  const { form, elements, workspace } = inp;
  let ret: Forms = {
    id: String(form.id),
    workspaceId: String(workspace.id),
    form_name: form.title,
    elements: [],
    updatedAt: new Date(form.updated_at),
    design: form?.design ?? { ...defaultDesignState },
  };
  ret.elements = elements.map((el) => {
    let element: FormElements = {
      id: String(el.seq_number),
      field: el.type,
      labels: {
        title: el.label,
        description: el.description,
      },
      get badge() {
        return getBadgeValue(this.field);
      },
      required: el.required,
    };
    if (el.properties) {
      element.validations = el.properties;
    }
    return element;
  });
  return ret;
}

export default function CreateForm() {
  const { workspaceId, formId } = useParams();

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
      const data = (await res.json()) as ApiFormData;

      try {
        updateForm(parseFormDataFromApi(data));
      } catch (err) {
        console.error("failed to parse form api data with error:", err);
      }
      return data;
    },
    refetchOnWindowFocus: false,
    queryKey: ["api-form-id"],
  });

  return (
    <>
      <main className="flex w-full grow flex-col items-center justify-center md:p-2">
        <Card className="border-sidebar-accent relative flex h-[97.5dvh] w-full grow overflow-y-auto p-[0px_8px_8px_8px] max-md:rounded-none">
          {/* top-navbar */}
          <section
            className={cn(
              "sticky top-0 z-10 flex w-full bg-inherit p-2.5 pt-3.5 max-sm:flex-col max-sm:gap-2.5 sm:items-center sm:justify-between sm:py-3.5"
            )}
          >
            <div className="flex items-center space-x-3 sm:justify-between">
              <SidebarTriggerButton className="size-9" />
              <BreadCrumbs
                currentPage={formData?.form?.title || `Form: ID${formId}`}
                otherPageLinks={[
                  {
                    name: "Dashboard",
                    path: "/dashboard",
                  },
                  {
                    name:
                      formData?.workspace?.name ||
                      `Workspace: ID${workspaceId}`,
                    path: `/dashboard/${workspaceId}`,
                  },
                ]}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 sm:justify-between">
              <UpgradeFormstore />

              <ModeToggle
                variant="outline"
                effect={"click"}
                className="size-9 bg-black text-white dark:bg-white dark:text-black dark:hover:text-white"
              />
            </div>
          </section>

          <section className="grow gap-3">
            {form_isLoading ? (
              <section className="m-4 flex flex-col gap-3">
                <Skeleton className="h-[40px] w-[120px]" />
                <Skeleton className="h-[55px] w-full" />
                <Skeleton className="h-[55px] w-full" />
              </section>
            ) : !form_hasError ? (
              <div className="flex h-full flex-col gap-4 px-2">
                <section className="flex w-full justify-between gap-2 max-sm:flex-col min-sm:items-end">
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-zinc-500 dark:text-zinc-100/75">
                      Create Form
                    </h2>
                    <h2 className="text-3xl font-bold">
                      {formData?.form?.title || "Current Form"}
                    </h2>
                  </div>
                  <div className="flex h-9 gap-2 max-sm:justify-end">
                    <RefreshFormButton />
                    <SaveFormButton formId={parseInt(String(formId))} />
                    <Separator orientation="vertical" />
                    <PublishFormButton
                      formId={parseInt(String(formId))}
                      workspaceId={parseInt(String(workspaceId))}
                    />
                  </div>
                </section>
                <FormTabs />
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="text-4xl font-bold text-red-600">Error</div>
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

function FormTabs() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="m-[1px] flex h-full w-full grow flex-col">
      <nav>
        <ul className="flex gap-0.5 border-b-[1.5px]">
          {tabs.map((item) => (
            <motion.li
              key={item.id}
              initial={false}
              onClick={() => setSelectedTab(item)}
              className={cn(
                "relative flex w-fit cursor-pointer items-center justify-between gap-2 rounded-t-md px-3.5 py-3 font-bold",
                {
                  "text-indigo-500 dark:text-indigo-400":
                    item.code === "add_elements",
                },
                {
                  "text-pink-500 dark:text-pink-400": item.code === "designs",
                },

                item === selectedTab
                  ? ""
                  : "text-zinc-500 hover:bg-zinc-200/75 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-slate-700 dark:hover:text-white"
              )}
            >
              <item.icon className={cn("size-5 stroke-2")} />
              {item.title}
              {item.id === selectedTab.id ? (
                <motion.div
                  className={cn(
                    "absolute right-0 -bottom-[1px] left-0 h-1 rounded-t-2xl",
                    {
                      "bg-indigo-500": item.code === "add_elements",
                    },
                    { "bg-pink-500": item.code === "designs" }
                  )}
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="flex grow flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.id : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 grow"
          >
            {selectedTab.code === "add_elements" ? (
              <AddFormElement />
            ) : selectedTab.code === "designs" ? (
              <FormElementPreview />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const tabs = [
  { id: 1, title: "Build", code: "add_elements", icon: Blocks },
  { id: 2, title: "Design", code: "designs", icon: Paintbrush },
];
