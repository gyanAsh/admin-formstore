import {
  ClipboardCopy,
  Copy,
  Link2,
  Pause,
  Pencil,
  Trash2,
} from "lucide-react";
import * as motion from "motion/react-client";
import { PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { cn, getAuthToken } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const FormPopoverContentOptions = ({
  formId,
  formTitle,
  closeOptions,
  alignOffset = -5,
  sideOffset = 10,
  animationDirection = "left",
}: {
  formId: number;
  formTitle: string;
  closeOptions: () => void;
  alignOffset?: number;
  sideOffset?: number;
  animationDirection?: "left" | "right";
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentFormOption, setCurrentFormOption] = useState("");

  const OPTIONS = [
    { destructive: false, icon: Link2, name: "Copy Link" },
    { destructive: false, icon: Pause, name: "Pause" },
    { destructive: false, icon: Copy, name: "Duplicate" },
    { destructive: false, icon: ClipboardCopy, name: "Move To" },
    {
      destructive: false,
      icon: Pencil,
      name: "Rename",
      onClick: () => {
        setOpenDialog(true);
        setCurrentFormOption("Rename");
      },
    },
    {
      destructive: true,
      icon: Trash2,
      name: "Delete",
      onClick: () => {
        setOpenDialog(true);
        setCurrentFormOption("Delete");
      },
    },
  ];

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="rounded-4xl">
        <FormDialog
          formId={formId}
          formTitle={formTitle}
          setOpenDialog={setOpenDialog}
          currentFormOption={currentFormOption}
        />
      </DialogContent>
      <PopoverContent
        className={cn(
          "min-w-[142px] w-fit",
          "space-y-0.5 rounded-lg font-semibold text-zinc-700 dark:text-zinc-300 p-2",
        )}
        side="left"
        align="end"
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
          {OPTIONS.map((option) => (
            <motion.div
              key={option.name}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.1 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              onClick={() => {
                if (option.onClick) {
                  option.onClick();
                }
                closeOptions();
              }}
              data-destructive={option.destructive}
              className={cn(
                "hover:bg-accent hover:text-zinc-900! hover:dark:text-zinc-100!",
                "relative flex cursor-default items-center gap-2",
                "px-2 py-1.5 text-sm outline-hidden select-none",
                "rounded-lg space-x-1 min-w-[142px]",
                "data-[destructive=true]:bg-destructive data-[destructive=true]:focus:bg-destructive/10 ",
                "dark:data-[destructive=true]:focus:bg-destructive/40",
                "data-[destructive=true]:focus:text-destructive ",
              )}
            >
              <option.icon
                size={16}
                strokeWidth={3}
                className="opacity-100"
                aria-hidden="true"
              />
              <p>{option.name}</p>
            </motion.div>
          ))}
        </motion.section>
      </PopoverContent>
    </Dialog>
  );
};

function FormDialog({
  formId,
  formTitle,
  setOpenDialog,
  currentFormOption,
}: {
  formId: number;
  formTitle: string;
  setOpenDialog: (bool: boolean) => void;
  currentFormOption: string;
}) {
  if (currentFormOption == "Delete") {
    return (
      <DeleteFormsDialog
        formId={formId}
        formTitle={formTitle}
        setOpenDialog={setOpenDialog}
      />
    );
  } else if (currentFormOption == "Rename") {
    return (
      <RenameFormDialog
        formId={formId}
        formTitle={formTitle}
        setOpenDialog={setOpenDialog}
      />
    );
  } else {
    return <div>Invalid Dialog Option `{currentFormOption}`</div>;
  }
}

function DeleteFormsDialog({
  formId,
  formTitle,
  setOpenDialog,
}: {
  formId: number;
  formTitle: string;
  setOpenDialog: (bool: boolean) => void;
}) {
  if (formId == 0) {
    return;
  }

  const queryClient = useQueryClient();

  const formDeleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/form", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          id: parseInt(String(formId)),
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-workspace-forms"] });
      setOpenDialog(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const formDeleteParams = useForm({
    defaultValues: {},
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <DialogHeader className="gap-0">
          <DialogTitle className="sm:text-center text-lg text-zinc-800 dark:text-zinc-200">
            Delete Form: `{formTitle}`
          </DialogTitle>
          <DialogDescription className="sm:text-center text-base text-zinc-500 dark:text-zinc-400">
            Are you sure you want to delete this form: `{formTitle}` id: `
            {formId}`. This action is permanent and cannot be reversed.
          </DialogDescription>
        </DialogHeader>
      </div>
      <Form {...formDeleteParams}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formDeleteMutation.mutate();
          }}
          className="space-y-5"
        >
          {formDeleteMutation.isError && (
            <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
              {formDeleteMutation.error.message}
            </div>
          )}
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
                "bg-destructive/85 hover:bg-red-500 hover:border hover:border-red-300",
              )}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}

function RenameFormDialog({
  formId,
  formTitle,
  setOpenDialog,
}: {
  formId: number;
  formTitle: string;
  setOpenDialog: (bool: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const formRenameMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (name == "") {
        console.error("name is empty");
      }
      const res = await fetch("/api/form", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          id: parseInt(String(formId)),
          title: name,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
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

  const renameFormSchema = z.object({
    name: z.string().min(2, {
      message: "Form name must be at least 2 characters.",
    }),
  });
  const renameFormParams = useForm<z.infer<typeof renameFormSchema>>({
    resolver: zodResolver(renameFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function renameForm(values: z.infer<typeof renameFormSchema>) {
    formRenameMutation.mutate(values);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <DialogHeader className="gap-0">
          <DialogTitle className="sm:text-center text-lg text-zinc-800 dark:text-zinc-200">
            Rename Form
          </DialogTitle>
          <DialogDescription className="sm:text-center text-base text-zinc-500 dark:text-zinc-400">
            Please enter a name for form `{formTitle}` below.
          </DialogDescription>
        </DialogHeader>
      </div>
      <Form {...renameFormParams}>
        <form
          onSubmit={renameFormParams.handleSubmit(renameForm)}
          className="space-y-5"
        >
          {formRenameMutation.isError && (
            <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
              {formRenameMutation.error.message}
            </div>
          )}
          <FormField
            control={renameFormParams.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel
                  className="text-base cursor-pointer w-fit"
                  htmlFor={`${formId}-form`}
                >
                  New Name for Form
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg hover:ring-1 hover:ring-ring text-base"
                    id={`${formId}-form`}
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
