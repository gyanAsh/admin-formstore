import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import {
  AlignLeft,
  ChevronDown,
  CircleCheck,
  CircleUser,
  FileText,
  Gauge,
  LayoutList,
  Link2,
  List,
  ListOrdered,
  Mail,
  MapPinned,
  PencilLine,
  Phone,
  Play,
  Plus,
  Scale,
  Sparkles,
  SquareCheck,
  Star,
  Table,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const AddFormElement = () => {
  const Elements = [
    {
      name: "Contact Info",
      color: "pink",
      items: [
        { title: "Contact Info", icon: CircleUser, isPremium: false },
        { title: "Email", icon: Mail, isPremium: false },
        { title: "Address", icon: MapPinned, isPremium: false },
        { title: "Phone", icon: Phone, isPremium: false },
        { title: "Website", icon: Link2, isPremium: false },
      ],
    },
    {
      name: "Choice",
      color: "blue",
      items: [
        { title: "Multiple Choice", icon: LayoutList, isPremium: false },
        { title: "Dropdown", icon: ChevronDown, isPremium: false },
        { title: "Yes/No", icon: CircleCheck, isPremium: false },
        { title: "Concent", icon: SquareCheck, isPremium: false },
        { title: "Checkbox", icon: Link2, isPremium: false },
      ],
    },
    {
      name: "Rating & Ranking",
      color: "green",
      items: [
        { title: "Net Promoter Score®", icon: Gauge, isPremium: false },
        { title: "Rating", icon: Star, isPremium: false },
        { title: "Ranking", icon: ListOrdered, isPremium: false },
        { title: "Matrix", icon: Table, isPremium: false },
      ],
    },
    {
      name: "Text & Video",
      color: "yellow",
      items: [
        { title: "Long Text", icon: FileText, isPremium: false },
        { title: "Short Text", icon: AlignLeft, isPremium: false },
        { title: "Video", icon: Play, isPremium: true },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="font-bold w-fit" effect={"small_scale"}>
            <Plus strokeWidth={3} /> Add Element
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[700px] lg:max-w-[950px] rounded-3xl bg-gray-200 dark:bg-inherit">
          <DialogHeader>
            <DialogTitle>Add Form Elements</DialogTitle>
            <DialogDescription className="leading-2">
              Select elements you wish to add in your form.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70dvh] bg-gray-100  dark:bg-slate-800/65 rounded-xl ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-6">
              {Elements.map((el) => (
                <div className="flex flex-col gap-1.5">
                  <h2 className="font-bold text-sm mb-2">{el.name}</h2>
                  {el.items.map((e) => (
                    <Button
                      variant={"ghost"}
                      effect={"small_scale"}
                      className={cn(
                        "relative flex justify-start items-center overflow-hidden not-hover:p-[4px] group hover:border !border-inherit/5 transition-all duration-95",
                        {
                          "hover:bg-gray-200/20 hover:dark:bg-gray-500/10":
                            true,
                        },
                        {
                          "hover:bg-blue-200/20 hover:dark:bg-blue-500/10":
                            el.color === "blue",
                        },

                        {
                          "hover:bg-green-200/20 hover:dark:bg-green-500/10":
                            el.color === "green",
                        },
                        {
                          "hover:bg-pink-200/20 hover:dark:bg-pink-500/10":
                            el.color === "pink",
                        }
                      )}
                    >
                      <div
                        className={cn(
                          "text-zinc-800d p-1 rounded-[7px] group-hover:border",
                          { "bg-gray-200/95 dark:bg-gray-500/45": true },
                          {
                            "bg-blue-200/95 dark:bg-blue-500/45":
                              el.color === "blue",
                          },

                          {
                            "bg-green-200/95 dark:bg-green-500/45":
                              el.color === "green",
                          },
                          {
                            "bg-pink-200/95 dark:bg-pink-500/45":
                              el.color === "pink",
                          }
                        )}
                      >
                        <e.icon />
                      </div>
                      <h2 className="text-zinc-600 dark:text-zinc-300">
                        {e.title}
                      </h2>

                      <Sparkles
                        className={cn(
                          "absolute right-2 text-yellow-400/80 dark:text-yellow-600 fill-yellow-400/25 dark:fill-yellow-400/45",
                          { hidden: !e?.isPremium }
                        )}
                      />
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Card>asdfasdfasdfasdfadsf</Card>
    </div>
  );
};
