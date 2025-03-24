"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { MonitorSmartphone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export default function FormCreationPage() {
  const { isMobile } = useSidebar();
  const [previewView, setPreviewView] = React.useState("laptop");
  return (
    // <div>
    //   <form className="bg-white">
    //     <select>
    //       <option>address</option>
    //       <option>identity</option>
    //     </select>
    //   </form>

    //   display it in this type?

    //   <form className="bg-white dark:bg-black flex flex-col gap-2 p-4 rounded" action="" method="POST">
    //     <label className="flex flex-col gap-2"><span className="">full name</span>
    //       <input type="text" name="fullname" className="border border-black bg-white dark:bg-black rounded" />
    //     </label>
    //     <label className="flex flex-col gap-2"><span className="">email</span>
    //       <input type="email" name="email" className="border border-black bg-white dark:bg-black rounded" />
    //     </label>
    //     <label className="flex flex-col gap-2"><span className="">phone number</span>
    //       <input type="text" name="phoneno" className="border border-black bg-white dark:bg-black rounded" />
    //     </label>
    //   </form>
    //   <div>form creation page</div>
    // </div>
    <Card
      className={"justify-between bg-sidebar-accent w-full h-full relative"}
    >
      <CardHeader className="  ">edit option goes herer</CardHeader>
      <CardContent className="flex h-full justify-between items-center gap-4">
        <Card className="h-full w-fit">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"secondary"}
                  effect={"click"}
                  onClick={() => {
                    setPreviewView((e) =>
                      e === "laptop" ? "mobile" : "laptop"
                    );
                  }}
                >
                  <MonitorSmartphone />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toogle Preview Screen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Card>
        <div
          className=" w-full h-full
           overflow-auto flex items-center justify-center"
        >
          <div
            className={cn(
              "drop-shadow-lg shadow-lg border-2 border-slate-600 bg-rose-600 h-[calc(100dvh-350px)]  w-[calc((100dvh-350px)*16/9)] box-border overflow-auto",
              {
                "h-[calc(100dvh-350px)]  w-[calc((100dvh-350px)*9/16)]":
                  isMobile || previewView === "mobile",
              }
            )}
          >
            asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss <br />
            asdfdsfdsfsdfdfssss asdfdsfdsfsdfdfssss
            <br /> asdfdsfdsfsdfdfssss
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
        </div>
        <Card className="h-full w-fit">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"secondary"}
                  effect={"click"}
                  onClick={() => {
                    setPreviewView((e) =>
                      e === "laptop" ? "mobile" : "laptop"
                    );
                  }}
                >
                  <MonitorSmartphone />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toogle Preview Screen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Card>
      </CardContent>
      <CardFooter className=" sticky bottom-0">
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
