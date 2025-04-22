import { EditableParagraph } from "@/components/editable-input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { debounce } from "@/lib/utils";
import React from "react";

export const PhoneCard = () => {
  const titleRef = React.useRef<HTMLParagraphElement>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);

  const updateText = debounce(() => {
    console.log("updated");
  }, 1500);
  return (
    <Card className="grid p-6 gap-3 max-w-[770px] w-full border mx-auto shadow-xl">
      <section className=" border grid grid-cols-10 p-2 rounded-lg bg-accent">
        <div className="flex col-span-1 gap-1.5">
          <Label className="text-sm">Required:</Label>
          <Switch />
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
      <input
        disabled
        placeholder="08173096350"
        className="text-2xl placeholder:text-2xl focus:outline-0 border-b focus:border-b-2 border-blue-600"
      />
    </Card>
  );
};
