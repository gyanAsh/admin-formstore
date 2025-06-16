import { z } from "zod";
import { useId, useState } from "react";

import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { cn, getAuthToken } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as motion from "motion/react-client";
export const createFormSchema = z.object({
  name: z.string().min(2, {
    message: "Form name must be at least 2 characters.",
  }),
});

export default function AddFormButton() {
  const id = useId();
  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = useQueryClient();
  const { workspaceId } = useParams();

  const formMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (isNaN(parseInt(String(workspaceId)))) {
        throw Error("invalid workspace id");
        return;
      }
      const res = await fetch(`/api/form`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          workspace_id: parseInt(String(workspaceId)),
          title: name,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-workspace-forms"] });
      setOpenDialog(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const createNewForm = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // Submit handler.
  function createFrom(values: z.infer<typeof createFormSchema>) {
    formMutation.mutate(values);
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
            Create Form
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
              Create Form
            </DialogTitle>
            <DialogDescription className="sm:text-center text-base text-zinc-500 dark:text-zinc-400">
              To create a new form, please enter a name below.
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...createNewForm}>
          <form
            onSubmit={createNewForm.handleSubmit(createFrom)}
            className="space-y-5"
          >
            {formMutation.isError && (
              <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
                {formMutation.error.message}
              </div>
            )}
            <FormField
              control={createNewForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-base cursor-pointer w-fit"
                    htmlFor={`${id}-form`}
                  >
                    Form name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg hover:ring-1 hover:ring-ring text-base"
                      id={`${id}-form`}
                      type="text"
                      placeholder="Enter name here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  effect="small_scale"
                  className={cn(
                    "flex-1 rounded-lg text-base",
                    "bg-transparent border border-white-500 text-white-500 hover:text-white-500 ease-in duration-80 hover:bg-destructive/25"
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
                  "bg-primary/85"
                )}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
