import { SidebarTriggerButton } from "@/pages/workspace/index";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/theme-toggle";
import UpgradeFormstore from "@/components/upgrade-premium";
import BreadCrumbs from "@/components/bread-crumbs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

function SubmissionTable() {
  return (
    <div className="p-4">
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>user reference id</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jan 21th 2025</td>
            <td>asteusatoeusatoesut</td>
            <td>rob@pikemail.com</td>
          </tr>
          <tr>
            <td>Jan 21th 2025</td>
            <td>saeustesoatseaos</td>
            <td>bob@littlemail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function AnalyticsPage() {
  const parmas = useParams();

  const formId = parseInt(String(parmas.formId));
  const workspaceId = parseInt(String(parmas.workspaceId));

  const form = {
    title: "form title"
  };
  const workspace = {
    name: "workspace name"
  };
  return (
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
              currentPage={form.title || `Form: ID${formId}`}
              otherPageLinks={[
                {
                  name: "Dashboard",
                  path: "/dashboard",
                },
                {
                  name:
                    workspace.name || `Workspace: ID${workspaceId}`,
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
          <section className="flex flex-col gap-3 m-4">
            <Skeleton className="w-[120px] h-[40px]" />
            <Skeleton className="w-full h-[55px]" />
            <Skeleton className="w-full h-[55px]" />
          </section>
          <div>
            <div>
              <h1 className="text-xl font-bold">
                Survey of tool and technologies used in the working on small
                organizations
              </h1>
              <div>Jan 20th 2025</div>
              <div>total sumbission count: 1245</div>
            </div>
            <Button className="bg-primary px-4 py-1 dark:text-white font-bold uppercase">
              download csv
            </Button>

            <SubmissionTable />

            <Button className="bg-red-400 px-4 py-1 dark:text-white font-bold uppercase">
              close
            </Button>
          </div>
        </section>
      </Card>
    </main>
  );
}
