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
    <main className="flex grow w-full flex-col items-center justify-center md:p-2 ">
      <Card className="flex w-full grow p-[0px_8px_8px_8px] h-[97.5dvh] overflow-y-auto border-sidebar-accent relative max-md:rounded-none">
        {/* top-navbar */}
        <section
          className={cn(
            "sticky top-0 z-10 flex max-sm:flex-col max-sm:gap-2.5 sm:items-center sm:justify-between p-2.5 w-full bg-inherit pt-3.5 sm:py-3.5"
          )}
        >
          <div className="flex items-center sm:justify-between space-x-3">
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
          {false && "form_isLoading" ? (
            <section className="flex flex-col gap-3 m-4">
              <Skeleton className="w-[120px] h-[40px]" />
              <Skeleton className="w-full h-[55px]" />
              <Skeleton className="w-full h-[55px]" />
            </section>
          ) : true && "form_hasError" ? (
            <div className="flex flex-col h-full px-2 gap-4">
              <section className="flex max-sm:flex-col min-sm:items-end gap-2 justify-between w-full">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-zinc-500 dark:text-zinc-100/75">
                    Analytics
                  </h2>
                  <h2 className="text-3xl font-bold">{"Current Form Name"}</h2>
                </div>
                {/* <div className="flex max-sm:justify-end gap-2 h-9">s</div> */}
              </section>
              <AnalysisTabs />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-red-600 font-bold text-4xl">Error</div>
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
            className="grow mt-3"
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
