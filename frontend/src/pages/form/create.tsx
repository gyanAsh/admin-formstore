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
      const data = await res.json() as ApiFormData;

      try {
        updateForm(parseFormDataFromApi(data));
      } catch(err) {
        console.error("failed to parse form api data with error:", err);
      }
      return data;
    },
    refetchOnWindowFocus: false,
    queryKey: ["api-form-id"],
  });

  return (
    <>
      <main className="flex grow w-full flex-col items-center justify-center md:p-2 ">
        <Card className="flex w-full grow p-[0px_8px_8px_8px] h-[97.5dvh] overflow-y-auto border-sidebar-accent relative max-md:rounded-none">
          {/* top-navbar */}
          <section
            className={cn(
              "sticky top-0 z-10 flex max-sm:flex-col max-sm:gap-2.5 sm:items-center sm:justify-between p-2.5 w-full bg-inherit pt-3.5 sm:py-3.5",
            )}
          >
            <div className="flex items-center sm:justify-between space-x-3">
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
              <div className="flex flex-col h-full px-2 gap-4">
                <section className="flex items-end justify-between w-full">
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-zinc-500 dark:text-zinc-100/75">
                      Create Form
                    </h2>
                    <h2 className="text-3xl font-bold">
                      {formData?.form?.title || "Current Form"}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <SaveFormButton />
                    <PublishFormButton formId={parseInt(String(formId))} />
                  </div>
                </section>
                <FormTabs />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-red-600 font-bold text-4xl">Error</div>
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
    <div className="w-full grow h-full flex flex-col m-[1px]">
      <nav>
        <ul className="flex gap-0.5 border-b-[1.5px]">
          {tabs.map((item) => (
            <motion.li
              key={item.id}
              initial={false}
              onClick={() => setSelectedTab(item)}
              className={cn(
                "relative py-3 px-3.5 w-fit cursor-pointer font-bold",

                item === selectedTab ? "" : "text-muted-foreground",
              )}
            >
              {item.title}
              {item.id === selectedTab.id ? (
                <motion.div
                  className="absolute -bottom-[1px] left-0 right-0 h-1 rounded-t-2xl bg-primary"
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="flex flex-col grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.id : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grow mt-3"
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
  { id: 1, title: "Add Elements", code: "add_elements" },
  { id: 2, title: "Design Form", code: "designs" },
];
