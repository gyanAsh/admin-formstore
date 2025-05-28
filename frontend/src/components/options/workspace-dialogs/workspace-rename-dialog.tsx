import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { cn, getAuthToken } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useId } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(2, {
    message: "Workspace name must be at least 2 characters.",
  }),
});

export function RenameWorkspaceDialog({
  workspaceId,
  workspaceName,
  setOpenDialog,
}: {
  workspaceId: number;
  workspaceName: string;
  setOpenDialog: (bool: boolean) => void;
}) {
  const id = useId();
  const queryClient = useQueryClient();

  const workspaceMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (name == "") {
        console.error("name is empty");
      }
      const res = await fetch("/api/workspace", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          id: parseInt(String(workspaceId)),
          name: name,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["api-workspace-forms"] });
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
  function alterWorkspace(values: z.infer<typeof createWorkspaceSchema>) {
    workspaceMutation.mutate(values);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <DialogHeader className="gap-0">
          <DialogTitle className="sm:text-center text-lg text-zinc-800 dark:text-zinc-200">
            Rename Workspace
          </DialogTitle>
          <DialogDescription className="sm:text-center text-base text-zinc-500 dark:text-zinc-400">
            Please enter a name for workspace `{workspaceName}` below.
          </DialogDescription>
        </DialogHeader>
      </div>
      <Form {...workspaceForm}>
        <form
          onSubmit={workspaceForm.handleSubmit(alterWorkspace)}
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
              <FormItem className="">
                <FormLabel
                  className="text-base cursor-pointer w-fit"
                  htmlFor={`${id}-workspace`}
                >
                  New Name for Workspace
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg hover:ring-1 hover:ring-ring text-base"
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
            <DialogClose asChild>
              <Button
                type="button"
                effect="small_scale"
                className={cn(
                  "flex-1 rounded-lg text-base",
                  "bg-transparent border border-white-500 text-white-500 hover:text-white-500 ease-in duration-80 hover:bg-white/25",
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
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}

