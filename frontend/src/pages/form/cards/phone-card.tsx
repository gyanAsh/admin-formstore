import { EditableParagraph } from "@/components/editable-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import React from "react";
import type { FormElement } from "../index";

export const PhoneCard = ({ form }: { form: FormElement }) => {
  const titleRef = React.useRef<HTMLParagraphElement>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);

  return (
    <>
      <div className="flex items-center gap-2">
        <section className=" border grid grid-cols-10 p-2 rounded-lg bg-accent">
          <div className="flex col-span-1 gap-1.5">
            <Label className="text-sm">Required:</Label>
            <Switch />
          </div>
        </section>

        <Button
          size={"icon"}
          variant={"destructive"}
          effect={"click"}
          onClick={() => {}}
        >
          <Trash2 />
        </Button>
      </div>

      <section className="grid gap-0">
        <EditableParagraph
          className="text-xl"
          paragraphRef={titleRef}
          data-placeholder="Your question here."
          handleChange={()=>{}}
        />
        <EditableParagraph
          className="text-base font-light"
          paragraphRef={descriptionRef}
          data-placeholder="Description (optional)"
        />
      </section>
      <input
        disabled
        placeholder="9876543210"
        className="text-2xl placeholder:text-2xl focus:outline-0 border-b focus:border-b-2 border-blue-600"
      />
    </>
  );
};
