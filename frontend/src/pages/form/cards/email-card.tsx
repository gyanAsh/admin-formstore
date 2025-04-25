import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, Trash2 } from "lucide-react";
import { debounce } from "@/lib/utils";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { EditableParagraph } from "@/components/editable-input";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Button } from "@/components/ui/button";
import { FormElement, removeExistingElement } from "@/store/form";

const tips = [
  {
    title: "Default",
    description: "By defalut all email domains are accepted.",
  },
  {
    title: "Selected Domain",
    description:
      "For selected domains, you can select one or more domains from the list.",
  },
  {
    title: "Custom Domain",
    description:
      "If you desired domain is not in the list, you can add a new domain by typing and pressing Enter.",
  },
];

const emailDomain: Option[] = [
  { value: "gmail.com", label: "gmail.com" },
  { value: "yahoo.com", label: "yahoo.com" },
  { value: "hotmail.com", label: "hotmail.com" },
  { value: "outlook.com", label: "outlook.com" },
  { value: "zoho.com", label: "zoho.com" },
  { value: "aol.com", label: "aol.com" },
  { value: "hotmail.co.uk", label: "hotmail.co.uk" },
  { value: "msn.com", label: "msn.com" },
  { value: "yahoo.co.uk", label: "yahoo.co.uk" },
];

export const EmailCard = ({ form }: { form: FormElement }) => {
  const titleRef = React.useRef<HTMLParagraphElement>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);

  const updateText = debounce(() => {
    console.log("updated");
  }, 1500);
  return (
    <Card className="grid p-6 gap-3 max-w-[770px] w-full border mx-auto shadow-xl">
      <div className="flex items-center gap-2">
        <section className=" border grid grid-cols-10 p-2 rounded-lg bg-accent">
          <div className="grid col-span-1 gap-1.5">
            <Label>Required:</Label>
            <Switch />
          </div>
          <div className="grid col-span-1 gap-1.5">
            <EmailOptions />
          </div>
        </section>

        <Button
          size={"icon"}
          variant={"destructive"}
          effect={"click"}
          onClick={() => removeExistingElement(form.id)}
        >
          <Trash2 />
        </Button>
      </div>

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
      <input
        disabled
        placeholder="name@example.com"
        className="text-2xl placeholder:text-2xl focus:outline-0 border-b focus:border-b-2 border-blue-600"
      />
    </Card>
  );
};

function EmailOptions() {
  const [currentTip, setCurrentTip] = useState(0);

  const handleNavigation = () => {
    if (currentTip === tips.length - 1) {
      setCurrentTip(0);
    } else {
      setCurrentTip(currentTip + 1);
    }
  };
  return (
    <>
      <div className="flex items-center gap-1.5">
        <Label>Emails:</Label>
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
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground text-xs">
                  {currentTip + 1}/{tips.length}
                </span>
                <button
                  className="text-xs font-medium hover:underline"
                  onClick={handleNavigation}
                >
                  {currentTip === tips.length - 1 ? "Start over" : "Next"}
                </button>
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
          label: "Select email domain",
        }}
        value={emailDomain.slice(0, 0)}
        defaultOptions={emailDomain}
        placeholder="Select Email Domain"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </>
  );
}
