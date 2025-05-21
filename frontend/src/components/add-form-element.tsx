import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import {
  ChevronDown,
  CircleCheck,
  CircleUser,
  Gauge,
  LayoutList,
  Link2,
  List,
  ListOrdered,
  Mail,
  MapPinned,
  Phone,
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

export const AddFormElement = () => {
  const Elements = [
    {
      name: "Contact Info",
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
      items: [
        { title: "Net Promoter Score®", icon: Gauge },
        { title: "Rating", icon: Star },
        { title: "Ranking", icon: ListOrdered },
        { title: "Matrix", icon: Table },
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
                      className="flex justify-start items-center p-1 overflow-hidden"
                    >
                      <div className="bg-blue-200/95 dark:bg-blue-500/45 text-zinc-800d p-1 rounded-[7px]">
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
