import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { useSortable } from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  AlignLeft,
  ChevronDown,
  Circle,
  CircleCheck,
  CircleUser,
  FileText,
  Gauge,
  GripVertical,
  LayoutList,
  Link2,
  ListOrdered,
  Mail,
  MapPinned,
  MoreHorizontal,
  Phone,
  Play,
  Plus,
  Sparkles,
  SquareCheck,
  Star,
  Table,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { cn, generateMicroId, getDefaultLabelTitle } from "@/lib/utils";
import { Card } from "./ui/card";
import {
  $all_forms,
  addFormElement,
  removeFormElement,
  setFormElements,
} from "@/store/forms/form-elements";
import { useParams } from "react-router";
import { FormElements, FormFields } from "@/store/forms/form-elemets.types";
import { useStore } from "@nanostores/react";
import { Badge } from "./ui/badge";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export const AddFormElement = () => {
  const { formId } = useParams();
  const Elements = [
    {
      name: "Contact Info",
      color: "pink",
      items: [
        { title: "Contact Info", icon: CircleUser, isPremium: false },
        {
          title: "Email",
          value: FormFields.email,
          icon: Mail,
          isPremium: true,
        },
        { title: "Address", icon: MapPinned, isPremium: false },
        { title: "Phone", icon: Phone, isPremium: false },
        {
          title: "Website",
          value: FormFields.url,
          icon: Link2,
          isPremium: true,
        },
      ],
    },
    {
      name: "Choice",
      color: "blue",
      items: [
        { title: "Multiple Choice", icon: LayoutList, isPremium: false },
        { title: "Dropdown", icon: ChevronDown, isPremium: false },
        { title: "Yes/No", icon: CircleCheck, isPremium: false },
        {
          title: "Concent",
          value: FormFields.consent,
          icon: SquareCheck,
          isPremium: true,
        },
        { title: "Checkbox", icon: Link2, isPremium: false },
      ],
    },
    {
      name: "Rating & Ranking",
      color: "green",
      items: [
        { title: "Net Promoter Score®", icon: Gauge, isPremium: false },
        { title: "Rating", icon: Star, isPremium: false },
        {
          title: "Ranking",
          value: FormFields.ranking,
          icon: ListOrdered,
          isPremium: true,
        },
        { title: "Matrix", icon: Table, isPremium: false },
      ],
    },
    {
      name: "Text & Video",
      color: "yellow",
      items: [
        { title: "Long Text", icon: FileText, isPremium: false },
        {
          title: "Short Text",
          value: FormFields.text,
          icon: AlignLeft,
          isPremium: true,
        },
        { title: "Video", icon: Play, isPremium: true },
      ],
    },
  ];

  const elementClick = ({
    item,
    iconColor,
  }: {
    item: any;
    iconColor: string;
  }) => {
    let value = item?.value || "";

    if (value.length < 1) {
      console.warn({
        type_of_element: typeof value,
        form_id: formId,
        element: value,
      });
      return;
    }
    let element: FormElements = {
      id: generateMicroId(6),
      field: value,
      badge: { value: value, color: iconColor },

      labels: {
        title: getDefaultLabelTitle(value),
        description: "",
      },
      required: false,
    };

    if (formId) addFormElement(formId, element);
  };

  return (
    <div className="flex flex-col gap-3.5">
      <section className="my-2.5">
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
                  <div key={el.name} className="flex flex-col gap-1.5">
                    <h2 className="font-bold text-sm mb-2">{el.name}</h2>
                    {el.items.map((e) => (
                      <Button
                        key={e.title}
                        variant={"ghost"}
                        effect={"small_scale"}
                        value={e?.value || ""}
                        onClick={() =>
                          elementClick({ item: e, iconColor: el.color })
                        }
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
                          },
                          {
                            "hover:bg-yellow-200/20 hover:dark:bg-yellow-500/10":
                              el.color === "yellow",
                          },
                          {
                            "bg-gray-300/30 dark:bg-gray-500/10":
                              !!e?.isPremium,
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
                            },
                            {
                              "bg-yellow-200/95 dark:bg-yellow-500/45":
                                el.color === "yellow",
                            },
                            {
                              " opacity-65 ": !!e?.isPremium,
                            }
                          )}
                        >
                          <e.icon />
                        </div>
                        <h2
                          className={cn("text-zinc-600 dark:text-zinc-300", {
                            " opacity-65 ": !!e?.isPremium,
                          })}
                        >
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
      </section>
      <DndKitContainer />
    </div>
  );
};

const DndElementItem = ({ id, order, children, className }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="flex flex-row items-center gap-4 p-4 border border-gray-300 dark:border-gray-500 mb-1 bg-zinc-50 dark:bg-slate-900/55 "
    >
      {/* Drag Handle */}
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className={cn(
          "cursor-grab active:cursor-grabbing p-1 bg-muted-foreground/15 rounded-md text-muted-foreground",
          "flex items-center gap-1 text-sm px-2"
        )}
      >
        <p className="text-secondary-foreground">{order}</p>
        <GripVertical className="size-3" strokeWidth={2} />
      </div>

      {/* Content */}
      <div className={cn("grow", className)}>{children}</div>
    </Card>
  );
};

const DndKitContainer = () => {
  const { formId } = useParams();
  const [grabbing, setGrabbing] = useState(false);
  const allForms = useStore($all_forms);
  let elements = allForms.find((e) => e.id === formId)?.elements || [];

  console.log({ allForms, el: elements });
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    setGrabbing(false);

    if (active.id !== over.id) {
      const oldIndex = elements.findIndex((item) => item.id === active.id);
      const newIndex = elements.findIndex((item) => item.id === over.id);
      let allElements = arrayMove(elements, oldIndex, newIndex);
      if (formId) setFormElements(formId, allElements);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={() => setGrabbing(true)}
      onDragEnd={handleDragEnd}
    >
      <AnimatePresence>
        <SortableContext
          items={elements.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {elements.map((item, idx) => (
            <motion.div
              key={item.id}
              layout={!grabbing}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DndElementItem
                order={idx + 1}
                id={item.id}
                className={"flex items-center justify-between"}
              >
                <div className="flex items-center gap-4 font-semibold tracking-[-0.007em] text-base">
                  {item.labels.title}
                </div>
                <section className="flex gap-2.5">
                  <Badge
                    variant={"outline"}
                    className={cn(
                      "capitalize font-normal cursor-default",
                      "rounded-xl gap-1 px-1 pr-2 border border-zinc-900/20 dark:border-zinc-100/30 text-zinc-700 dark:text-zinc-100",
                      {
                        " bg-pink-100 dark:bg-pink-500/15 ":
                          item.badge?.color === "pink",
                      },
                      {
                        " bg-blue-100 dark:bg-blue-500/15 ":
                          item.badge?.color === "blue",
                      },
                      {
                        " bg-green-100 dark:bg-green-500/15 ":
                          item.badge?.color === "green",
                      },
                      {
                        " bg-yellow-100 dark:bg-yellow-500/15 ":
                          item.badge?.color === "yellow",
                      }
                    )}
                  >
                    <Circle
                      className={cn(
                        "size-3 z-1",
                        {
                          "fill-pink-400 dark:fill-pink-500":
                            item.badge?.color === "pink",
                        },
                        {
                          "fill-blue-400 dark:fill-blue-500":
                            item.badge?.color === "blue",
                        },
                        {
                          "fill-green-400 dark:fill-green-500":
                            item.badge?.color === "green",
                        },
                        {
                          "fill-yellow-400 dark:fill-yellow-500":
                            item.badge?.color === "yellow",
                        }
                      )}
                      strokeWidth={0}
                    />
                    {item.badge?.value}
                  </Badge>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    effect={"scale"}
                    className="size-7 hover:bg-muted-foreground/15"
                  >
                    <MoreHorizontal />
                  </Button>
                  <Button
                    variant={"destructive"}
                    effect={"scale"}
                    size={"icon"}
                    className="size-7"
                    onClick={() => removeFormElement(formId!, item.id)}
                  >
                    <Trash />
                  </Button>
                </section>
              </DndElementItem>
            </motion.div>
          ))}
        </SortableContext>
      </AnimatePresence>
    </DndContext>
  );
};
