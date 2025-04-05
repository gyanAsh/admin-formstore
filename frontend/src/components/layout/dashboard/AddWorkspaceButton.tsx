import { useId, useState } from "react";
import { CircleAlertIcon, Plus } from "lucide-react";

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

export default function AddWorkspace() {
  const id = useId();
  const [inputValue, setInputValue] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="size-7" variant={"default"}>
          <Plus strokeWidth={3} />{" "}
          <span className="sr-only">Add Workspace</span>
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
            <DialogTitle className="sm:text-center">
              Create Workspace
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              To create a new wordspace, please enter a name below.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Workspace name</Label>
            <Input
              id={id}
              type="text"
              placeholder="Type here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
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
