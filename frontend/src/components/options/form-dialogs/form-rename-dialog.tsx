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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function RenameFormDialog({
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
