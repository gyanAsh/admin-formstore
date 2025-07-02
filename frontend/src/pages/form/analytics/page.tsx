import { SidebarTriggerButton } from "@/pages/workspace/index";
import ModeToggle from "@/components/theme-toggle";
import UpgradeFormstore from "@/components/upgrade-premium";
import BreadCrumbs from "@/components/bread-crumbs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useParams } from "react-router";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
  ColumnResizer,
  Group,
  type SortDescriptor,
  type ColumnProps,
  type RowProps,
  type CellProps,
  ResizableTableContainer,
} from "react-aria-components"; // Assuming these are from react-aria-components
import { ArrowUpIcon, UnfoldHorizontal } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Stock, stocks } from "./data";
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
        <section className="grow flex flex-col gap-2">
          <div>
            <h1 className="text-xl font-bold">
              Survey of tool and technologies used in the working on small
              organizations
            </h1>
            <div>Jan 20th 2025</div>
            <div>total sumbission count: 1245</div>
          </div>
          <Button className=" w-fit bg-primary px-4 py-1 dark:text-white font-bold uppercase">
            download csv
          </Button>

          <StockTableExample />
        </section>
      </Card>
    </main>
  );
}

function StockTableExample() {
  let [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "symbol",
    direction: "ascending",
  });

  // Type the `stocks` array based on the `Stock` interface
  let sortedItems = useMemo<Stock[]>(() => {
    // Ensure `stocks` is typed as `Stock[]` if not already.
    // The `sort` method is safe to use with `localeCompare` for string comparisons.
    return [...stocks].sort((a, b) => {
      // Create a shallow copy to avoid mutating the original array
      let first = a[sortDescriptor.column as keyof Stock]; // Assert the column as a key of Stock
      let second = b[sortDescriptor.column as keyof Stock]; // Assert the column as a key of Stock

      // Handle potential non-string types if your data allows.
      // For now, assuming all sortable columns are strings or can be stringified for localeCompare.
      let cmp = String(first).localeCompare(String(second));

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }
      return cmp;
    });
  }, [sortDescriptor]);
  const { open: desktopOpen, isMobile } = useSidebar();
  let open = desktopOpen && !isMobile;

  return (
    <ResizableTableContainer
      className={cn(
        "max-h-[calc(100dvh_-_116px)]  border h-full w-full overflow-auto scroll-pt-[2.321rem] relative bg-white dark:bg-slate-900 rounded-lg shadow-sm text-gray-600 dark:text-gray-50",
        { "w-[calc(100dvw_-_290px)]": open }
      )}
    >
      <Table
        aria-label="Stocks"
        selectionMode="multiple"
        selectionBehavior="replace"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        className="border-separate border-spacing-0"
      >
        <TableHeader>
          <StockColumn id="symbol" allowsSorting>
            Symbol
          </StockColumn>
          <StockColumn id="name" isRowHeader allowsSorting defaultWidth="2fr">
            Name
          </StockColumn>
          <StockColumn id="marketCap" allowsSorting>
            Market Cap
          </StockColumn>
          <StockColumn id="sector" allowsSorting>
            Sector
          </StockColumn>
          <StockColumn id="industry" allowsSorting defaultWidth="2fr">
            Industry
          </StockColumn>
        </TableHeader>
        <TableBody items={sortedItems}>
          {(
            item: Stock // Explicitly type `item` as Stock
          ) => (
            <StockRow>
              <StockCell>
                <span className="font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-sm px-1 group-selected:bg-slate-700 group-selected:border-slate-800">
                  ${item.symbol}
                </span>
              </StockCell>
              <StockCell className="font-semibold">{item.name}</StockCell>
              <StockCell>{item.marketCap}</StockCell>
              <StockCell>{item.sector}</StockCell>
              <StockCell>{item.industry}</StockCell>
            </StockRow>
          )}
        </TableBody>
      </Table>
    </ResizableTableContainer>
  );
}

// Ensure ColumnProps is imported from 'react-aria-components'
function StockColumn(props: ColumnProps & { children: React.ReactNode }) {
  return (
    <Column
      {...props}
      className="sticky top-0 p-0 border-b border-slate-300 bg-slate-200 dark:bg-slate-900 font-bold text-left cursor-default first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap outline-hidden"
    >
      {({ allowsSorting, sortDirection }) => (
        <div className="flex items-center pl-4 py-1">
          <Group
            role="presentation"
            tabIndex={-1}
            className="flex flex-1 items-center overflow-hidden outline-hidden rounded-sm focus-visible:ring-2 ring-slate-600"
          >
            <span className="flex-1 truncate">{props.children}</span>
            {allowsSorting && (
              <span
                className={`ml-1 w-4 h-4 flex items-center justify-center transition ${
                  sortDirection === "descending" ? "rotate-180" : ""
                }`}
              >
                {sortDirection && <ArrowUpIcon width={8} height={10} />}
              </span>
            )}
          </Group>
          <ColumnResizer className="cursor-col-resize resizing:bg-slate-800 resizing:w-[2px] resizing:pl-[7px] grid">
            <UnfoldHorizontal className="size-4" />
          </ColumnResizer>
        </div>
      )}
    </Column>
  );
}

// Ensure RowProps is imported from 'react-aria-components'
function StockRow(props: RowProps<Stock>) {
  // Type the RowProps with your Stock interface
  return (
    <Row
      {...props}
      className="even:bg-slate-100 divide-x border-b even:dark:bg-slate-800 selected:bg-slate-600 selected:text-white cursor-default group outline-hidden focus-visible:outline-2 focus-visible:outline-slate-600 focus-visible:-outline-offset-4 selected:focus-visible:outline-white"
    />
  );
}

// Ensure CellProps is imported from 'react-aria-components'
function StockCell(props: CellProps) {
  return (
    <Cell
      {...props}
      className={`px-4 py-2 truncate ${
        props.className || ""
      } focus-visible:outline-2 focus-visible:outline-slate-600 focus-visible:-outline-offset-4 group-selected:focus-visible:outline-white`}
    />
  );
}
