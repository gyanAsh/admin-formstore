import { Pencil, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as motion from "motion/react-client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useParams } from "react-router";
import { DeleteWorkspaceDialog } from "./workspace-dialogs/workspace-delete-dialog";
import { RenameWorkspaceDialog } from "./workspace-dialogs/workspace-rename-dialog";

export const WorkspaceDropdownContentOptions = ({
  workspaceId,
  workspaceName,
  alignOffset = -5,
  sideOffset = 10,
  animationDirection = "left",
}: {
  workspaceId: number;
  workspaceName: string;
  alignOffset?: number;
  sideOffset?: number;
  animationDirection?: "left" | "right";
}) => {
  if (!workspaceId || workspaceId == 0) {
    const params = useParams();
    workspaceId = parseInt(params.workspaceId!);
  }
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOption, setCurrentOption] = useState("");

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="rounded-4xl">
        <WorkspaceDialog
          workspaceId={workspaceId}
          workspaceName={workspaceName}
          setOpenDialog={setOpenDialog}
          currentOption={currentOption}
        />
      </DialogContent>

      <DropdownMenuContent
        className="space-y-0.5 rounded-lg  font-semibold text-zinc-700 dark:text-zinc-300 p-2"
        side="right"
        align="start"
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        asChild
      >
        <DialogTrigger asChild>
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
              onMouseDown={() => {
                setCurrentOption("rename");
              }}
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
                <Pencil
                  size={16}
                  strokeWidth={3}
                  className="opacity-100"
                  aria-hidden="true"
                />
                <p>Rename</p>
              </motion.div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-lg space-x-1 bg-destructive/75 shadow-xs hover:text-white! hover:bg-destructive!"
              asChild
              onMouseDown={() => {
                setCurrentOption("delete");
              }}
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
        </DialogTrigger>
      </DropdownMenuContent>
    </Dialog>
  );
};

function WorkspaceDialog({
  workspaceId,
  workspaceName,
  setOpenDialog,
  currentOption,
}: {
  workspaceId: number;
  workspaceName: string;
  setOpenDialog: (bool: boolean) => void;
  currentOption: string;
}) {
  if (currentOption == "rename") {
    return (
      <RenameWorkspaceDialog
        workspaceId={workspaceId}
        workspaceName={workspaceName}
        setOpenDialog={setOpenDialog}
      />
    );
  } else if (currentOption == "delete") {
    return (
      <DeleteWorkspaceDialog
        workspaceId={workspaceId}
        workspaceName={workspaceName}
        setOpenDialog={setOpenDialog}
      />
    );
  } else {
    return <div>invalid type </div>;
  }
}
