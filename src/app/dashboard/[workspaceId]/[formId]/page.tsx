"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Minus, MonitorSmartphone, Plus, RotateCw } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import React from "react";

export default function FormCreationPage() {
  const [previewView, setPreviewView] = React.useState("laptop");
  return (
    <Card
      className={
        "justify-between bg-sidebar-accent w-full max-h-[calc(100dvh_-_86px)] relative gap-3"
      }
    >
      <TransformWrapper
        initialScale={1}
        centerOnInit
        centerZoomedOut
        initialPositionX={100}
        initialPositionY={50}
        minScale={0.7}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <CardHeader className="flex flex-row items-center sticky top-0 left-0 z-10">
              edit option goes herer
              <Button
                onClick={() =>
                  setPreviewView((e) => (e === "laptop" ? "mobile" : "laptop"))
                }
              >
                <MonitorSmartphone />
              </Button>
              <Button onClick={() => zoomIn()}>
                <Plus />
              </Button>
              <Button onClick={() => zoomOut()}>
                <Minus />
              </Button>
              <Button onClick={() => resetTransform()}>
                <RotateCw />
              </Button>
            </CardHeader>
            <TransformComponent wrapperClass="flex !h-full !w-full">
              <div
                className={cn(
                  "drop-shadow-lg shadow-lg border border-slate-600   h-[calc(100dvh-350px)]  w-[calc((100dvh-350px)*16/9)]",
                  "box-border overflow-hidden",
                  {
                    "h-[calc(100dvh-350px)]  w-[calc((100dvh-350px)*9/16)]":
                      previewView === "mobile",
                  }
                )}
              >
                fasdfdsfdsfsdfdfssss <br />
                asdfdsfdsfsdfdfssss <br />
                asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss
                <br /> asdfdsfdsfsdfdfssss
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                <div>asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd</div>
                asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
                asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
                asdfdsfdsfsdfdfssss dsssdsdsdddddddddddddd <br />
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
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>

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
