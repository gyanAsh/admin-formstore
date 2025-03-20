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
  if (fetched_current_workspace)
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Your Forms</CardTitle>
          <CardDescription>Your</CardDescription>
        </CardHeader>
        <CardContent>asdfadsf</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
};
