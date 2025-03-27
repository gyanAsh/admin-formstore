"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MonitorSmartphone, Plus } from "lucide-react";

import React from "react";
import { PageFormContainer } from "./form-component";

export default function FormCreationPage() {
  const [cards, setCards] = React.useState([{ id: 1, element: null }]);
  const [currentCard, setCurrentCard] = React.useState(0);
  console.log({ cards });
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
              "drop-shadow-lg shadow-lg border border-slate-600 w-full max-w-[calc((100dvh-350px)*16/9)] aspect-video mx-6 transform origin-left",
              {
                "max-md:h-full  max-md:aspect-[9/16] max-md:w-fit max-md:min-w-fit":
                  false,
              }, // for mobile view
              "box-border overflow-auto"
            )}
          >
            <PageFormContainer
              card={cards?.at(currentCard)}
              updateCards={setCards}
            />
          </div>
        </div>
      </div>
      <CardFooter className="sticky bottom-0 left-0">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex space-x-4 p-4 overflow-hidden">
            {cards.map((_, index) => (
              <Card
                key={index}
                className="flex items-center justify-center h-[64px] w-[86px] rounded-md"
                onClick={() => {
                  setCurrentCard(index);
                }}
              >
                {index + 1}
                {_?.element}
              </Card>
            ))}
            <Card
              className="flex items-center justify-center h-[64px] w-[86px] rounded-md"
              onClick={() => {
                setCards((e) => {
                  setCurrentCard(e.length);
                  return [...e, { id: e.length + 1, element: null }];
                });
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
