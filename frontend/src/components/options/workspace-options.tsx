import { Pencil, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as motion from "motion/react-client";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";

export const createWorkspaceSchema = z.object({
  name: z.string().min(4, {
    message: "Workspace name must be at least 4 characters.",
  }),
});

// This compontent in a copy / rewrite of the compontent also known as
// AddWorkspaceButton, techinally it's a slimed down version.
// This current addresses the need for rename compontent. A generic solution
// would be nice but might take some time.
function RenameWorkpaceDialogForm({
  setOpenDialog,
}: {
  setOpenDialog: (bool) => void;
}) {
  const id = useId();
  const queryClient = useQueryClient();
  const { workspaceId } = useParams();

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
          id: parseInt(workspaceId),
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
      queryClient.invalidateQueries([
        ["api-workspaces"],
        ["api-workspace-forms"],
      ]);
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
            To rename a wordspace, please enter a name below.
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
    </>
  );
}

export const WorkspaceDropdownContentOptions = ({
  alignOffset = -5,
  sideOffset = 10,
  animationDirection = "left",
}: {
  alignOffset?: number;
  sideOffset?: number;
  animationDirection?: "left" | "right";
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  /** If you are looking to this and wondering, hey this doesn't seem like a
   * great design. I know it and you are probably right.
   * This Dialog arragement was made without the consideration of other
   * elements like Invite or Delete. Just to get the rename thing to work. I
   * all the work to the future me or the one of finds this message here.
   * */
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="rounded-4xl">
        <RenameWorkpaceDialogForm setOpenDialog={setOpenDialog} />
      </DialogContent>

      <DropdownMenuContent
        className="space-y-0.5 rounded-lg  font-semibold text-zinc-700 dark:text-zinc-300 p-2"
        side="right"
        align="start"
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        asChild
      >
        <motion.section
          initial={{
            translateX: animationDirection == "right" ? "-5%" : "5%",
            opacity: 0,
          }}
          animate={{
            translateX: "0%",
            opacity: 100,
            transition: { duration: 0.25, ease: "easeInOut" },
          }}
        >
          <DropdownMenuItem
            className="rounded-lg space-x-1 hover:text-zinc-900! hover:dark:text-zinc-100!"
            asChild
          >
            <motion.div
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.1 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <Share2
                size={16}
                strokeWidth={3}
                className="opacity-100"
                aria-hidden="true"
              />
              <p>Invite</p>
            </motion.div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-lg space-x-1 hover:text-zinc-900! hover:dark:text-zinc-100!"
            asChild
          >
            <DialogTrigger asChild>
              <motion.div
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.1 },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
              >
                <Pencil
                  size={16}
                  strokeWidth={3}
                  className="opacity-100"
                  aria-hidden="true"
                />
                <p>Rename</p>
              </motion.div>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-lg space-x-1 bg-destructive/75 shadow-xs hover:text-white! hover:bg-destructive!"
            asChild
          >
            <motion.div
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.1 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <Trash2
                size={16}
                strokeWidth={3}
                className="opacity-100"
                aria-hidden="true"
              />
              <p>Delete</p>
            </motion.div>
          </DropdownMenuItem>
        </motion.section>
      </DropdownMenuContent>
    </Dialog>
  );
};
