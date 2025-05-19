import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router";
import BreadCrumbs from "@/components/bread-crumbs";
import ModeToggle from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/utils";
import UpgradeFormstore from "@/components/upgrade-premium";
import { SidebarTriggerButton } from "../workspace";
import PublishFormButton from "@/components/layout/dashboard/PubishFormButton";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
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
              <div className="flex flex-col h-full px-2 gap-4">
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
                {/* Add Elements tab1 | Template tab2 | {`preview -> (link)`}
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3">
                  Form Elements Lisitng
                </div> */}
                <SharedLayoutAnimation />
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

function SharedLayoutAnimation() {
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
                "relative py-3 px-2 w-fit cursor-pointer font-bold",

                item === selectedTab ? "" : "text-muted-foreground"
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
            className="grow"
          >
            {selectedTab ? selectedTab.title : "😋"}d asdfasd asdfa sdfa sfasd
            fasd a sdfa a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
            a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf a sdfa sdf
            asdf asd fasd fasdf asdf asdf asdf asdf asdf a sdfa sdf asdf asd
            fasd fasdf asdf asdf asdf asdf asdf a sdfa sdf asdf asd fasd fasdf
            asdf asdf asdf asdf asdf
            <br /> a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
            <br /> a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
            <br /> a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
            <br /> a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
            <br /> a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
            <br /> a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
            <br /> a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
            <br /> a sdfa sdf asdf asd fasd fasdf asdf asdf asdf asdf asdf
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const allIngredients = [
  { icon: "🍅", label: "Tomato" },
  { icon: "🥬", label: "Lettuce" },
  { icon: "🧀", label: "Cheese" },
  { icon: "🥕", label: "Carrot" },
  { icon: "🍌", label: "Banana" },
  { icon: "🫐", label: "Blueberries" },
  { icon: "🥂", label: "Champers?" },
];

const tabs = [
  { id: 1, title: "Add Elements" },
  { id: 2, title: "Templates" },
  { id: 3, title: "Preview" },
];
