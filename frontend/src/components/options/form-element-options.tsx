import { Dot, MinusIcon, Plus, PlusIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { FormElements } from "@/store/forms/form-elemets.types";
import {
  Button as AriaButton,
  Group,
  Input as AriaInput,
  Label as AriaLabel,
  NumberField,
} from "react-aria-components";
import { Separator } from "../ui/separator";

export const FromElementDialogContent = ({
  order,
  element,
}: {
  order: string | number;
  element: FormElements;
}) => {
  const [stateElement, setStateElement] = useState(element);

  const [stateDescription, setStateDescription] = useState({
    show: false,
    text: "",
  });

  console.log({ element, stateElement });
  return (
    <DialogContent className="md:max-w-[700px]  rounded-4xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <div
            className={cn(
              "p-1 border rounded-full text-secondary-foreground",
              "flex items-center gap-1 text-sm px-3 font-normal",
              {
                " bg-pink-100 dark:bg-pink-500/15 ":
                  stateElement.badge?.color === "pink",
              },
              {
                " bg-blue-100 dark:bg-blue-500/15 ":
                  stateElement.badge?.color === "blue",
              },
              {
                " bg-green-100 dark:bg-green-500/15 ":
                  stateElement.badge?.color === "green",
              },
              {
                " bg-yellow-100 dark:bg-yellow-500/15 ":
                  stateElement.badge?.color === "yellow",
              }
            )}
          >
            <p className="text-secondary-foreground">{order}</p>
            <Dot className="size-2" strokeWidth={10} />
            <p className=" capitalize">{element.badge?.value}</p>
          </div>
          <p className="capitalize">{"Set Field Rules"}</p>
        </DialogTitle>
        <DialogDescription>
          Define what users are allowed to enter in this field based on
          conditions.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col space-y-4">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="element-question">Question *</Label>
          <Input
            id="element-question"
            className="border-accent-foreground/40"
            placeholder="Your Question here."
          />
        </div>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="element-description">
            Description{" "}
            <span className="text-muted-foreground text-xs">{`(Optional)`}</span>
          </Label>
          <div className="flex items-center space-x-3">
            <Input
              id="element-description"
              className="border-accent-foreground/40"
              placeholder="Your Description here."
            />
          </div>
        </div>
      </div>
      {stateElement.badge?.value === "text" && (
        <div className="flex flex-col space-y-4">
          <TextValidations />
        </div>
      )}
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="destructive">
            Close
          </Button>
        </DialogClose>
        <Button type="button" variant="default">
          Update
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const TextValidations = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <NumberField defaultValue={0} minValue={0}>
        <div className="*:not-first:mt-2">
          <AriaLabel className="text-foreground text-sm font-medium">
            Min characters
          </AriaLabel>
          <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
            <AriaButton
              slot="decrement"
              className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MinusIcon size={16} aria-hidden="true" />
            </AriaButton>
            <AriaInput className="bg-background rounded-none text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
            <AriaButton
              slot="increment"
              className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlusIcon size={16} aria-hidden="true" />
            </AriaButton>
          </Group>
        </div>
      </NumberField>
      <NumberField defaultValue={0} minValue={0} maxValue={500}>
        <div className="*:not-first:mt-2">
          <AriaLabel className="text-foreground text-sm font-medium">
            Max characters
          </AriaLabel>
          <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
            <AriaButton
              slot="decrement"
              className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MinusIcon size={16} aria-hidden="true" />
            </AriaButton>
            <AriaInput className="bg-background rounded-none text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
            <AriaButton
              slot="increment"
              className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlusIcon size={16} aria-hidden="true" />
            </AriaButton>
          </Group>
        </div>
      </NumberField>
    </div>
  );
};
