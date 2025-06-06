import { z } from "zod";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
export const createFormSchema = z.object({
  name: z.string().min(2, {
    message: "Form name must be at least 2 characters.",
  }),
});

export default function PublishFormButton() {
  const [openDialog, setOpenDialog] = useState(false);

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
          {/* <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <WorkspaceIcon strokeWidth={3} />
          </div> */}
          <DialogHeader className="gap-0">
            <DialogTitle className="sm:text-center text-lg text-zinc-800 dark:text-zinc-200">
              Publish Form
            </DialogTitle>
          </DialogHeader>
        </div>
        Schedual option before publish and other selected options {`(preview)`}{" "}
        here
      </DialogContent>
    </Dialog>
  );
}
