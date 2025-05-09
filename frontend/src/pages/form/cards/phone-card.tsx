import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import React, {useState} from "react";
import type { FormElement } from "../index";

export const PhoneCard = ({ form }: { form: FormElement }) => {
  const [formLabel, setFormLabel] = useState(form.label);

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
        <input
          className="text-xl"
          placeholder="Your question here."
          value={formLabel}
          onChange={(e)=>{
            setFormLabel(e.target.value);
          }}
        />
        <input
          className="text-base font-light"
          placeholder="Description (optional)"
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
