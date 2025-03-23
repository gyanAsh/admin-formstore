"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useParams } from "next/navigation";

export const FormListing = () => {
  const { workspaceId } = useParams();
  const {
    data: current_workspace,
    isPending: loading_current_workspace,
    isSuccess: fetched_current_workspace,
  } = useQuery({
    queryKey: ["get-current-workspace"],
    queryFn: async () => {
      const res = await client.workspace.current.$get();
      return await res.json();
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: forms,
    isPending: loading_forms,
    isSuccess: fetched_forms,
  } = useQuery({
    queryKey: ["get-forms"],
    queryFn: async () => {
      const workspace_id = parseInt(workspaceId as string);
      if (!isNaN(workspace_id)) {
        console.log(workspace_id);
        const res = await client.form.list.$get({workspace_id: workspace_id});
        return await res.json();
      }
    },
    refetchOnWindowFocus: false,
  });
  console.log({
    current_workspace,
    loading_current_workspace,
    fetched_current_workspace,
  });
  const parentRef = React.useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: 25,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });
  console.log({ rowVirtualizer });
  return (
    <Card className="h-full gap-3">
      {loading_current_workspace ? (
        <section className="flex flex-col gap-3 m-4">
          <Skeleton className="w-[120px] h-[40px]" />
          <Skeleton className="w-full h-[55px]" />
          <Skeleton className="w-full h-[55px]" />
        </section>
      ) : fetched_current_workspace ? (
        <>
          <section className="flex justify-between w-full">
            <div className="flex items-center gap-1">
              <CardHeader>
                <CardTitle>
                  {current_workspace.currentWorkspace.at(0)?.workspace.name}
                </CardTitle>
                <CardDescription>
                  {
                    current_workspace.currentWorkspace.at(0)?.workspace
                      .description
                  }
                </CardDescription>
              </CardHeader>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size={"icon"}
                    effect="click"
                    className="size-6.5"
                  >
                    <Ellipsis strokeWidth={3} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="flex flex-col w-[200px] gap-1.5"
                  sideOffset={5}
                >
                  <Button>Rename</Button>
                  <Button>Leave</Button>
                  <Button variant={"destructive"}>Leave</Button>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2 mx-6">
              <Select>
                <SelectTrigger className="w-[95px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">All Forms (Default)</SelectItem>
                  <SelectItem value="dark">Drafted Form</SelectItem>
                  <SelectItem value="system">Published Form</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[95px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Last Updated (Default)</SelectItem>
                  <SelectItem value="dark">Date created</SelectItem>
                  <SelectItem value="system">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
          <CardContent className="flex flex-col gap-2">
            {/* The scrollable element for your list */}
            <div className="grid grid-cols-5 gap-4 text-start">
              <div>ID</div>
              <div>Title</div>
              <div>Status</div>
              <div>Response</div>
              <div>Updated</div>
            </div>
            <div
              ref={parentRef}
              style={{
                height: `calc(100dvh - 180px)`,
                overflow: "auto", // Make it scroll!
              }}
            >
              {/* The large inner element to hold all of the items */}
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                {forms?.forms.map((form) => (
                  <Button
                    key={form.id}
                    style={{
                      width: "100%",
                      height: `35px`,
                    }}
                    variant={"violet_secondary"}
                    className="grid grid-cols-5 gap-4 text-start border-b-2 active:scale-[0.998] active:translate-y-[3px]"
                  >
                    <div>ID{form.id}</div>
                    <div>Form {form.title}</div>
                    <div>{form.status}</div>
                    <div>{0}</div>
                    <div>{form.createdAt.toString()}</div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </>
      ) : (
        <CardHeader>
          <CardTitle className="text-red-600">Error</CardTitle>
          <CardDescription>
            Something went wrong while fetching your forms. Please try again
            later
          </CardDescription>
        </CardHeader>
      )}
    </Card>
  );
};
