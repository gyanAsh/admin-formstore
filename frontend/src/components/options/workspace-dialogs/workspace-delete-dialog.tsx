import {
  Form,
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
import { useParams, useNavigate } from "react-router";

export function DeleteWorkspaceDialog({
  workspaceId,
  workspaceName,
  setOpenDialog,
}: {
  workspaceId: number;
  workspaceName: string;
  setOpenDialog: (bool: boolean) => void;
}) {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const workspaceDeleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/workspace/${workspaceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["api-workspace-forms"] });
      setOpenDialog(false);
      if (parseInt(String(params.workspaceId)) == parseInt(String(workspaceId))) {
        navigate("/dashboard");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const workspaceDeleteForm = useForm({
    defaultValues: {},
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <DialogHeader className="gap-0">
          <DialogTitle className="sm:text-center text-lg text-zinc-800 dark:text-zinc-200">
            Delete Workspace
          </DialogTitle>
          <DialogDescription className="sm:text-center text-base text-zinc-500 dark:text-zinc-400">
            Are you sure you want to delete workspace `{workspaceName}` with `ID:{workspaceId}` This action is
            permanent and cannot be reversed.
          </DialogDescription>
        </DialogHeader>
      </div>
      <Form {...workspaceDeleteForm}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            workspaceDeleteMutation.mutate();
          }}
          className="space-y-5"
        >
          {workspaceDeleteMutation.isError && (
            <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
              {workspaceDeleteMutation.error.message}
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

