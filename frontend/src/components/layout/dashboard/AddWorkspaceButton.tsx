import { z } from "zod";
import { useId, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Plus } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { cn, getAuthToken } from "@/lib/utils";
import { WorkspaceIcon } from "./Workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const createWorkspaceSchema = z.object({
  name: z.string().min(4, {
    message: "Workspace name must be at least 4 characters.",
  }),
});

export default function AddWorkspace() {
  const id = useId();
  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = useQueryClient();

  const workspaceMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (name == "") {
        console.error("name is empty");
      }
      const res = await fetch("/api/workspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log({ create_workspace_data: data });
      queryClient.invalidateQueries({ queryKey: ["api-workspaces"] });
      setOpenDialog(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const workspaceForm = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  // Submit handler.
  function createWorkspace(values: z.infer<typeof createWorkspaceSchema>) {
    workspaceMutation.mutate(values);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="size-7" variant={"default"}>
          <Plus strokeWidth={3} />{" "}
          <span className="sr-only">Add Workspace</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-4xl">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <WorkspaceIcon strokeWidth={3} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Create Workspace
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              To create a new wordspace, please enter a name below.
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...workspaceForm}>
          <form
            onSubmit={workspaceForm.handleSubmit(createWorkspace)}
            className="space-y-5"
          >
            {workspaceMutation.isError && (
              <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
                {workspaceMutation.error.message}
              </div>
            )}
            <FormField
              control={workspaceForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="*:not-first:mt-2">
                  <FormLabel htmlFor={`${id}-workspace`}>
                    Workspace name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`${id}-workspace`}
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
              <Button
                type="submit"
                effect={"small_scale"}
                className={cn(
                  "flex-1 rounded-lg",
                  "bg-primary/85 text-zinc-900"
                )}
              >
                Create
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  // variant="outline"
                  effect="small_scale"
                  className={cn(
                    "flex-1 rounded-lg",
                    "bg-transparent border border-red-500 text-red-500 hover:text-red-500 hover:bg-destructive/25"
                  )}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
