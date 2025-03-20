"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

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
          <CardHeader>
            <CardTitle>Your Forms</CardTitle>
            {/* <CardDescription>Your</CardDescription> */}
          </CardHeader>
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
