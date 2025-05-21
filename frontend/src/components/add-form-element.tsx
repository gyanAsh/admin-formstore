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

export const AddFormElement = () => {
  const Elements = [
    {
      name: "Contact Info",
      color: "pink",
      items: [
        { title: "Contact Info", icon: CircleUser },
        { title: "Email", icon: Mail },
        { title: "Address", icon: MapPinned },
        { title: "Phone", icon: Phone },
        { title: "Website", icon: Link2 },
      ],
    },
    {
      name: "Choice",
      color: "blue",
      items: [
        { title: "Multiple Choice", icon: LayoutList },
        { title: "Dropdown", icon: ChevronDown },
        { title: "Yes/No", icon: CircleCheck },
        { title: "Concent", icon: SquareCheck },
        { title: "Checkbox", icon: Link2 },
      ],
    },
    {
      name: "Rating & Ranking",
      color: "green",
      items: [
        { title: "Net Promoter Score®", icon: Gauge },
        { title: "Rating", icon: Star },
        { title: "Ranking", icon: ListOrdered },
        { title: "Matrix", icon: Table },
      ],
    },
    {
      name: "Text & Video",
      color: "yellow",
      items: [
        { title: "Long Text", icon: FileText },
        { title: "Short Text", icon: AlignLeft },
        { title: "Video", icon: Play },
      ],
    },
  ];

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="font-bold" effect={"small_scale"}>
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
                        "flex justify-start items-center p-1 overflow-hidden not-hover:p-[1px] group hover:border !border-inherit/5 transition-all duration-95",
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
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
