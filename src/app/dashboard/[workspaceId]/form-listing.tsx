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

export const FormListing = () => {
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
  console.log({
    current_workspace,
    loading_current_workspace,
    fetched_current_workspace,
  });
  return (
    <Card className="h-full">
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
                  <Button variant="outline" size={"icon"} effect="click">
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
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">All Forms (Default)</SelectItem>
                  <SelectItem value="dark">Drafted Form</SelectItem>
                  <SelectItem value="system">Published Form</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
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
            asdfadsf
            <Button>
              asdfasdfffffffff
              <br />
              asdffffffff
            </Button>
            <Button>
              asdfasdfffffffff
              <br />
              asdffffffff
            </Button>
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
