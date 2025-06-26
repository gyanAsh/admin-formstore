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
import { $current_form, getForm } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";
import { parseFormDataForApi } from "@/lib/form_parsing";
export const createFormSchema = z.object({
  name: z.string().min(2, {
    message: "Form name must be at least 2 characters.",
  }),
});

export default function PublishFormButton({ formId }: { formId: number }) {
  const [openDialog, setOpenDialog] = useState(false);
  const formData = getForm(formId);

  async function publishFormHandler() {
    const res = await fetch(`/api/form/publish`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseFormDataForApi(formData, formId)),
    });
    const data = await res.json();
    console.log(data);
    setOpenDialog(false);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
            Publish
            <span className="sr-only">Publish Form</span>
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
