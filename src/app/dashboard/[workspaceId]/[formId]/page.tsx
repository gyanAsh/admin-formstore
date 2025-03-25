"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Minus, MonitorSmartphone, Plus, RotateCw } from "lucide-react";

import React from "react";

export default function FormCreationPage() {
  const { isMobile } = useSidebar();
  const [previewView, setPreviewView] = React.useState("laptop");
  const [zoom, setZoom] = React.useState(1);

  return (
    <Card
      className={
        "justify-between bg-sidebar-accent w-full max-h-[calc(100dvh_-_86px)] relative gap-3"
      }
    >
      <CardHeader className="flex flex-row items-center sticky top-0 left-0 z-10">
        edit option goes herer
        <Button
          onClick={() =>
            setPreviewView((e) => (e === "laptop" ? "mobile" : "laptop"))
          }
        >
          <MonitorSmartphone />
        </Button>
        <Button
          onClick={() =>
            setZoom((e) =>
              Math.min(e * 1.1, isMobile || previewView === "mobile" ? 5 : 1.5)
            )
          }
        >
          <Plus />
        </Button>
        <Button onClick={() => setZoom((e) => Math.max(e / 1.1, 0.8))}>
          <Minus />
        </Button>
        <Button onClick={() => setZoom(1)}>
          <RotateCw />
        </Button>
      </CardHeader>
      <div className=" overflow-auto">
        <div className="flex h-full justify-center items-start">
          <ScrollArea
            className={cn(
              "drop-shadow-lg shadow-lg border-2 border-slate-600 bg-rose-600 h-[calc(100dvh-350px)]  w-[calc((100dvh-350px)*16/9)]",
              "box-border overflow-auto",
              {
                "h-[calc(100dvh-350px)]  w-[calc((100dvh-350px)*9/16)]":
                  isMobile || previewView === "mobile",
              }
            )}
            style={{
              zoom: zoom,
            }}
          >
            fasdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            ddddddddddddddddddd
            <br /> ddddddddddddlllllllllll lllllllllllll lllllllllllllllllll
            <br /> asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
            ddddddddddddddddddd
            <br /> ddddddddddddlllllllllll lllllllllllll lllllllllllllllllll
            <ScrollBar />
          </ScrollArea>
        </div>
        {/* <ScrollBar orientation="vertical" /> */}
      </div>
      <CardFooter className="sticky bottom-0 left-0">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex space-x-4 p-4 overflow-hidden">
            {Array.from({ length: 25 }).map((_, index) => (
              <Card
                key={index}
                className="flex items-center justify-center h-[64px] w-[86px] rounded-md"
              >
                {index + 1}
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardFooter>
    </Card>
  );
}
