"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MonitorSmartphone, Plus } from "lucide-react";
import { useStore } from "@nanostores/react";

import React from "react";
import { PageFormContainer } from "./form-component";
import { $cardsStore, createNewCard, selectCard } from "@/store/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { client } from "@/lib/client";

export default function FormCreationPage() {
  const cards = useStore($cardsStore);
  const { formId } = useParams();

  const {
    isPending: subformListIsLoading,
    error: subformListError,
    data: subformList,
  } = useQuery({
    queryKey: ["subform-list"],
    queryFn: async () => {
      const res = await client.subform.list.$get({ formId: parseInt(formId) });
      const data = await res.json();
      return data;
    },
  });

  const subformMutation = useMutation({
    mutationFn: async (sequence: number) => {
      const res = await client.subform.create.$post({
        formId: parseInt(formId),
        sequenceNumber: sequence,
        elementType: "",
      });
      return await res.json();
    },
    mutationKey: ["subform-create"],
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <Card
      className={
        "justify-between bg-sidebar-accent w-full max-h-[calc(100dvh_-_86px)] relative gap-3"
      }
    >
      <CardHeader className="flex flex-row items-center sticky top-0 left-0 z-10">
        edit option goes herer
        <Button onClick={() => console.log("preview")}>
          <MonitorSmartphone />
        </Button>
      </CardHeader>
      <div className=" overflow-auto">
        <div className="box-border flex h-full justify-center items-start">
          <div
            className={cn(
              "drop-shadow-lg shadow-lg border border-slate-600 w-full max-w-[calc((100dvh-350px)*16/9)] aspect-video mx-6 ",
              {
                "max-md:h-full  max-md:aspect-[9/16] max-md:w-fit max-md:min-w-fit":
                  false,
              }, // for mobile view
              "box-border overflow-auto",
            )}
          >
            <PageFormContainer />
          </div>
        </div>
      </div>
      <CardFooter className="sticky bottom-0 left-0">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex space-x-4 p-4 overflow-hidden">
            {!subformListIsLoading &&
              subformList.map((form, index) => (
                <Card
                  key={index}
                  className="flex items-center justify-center h-[64px] w-[86px] rounded-md"
                  onClick={() => {
                    selectCard(form.id);
                  }}
                >
                  {index + 1}
                  {form?.elementType}
                </Card>
              ))}
            <Card
              className="flex items-center justify-center h-[64px] w-[86px] rounded-md"
              onClick={() => {
                if (!subformListIsLoading) {
                  subformMutation.mutate(subformList.length + 1);
                  createNewCard();
                }
              }}
            >
              <Plus />
            </Card>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardFooter>
    </Card>
  );
}
