import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkspaceIcon } from "./Workspace";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/utils";
import { FigmaAdd } from "@/components/icons";
import { useParams } from "react-router";

export default function AddFormButton() {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const queryClient = useQueryClient();
  const {workspaceId} = useParams();

  const formMutation = useMutation({
    mutationFn: async ({name}: {name: string}) => {
      fetch(`/api/workspace/${workspaceId}/form`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          title: name,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-workspace-forms"] });
    },
  });

  function createFrom(event: any) {
    event.preventDefault();
    formMutation.mutate({name: inputValue});
  }

  return (
    <Dialog>
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

        <form className="space-y-5" onSubmit={createFrom}>
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Form name</Label>
            <Input
              id={id}
              type="text"
              placeholder="Enter name here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="destructive" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1"
              disabled={inputValue.length < 3}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
