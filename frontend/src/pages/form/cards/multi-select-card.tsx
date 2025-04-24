import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Info } from "lucide-react";
import { debounce } from "@/lib/utils";
import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { EditableParagraph } from "@/components/editable-input";
import MultipleSelector, { Option } from "@/components/ui/multiselect";

const tips = [
  {
    title: "Create Options",
    description: "Add a new options by typing and pressing Enter.",
  },
];

const ddoptions: Option[] = [];

export const MultiSelectCard = () => {
  const titleRef = React.useRef<HTMLParagraphElement>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);
  const ddOptionPlaceholderRef = React.useRef<HTMLParagraphElement>(null);

  const updateText = debounce(() => {
    console.log("updated");
  }, 1500);
  return (
    <Card className="grid p-6 gap-3 max-w-[770px] w-full border mx-auto shadow-xl">
      <section className=" border grid grid-cols-10 p-2 rounded-lg bg-accent">
        <div className="grid col-span-1 gap-1.5">
          <Label>Required:</Label>
          <Switch />
        </div>
        <div className="grid col-span-1 gap-1.5">
          <MultiSelectOptions />
        </div>
      </section>
      <section className="grid gap-0">
        <EditableParagraph
          className="text-xl"
          paragraphRef={titleRef}
          data-placeholder="Your question here."
          handleChange={updateText}
        />
        <EditableParagraph
          className="text-base font-light"
          paragraphRef={descriptionRef}
          data-placeholder="Description (optional)"
        />
      </section>
      <div className="flex items-center w-full relative">
        <EditableParagraph
          className="font-light text-2xl w-full placeholder:text-2xl focus:outline-0 border-b focus:border-b-2 border-blue-600"
          paragraphRef={ddOptionPlaceholderRef}
          data-placeholder="Add placeholder text..."
        />
        <ChevronDown className="absolute right-0 text-blue-600" />
      </div>
    </Card>
  );
};

function MultiSelectOptions() {
  const currentTip = 0;

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Label>Options:</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Info
              size={16}
              className="hover:scale-105 active:scale-95 hover:text-primary cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="py-3 shadow-none" side="top">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-[13px] font-medium">
                  {tips[currentTip].title}
                </p>
                <p className="text-muted-foreground text-xs">
                  {tips[currentTip].description}
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <MultipleSelector
        badgeClassName="py-2"
        className="w-60"
        creatable
        commandProps={{
          label: "Options",
        }}
        value={ddoptions.slice(0, 0)}
        defaultOptions={ddoptions}
        placeholder="Create Options"
        hideClearAllButton
        hidePlaceholderWhenSelected
      />
    </>
  );
}
