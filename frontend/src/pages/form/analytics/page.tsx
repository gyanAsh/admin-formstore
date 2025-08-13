import { SidebarTriggerButton } from "@/pages/workspace/index";
import ModeToggle from "@/components/theme-toggle";
import UpgradeFormstore from "@/components/upgrade-premium";
import BreadCrumbs from "@/components/bread-crumbs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useParams } from "react-router";
import * as motion from "motion/react-client";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { OverviewAnalysis } from "./overview-analysis";
import { SubmissionsAnalysis } from "./submissions-analysis";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  const parmas = useParams();

  const formId = parseInt(String(parmas.formId));
  const workspaceId = parseInt(String(parmas.workspaceId));

  const form = {
    title: "form title",
  };
  const workspace = {
    name: "workspace name",
  };
  return (
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
              currentPage={form.title || `Form: ID${formId}`}
              otherPageLinks={[
                {
                  name: "Dashboard",
                  path: "/dashboard",
                },
                {
                  name: workspace.name || `Workspace: ID${workspaceId}`,
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
          {false && "form_isLoading" ? (
            <section className="m-4 flex flex-col gap-3">
              <Skeleton className="h-[40px] w-[120px]" />
              <Skeleton className="h-[55px] w-full" />
              <Skeleton className="h-[55px] w-full" />
            </section>
          ) : true && "form_hasError" ? (
            <div className="flex h-full flex-col gap-4 px-2">
              <section className="flex w-full justify-between gap-2 max-sm:flex-col min-sm:items-end">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-zinc-500 dark:text-zinc-100/75">
                    Analytics
                  </h2>
                  <h2 className="text-3xl font-bold">{"Current Form Name"}</h2>
                </div>
                <div className="flex h-9 gap-2 max-sm:justify-end">
                  <Button effect={"scale"}>Download CSV</Button>
                </div>
              </section>
              <section>
                <div className="flex content-center items-center gap-2 p-2">
                  URL:
                  <span className="border p-2">
                    https://forms.the-formstore.com/form/cf2dd4d7-5ee3-4aef-af9a-69e4666683c6
                  </span>
                  <Button
                    onClick={() => {
                      // async function
                      navigator.clipboard.writeText(
                        "https://forms.the-formstore.com/form/cf2dd4d7-5ee3-4aef-af9a-69e4666683c6"
                      );
                      console.log(
                        "text copied - https://forms.the-formstore.com/form/cf2dd4d7-5ee3-4aef-af9a-69e4666683c6"
                      );
                    }}
                  >
                    copy
                  </Button>
                </div>
              </section>
              <AnalysisTabs />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="text-4xl font-bold text-red-600">Error</div>
              <div>
                Something went wrong while fetching your forms. Please try again
                later
              </div>
            </div>
          )}
        </section>
      </Card>
    </main>
  );
}

function AnalysisTabs() {
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
                "relative w-fit cursor-pointer px-3.5 py-3 font-bold",

                item === selectedTab ? "" : "text-muted-foreground"
              )}
            >
              {item.title}
              {item.id === selectedTab.id ? (
                <motion.div
                  className="bg-primary absolute right-0 -bottom-[1px] left-0 h-1 rounded-t-2xl"
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
            {selectedTab.code === "overview" ? (
              <OverviewAnalysis />
            ) : selectedTab.code === "submissions" ? (
              <SubmissionsAnalysis />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const tabs = [
  // { id: 1, title: "Overview", code: "overview" },
  { id: 2, title: "Submissions", code: "submissions" },
];
