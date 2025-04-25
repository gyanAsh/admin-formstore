import { EditableParagraph } from "@/components/editable-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { debounce } from "@/lib/utils";
import { FormElement, removeExistingElement } from "@/store/form";
import { Trash2 } from "lucide-react";
import React from "react";

export const TextCard = ({ form }: { form: FormElement }) => {
  const titleRef = React.useRef<HTMLParagraphElement>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);

  const updateText = debounce(() => {
    console.log("updated");
  }, 1500);
  return (
    <Card className="grid p-6 gap-3 max-w-[770px] w-full border mx-auto shadow-xl">
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
        placeholder="Type your reponse here..."
        className="text-2xl placeholder:text-2xl focus:outline-0 border-b focus:border-b-2 border-blue-600"
      />
    </Card>
  );
};
