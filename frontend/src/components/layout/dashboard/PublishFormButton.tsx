import { z } from "zod";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { cn, getAuthToken } from "@/lib/utils";
import { getFormElementsById } from "@/store/forms/form-elements";
export const createFormSchema = z.object({
  name: z.string().min(2, {
    message: "Form name must be at least 2 characters.",
  }),
});

function convertToTypedKeys(obj: Object<any>) {
  const out = [];
  if (!obj) {
    return out;
  }
  for (const [key, value] of Object.entries(obj)) {
    out.push({ type: key, value: value });
  }
  return out;
}

export default function PublishFormButton({ formId }: { formId: number }) {
  const [openDialog, setOpenDialog] = useState(false);

  async function publishFormHandler() {
    const formData = getFormElementsById(formId);
    const retFormData = {
      form_id: formId,
      design: formData.design,
      elements: formData.elements.map((x, i) => ({
        seq_num: i + 1,
        type: x.field,
        labels: x.labels,
        required: x.required,
        validations: {},
        properties: convertToTypedKeys(x.validations),
      })),
    };
    console.log(retFormData);
    const res = await fetch(`/api/form/publish`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(retFormData),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{
            scale: 1.04,
            transition: { duration: 0.07 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="text-sm font-semibold text-white rounded-lg">
            Publish
            <span className="sr-only">Add Form</span>
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="rounded-4xl">
        <div className="flex flex-col items-center">
          <DialogHeader className="gap-0">
            <DialogTitle className="sm:text-center text-lg text-zinc-800 dark:text-zinc-200">
              Publish Form
            </DialogTitle>
            <DialogDescription>
              Do you want to publish current active form that is `form:{formId}
              `?
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              effect="small_scale"
              className={cn(
                "flex-1 rounded-lg text-base",
                "bg-transparent border border-white-500 text-white-500 hover:text-white-500 ease-in duration-80",
              )}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            effect={"small_scale"}
            className={cn(
              "flex-1 rounded-lg text-white! text-base  ease-in duration-80",
              "bg-primary/85",
            )}
            onClick={publishFormHandler}
          >
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
