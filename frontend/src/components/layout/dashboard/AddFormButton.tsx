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
import { getAuthToken } from "@/lib/utils";
import { WorkspaceIcon } from "./Workspace";
import { FigmaAdd } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const createFormSchema = z.object({
  name: z.string().min(4, {
    message: "Workspace name must be at least 4 characters.",
  }),
});

export default function AddFormButton() {
  const id = useId();
  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = useQueryClient();
  const { workspaceId } = useParams();

  const formMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await fetch(`/api/workspace/${workspaceId}/form`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          title: name,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log({ create_form_data: data });
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
        <Button effect={"click"}>
          <FigmaAdd /> Create Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <WorkspaceIcon strokeWidth={3} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Create Form</DialogTitle>
            <DialogDescription className="sm:text-center">
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
                <FormItem className="*:not-first:mt-2">
                  <FormLabel htmlFor={`${id}-form`}>Form name</FormLabel>
                  <FormControl>
                    <Input
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
                <Button type="button" variant="destructive" className="flex-1">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="flex-1">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
